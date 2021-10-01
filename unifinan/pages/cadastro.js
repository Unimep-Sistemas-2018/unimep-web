import Head from 'next/head'
import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Header from "../components/Header";


function showKey() {
//   var senha = document.getElementById("key");
//   var senha2 = document.getElementById("confKey");
//   if (senha.type === "password") {
//     senha.type = "text";
//     senha2.type = "text";

//   } else {
//     senha.type = "password";
//     senha2.type = "password";
//   }
}

export default function Cadastro() {
  return (
    <Form>
      <body>
        <div>
          <Header/ >
        </div>
        <div className="formCadastro">           
          <form>
            <input type="text" id="name" name="name" placeholder="Nome Completo"/>
            <input type="email" id="email" name="email" placeholder="E-Mail"/>
            <input type="password" id="key" name="key" placeholder="Sua Senha"/>
            <input type="password" id="confKey" name="confKey" placeholder="Confirme sua Senha"/>
            <input type="submit" value="Cadastrar"/>
            <img src="https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png" id="olho" className="olho" onclick={showKey()}/>
            <img src="https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png" id="olho2" className="olho2" onclick={showKey()}/>
          </form>
        </div>
      </body>
    </Form>
  )
}
