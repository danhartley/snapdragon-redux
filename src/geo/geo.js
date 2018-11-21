export const getLocation = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
  });
}

export async function getPlace(long, lat, language ) {
  const token = 'pk.eyJ1IjoiZGFuaGFydGxleSIsImEiOiJjam84Zjd3aGowMDdoM2ttaDAzeDk4bHJ6In0.oEcO6w3DhHUv_mXrFW1clg';  
  const longitude = long || '-9.163009899999999';
  const latitude = lat || '38.7155762';  
  const lang = language || 'en';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?language=${lang}&access_token=${token}`;
  const response = await fetch(url);
  const json = await response.json();
  return await json;
};