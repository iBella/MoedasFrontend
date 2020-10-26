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

  static cadastrar(cadastro) {
    return axios({
      method: 'post',
      url: `${MoedaService.baseUrlApi}/usuarios`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : cadastro
    });
  }

  static doar(transacao, token) {
    return axios({
      method: 'post',
      url: `${MoedaService.baseUrlApi}/transacoes`,
      headers: { 
        'Content-Type': 'application/json',
        'token': token 
      },
      data : transacao
    });
  }

  static usuarios(token) {
    return axios({
      method: 'get',
      url: `${MoedaService.baseUrlApi}/usuarios`,
      headers: { 
        'Content-Type': 'application/json',
        'token': token 
      }
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
