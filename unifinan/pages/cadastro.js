import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import {useEffect, useState} from "react";


const ShowKey = () => {
  const senhaUm = document.getElementById('key');
  const senhaDois = document.getElementById('confKey');

  if(senhaUm.type == "password") {
    senhaUm.type = "text"
  } else if(senhaUm.type == "text") {
    senhaUm.type = "password"
  }

  if(senhaDois.type == "password") {
    senhaDois.type = "text"
  } else if(senhaDois.type == "text") {
    senhaDois.type = "password"
  }
}

const Verify = (setCadastro) => {
  const nome = document.getElementById('name').value;
  const login = document.getElementById('email').value;
  const senhaUm = document.getElementById('key').value;
  const senhaDois = document.getElementById('confKey').value;
  const doc = document.getElementById('cpf').value;

  if((senhaUm == senhaDois) && (nome != "") && (login != "") && (doc != "")){
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJtYXJpYUBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjM2NzY0NjM1LCJ1c2VyTmFtZSI6Ik1hcmlhIiwidXNlcklkIjoxLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiclZZbkV0WE5Xbi1FUUF2WWxDMjF1b2pVNFBFIiwiY2xpZW50X2lkIjoidW5pZmluYW4tdGVzdCJ9.iYaK6mQyXfbLAcfbj5ZzqN_qIrth_5-sOx1henWmUn4', "Content-Type":"application/json;charset=UTF-8" },
      body: `{"nome":"${nome}", "login":"${login}", "senha":"${senhaUm}", "doc":"${doc}"}`,
    };
    fetch('https://unifinan-api.herokuapp.com/usuarios/standard', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (typeof data.errors == 'undefined' || data.errors == null){
        console.log('Success');
        alert("Verifique seu E-mail, para confirmar o cadastro");
        setCadastro(true);
      } else {
        console.log(`{"nome":"${nome}", "login":"${login}", "senha":"${senhaUm}", "doc":"${doc}"}`)
      }
    });
  } else {
    if(senhaUm != senhaDois){
      alert("Senhas não são compatíveis.");
    } else {
      alert("Existem campos inválidos. Todos os campos devem ser preenchidos.");
    }
  }
}

export default function Cadastro() {
  const[cadastro, setCadastro] = useState(false);

  useEffect(() => {
    if(cadastro == true) {
      // Router.push('/')
    }
  })

  

  return (
    <Form>
      <body>
        <div className="formCadastro">      
          <Header />    
          <form>
            <input type="text" id="name" name="name" placeholder="Nome Completo"/>
            <input type="email" id="email" name="email" placeholder="E-Mail"/>
            <input type="text" id="cpf" name="cpf" placeholder="CPF"/>
            <input type="password" id="key" name="key" placeholder="Sua Senha" />
            <input type="password" id="confKey" name="confKey" placeholder="Confirme sua Senha"/>
            <input value="Cadastrar" onClick={() => {Verify(setCadastro);}} />
            <img src="https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png" id="olho" className="olho" onClick={() => {ShowKey();}} />
            <img src="https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png" id="olho2" className="olho2" onClick={() => {ShowKey();}} />
          </form>
        </div>
      </body>
    </Form>
  ) 
}