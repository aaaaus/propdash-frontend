const initialState = {
  units: [],
  isLoaded: false,
  selectUnit: null
};

const unitReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_UNITS":
      return { ...state, units: [...state.units, ...action.payload] };
    case "FETCHED_UNITS":
      return { ...state, isLoaded: true };
    case "SELECT_UNIT":
      return { ...state, selectUnit: action.payload };
    case "REPLACE_UNIT":
      const id = action.payload.id;
      const new_units = state.units.filter(unit => unit.id !== id);

      return { ...state, units: [...new_units, action.payload] };
    case "LOGOUT_USER":
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default unitReducer;
