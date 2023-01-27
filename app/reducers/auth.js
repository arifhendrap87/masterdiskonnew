import * as actionTypes from "@actions/actionTypes";
const initialState = {
    login: false,
    user: {
        lang: "en"
    },
    // userSession: null,
    // loginStatus: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {
                login: action.login
            };
        // case actionTypes.CHANGE_LOGINSTATUS:
        //     return {
        //         loginStatus: action.loginStatus
        //     };
        // case actionTypes.CHANGE_USERSESSION:
        //     return {
        //         userSession: action.userSession,
        //     };
        default:
            return state;
    }
};
