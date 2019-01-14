import ApiAdapter from '../apis/ApiAdapter';

// export const fetchUnits = () => {
//   return {
//     type: 'FETCH_UNITS'
//   }
// }

export const selectedUnit = (unit) => {
  return {
    type: 'SELECTED_UNIT',
    payload: unit
  }
};

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
