import * as actionTypes from "./actionTypes";

const onLogin = login => {
    return {
        type: actionTypes.LOGIN,
        login
    };
};

// const setUserSession = userSession => {
//     return {
//         type: actionTypes.CHANGE_USERSESSION,
//         userSession
//     }
// }

// const setLoginStatus = loginStatus => {
//     return {
//         type: actionTypes.CHANGE_LOGINSTATUS,
//         loginStatus
//     }
// }

export const authentication = (login, callback) => dispatch => {
    //call api and dispatch action case
    setTimeout(() => {
        // let data = {
        //     success: login
        // };
        dispatch(onLogin(login));
        if (typeof callback === "function") {
            callback(login);
        }
    }, 50);
};


// export const onChangeUserSession = userSession => dispatch => {
//     dispatch(setUserSession(userSession));
// };


// export const onChangeUserSession = (userSession, callback) => dispatch => {
//     //call api and dispatch action case
//     setTimeout(() => {
//         dispatch(setUserSession(userSession));
//         if (typeof callback === "function") {
//             callback(userSession);
//         }
//     }, 50);
// };

// export const onChangeLoginStatus = (loginStatus, callback) => dispatch => {
//     //call api and dispatch action case
//     setTimeout(() => {
//         dispatch(setLoginStatus(loginStatus));
//         if (typeof callback === "function") {
//             callback(loginStatus);
//         }
//     }, 50);
// };