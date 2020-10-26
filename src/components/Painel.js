import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MoedaService } from "../services/MoedaService";
import { NavMenu } from "./NavMenu";
import { Container, Table } from 'react-bootstrap';

export const Painel = () => {

    const usuario = useSelector(state => state.login.usuario);
    const token = useSelector(state => state.login.token);

    const [trasacoesEmitidas, setTrasacoesEmitidas] = useState([{}]);
    const [trasacoesRecebidas, setTrasacoesRecebidas] = useState([{}]);

    const trasacoesEmitidasService = async (email, token) => {
        const resultado = await MoedaService.trasacoesEmitidas(email, token);
        setTrasacoesEmitidas(resultado.data);
    }

    const trasacoesRecebidasService = async (email, token) => {
        const resultado = await MoedaService.trasacoesRecebidas(email, token);
        setTrasacoesRecebidas(resultado.data);
    }

    useEffect( () => {
        trasacoesEmitidasService(usuario.email, token);
        trasacoesRecebidasService(usuario.email, token);
	}, [usuario.email, token]);

  	return (
        <div>
            <NavMenu/>
            <Container className="transicao-container">
                <div className="transicao-body">
                    <h5 className="usuario">{usuario.nome.toUpperCase()}</h5>
                    <h5 className="usuario">Total: {usuario.moedaTotal}</h5>
                    <h5 className="usuario">Saldo para doação: {usuario.moedaTotalMes}</h5>
                    <h5 className="subtitulos">Emitidas</h5>
                    <Table striped bordered hover responsive variant="dark">
                        <thead>
                            <tr className="transicao-tabela">
                                <th>Usuário</th>
                                <th>Motivo</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trasacoesEmitidas.map( (trasacao, index) => (
                                <tr key={index} className="transicao-tabela"> 
                                    <th>{trasacao.emailDestinatario}</th>
                                    <th>{trasacao.motivo}</th>
                                    <th>{trasacao.quantidade}</th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h5 className="subtitulos">Recebidas</h5>
                    <Table striped bordered hover responsive variant="dark">
                        <thead>
                            <tr className="transicao-tabela">
                                <th>Usuário</th>
                                <th>Motivo</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trasacoesRecebidas.map( (trasacao, index) => (
                                <tr key={index} className="transicao-tabela"> 
                                    <th>{trasacao.emailDestinatario}</th>
                                    <th>{trasacao.motivo}</th>
                                    <th>{trasacao.quantidade}</th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
	);
};