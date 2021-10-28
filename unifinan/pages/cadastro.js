import Head from 'next/head'
import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import {useEffect} from "react";

export default function Cadastro() {

  useEffect(() => {
    var formData = new FormData()
    formData.append("nome","Luccas")
    formData.append("login","luccas@gmail.com")
    formData.append("senha","155157")
    formData.append("doc","123.456.789-00")

    const requestOptions = {
        method: 'POST',
        headers: {},
        body:formData,
        "Content-Type":"application/x-www-form-urlencoded"
    };
    fetch('https://unifinan-api.herokuapp.com/usuarios/standard', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
  }, [])




  return (
    <Form>
      <body>
        <div className="formCadastro">      
          <Header />    
          <form>
            <input type="text" id="name" name="name" placeholder="Nome Completo"/>
            <input type="email" id="email" name="email" placeholder="E-Mail"/>
            <input type="text" id="cpf" name="cpf" placeholder="CPF"/>
            <input type="password" id="key" name="key" placeholder="Sua Senha"/>
            <input type="password" id="confKey" name="confKey" placeholder="Confirme sua Senha"/>
            <input type="submit" value="Cadastrar" onClick="" />
            <img src="https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png" id="olho" className="olho" />
            <img src="https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png" id="olho2" className="olho2" />
          </form>
        </div>
      </body>
    </Form>
  ) 
}
