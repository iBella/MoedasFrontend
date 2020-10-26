import React from "react";
import { Route } from "react-router-dom";
import { Cadastro } from "./components/Cadastro";
import { Home } from "./components/Home";
import { Painel } from "./components/Painel";
import { Transacao } from "./components/Transacao";

export const ApplicationRoutes = () => (
  <>
    <Route path="/" exact component={Home} />
    <Route path="/painel" exact component={Painel} />
    <Route path="/cadastro" exact component={Cadastro} />
    <Route path="/transacao" exact component={Transacao} />
  </>
);