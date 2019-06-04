const initialState = {
  leases: [],
  isLoaded: false,
  selectLease: null
};

const leaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_LEASES":
      return { ...state, leases: [...state.leases, ...action.payload] };
    case "FETCHED_LEASES":
      return { ...state, isLoaded: true };
    case "SELECT_LEASE":
      return { ...state, selectLease: action.payload };
    case "CREATE_LEASE":
      return { ...state, leases: [...state.leases, action.payload] };
    case "REPLACE_LEASE":
      const id = action.payload.id;
      const new_leases = state.leases.filter(lease => lease.id !== id);

      return { ...state, leases: [...new_leases, action.payload] };
    case "LOGOUT_USER":
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default leaseReducer;
