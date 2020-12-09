import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MoedaService } from "../services/MoedaService";
import { NavMenu } from "./NavMenu";
import { Container, Table, Card, Row, Col } from 'react-bootstrap';

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
                    <Row className="login-row">
                        <Col md={{ span: 6, offset: 3 }}>
                            <Card className="text-center">
                                <Card.Header className="usuario-titulo">{usuario.nome.toUpperCase()}</Card.Header>
                                <Card.Body>
                                    <Card.Title className="usuario">TOTAL</Card.Title>
                                    <Card.Text>{usuario.moedaTotal}</Card.Text>
                                    <Card.Title className="usuario">SALDO PARA DOAÇÃO</Card.Title>
                                    <Card.Text>{usuario.moedaTotalMes}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <h5 className="subtitulos">Emitidas</h5>
                    <Table striped bordered hover responsive variant="dark" size="sm">
                        <thead>
                            <tr className="transicao-tabela">
                                <th>Usuário</th>
                                <th>Motivo</th>
                                <th className="th-quantidade">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trasacoesEmitidas.map( (trasacao, index) => (
                                <tr key={index} className="transicao-tabela"> 
                                    <th>{trasacao.emailDestinatario}</th>
                                    <th>{trasacao.motivo}</th>
                                    <th className="th-quantidade">{trasacao.quantidade}</th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h5 className="subtitulos">Recebidas</h5>
                    <Table striped bordered hover responsive variant="dark" size="sm">
                        <thead>
                            <tr className="transicao-tabela">
                                <th>Usuário</th>
                                <th>Motivo</th>
                                <th className="th-quantidade">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trasacoesRecebidas.map( (trasacao, index) => (
                                <tr key={index} className="transicao-tabela"> 
                                    <th>{trasacao.emailEmissor}</th>
                                    <th>{trasacao.motivo}</th>
                                    <th className="th-quantidade">{trasacao.quantidade}</th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
	);
};