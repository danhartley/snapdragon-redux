import { utils } from 'utils/utils';

const GOOGLE_ACCESS_KEY = process.env.GOOGLE_API_MAPS_KEY;

const getHTML5Location = () => {

  return new Promise(function (resolve, reject) {
    function success(position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    }

    function error(e) {
      logError('getHTML5Location', e);
      resolve({
        '0': 0,
        '1': 0,
      });
    }

    navigator.geolocation.getCurrentPosition(success, error);
  });
};

export const getLocation = (config) => {
  if(!!config.coordinates && config.coordinates.lat && config.coordinates.long) {
  //  snapLog('geolocation config',config);
    return new Promise(resolve => {
        resolve(config.coordinates);
    });
  } else {
  //  snapLog('geolocation config', config);
    return getHTML5Location();
  }  
};

const listeners = [];

const parseMapBoxPlace = async (json, config) => {
  const place = await json;
  const locality = place.features.find(f => f.place_type[0] === 'locality');
  const region = place.features.find(f => f.place_type[0] === 'region');
  const country = place.features.find(f => f.place_type[0] === 'country');

  place.locality = locality ? locality.text : '';
  place.region = region ? region.text : '';
  place.country = country ? country.text : '';
  place.area = place.region || place.country;
  
  place.shortLocation = `${place.locality}, ${place.country}`;
  place.longLocation = `${place.locality}, ${place.region}, ${place.country}`;
 
  place.summary = config.isLandscapeMode ? `Species from ${place.longLocation}` : `Species from ${place.shortLocation}`;
  const placePromise = new Promise(resolve => {
    resolve(place);
  });
  const updatedPlace = await placePromise;
  return await updatedPlace;
}

const getMapBoxPlace = async (long, lat, config) => {
  const token = 'pk.eyJ1IjoiZGFuaGFydGxleSIsImEiOiJjam84Zjd3aGowMDdoM2ttaDAzeDk4bHJ6In0.oEcO6w3DhHUv_mXrFW1clg';  
  const longitude = long;// || '-9.163009899999999';
  const latitude = lat;// || '38.7155762';  
  const language = config.language || 'en';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?language=${language}&access_token=${token}`;
  const response = await fetch(url);
  const json = await response.json();
  const place = await parseMapBoxPlace(json, config);
  listeners.forEach(listener => listener(place));
  return await place;
}

export const getPlace = async (config, force = false) => {
  if(!!config.place && !force) {
    const response = new Promise(resolve => {
      resolve(config.place);
    });
    const json = await response;    
    return await json;
  } else {       
    const coordinates = await getLocation(config);        
    const latitude = coordinates['0'] || coordinates.lat;
    const longitude = coordinates['1'] || coordinates.long;
    config.coordinates = { lat: latitude, long: longitude };

    return getMapBoxPlace(longitude, latitude, config);
  }
};

export const listenToPlaceChange = listener => { 
  listeners.push(listener);
};

const IPCountryLookup = async () => {
  const ACCESS_KEY = '69402a39530c7ae8218dfaf69ef78337';  
  const url = `http://api.ipstack.com/check?access_key=${ACCESS_KEY}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    const { country_code, country_name } = await json;
    return { country_code, country_name };
  } catch (error) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }  
}

const LocationLookup = async ip => {
  const ACCESS_KEY = 'a8563e7b75654ae8b016dc52719dee3b';
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${ACCESS_KEY}&ip=${ip}&fields=city,state_prov,country_name,latitude,longitude&output=json`;
  const response = await fetch(url);
  const json = await response.json();
  const { city, state_prov, country_name, latitude, longitude } = await json; 
  return { city, state_prov, country_name, latitude, longitude };
}

const IPLookup = async () => {  
  const url = 'https://api.ipgeolocation.io/getip';
  const response = await fetch(url);
  const json = await response.json();
  const { ip } = await json; 
  return ip;
}

export const getIPLocation = async (config, force = false) => {

     if(!!config.ipLocation && !force) {
      const response = new Promise(resolve => {
        resolve(config.ipLocation);
      });
      const json = await response;    
      return await json;
     } else {
      const ip = await IPLookup();
      const { city, state_prov, country_name, latitude, longitude } = await LocationLookup(ip);
      return { city, state_prov, country_name, latitude, longitude };
     }
};

export async function GoogleFindPlace(place) {

  // https://developers.google.com/places/web-service/search

  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&key=${GOOGLE_ACCESS_KEY}&fields=name`;

  const response = await fetch(url);
  const json = await response.json();
  const { candidates } = await json; 
  return candidates;
}

let service;
let requireNewSession = true;
let isScriptReady = false;
let SESSION_TOKEN;
let current_term = '';

export async function GoogleAutocompleteServerSide(place) {

  // https://developers.google.com/places/web-service/search

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&inputtype=textquery&key=${GOOGLE_ACCESS_KEY}&fields=name`;

  const response = await fetch(url);
  const json = await response.json();
  const { predictions } = await json; 
  return predictions;
}

const createScriptRequest = (src, callback) => {
  requireNewSession = false;
  const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      isScriptReady = true;
      callback();
    });
}

export const GoogleAutocomplete_Original = (place, callback) => {

  const getPredictions = () => {
    
    if(!isScriptReady) return;

    const displaySuggestions = function(predictions, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }
  
      callback(predictions);
    };
    if(!service) {
      service = new google.maps.places.AutocompleteService();      
    }
    
    service.getPlacePredictions({ input: place }, displaySuggestions);
  };

  if(requireNewSession) {
    
    const SESSION_TOKEN = utils.createSessionToken();

    const src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_ACCESS_KEY}&sessiontoken=${SESSION_TOKEN}&libraries=places`;

    createScriptRequest(src, () => {
      getPredictions();
    });
  } else {
    getPredictions();
  }
}

export const GoogleAutocomplete = (place, callback) => {

  const getPredictions = SESSION_TOKEN => {

    if(!service) {
        service = new google.maps.places.AutocompleteService();      
    }
    
    service.getPlacePredictions(
      { 
        input: place,
        // sessionToken: SESSION_TOKEN
      }, 
      callback);
  };

  if(requireNewSession) {
    SESSION_TOKEN = new google.maps.places.AutocompleteSessionToken();
    getPredictions(SESSION_TOKEN);
    current_term = place;
    requireNewSession = false; //or on expires/error, get a new one
  } else {
    if(place !== current_term) {
      getPredictions(SESSION_TOKEN);
    }
    current_term = place;
  }
}

export const GooglePlaceDetails = (placeId, callback) => {
  
  var request = {
    placeId: placeId,
    // sessionToken: SESSION_TOKEN
  };

  var service = new google.maps.Geocoder();
      service.geocode(request, callback);  

  requireNewSession = true;
}