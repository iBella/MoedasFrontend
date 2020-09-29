import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MoedaService } from "../services/MoedaService";
import { Container, Table, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

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
	}, [usuario.email, token]);

  	return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#perfil">MoedasPuc</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#perfil">Perfil</Nav.Link>
                <Nav.Link href="#transacoes">Transações</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Busca</Button>
                </Form>
            </Navbar>
            <Container className="transicao-container">
                <div className="transicao-body">
                    <h5 className="subtitulos">Emitidas</h5>
                    <Table striped bordered hover responsive variant="dark">
                        <thead>
                            <tr className="transicao-tabela">
                                <th>Emissor</th>
                                <th>Quantidade</th>
                                <th>Motivo</th>
                                <th>Destinatario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trasacoesEmitidas.map( trasacao => (
                                <tr className="transicao-tabela"> 
                                    <th>{trasacao.emailEmissor}</th>
                                    <th>{trasacao.quantidade}</th>
                                    <th>{trasacao.motivo}</th>
                                    <th>{trasacao.emailDestinatario}</th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <h5 className="subtitulos">Recebidas</h5>
                    <Table striped bordered hover responsive variant="dark">
                        <thead>
                            <tr className="transicao-tabela">
                                <th>Emissor</th>
                                <th>Quantidade</th>
                                <th>Motivo</th>
                                <th>Destinatario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trasacoesRecebidas.map( trasacao => (
                                <tr className="transicao-tabela">   
                                    <th>{trasacao.emailEmissor}</th>
                                    <th>{trasacao.quantidade}</th>
                                    <th>{trasacao.motivo}</th>
                                    <th>{trasacao.emailDestinatario}</th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Link to={"/"}>Voltar</Link>
                </div>
            </Container>
        </div>
	);
};