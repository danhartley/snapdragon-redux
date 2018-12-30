const getHTML5Location = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
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
  place.region = place.features.find(f => f.place_type[0] === 'place');
  place.country = place.features.find(f => f.place_type[0] === 'country');
  place.area = place.region || place.country;
  place.summary = config.isLandscapeMode ? `Species from ${place.area.text}, ${place.country.text}` : `Species from ${place.area.text}`;
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

export async function getPlace(config) {
  if(!!config.place) {
    const response = new Promise(resolve => {
      resolve(config.place);
    });
    const json = await response;
    listeners.forEach(listener => listener(json));
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