export class CadastroModel {

    nome = String;
    email  = String;
    senha = String;

    constructor(nome, email, senha){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
};