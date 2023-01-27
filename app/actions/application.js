import * as actionTypes from './actionTypes';

const changeTheme = theme => {
  return {
    type: actionTypes.CHANGE_THEME,
    theme,
  };
};

const changeFont = font => {
  return {
    type: actionTypes.CHANGE_FONT,
    font,
  };
};

const forceTheme = force_dark => {
  return {
    type: actionTypes.FORCE_APPEARANCE,
    force_dark,
  };
};

const changeLanguge = language => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language,
  };
};

const changeConfig = config => {
  return {
    type: actionTypes.CHANGE_CONFIG,
    config,
  };
};

const changeConfigApi = configApi => {
  return {
    type: actionTypes.CHANGE_CONFIG_API,
    configApi
  }
}

const changeUserSession = userSession => {
  return {
    type: actionTypes.CHANGE_USERSESSION,
    userSession
  }
}

const setLoginStatus = loginStatus => {
  return {
    type: actionTypes.CHANGE_LOGINSTATUS,
    loginStatus
  }
}

export const onChangeTheme = theme => dispatch => {
  dispatch(changeTheme(theme));
};

export const onForceTheme = mode => dispatch => {
  dispatch(forceTheme(mode));
};

export const onChangeFont = font => dispatch => {
  dispatch(changeFont(font));
};

export const onChangeLanguage = language => dispatch => {
  dispatch(changeLanguge(language));
};

export const onChangeConfig = config => dispatch => {
  dispatch(changeConfig(config));
};

export const onChangeConfigApi = configApi => dispatch => {
  dispatch(changeConfigApi(configApi));
};


// export const onChangeUserSession = userSession => dispatch => {
//   dispatch(changeUserSession(userSession));
// };
export const onChangeUserSession = (userSession, callback) => dispatch => {
  //call api and dispatch action case
  setTimeout(() => {
    dispatch(changeUserSession(userSession));
    if (typeof callback === "function") {
      callback(userSession);
    }
  }, 50);
};


export const onChangeLoginStatus = (loginStatus, callback) => dispatch => {
  //call api and dispatch action case
  setTimeout(() => {
    dispatch(setLoginStatus(loginStatus));
    if (typeof callback === "function") {
      callback(loginStatus);
    }
  }, 50);
};

// export const onChangeConfigApi = (configApi, callback) => dispatch => {
//   //call api and dispatch action case
//   setTimeout(() => {
//     dispatch(changeConfigApi(configApi));
//     if (typeof callback === "function") {
//       callback(configApi);
//     }
//   }, 50);
// };