import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MoedaService } from "../services/MoedaService";
import { LoginModel } from "../models/LoginModel";
import { setToken, setUsuario } from "../actions/loginAction";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Form, Row, Alert, Spinner } from 'react-bootstrap';
import { StatusCodes } from 'http-status-codes';
import ImagemHome from '../imagens/home.png';

export const Home = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    const [clickCadastrar, setClickCadastrar] = useState(false);
    const [clickLogar, setClickLogar] = useState(false);

    const [erroLogar, setErroLogar] = useState('');
    const [btnValido, setBtnValido] = useState(false);
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erroSenha, setErroSenha] = useState('');

    async function logar() {
        validaForm(true, email, senha);
        setClickLogar(true);
        const resultado = await MoedaService.login(new LoginModel(email, senha));
        console.log(resultado);
        if(resultado.status === StatusCodes.OK){
            dispatch(setToken(resultado.data.token));
            dispatch(setUsuario(resultado.data.usuario));
            history.push("/painel");
        }else {
            setErroLogar(resultado.data.error);
            setClickLogar(false);
        }
    }

    async function cadastrar() {
        if(btnValido){
            setClickCadastrar(true);
            history.push("/cadastro");
        }
    }

    function validaForm(btnValido, email, senha){
        if(btnValido) {
            if(email.length === 0)
                setErroEmail("E-mail inválido");
            else
                setErroEmail("");
            if(senha.length === 0)
                setErroSenha("Senha inválida");
            else
                setErroSenha("");
        }
        setBtnValido(email.length > 0 && senha.length > 0);
    }

    useEffect(() => {
        validaForm(btnValido, email, senha);
    },[email, senha, btnValido]);

    return (
        <Container>
            <Row>
                <Col xs={6} md={7} className="home-cor"></Col>
                <Col xs={12} md={5} className="login-form">
                    <Row className="home-row">
                        <img src={ImagemHome} alt="" className="home-imagem"></img>
                    </Row>
                    <Row className="login-row">
                        <Col md={12}>
                            {erroLogar.length > 0 &&
                                <Alert variant="warning">{erroLogar}</Alert>
                            }
                            <Form>
                                <Form.Group>
                                    <Form.Label className="login-label">E-mail *</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <span className="erro-form">{erroEmail}</span>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="login-label">Senha *</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="password"
                                        value={senha}
                                        onChange={e => setSenha(e.target.value)}
                                    />
                                    <span className="erro-form">{erroSenha}</span>
                                </Form.Group>
                                <Button className="login-btn" disabled={!btnValido} onClick={logar}> 
                                    {clickLogar &&
                                        <Spinner animation="border" variant="info" size="sm"></Spinner>
                                    }
                                    <span className="botao-texto">Logar</span>
                                </Button>
                                <Row className="cadastro-opcao">
                                    <Col md={5}><hr></hr></Col>
                                    <Col md={2}>ou</Col>
                                    <Col md={5}><hr></hr></Col>
                                </Row>
                                <Button variant="info" className="cadastro-btn" onClick={cadastrar}> 
                                    {clickCadastrar &&
                                        <Spinner animation="border" variant="primary" size="sm"></Spinner>
                                    }
                                    <span className="botao-texto">Cadastrar</span>
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};