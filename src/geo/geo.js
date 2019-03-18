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
  place.area = place.region || place.country; // probably not wanted…
  
  place.shortLocation = `${place.region}, ${place.country}`;
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
  const longitude = long || '-9.163009899999999';
  const latitude = lat || '38.7155762';  
  const language = config.lang || 'en';
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

async function IPLookup() {
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

export async function getIPLocation(config, force = false) {
     if(!!config.ipLocation && !force) {
      const response = new Promise(resolve => {
        resolve(config.ipLocation);
      });
      const json = await response;    
      return await json;
     } else {
      return IPLookup();
     }
};