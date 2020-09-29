import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MoedaService } from "../services/MoedaService";
import { LoginModel } from "../models/LoginModel";
import { setToken, setUsuario } from "../actions/loginAction";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

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
        <Container>
            <Row className="login-row">
                <Col md={{ span: 6, offset: 3 }}>
                    <Form>
                        <Form.Group>
                            <Form.Label className="login-label">E-mail</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="login-label">Senha</Form.Label>
                            <Form.Control
                                autoFocus
                                type="password"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="login-btn" disabled={!validateForm()} onClick={() => logar()}> 
                            Logar
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="login-row">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="login-card">
                        <Card.Body>
                            <Card.Title>Login Teste</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Login</Card.Subtitle>
                            <Card.Text>
                            usuario7@teste.com
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">Senha</Card.Subtitle>
                            <Card.Text>
                            12345
                            </Card.Text>
                        </Card.Body>
                    </Card> 
                </Col>
            </Row>
        </Container>
    );
};