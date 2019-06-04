const initialState = {
  residents: [],
  isLoaded: false,
  selectResident: null
};

const residentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_RESIDENTS":
      return { ...state, residents: [...state.residents, ...action.payload] };
    case "FETCHED_RESIDENTS":
      return { ...state, isLoaded: true };
    case "SELECT_RESIDENT":
      return { ...state, selectResident: action.payload };
    case "LOGOUT_USER":
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default residentReducer;
