export class Usuario {

    nome = String;
    email  = String;
    moedaTotal = Number;
    moedaTotalMes = Number;
    dataCriacao = Date;

    constructor(nome, email, moedaTotal, moedaTotalMes, dataCriacao){
        this.nome = nome;
        this.email = email;
        this.moedaTotal = moedaTotal;
        this.moedaTotalMes = moedaTotalMes;
        this.dataCriacao = dataCriacao;
    }
};