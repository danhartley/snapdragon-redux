import * as R from 'ramda';

import { utils } from 'utils/utils';
import { firestore } from 'api/firebase/firestore';
import { iconicTaxa } from 'api/snapdragon/iconic-taxa';
import { snapLog, logError } from 'ui/helpers/logging-handler';

let inatListeners = [];
let RECORDS_PER_PAGE = 200;

const unsubscribe = listener => {
    inatListeners = inatListeners.filter(l => l !== listener);
};

export const listenToInatRequests = listener => {
    inatListeners.push(listener);
    return unsubscribe;
};

const getBasePath = config => {
    
    const month = config.guide.season.type === 'all_year' 
            ? ''
            : config.guide.season.observableMonths.map(month => month.index).join(',');

    const perPage = config.guide.perPage || RECORDS_PER_PAGE;

    const basePath = `https://api.inaturalist.org/v1/observations/species_counts?captive=false&rank=species&per_page=${perPage}&month=${month}`;

    return basePath;
};

export const getInatSpecies = async config => {

    const speciesNames = await firestore.getSpeciesNames();

    const snapdragonSpeciesNames = speciesNames[0].value;

   snapLog('snapdragon species', snapdragonSpeciesNames);

    const iconicTaxaKeys = Object.keys(iconicTaxa).join(',');

    const getIconicTaxa = config => {
      
      try {

          const iconicTaxa = config.guide.iconicTaxa.map(taxon => taxon.id) || iconicTaxaKeys;

          // Create new taxonic group for reptilia, etc?

          if(iconicTaxa.find(taxon => taxon === 'mammalia')) {
              iconicTaxa.push('reptilia');
          }

          const taxa = iconicTaxa.map(taxon => {
              if(taxon === 'lepidoptera') taxon = 'insecta';            
              return taxon;
          });

          return taxa;

      } catch (e) {
        logError('Error for getIconicTaxa: ', e);
    }
    };

    const getUserOrProjectKeyValuePair = config => {
        if(!config.guide.inatId) return '';
        const param = config.guide.inatId.param;    
        const id = config.guide.inatId.id;
        const parameter = `&${param}=${id}`;
        return id ? parameter : '';
    };

    const getAllInatObservations = async (config, snapdragonSpeciesNames) => {
        let snapdragonSpecies = [];
        let records = [];
        let keepGoing = true;
        let page = 1;
        while (keepGoing) {
          try {
            let recordsFromThisRequest = await getInatObservations(config, page);
            await records.push.apply(records, recordsFromThisRequest);
            let matches = recordsFromThisRequest.filter(record => R.contains(record.taxon.name, snapdragonSpeciesNames));
            await snapdragonSpecies.push.apply(snapdragonSpecies, matches);
            page = page + 1;
            let noMoreRecords = recordsFromThisRequest.length < RECORDS_PER_PAGE;
            let recordsCountReached = snapdragonSpecies.length >= config.guide.noOfRecords;
           snapLog('snapdragonSpecies', snapdragonSpecies);
           snapLog('records', records);
            if (noMoreRecords || recordsCountReached) {
                keepGoing = false;
                return snapdragonSpecies;
            }
          } catch(e) {
            logError('getInatObservations', e);
            return snapdragonSpecies;
          }
        }
    }

    const loadSpeciesInParallel = async observations => {
        try {
            return Promise.all(observations.map(observation => {
                return firestore.getSpeciesByName(observation.taxon.name).then(async item => {
                    return await {                         
                        ...item, 
                        observationCount: observation.taxon.observations_count, 
                        iconicTaxon: observation.taxon.iconic_taxon_name
                    };
                })                    
            }));

        } catch (e) {
          logError('loadSpeciesInParallel: ', e);
        }
    };

    const getInatObservations = async (config, page) => {

      try {

        let lat = '', lng = '', placeId = '';

        let radius = config.guide.speciesRange ? parseInt(config.guide.speciesRange) : 10;
        let inat = '';
        
        switch(config.guide.locationType) {
            case 'place':
                placeId = config.guide.place.id;
                break;
            case 'longLat':
                lat = config.guide.coordinates.lat;
                lng = config.guide.coordinates.long;
                break;
            case 'inat':
                lat = '';
                lng = '';
                placeId = '';
                radius = '';
                inat = `&${config.guide.inatId.param}=${config.guide.inatId.key}`;
                break;
        }

        const iconicTaxa = getIconicTaxa(config);
        const params = config.guide.guideTpe === 'INAT' ? getUserOrProjectKeyValuePair(config) : '';
        const url = getBasePath(config) + `&page=${page}&iconic_taxa=${iconicTaxa}&place_id=${placeId}&lat=${lat}&lng=${lng}&radius=${radius}${inat}${params}`;

       snapLog('inat species request url', url);

        const recordsFromThisRequest = await fetch(url);

       snapLog('inat recordsFromThisRequest', recordsFromThisRequest);

        const json = await recordsFromThisRequest.json();
        inatListeners.forEach(listener => listener(
            { page: json.page, numberOfRequests: Math.ceil(json.total_results/json.RECORDS_per_page) }
        ));
        return json ? await json.results : [];
      } catch(e) {
        logError('getInatObservations', e);
        return [];
      }
    }
    
    let observations;

    try {
      observations = await getAllInatObservations(config, snapdragonSpeciesNames);
      observations = observations.filter(observation => R.contains(observation.taxon.name, snapdragonSpeciesNames));
      observations = R.take(config.guide.noOfRecords, utils.sortBy(observations.filter(item => item), 'observationCount', 'desc'));
    } catch(e) {
      logError('getAllInatObservations', e);
    }

   snapLog('observations', observations);

    if(!observations) return [];

    return await loadSpeciesInParallel(observations);
}

export async function getInatPlaceId(place) {
    
    const url = `https://api.inaturalist.org/v1/places/autocomplete?q=${place}`;
    const recordsFromThisRequest = await fetch(url);
    const json  = await recordsFromThisRequest.json();
    return json;
}

export async function getInatTaxonStats(item, config, placeId) {

    const place = placeId || 'any';
    const taxonName = item.name;
    const url = `https://api.inaturalist.org/v1/observations/species_counts?&verifiable=true&taxon_name=${taxonName}&place_id=${place}`;
    const recordsFromThisRequest = await fetch(url);
    const json = await recordsFromThisRequest.json();
    return json;
}

export async function getHistogram(item, placeId) {

    const place = placeId || 'any';
    const taxonName = item.name;
    const url = `https://api.inaturalist.org/v1/observations/histogram?taxon_name=${taxonName}&place_id=${place}`;
    const recordsFromThisRequest = await fetch(url);
    const json = await recordsFromThisRequest.json();
    return json;
}

export async function getAutocompleteBy(q, by) {

    // currently set up for USERS and PROJECTS but PLACES? Not sure
    // https://api.inaturalist.org/v1/places/autocomplete?q=O%20Parque%20Natural%20da%20Arr%C3%A1bida

    const url = `https://api.inaturalist.org/v1/${by}/autocomplete?q=${q}`;
    const recordsFromThisRequest = await fetch(url);
    const json = await recordsFromThisRequest.json();
    return json;
}

// https://www.inaturalist.org/observations/danielhartley.json?m1=1&m2=11&iconic_taxa[]=Fungi