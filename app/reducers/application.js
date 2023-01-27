import * as actionTypes from '@actions/actionTypes';
const initialState = {
  theme: null,
  font: null,
  force_dark: null,
  language: null,
  config: 'xx',
  userSession: null,
  loginStatus: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case actionTypes.CHANGE_FONT:
      return {
        ...state,
        font: action.font,
      };
    case actionTypes.FORCE_APPEARANCE:
      return {
        ...state,
        force_dark: action.force_dark,
      };
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    case actionTypes.CHANGE_CONFIG:
      return {
        ...state,
        config: action.config,
      };
    case actionTypes.CHANGE_CONFIG_API:
      return {
        ...state,
        configApi: action.configApi,
      };

    case actionTypes.CHANGE_USERSESSION:
      return {
        ...state,
        userSession: action.userSession,
      };
    case actionTypes.CHANGE_LOGINSTATUS:
      return {
        ...state,
        loginStatus: action.loginStatus,
      };


    default:
      return state;
  }
};
