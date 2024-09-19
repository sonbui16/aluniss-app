import {API, token, API_HUECHIAKI} from './common';

export default {
  login: (params = {}) =>
    API.post('id/login', params, {headers: {Authorization: token}}),
  login1: (params = {}) => API.post('auth/login-site', params),

  loginV2: (params = {}) =>
    API_HUECHIAKI.post('auth/login-site', params, {
      headers: {
        'Accept-Language': 'vi',
        'Content-Type': 'application/json',
      },
    }),

  loginFacebook: (params = {}) => API.post(`facebooklogin`, params),

  register: (params = {}) =>
    API_HUECHIAKI.post(`auth/register`, params, {
      headers: {Authorization: token},
    }),

  infoSites: (id , token ) =>
    API_HUECHIAKI.get(
      `sites/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),

  changePass: (params = {}) =>
    API_HUECHIAKI.post(`auth/forgot-password`, params, {
      headers: {Authorization: token},
    }),

  profileUser: (params = {}) => API.post(`profileuser`, params),
};
