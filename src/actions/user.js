export const loginUser = (username, password) => {
  return dispatch => {
    dispatch({ type: "AUTHENTICATING_USER" });

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      /* { user:
        { username: '', bio: '', avatar: ''},
        jwt: 'aaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccc'
      } */
      .then(JSONResponse => {
        // console.log("%c INSIDE JWT PROMISE", "color: navy");
        localStorage.setItem("jwt", JSONResponse.jwt); //stored on a user's disk
        dispatch({ type: "SET_CURRENT_USER", payload: JSONResponse.user });
      })
      .catch(r =>
        r
          .json()
          .then(e => dispatch({ type: "FAILED_LOGIN", payload: e.message }))
      );
  };
};

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return dispatch => {
    dispatch(authenticatingUser); //tells the app we are fetching
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(response => response.json())
      .then(JSONResponse => {
        dispatch(setCurrentUser(JSONResponse.user));
      });
  };
};

export const setCurrentUser = userData => ({
  type: "SET_CURRENT_USER",
  payload: userData
});

export const failedLogin = errorMsg => ({
  type: "FAILED_LOGIN",
  payload: errorMsg
});

export const logoutUser = () => {
  localStorage.clear();
  return {
    type: "LOGOUT_USER"
  };
};

// tell our app we're currently fetching
export const authenticatingUser = { type: "AUTHENTICATING_USER" };
// export const authenticatingUser = () => {
//   return { type: 'AUTHENTICATING_USER' }
// }
