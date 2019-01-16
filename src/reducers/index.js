import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import propertyReducer from './propertyReducer';
import leaseReducer from './leaseReducer';
import residentReducer from './residentReducer'

const initialState = {
  units: [],
  isLoaded: false,
  selectUnit: null
}

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

const initialFilterState = {
  filterOccupied: false,
  filterNotice: false,
  filterVacant: false,
  filterText: ''
}

const filterReducer = (state = initialFilterState, action) => {
  switch(action.type) {
    case "FILTER_OCCUPIED":
      return { ...state, filterOccupied: !state.filterOccupied }
    case "FILTER_NOTICE":
      return { ...state, filterNotice: !state.filterNotice }
    case "FILTER_VACANT":
      return { ...state, filterVacant: !state.filterVacant }
    case "INPUT_CHANGE":
      return { ...state, filterText: action.payload }
    default:
      return state;
  }
}

const dataReducer = (dataSelection = null, action) => {
  switch(action.type) {
    case "DATA_SELECT":
    return action.payload
    default:
    return dataSelection;
  }
}

export default combineReducers({
  filter: filterReducer,
  data: dataReducer,

  property: propertyReducer,
  unit: unitsReducer,
  lease: leaseReducer,
  resident: residentReducer,
  users: usersReducer
  // selectedUnit: selectedUnitReducer
})
