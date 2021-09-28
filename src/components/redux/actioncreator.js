import * as actions from "./actiontype";
import * as hosturl from "./hosturl";
import Axios from "axios";
import jwt_decode from "jwt-decode";

export const authloading = (load) => {
  return {
    type: actions.AUTHLOADING,
    payload: load,
  };
};

export const logout = () => {
  localStorage.removeItem("data");
  localStorage.removeItem("exp_time");
  localStorage.removeItem("authtoken");
  return {
    type: actions.LOGOUT,
  };
};

export const authcheck = () => (dispatch) => {
  let data = localStorage.getItem("data");
  let authtoken = localStorage.getItem("authtoken");
  data = JSON.parse(data);
  if (data) {
    const expiretime = JSON.parse(localStorage.getItem("exp_time"));
    if (expiretime <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authloadingsuccess(authtoken, data));
    }
  } else {
    dispatch(logout());
  }
};
export const authdatastore = (token) => (dispatch) => {
  const tok = token;
  const decoded_token = jwt_decode(token);
  const data = {
    email: decoded_token.email,
    id: decoded_token.user_id,
    username: decoded_token.username,
    token_jti: decoded_token.jti,
    role: decoded_token.role,
    isAdmin: decoded_token.isAdmin,
  };
  const exptime = new Date(decoded_token.exp * 1000);
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("authtoken", JSON.stringify(tok));
  localStorage.setItem("exp_time", JSON.stringify(exptime));
  dispatch(authloadingsuccess(tok, data));
};

export const authloadingsuccess = (token, data) => {
  return {
    type: actions.AUTHSUCCESS,
    payload: {
      authtoken: token,
      authdata: data,
    },
  };
};

export const authmessage = (msg) => {
  return {
    type: actions.AUTHMESSAGE,
    payload: msg,
  };
};

export const authload = (val) => (dispatch) => {
  dispatch(authloading(true));
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  Axios.post(`${hosturl.HOSTURL}api/login/token/`, val, header)
    .then((response) => {
      if (response.data) {
        dispatch(authdatastore(response.data.access));
      }
    })
    .catch((error) => {
      // dispatch(authmessage(error.response.data.detail));
      dispatch(authloading(false));
    });
};

export const rolebasedprofile = (role, id) => (dispatch) => {

  let url = null;
  switch (role) {
    case "Customer":
      url = `${hosturl.HOSTURL}api/login/customerupdate/${id}/`;
      break;
    case "Admin":
      url = `${hosturl.HOSTURL}api/login/adminuserupdate/${id}/`;
      break;
    case "Employee":
      url = `${hosturl.HOSTURL}api/login/staffupdate/${id}/`;
      break;

    default:
      break;
  }
  if(url!==null){
    Axios.get(url)
    .then((response) => {
      if(response.data){
        dispatch(profileloadingsuccess(response.data));
      }
    })
    .catch((error) => {
      console.log(error)
    });

  }
};

export const setMode = (mode) => {
  return {
    type: actions.SET_MODE,
    payload: mode,
  };
};

export const setColor = (color) => {
  return {
    type: actions.SET_COLOR,
    payload: color,
  };
};

export const getTheme = () => {
  return {
    type: actions.GET_THEME,
  };
};

// export const authaction = (val, mode) => (dispatch) => {
//   dispatch(authloading(true));
//   const header = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   let url = null;
//   if (mode === "Customer") {
//     url = `${hosturl.HOSTURL}authenticate/newcustomer/`;
//     val = {
//       ...val,
//       user: {
//         ...val.user,
//         is_customer: true,
//       },
//     };
//     console.log(val);
//   } else {
//     url = `${hosturl.HOSTURL}authenticate/newseller/`;
//     val = {
//       ...val,
//       is_seller: true,
//     };
//   }

//   Axios.post(url, val, header)
//     .then((response) => {
//       dispatch(authmessage(`ACCOUNT CREATION SUCCESFULL FOR ${mode}`));
//       dispatch(authloading(false));
//     })
//     .catch((error) => {
//       const dataerror = error.response.data;
//       if (dataerror.user.username === undefined) {
//         dispatch(authmessage(dataerror.user.email));
//       } else {
//         dispatch(authmessage(dataerror.user.username));
//       }
//       dispatch(authloading(false));
//     });
// };

export const profileloadingsuccess = (data) => {
  return {
    type: actions.PROFILELOADINGSUCCESS,
    payload: data,
  };
};

export const setsidebar = (data) => {
  return {
    type: actions.set,
    payload: data,
  };
};

export const profileloading = (id) => (dispatch) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = `${hosturl.HOSTURL}api/login/userupdate/${id}/`;
  Axios.get(url, header)
    .then((response) => {
      dispatch(profileloadingsuccess(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const profilevisit = (mode, values) => (dispatch) => {
//   let url = null;
//   if (mode === "Seller") {
//     url = `${hosturl.HOSTURL}authenticate/updateseller/${values}`;
//   } else {
//     url = `${hosturl.HOSTURL}authenticate/updatecustomer/${values}`;
//   }

//   const header = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   dispatch(profileloading(true));

//   Axios.get(url, header)
//     .then((response) => {
//       dispatch(profileloadingsuccess(response.data));
//       dispatch(profileloading(false));
//     })
//     .catch((error) => {
//       dispatch(profileloading(false));
//     });
// };

// export const profileupdate = (mode, value, username) => (dispatch) => {
//   console.log(mode, value);
//   let url = null;
//   if (mode === "Seller") {
//     url = `${hosturl.HOSTURL}authenticate/updateseller/${username}/`;
//   } else {
//     url = `${hosturl.HOSTURL}authenticate/updatecustomer/${username}/`;
//   }
//   Axios.put(url, value)
//     .then((response) => {})
//     .catch((error) => {});
// };

// export const productsloading = (load) => {
//   return {
//     type: actions.PRODUCTLOADING,
//     payload: load,
//   };
// };

// export const productsloaded = (products) => {
//   return {
//     type: actions.PRODUCTLOADINGSUCCESS,
//     payload: products,
//   };
// };

// export const productloaded = () => (dispatch) => {
//   dispatch(productsloading(true));

//   Axios.get(`${hosturl.HOSTURL}shop/productview/`)
//     .then((response) => {
//       dispatch(productsloaded(response.data));
//       dispatch(productsloading(false));

//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// export const userproducts = (user) => (dispatch) => {
//   Axios.get(`${hosturl.HOSTURL}shop/productupload/${user}/`)
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
