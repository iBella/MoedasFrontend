import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MoedaService } from "../services/MoedaService";
import { CadastroModel } from "../models/CadastroModel";
import { Voltar } from "./Voltar";
import { setToken, setUsuario } from "../actions/loginAction";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Col, Row, Alert, Navbar } from 'react-bootstrap';
import { StatusCodes } from 'http-status-codes';

export const Cadastro = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    const [erroLogar, setErroLogar] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');

    async function cadastrar() {
        const resultado = await MoedaService.cadastrar(new CadastroModel(nome, email, senha));
        if(resultado.status === StatusCodes.CREATED){
            dispatch(setToken(resultado.data.token));
            dispatch(setUsuario(resultado.data.usuario));
            history.push("/painel");
        }else {
            setErroLogar(resultado.data.error);
        }
    }

    function validateForm() {
        return nome.length > 0 && email.length > 0 && senha.length > 0 && confirmeSenha.length > 0 && senha === confirmeSenha;
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>MoedasPuc</Navbar.Brand>
            </Navbar>
            <Container>
                <Row className="login-row">
                    <Col md={{ span: 6, offset: 3 }}>
                        {erroLogar.length > 0 &&
                            <Alert variant="warning">{erroLogar}</Alert>
                        }
                        <h5 className="subtitulos">Cadastro</h5>
                        <Form>
                            <Form.Group>
                                <Form.Label className="cadastro-label">Nome</Form.Label>
                                <Form.Control 
                                    autoFocus
                                    type="text" 
                                    value={nome} 
                                    onChange={e => setNome(e.target.value)} 
                                    placeholder="Digite seu nome" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="cadastro-label">Email</Form.Label>
                                <Form.Control 
                                    autoFocus
                                    type="email" 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Digite seu e-mail" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="cadastro-label">Senha</Form.Label>
                                <Form.Control 
                                    autoFocus
                                    type="password" 
                                    value={senha} 
                                    onChange={e => setSenha(e.target.value)}
                                    placeholder="Password" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="cadastro-label">Confirme Senha</Form.Label>
                                <Form.Control 
                                    autoFocus
                                    type="password" 
                                    value={confirmeSenha} 
                                    onChange={e => setConfirmeSenha(e.target.value)}
                                    placeholder="Password" />
                            </Form.Group>

                            <Button className="cadastro-btn" disabled={!validateForm} onClick={cadastrar}>
                                Cadastrar
                            </Button>
                        </Form>
                    </Col>
                    <Voltar/>   
                </Row>
            </Container>
        </div>
    );
};