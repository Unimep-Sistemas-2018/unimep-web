import React, {useState, useEffect} from 'react';

//import Link from 'next/link'
import Router from 'next/router'

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Spinner from "react-bootstrap/Spinner";

import {CSSTransition} from 'react-transition-group';

import 'bootstrap/dist/css/bootstrap.min.css';

const HandleClick = async (email, senha,setInvalido, setCarregando) => {
  if (email == "" || senha == ""){
    console.log("Insira as suas credenciais para prosseguir com o login")
  }

  else {
    const formTag = document.getElementById('form_login');
    var formData = new FormData(formTag);
    formData.append("grant_type","password");
    const headers = {
      headers: {"Authorization": "Basic dW5pZmluYW4tdGVzdDp1bmlmaW5hbi10ZXN0"},
      "Content-type": "application/x-www-form-urlencoded",
      method: "POST",
      body: formData}
      
    const url ="https://unifinan-api.herokuapp.com/oauth/token";

    setCarregando(true);

    await fetch(url, headers)
      .then((response) => response.json())
    .then(response2 => {
      if (typeof response2.access_token == 'undefined' || response2.access_token == null){
        console.log("indefinido");
        setInvalido(true);
      }
      else{
        setInvalido(false);
        console.log("Sucesso: " + response2.access_token)
        localStorage.setItem('token', response2.access_token);
        Router.push('/home')
      }
    }).catch(error => {
      console.log("Error: ", error)});
  }
};

const VerificarVarCard = (logando, setLogando, email, setEmail, senha, setSenha, setInvalido, carregando, setCarregando) => {
  if (typeof varCard == 'undefined'){
    if (logando !== true){
      //varCard são os campos que podem variar dentro do card
      return (
        <Container className="mt-4">
        <Container className="d-flex flex-column mt-5">
          <Button className="mb-3" onClick={() => {setLogando(true);}} style={{color: "Gold", fontWeight:"600", height: "3rem"}} variant="secondary">Fazer Login</Button>
          <Button style={{color: "Gold", fontWeight:"600", height: "3rem"}} variant="secondary">Criar uma conta</Button>
          {/* <Container className="my-4" style={{color: "LightGray"}}>
            <hr />
          </Container> */}
        </Container>
        {/* <Link href="#">
          <a className="text-warning" style={{fontSize: "1.25rem", textDecoration: "none"}}>Usar o site sem fazer login</a>
        </Link>
        <Container className="d-flex flex-column mt-2" style={{color: "LightGray", fontSize: "1rem"}}>
          (Seus dados ficarão disponíveis apenas neste dispositivo)
        </Container> */}
        </Container>
      )
    }
    else {
      return (
          <Form className="d-flex flex-column mt-0 px-4" id="form_login">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label style={{color: "Gold"}}>E-mail</Form.Label>
              <Form.Control name="username" onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" value={email} type="email" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formSenha">
              <Form.Label style={{color: "Gold"}}>Senha</Form.Label>
              <Form.Control name="password" onChange={e => setSenha(e.target.value)} placeholder="Sua senha" value={senha} type="password"/>
            </Form.Group>
              {/* <Form.Group className="d-flex mb-3" controlId="formformCheck">
                <Form.Check className="" type="checkbox"></Form.Check>
                <Container className="d-flex justify-content-start px-2 mb-3">
                <label>Mantenha-me conectado</label>
                </Container>
              </Form.Group> */}
            <div className="d-flex justify-content-start">
              {/* Não pode colocar a função HandleClick direto, se não ele chama independente de clicar. Por isso está dentro de uma função anônima. */}
              <Button className="text-center" onClick={() => HandleClick(email, senha, setInvalido, setCarregando)} style={{color: "Gold", fontWeight:"600", height: "3rem", width:"100%"}}  variant="secondary">
                {!carregando && "Entrar"}
                {carregando && <Spinner animation="border" style={{color:"Gold"}} />}
              </Button>
            </div>
          </Form>
      )
    }
  }   
}

const VerificarInvalido = (invalido) => {
  if (invalido){
    return(
      <Alert className="align-items-center d-flex justify-content-center my-3" style={{height: "3rem"}} variant="danger">
        Combinação de usuário e senha inválida!
      </Alert>
    );
  }
  else{
    return(
      <Alert className="align-items-center d-flex invisible justify-content-center my-3" style={{height: "3rem"}} variant="danger">
        Combinação de usuário e senha inválida!
      </Alert>
    );
  }
}

export default function Login() {
  const [logando, setLogando] = useState(false);
  const [invalido, setInvalido] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  let varCard = VerificarVarCard(logando, setLogando, email, setEmail, senha, setSenha, setInvalido, carregando, setCarregando);
  let alerta = VerificarInvalido(invalido);

  //O primeiro useEffect roda só quando a página carregar da primeira vez, o segundo roda a cada renderização
  useEffect(()=>{
    const htmlStyle = document.querySelector('html').style;
    const bodyStyle = document.querySelector('body').style;

    htmlStyle.height = "100%";
    htmlStyle.width = "100%";
    
    bodyStyle.alignItems = "center";
    bodyStyle.display = "flex";
    bodyStyle.height = "100%";
    bodyStyle.justifyContent = "center";
    bodyStyle.width = "100%";}, []
    );

  useEffect(()=>{
    varCard = VerificarVarCard(logando, setLogando);
    alerta = VerificarInvalido(invalido);
  });
    

  return (
          <>
            <CSSTransition classNames="fade" key={0} in={logando} timeout={400}>
              <Container className="pt-4">
                <Card bg="dark" className="align-items-center border border-secondary d-flex justify-content-start px-4 text-center mt-5" property={0} style={{height: "35rem", width: "35rem"}} text="warning">
                  <Container className="mt-2"> 
                    <Card.Img className="mt-5 mb-1" variant="top" src="./logo-transparente.png" style={{maxHeight: "100%", width: "auto"}}>
                    </Card.Img>
                  </Container>
                  <Container className="d-flex flex-column px-4">
                    {varCard}
                    </Container>
                </Card>
              </Container>
            </CSSTransition>
            {alerta}
         </>
  )
}
