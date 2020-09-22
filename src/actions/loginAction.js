export const SET_TOKEN = "SET_TOKEN";
export const SET_USUARIO = "SET_USUARIO";

export const setToken = token => ({
  type: SET_TOKEN,
  token: token
});

export const setUsuario = usuario => ({
  type: SET_USUARIO,
  usuario: usuario
});