const getHTML5Location = () => {
  return new Promise(function (resolve, reject) {

    function success(position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      resolve({
        '0': 0,
        '1': 0,
      });
    }

    navigator.geolocation.getCurrentPosition(success, error);
  });
};

export const getLocation = (config) => {
  if(!!config.coordinates) {
    return new Promise(resolve => {
        resolve(config.coordinates);
    });
  } else {
    return getHTML5Location();
  }  
};

const listeners = [];

async function parseMapBoxPlace(json, config) {
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

async function getMapBoxPlace(long, lat, config) {
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

export async function getPlace(config, force = false) {
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

async function IPCountryLookup() {
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

async function LocationLookup(ip) {
  const ACCESS_KEY = 'a8563e7b75654ae8b016dc52719dee3b';
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${ACCESS_KEY}&ip=${ip}&fields=city,state_prov,country_name&output=json`;
  const response = await fetch(url);
  const json = await response.json();
  const { city, state_prov, country_name } = await json; 
  return { city, state_prov, country_name };
}

async function IPLookup() {  
  const url = 'https://api.ipgeolocation.io/getip';
  const response = await fetch(url);
  const json = await response.json();
  const { ip } = await json; 
  return ip;
}

export async function getIPLocation(config, force = false) {
     if(!!config.ipLocation && !force) {
      const response = new Promise(resolve => {
        resolve(config.ipLocation);
      });
      const json = await response;    
      return await json;
     } else {
      const ip = await IPLookup();
      const { city, state_prov, country_name } = await LocationLookup(ip);
      return { city, state_prov, country_name };
     }
};

export async function GoogleFindPlace(place) {

  // https://developers.google.com/places/web-service/search

  const ACCESS_KEY = 'AIzaSyD1osYKD1sRb5Bzqq-OzJ6PgXqLtDt9YvU';

  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&key=${ACCESS_KEY}&fields=name`;

  const response = await fetch(url);
  const json = await response.json();
  const { candidates } = await json; 
  return candidates;
}

export async function GoogleAutocompleteServerSide(place) {

  // https://developers.google.com/places/web-service/search

  const ACCESS_KEY = 'AIzaSyD1osYKD1sRb5Bzqq-OzJ6PgXqLtDt9YvU';

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}&inputtype=textquery&key=${ACCESS_KEY}&fields=name`;

  const response = await fetch(url);
  const json = await response.json();
  const { predictions } = await json; 
  return predictions;
}

export function GoogleAutocomplete(place, callback) {

  // https://developers.google.com/maps/documentation/javascript/examples/places-queryprediction

  const displaySuggestions = function(predictions, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }

    callback(predictions);
  };
  
  var service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: place }, displaySuggestions);
}

export function GooglePlaceDetails(placeId, callback) {
  
  // https://developers.google.com/maps/documentation/javascript/reference/geocoder

  var request = {
    placeId: placeId
  };

  var service = new google.maps.Geocoder();
      service.geocode(request, callback);  
}