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

const Verify = (setCadastro) => {
  const nome = document.getElementById('name').value;
  const login = document.getElementById('email').value;
  const senhaUm = document.getElementById('key').value;
  const senhaDois = document.getElementById('confKey').value;
  const doc = document.getElementById('cpf').value;

  if(senhaUm == senhaDois){
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJtYXJpYUBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjM2MDY4MzM4LCJ1c2VyTmFtZSI6Ik1hcmlhIiwidXNlcklkIjoxLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoicllPRzlqaDNYZGxiWlAxcTVGLUpXQ0hIME80IiwiY2xpZW50X2lkIjoidW5pZmluYW4tdGVzdCJ9.V2T8FhlQYUMfWGCVVFxohWyMLx0hOI_osgZIFRtbLwo', "Content-Type":"application/json;charset=UTF-8" },
      body: `{"nome":${nome}, "login":${login}, "senha":${senhaUm}, "doc":${doc}}`,
    };
    fetch('https://unifinan-api.herokuapp.com/usuarios/standard', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (typeof data.errors == 'undefined' || data.errors == null){
        console.log('sucesso');
        setCadastro(true);
      } else {
        console.log("Error!!!")
      }
    });
  }
}

export default function Cadastro() {
  const[cadastro, setCadastro] = useState(false);

  useEffect(() => {
    if(cadastro == true) {
      Router.push('/')
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
            <input type="password" id="key" name="key" placeholder="Sua Senha"/>
            <input type="password" id="confKey" name="confKey" placeholder="Confirme sua Senha"/>
            <input value="Cadastrar" onClick={() => {Verify(setCadastro);}} />
            <img src="https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png" id="olho" className="olho" />
            <img src="https://cdn0.iconfinder.com/data/icons/ui-icons-pack/100/ui-icon-pack-14-512.png" id="olho2" className="olho2" />
          </form>
        </div>
      </body>
    </Form>
  ) 
}