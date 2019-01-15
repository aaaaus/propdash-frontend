import { combineReducers } from 'redux';

import usersReducer from './usersReducer';

const initialState = {
  units: [],
  isLoaded: false,
  selectUnit: null
}

// const selectedUnitReducer = (state = initialState, action) => {
//   if (action.type === 'SELECTED_UNIT') {
//     return action.payload;
//   }
//
//   return state;
// }

// const unitsReducer = (units = [], action) => {
//   switch(action.type) {
//     case "UPDATE_UNITS":
//       // return { ...state, units: [...state.units, action.payload] };
//       return [...units, action.payload]
//     default:
//       return units;
//   }
// }

const unitsReducer = (state = initialState, action) => {
  switch(action.type) {
    case "UPDATE_UNITS":
      return { ...state, units: [...state.units, ...action.payload] };
    case "FETCHED_UNITS":
      return { ...state, isLoaded: true }
    case "SELECT_UNIT":
      return { ...state, selectUnit: action.payload}
    default:
      return state;
  }
}

export default combineReducers({
  unit: unitsReducer,
  users: usersReducer
  // selectedUnit: selectedUnitReducer
})
