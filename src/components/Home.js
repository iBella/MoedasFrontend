import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from '@material-ui/core';
import { MoedaService } from "../services/MoedaService";
import { LoginModel } from "../models/LoginModel";
import { setToken, setUsuario } from "../actions/loginAction";
import { useHistory } from "react-router-dom";

export const Home = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function logar() {
        const resultado = await MoedaService.login(new LoginModel(email, senha));
        dispatch(setToken(resultado.data.token));
        dispatch(setUsuario(resultado.data.usuario));
        history.push("/painel");
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