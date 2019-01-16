import ApiAdapter from '../apis/ApiAdapter';

export function fetchProperties() {
  return (dispatch) => {
    dispatch({ type: "FETCHING_PROPERTIES" })
    ApiAdapter.getProperty()
    .then(propertyData => {
      // console.log(propertyData); //confirm data is being received
      dispatch({ type: "UPDATE_PROPERTIES", payload: propertyData })
      dispatch({ type: "FETCHED_PROPERTIES" })
    })
  }
}

export const selectProperty = (property) => {
  return {
    type: 'SELECT_PROPERTY',
    payload: property
  }
}

export function fetchUnits() {
  return (dispatch) => {
    dispatch({ type: "FETCHING_UNITS" })
    ApiAdapter.getUnit()
    .then(unitData => {
      // console.log(unitData); //confirm units are being received
      dispatch({ type: "UPDATE_UNITS", payload: unitData })
      dispatch({ type: "FETCHED_UNITS" })
    })
  }
}

export const selectUnit = (unit) => {
  return {
    type: 'SELECT_UNIT',
    payload: unit
  }
};

export function fetchLeases() {
  return (dispatch) => {
    dispatch({ type: "FETCHING_LEASES" })
    ApiAdapter.getLease()
    .then(leaseData => {
      // console.log(propertyData); //confirm data is being received
      dispatch({ type: "UPDATE_LEASES", payload: leaseData })
      dispatch({ type: "FETCHED_LEASES" })
    })
  }
}

export const selectLease = (lease) => {
  return {
    type: 'SELECT_LEASE',
    payload: lease
  }
};

//DATA BUTTONS

export const dataSelect = (event) => {
  return {
    type: 'DATA_SELECT',
    payload: event.target.id
  }
}

//FILTER BUTTONS

export const filterOccupied = () => {
  return {
    type: 'FILTER_OCCUPIED'
  }
}

export const filterNotice = () => {
  return {
    type: 'FILTER_NOTICE'
  }
}

export const filterVacant = () => {
  return {
    type: 'FILTER_VACANT'
  }
}
