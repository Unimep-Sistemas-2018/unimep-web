import React, {useState, useEffect} from 'react';

import Link from 'next/link'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import {CSSTransition} from 'react-transition-group';

import 'bootstrap/dist/css/bootstrap.min.css';

const VerificarVarCard = (logando, setLogando) => {
  if (typeof varCard == 'undefined'){
    if (logando !== true){
      //varCard são os campos que podem variar dentro do card
      return (
        <>
        <Container className="d-flex flex-column mt-4">
          <Button className="mb-2" onClick={() => {setLogando(true);}} style={{color: "rgba(var(--bs-warning-rgb),var(--bs-text-opacity))", fontWeight:"600", height: "2.75rem"}} variant="secondary">Fazer Login</Button>
          <Button style={{color: "rgba(var(--bs-warning-rgb),var(--bs-text-opacity))", fontWeight:"600", height: "2.75rem"}} variant="secondary">Criar uma conta</Button>
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
        </>
      )
    }
    else {
      return (
          <Form className="d-flex flex-column mt-3">
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" placeholder="Seu e-mail" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="Sua senha" />
            </Form.Group>
              <Form.Group className="d-flex mb-3" controlId="formformCheck">
                <Form.Check className="" type="checkbox"></Form.Check>
                <Container className="d-flex justify-content-start px-2 mb-3">
                <label>Lembrar-me</label>
                </Container>
              </Form.Group>
            <Button style={{color: "rgba(var(--bs-warning-rgb),var(--bs-text-opacity))", fontWeight:"600", height: "2.75rem"}} type="submit" variant="secondary">Entrar</Button>
          </Form>
      )
    }
  }   
}

export default function Login() {
  const [logando, setLogando] = useState(false);

  let varCard = VerificarVarCard(logando, setLogando);

  //O primeiro useEffect roda só na primeira vez, o segundo roda a cada renderização
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
    varCard = VerificarVarCard(logando, setLogando)}
    );

    

  return (
          <CSSTransition classNames="fade" key={0} in={logando} timeout={400}>
            <Card bg="dark" className="align-items-center border border-secondary d-flex justify-content-center px-4 text-center" property={0} style={{height: "42rem", width: "35rem"}} text="warning">
              <Card.Img className="mb-2" variant="top" src="./logo.png" style={{maxHeight: "40%", width: "auto"}}>
              </Card.Img>
              <Container className="d-flex flex-column px-5">
                {varCard}
                </Container>
            </Card>
          </CSSTransition>
  )
}
