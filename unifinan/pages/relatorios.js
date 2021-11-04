import React, {useState, useEffect} from 'react';

import Container from 'react-bootstrap/Container';

import Table from 'react-bootstrap/Table';

import Header from "../components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';

const FetchDados = async (setFetching) => {
    const token = localStorage.getItem('token');
    const headers = {
      headers: {"Authorization": `Bearer ${token}NUMEROSBLABLABLA`},
      "Content-type": "application/x-www-form-urlencoded",
      method: "GET"}

    //pegar dados do local storage? da página anterior? do link com get?
    const conta = "";
    const mes = "";
    const ano = "";
    const pagina = "";
    const itensPorPagina = "";
    const url =`https://unifinan-api.herokuapp.com/transacoes?conta=${conta}&mes=${mes}&ano=${ano}&pagina=${pagina}&itensPorPagina=${itensPorPagina}`;

    await fetch(url, headers)
      .then((response) => response.json())
    .then(response2 => {
      if (typeof response2.content == 'undefined' || response2.content == null){
        //redirecionar pra uma página 404
      }
      else{
        setInvalido(false);
        console.log("Sucesso: " + response2.content)
        const transacoes = response2.content;
        setFetching(false);
      }
    }).catch(error => {
      console.log("Error: ", error)});
}

export default function Relatorio() {
    const [fetching, setFetching] = useState(true);
    FetchDados(setFetching);

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
    
    if (fetching){
        return(<> </>);
    }
    else{
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
                          {/* Usar map para incluir informações */}
                          {transacoes.map((item) => {
                              return(
                                  <div>
                                      <tr key={item.id}>
                                          {/* cortar dia da propriedade item.dtTransacao */}
                                          <td>{}</td>
                                          {/* somar todas as entradas*/}
                                          <td>{}</td>
                                          {/* somar todas as entradas*/}
                                          <td>{}</td>
                                          {/* Calcular resultado, é entradas - saidas*/}
                                          <td>{}</td>
                                          {/* Calcular saldo, ver saldo inicial pro primeiro*/}
                                          <td>{}</td>
                                      </tr>
                                  </div>
                              )
                          })}
                      </tbody>
                  </Table>
            </Container>       
        )
    } 
}
