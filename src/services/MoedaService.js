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
}
