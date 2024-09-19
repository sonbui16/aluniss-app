import {
  APP_LOGIN,
  APP_LOGIN_FACEBOOK,
  APP_RIGISTER,
  APP_LOGOUT,
  APP_CHANGE_PASS,
  APP_SET_AUTH_STATE,
  APP_SAVE_LOGGED_USER,
  APP_REMOVE_LOGGED_USER,
  APP_PROFILE_USER,
  APP_SAVE_MEM_SITE,
  APP_SAVE_LIST_SITE,
  APP_LOGIN1,
  APP_LOGIN_V2,
  APP_INFO_SITES,
  APP_SAVE_INFO_SITE,
  APP_SAVE_INFO_USER,
  APP_SAVE_SOCKET
} from "./types";

/**
 * Action call API
 * @param  {object} args 
 */
export const login = (...args) => ({ type: APP_LOGIN, args });
export const login1 = (...args) => ({ type: APP_LOGIN1, args });
export const loginV2 = (...args) => ({ type: APP_LOGIN_V2, args });
export const infoSites = (...args) => ({ type: APP_INFO_SITES, args });


export const loginFacebook = (...args) => ({ type: APP_LOGIN_FACEBOOK, args });
export const register = (...args) => ({ type: APP_RIGISTER, args });
export const logout = (...args) => ({ type: APP_LOGOUT, args });
export const changePass = (...args) => ({ type: APP_CHANGE_PASS, args });
export const profileUser = (...args) => ({ type: APP_PROFILE_USER, args });

/**
 * Sets the authentication state of the application -- Save DATA to reducer
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export const setAuthState = (loggedIn, guided) => ({
  type: APP_SET_AUTH_STATE,
  payload: { loggedIn, guided }
});
export const saveLoggedUser = data => ({
  type: APP_SAVE_LOGGED_USER,
  payload: data
});
export const saveInfoSite = data => ({
  type: APP_SAVE_INFO_SITE,
  payload: data
});
export const saveSocket = data => ({
  type: APP_SAVE_SOCKET,
  payload: data
});
export const saveInfoUser = data => ({
  type: APP_SAVE_INFO_USER,
  payload: data
});
export const saveMemSite = data => ({
  type: APP_SAVE_MEM_SITE,
  payload: data
});
export const saveListSite = data => ({
  type: APP_SAVE_LIST_SITE,
  payload: data
});

/**
 * Tells the app we want to log out a user
 */
export const removeLoggedUser = () => ({ type: APP_REMOVE_LOGGED_USER });
