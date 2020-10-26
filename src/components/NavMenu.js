import React from "react";
import { Navbar, Nav } from 'react-bootstrap';

export const NavMenu = () => {

  	return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>MoedasPuc</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/painel">Painel</Nav.Link>
                <Nav.Link href="/transacao">Transação</Nav.Link>
            </Nav>
        </Navbar>
	);
};