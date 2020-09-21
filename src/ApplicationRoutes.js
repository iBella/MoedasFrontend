import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Painel } from "./components/Painel";

export const ApplicationRoutes = () => (
  <>
    <Route path="/" exact component={Home} />
    <Route path="/painel" exact component={Painel} />
  </>
);