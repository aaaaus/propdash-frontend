const PROPERTY_URL = "http://localhost:4000/api/v1/properties/";
const UNIT_URL = "http://localhost:4000/api/v1/units/";
const LEASE_URL = "http://localhost:4000/api/v1/leases/";
const RESIDENT_URL = "http://localhost:4000/api/v1/residents/";

export default class ApiAdapter {
  static getProperty() {
    return fetch(`${PROPERTY_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(res => res.json());
  }

  static getUnit() {
    return fetch(`${UNIT_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(res => res.json());
  }

  static getLease() {
    return fetch(`${LEASE_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(res => res.json());
  }

  static getResident() {
    return fetch(`${RESIDENT_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(res => res.json());
  }

  //creates

  static postLease(object) {
    return fetch(`${LEASE_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(object)
    }).then(resp => resp.json());
  }

  //create resLease association

  static postResLease(object) {
    return fetch(`${RESIDENT_URL}`, {
      //UPDATE URL//////////////////////
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(object)
    }).then(resp => resp.json());
  }

  static updateUnitStatus(unitId, status) {
    return fetch(`${UNIT_URL}${unitId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: status })
    }).then(resp => resp.json());
  }

  static updateLeaseStatus(leaseId, status) {
    return fetch(`${LEASE_URL}${leaseId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: status })
    }).then(resp => resp.json());
  }
}
