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

// export const selectProperty = (property) => {
//   return {
//     type: 'SELECT_PROPERTY',
//     payload: property
//   }
// }

export function selectProperty(property) {
  return (dispatch) => {
    dispatch({ type: "SELECT_PROPERTY", payload: property })
    dispatch({ type: "SELECT_UNIT", payload: null })
  }
}

//UNITS

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

export function updateUnit(id, status) {
  return (dispatch) => {
    ApiAdapter.updateUnitStatus(id, status)
    .then(unit => {
      dispatch(replaceUnit(unit))
      dispatch(selectUnit(unit))
    })
  }
}

export const selectUnit = (unit) => {
  return {
    type: 'SELECT_UNIT',
    payload: unit
  }
};

//LEASES

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

export function moveInOut(unitId, unitStatus, leaseId, leaseStatus) {
  return (dispatch) => {
    ApiAdapter.updateUnitStatus(unitId, unitStatus)
    .then(unit => {
      dispatch(replaceUnit(unit))
    })
    ApiAdapter.updateLeaseStatus(leaseId, leaseStatus)
    .then(lease => {
      dispatch(replaceLease(lease))
    })
  }
}

//RESIDENTS

export function fetchResidents() {
  return (dispatch) => {
    dispatch({ type: "FETCHING_RESIDENTS" })
    ApiAdapter.getResident()
    .then(residentData => {
      // console.log(propertyData); //confirm data is being received
      dispatch({ type: "UPDATE_RESIDENTS", payload: residentData })
      dispatch({ type: "FETCHED_RESIDENTS" })
    })
  }
}

export const selectResident = (resident) => {
  return {
    type: 'SELECT_RESIDENT',
    payload: resident
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

//SEARCH FILTER

export const handleInput = (event) => {
  return {
    type: 'INPUT_CHANGE',
    payload: event.target.value
  }
}

//CREATE LEASE

export const createLease = (resp) => { //turn this into function, pass resident_id argument, dispatch also to resident reducer to hit custom route for reslease generation
  return {
    type: 'CREATE_LEASE',
    payload: resp
  }
}

//REPLACE (payload object to replace in local array)

export const replaceUnit = (resp) => {
  return {
    type: 'REPLACE_UNIT',
    payload: resp
  }
}

export const replaceLease = (resp) => {
  return {
    type: 'REPLACE_LEASE',
    payload: resp
  }
}
