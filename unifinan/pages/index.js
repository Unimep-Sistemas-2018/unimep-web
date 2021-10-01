import Link from 'next/link'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';


import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
        <Container className=" mt-5">
          <Container className=" d-flex justify-content-center mt-5 pt-5">
            <Card bg="dark" className="border border-secondary d-flex justify-content-around px-4 py-5 text-center" style={{height: "42rem", width: "35rem"}} text="warning">
              <Card.Img variant="top" className="pb-5 pt-3 px-5" src="./logo.png" style={{height: "45%"}}>
              </Card.Img>
              <Container className="d-flex flex-column px-5">
                <Button className="mb-2" style={{height: "2.75rem"}} variant="warning">Fazer Login</Button>
                <Button style={{height: "2.75rem"}} variant="warning">Criar uma conta</Button>
                <Container className="my-4" style={{color: "LightGray"}}>
                  <hr />
                </Container>
              </Container>
              <Card.Text>
                  <Link href="#">
                    <a className="text-warning" style={{fontSize: "2rem"}} >Entrar sem fazer login</a>
                  </Link>
                  <Container className="d-flex flex-column mt-4" style={{color: "LightGray", fontSize: "0.95rem"}}>
                    (Se você entrar sem se logar, seus dados ficarão disponíveis apenas localmente neste dispositivo, e serão apagados caso você delete os cookies do navegador)
                  </Container>
                </Card.Text>
            </Card>
          </Container>
        </Container>
    // <Container className="p-10">
    //   <Card className="mb-3" style={{color: "#118C4F"}}>
    //         <Card.Body>
    //           {/* Colocar imagem do logo */}
    //           <Card.Img>
    //           </Card.Img>

    //           <Card.Title>
    //             Card de Login
    //           </Card.Title>
    //           <Form>
    //             <Form.Group>
    //               <Form.Label>E-mail</Form.Label>
    //               <Form.Control type="email" placeholder="Seu e-mail"/> 
    //               <Form.Label>Senha</Form.Label>
    //               <Form.Control type="password" placeholder="Sua senha"/>
    //             </Form.Group>
    //             <Button variant="secondary">Fazer Login</Button>
    //           </Form>
    //         </Card.Body>
    //     </Card>
    // </Container>
    
  )
}
