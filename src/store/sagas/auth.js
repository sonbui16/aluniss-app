import {takeLatest, all, put, take} from 'redux-saga/effects';
import {
  APP_LOGIN,
  APP_LOGIN1,
  APP_LOGIN_FACEBOOK,
  APP_RIGISTER,
  APP_CHANGE_PASS,
  APP_PROFILE_USER,
  APP_LOGIN_V2,
  APP_INFO_SITES,
  APP_SAVE_INFO_SITE
} from 'actions/types';
import auth from '../api/auth';
import {saveProfileUser , inforUser } from '../actions/app';
import {
  setAuthState,
  saveLoggedUser,
  removeLoggedUser,
  infoSites,
  saveInfoSite
} from 'actions/auth';
import {createRequestSaga} from './common';
import {site_id} from 'store/api/common';

const requestLogin = createRequestSaga({
  request: auth.login,
  key: 'login',
  success: [],
  failure: [],
  //  Request thành công or lỗi, 2 funtion nay chỉ có thể thực thiện function không dispath đc action
  functionSuccess: [
    // () => todoSomething(err)
  ],
  functionFailure: [],
});
const requestLogin1 = createRequestSaga({
  request: auth.login1,
  key: 'login1',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestRegister = createRequestSaga({
  request: auth.register,
  key: 'register',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestChangePass = createRequestSaga({
  request: auth.changePass,
  key: 'changePass',
  success: [],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestProfileUser = createRequestSaga({
  request: auth.profileUser,
  key: 'profileUser',
  success: [res => saveProfileUser(res)],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});
const requestLoginFacebook = createRequestSaga({
  request: auth.loginFacebook,
  key: 'loginFacebook',
  success: [res => saveLoggedUser(res), () => setAuthState(true)],
  failure: [],
  functionSuccess: [],
  functionFailure: [],
});

const requestLoginV2 = createRequestSaga({
  request: auth.loginV2,
  key: 'loginV2',
  functionSuccess: [],
  success: [
    res => infoSites(site_id, res?.access_token),
    res => inforUser (res?.access_token)
  ],
  failure: [],
  // functionSuccess: [],
  functionFailure: [],
});
const requestInfoSite = createRequestSaga({
  request: auth.infoSites,
  key: 'infoSites',
  success: [res => saveInfoSite(res)],
  functionSuccess: [ ],
  failure: [],
  // functionSuccess: [],
  functionFailure: [],
});

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest(APP_LOGIN, requestLogin),
      takeLatest(APP_LOGIN1, requestLogin1),
      takeLatest(APP_LOGIN_FACEBOOK, requestLoginFacebook),
      takeLatest(APP_RIGISTER, requestRegister),
      takeLatest(APP_CHANGE_PASS, requestChangePass),
      takeLatest(APP_PROFILE_USER, requestProfileUser),
      takeLatest(APP_LOGIN_V2, requestLoginV2),
      takeLatest(APP_INFO_SITES, requestInfoSite),
    ]);
  },
];
