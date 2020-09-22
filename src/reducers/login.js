import { SET_TOKEN, SET_USUARIO } from "../actions/loginAction";
import { Usuario } from "../models/UsuarioModel";

const initialState = {
    token: '',
    usuario: Usuario
};

export const login = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_TOKEN:
        return {
            ...state,
            token: action.token
        };
        case SET_USUARIO:
        return {
            ...state,
            usuario: action.usuario
        };
        default:
        return state;
    }
};
