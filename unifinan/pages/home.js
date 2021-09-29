import Head from 'next/head'
import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import logo from './imagens/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    return (
        <Container>
            <Card className="mb-3" style={{ color: "#118C4F" }}>
                <div className="card-header bg-warning">
                    <div className="row">
                        <div className="col-4 col-md-4 col-lg-4 col-xl-4">
                            <Image
                                
                                src={require('./imagens/logo.png')}
                            />

                        </div>
                        <div className="col-4 col-md-4 col-lg-4 col-xl-4 text-center">
                            Menus
                        </div>
                        <div className="col-4 col-md-4 col-lg-4 col-xl-4 text-end">
                            Botões de ação
                        </div>
                    </div>

                </div>
                <Card.Body>
                    {/* Colocar imagem do logo */}
                    <Card.Img>
                    </Card.Img>

                    <Card.Title>
                        Testes
                    </Card.Title>
                    <Form>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" placeholder="Seu e-mail" />
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Sua senha" />
                        </Form.Group>
                        <Button variant="secondary">Fazer Login</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
