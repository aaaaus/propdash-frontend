const initialState = {
  properties: [],
  isLoaded: false,
  selectProperty: null
}

const propertyReducer = (state = initialState, action) => {
  switch(action.type) {
    case "UPDATE_PROPERTIES":
      return { ...state, properties: [...state.properties, ...action.payload] };
    case "FETCHED_PROPERTIES":
      return { ...state, isLoaded: true }
    case "SELECT_PROPERTY":
      return { ...state, selectProperty: action.payload}
    default:
      return state;
  }
}

export default propertyReducer;
