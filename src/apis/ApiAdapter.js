const UNIT_URL = "http://localhost:4000/api/v1/units/";
// const CAT_URL = "http://localhost:4000/cat";

export default class ApiAdapter {
  static getUnit() {
    return fetch(`${UNIT_URL}`)
      .then(res => res.json())
  }

//   static getCat() {
//     return fetch(`${CAT_URL}`)
//       .then(res => res.json())
//       .then(json => json.url)
//   }

}
