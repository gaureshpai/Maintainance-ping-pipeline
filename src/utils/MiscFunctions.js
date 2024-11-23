import axios from "axios";

export const installPWA = () => {};

export const identifyLocation = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const response = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
    );
    const location = response.data.locality + "," + response.data.city;
    console.log(location);
    return {
      name: location,
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};