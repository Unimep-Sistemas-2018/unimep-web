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



const Verify = (setCadastro, token, id) => {
  const cod = document.getElementById('cod').value;

  if((cod != "") && (cod != " ")){
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 
      "Content-Type":"application/json;charset=UTF-8" },
      body: JSON.stringify({
        'codigo':cod
      })
    };
    fetch(`https://unifinan-api.herokuapp.com/usuarios/standard/${id}/confirmar`, requestOptions)
    .then(response => response.status == 200 ? Router.push('/home') : alert("Erro na validação."));
  } else {
      alert("Error");
    }
}

export default function Cadastro() {
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const[cadastro, setCadastro] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setId(localStorage.getItem('id'));
    if(cadastro == true) {
      Router.push('/home')
    }
  },[])
  
  return (
    <Form>
      <body>
        <div className="formCadastro">      
          <form>
            <input type="text" id="cod" name="cod" placeholder="Código de Confirmação"/>
            <input value="Cadastrar" onClick={() => {Verify(setCadastro, token, id);}} />
          </form>
        </div>
      </body>
    </Form>
  ) 
}