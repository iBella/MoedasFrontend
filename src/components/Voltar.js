import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export class Voltar extends Component {
  render() {
    return (
      <Link className="voltar" to={"/"}><IoIosArrowBack></IoIosArrowBack></Link>
    );
  }
}