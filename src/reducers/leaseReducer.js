const initialState = {
  leases: [],
  isLoaded: false,
  selectLease: null
}

const leaseReducer = (state = initialState, action) => {
  switch(action.type) {
    case "UPDATE_LEASES":
      return { ...state, leases: [...state.leases, ...action.payload] };
    case "FETCHED_LEASES":
      return { ...state, isLoaded: true }
    case "SELECT_LEASE":
      return { ...state, selectLease: action.payload}
    default:
      return state;
  }
}

export default leaseReducer;
