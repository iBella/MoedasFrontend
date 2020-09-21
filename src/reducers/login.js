import {
    SET_TOKEN
    } from "../actions/loginAction";

    const initialState = {
        token: ''
    };

    export const login = (state = initialState, action) => {

    switch (action.type) {
        case SET_TOKEN:
        return {
            ...state,
            token: action.token
        };
        default:
        return state;
    }
};
