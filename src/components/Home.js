import React, {useState } from "react";
import { MoedaService } from "../services/MoedaService";
import { setToken } from "../actions/loginAction";
import { LoginModel } from "../models/LoginModel";
import { Button, TextField } from '@material-ui/core';

export const Home = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function logar() {
        const resultado = await MoedaService.login(new LoginModel(email, senha));
        console.log(resultado);
    }

    function validateForm() {
        return email.length > 0 && senha.length > 0;
    }

    return (
        <form className="formulario-login">
            <div className="campo-login">
                <TextField
                    autoFocus
                    label="E-mail"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="campo-login">
                <TextField
                    autoFocus
                    label="Senha"
                    variant="outlined"
                    type="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
            </div>
            <Button variant="contained" disabled={!validateForm()} onClick={() => logar()}> 
                Logar
            </Button>
        </form>
    );
};