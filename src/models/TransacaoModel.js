export class TransacaoModel {

    emailEmissor = String;
    emailDestinatario  = String;
    motivo = String;
    quantidade = Number;

    constructor(emailEmissor, emailDestinatario, motivo, quantidade){
        this.emailEmissor = emailEmissor;
        this.emailDestinatario = emailDestinatario;
        this.motivo = motivo;
        this.quantidade = quantidade;
    }
};