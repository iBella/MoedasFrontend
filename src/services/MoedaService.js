import axios from "axios";

export class MoedaService {

  static baseUrlApi = "https://moedas-api.herokuapp.com";

  static login(login) {
    return axios({
      method: 'post',
      url: `${MoedaService.baseUrlApi}/login`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : login
    });
  }

  static trasacoesEmitidas(email, token) {
    return axios({
      method: 'get',
      url: `${MoedaService.baseUrlApi}/transacoes/emitidas/${email}`,
      headers: { 
        'Content-Type': 'application/json',
        'token': token 
      }
    });
  }

  static trasacoesRecebidas(email, token) {
    return axios({
      method: 'get',
      url: `${MoedaService.baseUrlApi}/transacoes/recebidas/${email}`,
      headers: { 
        'Content-Type': 'application/json',
        'token': token 
      }
    });
  }
}
