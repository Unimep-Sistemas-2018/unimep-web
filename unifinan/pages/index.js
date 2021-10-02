import React, { useState, useEffect, setState } from 'react';

import Link from 'next/link'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';


import 'bootstrap/dist/css/bootstrap.min.css';

function HandleLogin()
{
  setLogado(true);
}

function VerificarVarCard(logado)
{
  if (typeof varCard == 'undefined'){
    if (logado !== true){
      let varCard = 
      <Container className="d-flex flex-column">
        <Button className="mb-2" onClick={HandleLogin} style={{color: "rgba(var(--bs-warning-rgb),var(--bs-text-opacity))", fontWeight:"600", height: "2.75rem"}} variant="secondary">Fazer Login</Button>
        <Button style={{color: "rgba(var(--bs-warning-rgb),var(--bs-text-opacity))", fontWeight:"600", height: "2.75rem"}} variant="secondary">Criar uma conta</Button>
      </Container>
    }
    else {
      let varCard = 
        <Container className="d-flex flex-column">
        </Container>;
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
            <Card bg="dark" className="border border-secondary d-flex justify-content-around px-4 py-5 text-center" style={{height: "42rem", width: "35rem"}} text="warning">
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
          </Container>
        </Container>
  )
}
