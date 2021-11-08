import React, {useState, useEffect} from 'react';

import Router from 'next/router'

import Container from 'react-bootstrap/Container';

import Table from 'react-bootstrap/Table';

import Header from "../components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';

const TratarParametros = () => {
    const search = window.location.search;
    const parametros = new URLSearchParams(search);

    if(typeof parametros == 'undefined'){
        Router.push('/home');
    }

    const conta = parametros.get('conta');
    const mes = parametros.get('mes');
    const ano = parametros.get('ano');

    const anoBissexto = false;
    if (ano % 4 == 0){
        const anoBissexto = true;
    }

    const pagina = parametros.get('pagina');
    const itensPorPagina = parametros.get('itensPorPagina');
    
    if (typeof conta == 'undefined' || typeof mes == 'undefined' || typeof ano == 'undefined' || typeof pagina == 'undefined' || typeof itensPorPagina == 'undefined'){
        Router.push('/', '/');
    }
    else{
        return [conta, mes, ano, anoBissexto, pagina, itensPorPagina, anoBissexto];
    }

}

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

const Requisicao = async (token, parametros, setRequisitando) => {
    const headers = {
    headers: {"Authorization": `Bearer ${token}`},
    "Content-type": "application/x-www-form-urlencoded",
    method: "GET"}

    //verificar depois se vieram todos os parametros, e se sao numeros válidos?

    const url =`https://unifinan-api.herokuapp.com/transacoes?conta=${parametros[0]}&mes=${parametros[1]}&ano=${parametros[2]}&pagina=${parametros[3]}&itensPorPagina=${parametros[4]}`;

    setRequisitando(true);

    await fetch(url, headers)
      .then((response) => response.json())
    .then(response2 => {
      if (typeof response2.content == 'undefined' || response2.content == null){
        Router.push('/', '/');
      }
      else{
        console.log("Sucesso: " + response2.content)
        const transacoes = response2.content;
        transacoesPorDia = PrepararTransacoes(transacoes, parametros[5]);
        etEntradasESaidas(transacoesPorDia);
        setRequisitando(false);
      }
    }).catch(error => {
      console.log("Error: ", error)});
}

const ExibirTransacoes = (transacoes) => {

    transacoes.map((item) => {
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
        );
    })
}

export default function Relatorio() {
    const [entradasESaidas, setEntradasESaidas] = useState(false);
    const [requisitando, setRequisitando] = useState(false);
    //Apenas roda na primeira vez que a página carrega
    useEffect(()=>{
        const parametros = TratarParametros();
        const htmlStyle = document.querySelector('html').style;
        const bodyStyle = document.querySelector('body').style;
    
        htmlStyle.height = "100%";
        htmlStyle.width = "100%";
        
        bodyStyle.alignItems = "center";
        bodyStyle.display = "flex";
        bodyStyle.flexDirection = "column";
        bodyStyle.height = "100%";
        bodyStyle.justifyContent = "start";
        bodyStyle.width = "100%";
        
        const token = localStorage.getItem('token');

        if(typeof token == null){
            Router.push('/', '/');
        }

        Requisicao(token, parametros, setRequisitando);
    }, []);

    return (
        <Container className="align-items-center d-flex flex-column text-center">
            <Header></Header>
            <Container className="align-items-baseline d-flex mt-3 px-3">
                <label className="text-center" style={{fontSize: "1.85rem"}}>Relatório:</label>
                <p className="text-center" style={{fontSize: "1.85rem", width: "100%"}}>
                    {typeof parametros != 'undefined' ? parametros.mes : null} de {typeof parametros != 'undefined' ? parametros.ano : null}
                    </p>
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
                    {typeof transacoes == 'undefined' ? null : ExibirTransacoes(transacoes)}
                </tbody>
            </Table>
        </Container>  
    );
}
