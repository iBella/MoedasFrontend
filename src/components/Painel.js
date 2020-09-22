import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MoedaService } from "../services/MoedaService";

export const Painel = () => {

    const usuario = useSelector(state => state.login.usuario);
    const token = useSelector(state => state.login.token);

    const [trasacoesEmitidas, setTrasacoesEmitidas] = useState([{}]);
    const [trasacoesRecebidas, setTrasacoesRecebidas] = useState([{}]);

    const trasacoesEmitidasService = async (email, token) => {
        const resultado = await MoedaService.trasacoesEmitidas(email, token);
        setTrasacoesEmitidas(resultado.data);
        console.log(resultado.data);
    }

    const trasacoesRecebidasService = async (email, token) => {
        const resultado = await MoedaService.trasacoesRecebidas(email, token);
        setTrasacoesRecebidas(resultado.data);
        console.log(resultado.data);
    }

    useEffect( () => {
        trasacoesEmitidasService(usuario.email, token);
        trasacoesRecebidasService(usuario.email, token);
	});

  	return (
    <div>
        <h1>{usuario.email}</h1>
        <ul>
            {trasacoesEmitidas.map( trasacao => (
                <li key={trasacao.id}>   
                    Por: {trasacao.emailEmissor} - {trasacao.quantidade} - {trasacao.motivo} - Para: {trasacao.emailDestinatario}
                </li>
            ))}
	  	</ul>
        <ul>
            {trasacoesRecebidas.map( trasacao => (
                <li key={trasacao.id}>   
                    Por: {trasacao.emailEmissor} - {trasacao.quantidade} - {trasacao.motivo} - Para: {trasacao.emailDestinatario}
                </li>
            ))}
	  	</ul>
        <Link to={"/"}>Voltar</Link>
    </div>
	);
};