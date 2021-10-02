import React, { useState, useEffect, setState } from 'react';

import Link from 'next/link'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import {CSSTransition, TransitionGroup} from 'react-transition-group';


import 'bootstrap/dist/css/bootstrap.min.css';

function HandleLogin(){

}

function VerificarVarCard(logado){
  if (typeof varCard == 'undefined'){
    if (logado !== true){
      //varCard são os campos que podem variar dentro do card
      let varCard = 
      <Container className="d-flex flex-column">
        <Button className="mb-2" onClick={HandleLogin} style={{color: "rgba(var(--bs-warning-rgb),var(--bs-text-opacity))", fontWeight:"600", height: "2.75rem"}} variant="secondary">Fazer Login</Button>
        <Button style={{color: "rgba(var(--bs-warning-rgb),var(--bs-text-opacity))", fontWeight:"600", height: "2.75rem"}} variant="secondary">Criar uma conta</Button>
      </Container>
    }
    else {
      let varCard = 
        <Form className="d-flex flex-column">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="Seu e-mail" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSenha">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Sua senha" />
          </Form.Group>
          <Form.Group controlId="formCheck">
            <Form.Check type="checkbox" label="Lembrar-me"></Form.Check>
          </Form.Group>
          <Button style={{color: "rgba(var(--bs-warning-rgb),var(--bs-text-opacity))", fontWeight:"600", height: "2.75rem"}} type="submit" variant="secondary">Entrar</Button>
        </Form>
    }
  }   
}

export default function Login() {
  const [logado, setLogado] = useState(false);

  VerificarVarCard();
  
  let varCard = 
  <Container className="d-flex flex-column">
    <Button className="mb-2" onClick={HandleLogin} style={{color: "rgba(var(--bs-warning-rgb),var(--bs-text-opacity))", fontWeight:"600", height: "2.75rem"}} variant="secondary">Fazer Login</Button>
    <Button style={{color: "rgba(var(--bs-warning-rgb),var(--bs-text-opacity))", fontWeight:"600", height: "2.75rem"}} variant="secondary">Criar uma conta</Button>
  </Container>

  useEffect(()=>{VerificarVarCard(logado)});

  return (

        <Container className=" mt-5">
          <Container className=" d-flex justify-content-center mt-5 pt-5">
            <TransitionGroup> 
              {/*Gera múltiplas classes, utilizar classNames ao invés de className*/}
              <CSSTransition appear={true} classNames="fade" key={0} in={true} timeout={300}>
                <Card bg="dark" className="border border-secondary d-flex justify-content-around px-4 py-5 text-center" id={0} style={{height: "42rem", width: "35rem"}} text="warning">
                  <Card.Img variant="top" className="pb-5 pt-3 px-5" src="./logo.png" style={{height: "45%"}}>
                  </Card.Img>
                  <Container className="d-flex flex-column px-5">
                    {varCard}
                    <Container className="my-4" style={{color: "LightGray"}}>
                      <hr />
                    </Container>
                  </Container>
                    <Link href="#">
                      <a className="text-warning" style={{fontSize: "1.25rem", textDecoration: "none"}}>Usar o site sem fazer login</a>
                    </Link>
                    <Container className="d-flex flex-column mt-2" style={{color: "LightGray", fontSize: "1rem"}}>
                      (Seus dados ficarão disponíveis apenas neste dispositivo)
                    </Container>
                </Card>
              </CSSTransition>
            </TransitionGroup>
          </Container>
        </Container>
  )
}
