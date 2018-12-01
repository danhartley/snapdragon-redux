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

async function getMapBoxPlace(long, lat, lang) {
  const token = 'pk.eyJ1IjoiZGFuaGFydGxleSIsImEiOiJjam84Zjd3aGowMDdoM2ttaDAzeDk4bHJ6In0.oEcO6w3DhHUv_mXrFW1clg';  
  const longitude = long || '-9.163009899999999';
  const latitude = lat || '38.7155762';  
  const language = lang || 'en';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?language=${language}&access_token=${token}`;
  const response = await fetch(url);
  const json = await response.json();
  listeners.forEach(listener => listener(json));
  return await json;
}

export async function getPlace(long, lat, config) {
  if(!!config.place) {
    const response = new Promise(resolve => {
      resolve(config.place);
    });
    const json = await response;
    return await json;
  } else {
    return getMapBoxPlace(long, lat, config.language);
  }
};

export const listenToPlaceChange = listener => { 
  listeners.push(listener);
};