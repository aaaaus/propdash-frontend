import { combineReducers } from 'redux';

const selectedUnitReducer = (selectedUnit = null, action) => {
  if (action.type === 'SELECTED_UNIT') {
    return action.payload;
  }

  return selectedUnit;
}

export default combineReducers({
  selectedUnit: selectedUnitReducer
})
