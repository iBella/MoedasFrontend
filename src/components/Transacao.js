import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MoedaService } from "../services/MoedaService";
import { TransacaoModel } from "../models/TransacaoModel";
import { setUsuario } from "../actions/loginAction";
import { useHistory } from "react-router-dom";
import { NavMenu } from "./NavMenu";
import { Form, Button, Container, Col, Row } from 'react-bootstrap';

export const Transacao = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    const usuario = useSelector(state => state.login.usuario);
    const token = useSelector(state => state.login.token);

    const [usuarios, setUsuarios] = useState([{}]);

    const [emailDestinatario, setEmailDestinatario] = useState('');
    const [motivo, setMotivo] = useState('');
    const [quantidade, setQuantidade] = useState('');

    async function doar() {
        await MoedaService.doar(new TransacaoModel(usuario.email, emailDestinatario, motivo, quantidade), token);
        usuario.moedaTotalMes = usuario.moedaTotalMes - quantidade;
        dispatch(setUsuario(usuario));
        history.push("/painel");
    }

    function validateForm() {
        return usuario.moedaTotalMes >= quantidade &&
               quantidade > 0 && 
               emailDestinatario.length > 0 && 
               emailDestinatario !== "0" && 
               motivo.length > 0 && 
               quantidade.length > 0;
    }

    useEffect(() => {
        const usuariosService = async (token) => {
            const resultado = await MoedaService.usuarios(token);
            var filtered = resultado.data.filter(function (value) { return value.email !== usuario.email });
            setUsuarios(filtered);
        }
        usuariosService(token);
    },[token, usuario]);

    return (
        <div>
            <NavMenu />
            <Container>
                <Row className="login-row">
                    <Col md={{ span: 6, offset: 3 }}>
                        <h5 className="usuario">{usuario.nome.toUpperCase()}</h5>
                        <h5 className="usuario">Saldo para doação: {usuario.moedaTotalMes}</h5>
                        <h5 className="subtitulos">Doar moedas</h5>
                        <Form>
                            <Form.Group>
                                <Form.Label className="cadastro-label">Usuário</Form.Label>
                                <Form.Control as="select"
                                    autoFocus
                                    type="text"
                                    value={emailDestinatario}
                                    onChange={e => setEmailDestinatario(e.target.value)}>
                                    <option value="0">Selecione um usuário</option>
                                    {usuarios.map((item, index) => (
                                        <option key={index} value={item.email}>{item.nome}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="cadastro-label">Quantidade</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="number"
                                    value={quantidade}
                                    onChange={e => setQuantidade(e.target.value)}
                                    placeholder="Insira uma quantidade" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="cadastro-label">Motivo</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    value={motivo}
                                    onChange={e => setMotivo(e.target.value)}
                                    placeholder="Motivo para reconhecer alguém" />
                            </Form.Group>

                            <Button className="cadastro-btn" disabled={!validateForm()} onClick={() => doar()}>
                                Doar
                        </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};