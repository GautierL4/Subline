import { APIkeyGoogle } from './key.js';

const APIBaseURL = 'https://maps.googleapis.com/maps/api/';

class APIGoogle {
  constructor() {}

  async getAdressesFromLatitudeAndLongitude(latitude, longitude) {
    var request =
      APIBaseURL + 'geocode/json?address=' + latitude + ',' + longitude + '&key=' + APIkeyGoogle;
    console.log(request);
    try {
      let response = await fetch(request);
      responseJson = await response.json();
    } catch (e) {
      console.error(e);
    }
    return responseJson;
  }

  async getAddressFromLocation(latitude, longitude) {
    var address = this.extractFirstAddressFromResponse(
      await this.getAdressesFromLatitudeAndLongitude(latitude, longitude)
    );
    return address;
  }

  extractFirstAddressFromResponse(response) {
    return response.results[0];
  }
}

module.exports = APIGoogle;
