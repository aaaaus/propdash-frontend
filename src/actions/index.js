import ApiAdapter from '../apis/ApiAdapter';

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
