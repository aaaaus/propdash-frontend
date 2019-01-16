const PROPERTY_URL = "http://localhost:4000/api/v1/properties/";
const UNIT_URL = "http://localhost:4000/api/v1/units/";
const LEASE_URL = "http://localhost:4000/api/v1/leases/";
// const RESIDENT_URL = "http://localhost:4000/api/v1/residents/"

export default class ApiAdapter {

  static getProperty() {

    return fetch(`${PROPERTY_URL}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
  }

  static getUnit() {

    return fetch(`${UNIT_URL}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
  }

  static getLease() {

    return fetch(`${LEASE_URL}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
  }

}
