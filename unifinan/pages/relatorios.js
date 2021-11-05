import React, {useState, useEffect} from 'react';

import useRouter from 'next/router';

import Container from 'react-bootstrap/Container';

import Table from 'react-bootstrap/Table';

import Header from "../components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';

const PrepararTransacoes = (transacoes, anoBissexto) => {
    const diasPorMes= {
        "Janeiro": 31,
        "Março": 31,
        "Abril": 30,
        "Maio": 31,
        "Junho": 30,
        "Julho": 31,
        "Agosto": 31,
        "Setembro": 30,
        "Outubro": 31,
        "Novembro": 30,
        "Dezembro": 31
    }

    if (anoBissexto == true) {
        diasPorMes.push({key: "Fevereiro", value: 29})
    }

    else {
        diasPorMes.push({key: "Fevereiro", value: 28})
    }

    let transacoesPorDia = [];

    for (let i = 0; i < diasPorMes.length; i++){
        //checar se a key dia virou "dia" (exemplo: as keys devem ser "1","2","3" ao inserir os dias "1,2,3")
        transacoesPorDia.push({dia: []});
    }

    let diasJaContabilizados = [];

    //verificar funcionamento dessa sintese. Se não funcionar, trocar todos os "for...in..." desse arquivo por loops "for" normais (tipo o de cima)

    for(transacao in transacoes){
        const arrayDia = transacao.dtTransacao.split('-');
        const diaAtual = arrayDia[0];

        //Verifica se esse dia já existe no array "listaDias" (se não existe, o resultado será "-1")
        if (diasJaContabilizados.indexOf(diaAtual) == -1){
            array.push(diaAtual);
        }

        transacoesPorDia[String(diaAtual)].push(transacao.valor);
    }

    //essa lista tem todas as entradas e saídas separadas por dia
    return transacoesPorDia;
}

const Requisicao = async (setRequisitando) => {
    const router = useRouter();
    const {parametros} = router.query;

    const conta = parametros.conta;
    const mes = parametros.mes;

    const ano = parametros.ano;
    const anoBissexto = false;
    if (ano % 4 == 0){
        const anoBissexto = true;
    }

    const pagina = parametros.pagina;
    const itensPorPagina = parametros.itensPorPagina;

    const token = localStorage.getItem('token');
    const headers = {
    headers: {"Authorization": `Bearer ${token}`},
    "Content-type": "application/x-www-form-urlencoded",
    method: "GET"}

    const url =`https://unifinan-api.herokuapp.com/transacoes?conta=${conta}&mes=${mes}&ano=${ano}&pagina=${pagina}&itensPorPagina=${itensPorPagina}`;

    const [requisitando, setRequisitando] = useState(true);

    await fetch(url, headers)
      .then((response) => response.json())
    .then(response2 => {
      if (typeof response2.content == 'undefined' || response2.content == null){
          //retornar página 404
      }
      else{
        console.log("Sucesso: " + response2.content)
        const transacoes = response2.content;
        transacoesPorDia = PrepararTransacoes(transacoes,anoBissexto);
        const [entradasESaidas, setEntradasESaidas] = useState(transacoesPorDia);
        setRequisitando(false);
      }
    }).catch(error => {
      console.log("Error: ", error)});
}

export default function Relatorio() {
    
    //verificar depois se vieram todos os parametros, e se sao numeros válidos
    Requisicao();

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
                    <p className="text-center" style={{fontSize: "1.85rem", width: "100%"}}>{parametros.mes} de {parametros.ano}</p>
                </Container>

                {/* definir a width da linha é necessário, do contrário o flexbox a define como 0 */}
                <hr className="my-0" style={{border: "1px solid", borderColor:"blue",width: "100%"}}/>
                <Container>
                    gráficos aqui
                </Container>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{fontWeight: "bold"}}>Dia</th>
                            <th style={{fontWeight: "bold"}}>Entradas</th>
                            <th style={{fontWeight: "bold"}}>Saídas</th>
                            <th style={{fontWeight: "bold"}}>Resultado</th>
                            <th style={{fontWeight: "bold"}}>Saldo</th>
                        </tr>
                    </thead>
        
                    <tbody>
                        {/*usar map para incluir informações*/}
                        {transacoes.map((item) => {
                            let entradas = [];
                            let saidas = [];
                            for (let i = 0; i < entradasESaidas(item).length; i++){
                                if (i >= 0){
                                    entradas.push(i);
                                }
                                else {
                                    saidas.push(i);
                                }
                            }

                            let entradaTotal = 0;
                            let saidaTotal = 0;

                            for (entrada in entradas){
                                entradaTotal += entrada;
                            }

                            for (saida in saidas){
                                saidaTotal += saida;
                            }
                            
                            //é uma soma pois o valor de "saidaTotal" é negativo (ou nulo)
                            const resultado = entradaTotal + saidaTotal;

                            return(
                                <div>
                                    <tr key={item.id}>
                                        <td>{dia}</td>
                                        <td>{entradaTotal}</td>
                                        <td>{saidaTotal}</td>
                                        <td>{resultado}</td>
                                        {/* calcular saldo, pegar saldo antigo de algum lugar (talvez do mes anterior?) e somar com a entradaTotal e a saidaTotal, ou somar com a lista com todas as entradas*/}
                                        <td>{}</td>
                                    </tr>
                                </div>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>  
        );
}
