import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MoedaService } from "../services/MoedaService";
import { TransacaoModel } from "../models/TransacaoModel";
import { setUsuario } from "../actions/loginAction";
import { useHistory } from "react-router-dom";
import { NavMenu } from "./NavMenu";
import { Form, Button, Container, Col, Row, Alert, Card } from 'react-bootstrap';

export const Transacao = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    const usuario = useSelector(state => state.login.usuario);
    const token = useSelector(state => state.login.token);

    const [usuarios, setUsuarios] = useState([{}]);

    const [btnValido, setBtnValido] = useState(false);
    const [emailDestinatario, setEmailDestinatario] = useState('');
    const [erroEmailDestinatario, setErroEmailDestinatario] = useState('');
    const [motivo, setMotivo] = useState('');
    const [erroMotivo, setErroMotivo] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [erroQuantidade, setErroQuantidade] = useState('');

    async function doar() {
        validarForm(true, usuario, quantidade, emailDestinatario, motivo);
        await MoedaService.doar(new TransacaoModel(usuario.email, emailDestinatario, motivo, quantidade), token);
        usuario.moedaTotalMes = usuario.moedaTotalMes - quantidade;
        dispatch(setUsuario(usuario));
        history.push("/painel");
    }

    function validarForm(btnValido, usuario, quantidade, emailDestinatario, motivo) {
        if(btnValido){
            if(quantidade <= 0 || usuario.moedaTotalMes < quantidade)
                setErroQuantidade("Quantidade inválida");
            else
                setErroQuantidade("");
            if(emailDestinatario.length === 0 || emailDestinatario === "0")
                setErroEmailDestinatario("Usuário inválido");
            else
                setErroEmailDestinatario("");
            if(motivo.length === 0)
                setErroMotivo("Motivo inválido");
            else
                setErroMotivo("");
        }
        setBtnValido(usuario.moedaTotalMes >= quantidade &&
            quantidade > 0 && 
            emailDestinatario.length > 0 && 
            emailDestinatario !== "0" && 
            motivo.length > 0);
    }

    useEffect(() => {
        const usuariosService = async (token) => {
            const resultado = await MoedaService.usuarios(token);
            var filtered = resultado.data.filter(function (value) { return value.email !== usuario.email });
            setUsuarios(filtered);
        }

        usuariosService(token);
        validarForm(btnValido, usuario, quantidade, emailDestinatario, motivo);
    },[token, usuario, quantidade, emailDestinatario, motivo, btnValido]);

    return (
        <div>
            <NavMenu />
            <Container>
                <Row className="login-row">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card className="text-center">
                            <Card.Header className="usuario-titulo">{usuario.nome.toUpperCase()}</Card.Header>
                            <Card.Body>
                                <Card.Title className="usuario">SALDO PARA DOAÇÃO</Card.Title>
                                <Card.Text>{usuario.moedaTotalMes}</Card.Text>
                            </Card.Body>
                        </Card>
                        <h5 className="subtitulos">Doar moedas</h5>
                        {usuario.moedaTotalMes === 0 &&
                            <Alert variant="danger">
                                <Alert.Heading>Ah.. que pena! Suas moedas deste mês acabaram!</Alert.Heading>
                                <p>Aguarde o próximo mês para agradecer alguém. 
                                    Não deixe passar em branco uma ajuda, um reconhecimento ou
                                    uma conquista individual. Presentei!! Retribua!! Agradeça!!</p>
                            </Alert>
                        }
                        {usuario.moedaTotalMes !== 0 &&
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
                                    <span className="erro-form">{erroEmailDestinatario}</span>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="cadastro-label">Quantidade</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="number"
                                        value={quantidade}
                                        onChange={e => setQuantidade(e.target.value)}
                                        placeholder="Insira uma quantidade" />
                                    <span className="erro-form">{erroQuantidade}</span>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="cadastro-label">Motivo</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        value={motivo}
                                        onChange={e => setMotivo(e.target.value)}
                                        placeholder="Motivo para reconhecer alguém" />
                                    <span className="erro-form">{erroMotivo}</span>
                                </Form.Group>

                                <Button className="cadastro-btn" disabled={!btnValido} onClick={doar}>
                                    Doar
                            </Button>
                            </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
};