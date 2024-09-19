import {
  APP_SET_HEIGHT_TABBAR,
  APP_HIDE_TABBAR,
  CHECK_STATUS,
  SAVE_LIST_ITEM,
  SAVE_LIST_MY_COURSE,
  SAVE_PROFILE_USER,
  SAVE_SOURCE_LIST,
  APP_SAVE_LANGUAGE,
} from '../actions/types';
const init = {
  listmycourse: [],
  listItem: [],
  tabBarVisible: true,
  checkStatus: '',
  heightTabbar: 0,
  profileUser: {},
  isChanged: false,
  sourseList: [],
  language: 'vi',
};

export default (state = init, {type, payload}) => {
  switch (type) {
    case SAVE_SOURCE_LIST:
      return {
        ...state,
        sourseList: payload,
      };
    case APP_SAVE_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    case SAVE_PROFILE_USER:
      return {
        ...state,
        profileUser: payload.data.data,
      };
    case APP_HIDE_TABBAR:
      return {
        ...state,
        tabBarVisible: payload,
      };

    case CHECK_STATUS:
      return {
        ...state,
        checkStatus: payload.checkStatus,
      };
    case APP_SET_HEIGHT_TABBAR:
      return {
        ...state,
        heightTabbar: payload,
      };
    case SAVE_LIST_ITEM: {
      if (payload.page > 1) {
        return {
          ...state,
          listItem: [...state.listItem, ...payload.data],
        };
      }
      if (payload.page === 1) {
        return {
          ...state,
          listItem: payload.data,
        };
      }
      return {
        ...state,
        listItem: payload.data,
      };
    }
    case SAVE_LIST_MY_COURSE: {
      if (payload.page > 1) {
        return {
          ...state,
          listmycourse: [...state.listmycourse, ...payload.data],
        };
      }
      if (payload.page === 1) {
        return {
          ...state,
          listmycourse: payload.data,
        };
      }
      return {
        ...state,
        listmycourse: payload.data,
      };
    }
    default:
      return state;
  }
};
