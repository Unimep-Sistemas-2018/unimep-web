import React, {useEffect} from 'react';

import Container from 'react-bootstrap/Container';

import Table from 'react-bootstrap/Table';

import Header from "../components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Relatorio() {
    useEffect(()=>{
        const htmlStyle = document.querySelector('html').style;
        const bodyStyle = document.querySelector('body').style;
    
        htmlStyle.height = "100%";
        htmlStyle.width = "100%";
        
        bodyStyle.alignItems = "center";
        bodyStyle.display = "flex";
        bodyStyle.flexDirection = "column";
        bodyStyle.height = "100%";
        bodyStyle.justifyContent = "start";
        bodyStyle.width = "100%";}, []
        );

  return (
      <Container className="align-items-center d-flex flex-column text-center">
          <Header></Header>
          <Container className="align-items-baseline d-flex mt-3 px-3">
              <label className="text-center" style={{fontSize: "1.85rem"}}>Relatório:</label>
               <p className="text-center" style={{fontSize: "1.85rem", width: "100%"}}>mes_aqui</p>
          </Container>
          {/* definir a width da linha é necessário, do contrário o flexbox a define como 0 */}
          <hr className="my-0" style={{border: "1px solid", borderColor:"blue",width: "100%"}}/>
          <Container>
              gráficos aqui
          </Container>
          <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{fontWeight: "bold"}}>Período</th>
                        <th style={{fontWeight: "bold"}}>Entradas</th>
                        <th style={{fontWeight: "bold"}}>Saídas</th>
                        <th style={{fontWeight: "bold"}}>Resultado</th>
                        <th style={{fontWeight: "bold"}}>Saldo</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@mdo</td>
                    </tr>
                        <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
      </Container>
      
  )
}
