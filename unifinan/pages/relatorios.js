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
        console.log("'parametros' é undefined, retornando a página inicial");
        Router.push("/home");
    }

    const conta = parametros.get("conta");
    const mes = parametros.get("mes");
    const ano = parametros.get("ano");

    const anoBissexto = false;
    if (ano % 4 == 0){
        const anoBissexto = true;
    }

    const pagina = parametros.get("pagina");
    const itensPorPagina = parametros.get("itensPorPagina");

    console.log("Parâmetros: ", conta, mes, ano, pagina, itensPorPagina);
    
    if (typeof conta == "undefined" || typeof mes == "undefined" || typeof ano == "undefined" || typeof pagina == "undefined" || typeof itensPorPagina == "undefined"){
        console.log('Um ou mais parâmetros são undefined');
        Router.push("/", "/");
    }
    else{
        return {conta: conta, mes: mes, ano: ano, pagina: pagina, itensPorPagina: itensPorPagina, anoBissexto: anoBissexto};
    }

}

const PrepararTransacoes = (transacoes, anoBissexto, mes) => {
    const messesPorExtenso={
        1: "Janeiro",
        2: "Fevereiro",
        3: "Março",
        4: "Abril",
        5: "Maio",
        6: "Junho",
        7: "Julho",
        8: "Agosto",
        9: "Setembro",
        10: "Outubro",
        11: "Novembro",
        12: "Dezembro"
    }

    const mesExtenso = messesPorExtenso[mes];

    let diasPorMes= {
        Janeiro: 31,
        Março: 31,
        Abril: 30,
        Maio: 31,
        Junho: 30,
        Julho: 31,
        Agosto: 31,
        Setembro: 30,
        Outubro: 31,
        Novembro: 30,
        Dezembro: 31
    }

    if (anoBissexto == true) {
        diasPorMes["Fevereiro"] = 29;
    }

    else {
        diasPorMes["Fevereiro"] = 28;
    }

    let transacoesPorDia = {};

    const quantiaDias = diasPorMes[mesExtenso];

    for (const diaIndex in quantiaDias) {
        //checar se a key dia virou "dia" (exemplo: as keys devem ser "1","2","3" ao inserir os dias "1,2,3")
        dia = diaIndex + 1;
        diaString = String(dia);
        transacoesPorDia[diaString] = [];
      }

    let diasJaContabilizados = [];

    for (let i; i < transacoes.length; i++){
        const arrayData = i.dtTransacao.split('-');
        const diaAtual = arrayData[0];

        //Verifica se esse dia já existe no array "listaDias" (se não existe, o resultado será "-1")
        if (diasJaContabilizados.indexOf(diaAtual) == -1){
            array.push(diaAtual);
        }

        transacoesPorDia[String(diaAtual)].push(i.valor);
    }

    //essa lista tem todas as entradas e saídas separadas por dia
    return transacoesPorDia;
}

const Requisicao = async (token, parametros, requisitou, setRequisitou, setEntradasESaidas, setTransacoes) => {
    const headers = {
    headers: {"Authorization": `Bearer ${token}`},
    "Content-type": "application/x-www-form-urlencoded",
    method: "GET"}

    //verificar depois se vieram todos os parametros, e se sao numeros válidos. Atualmente, se isso acontece, ou da pagina 404, ou da erro 401 e volta pro login

    const url =`https://unifinan-api.herokuapp.com/transacoes?conta=${parametros.conta}&mes=${parametros.mes}&ano=${parametros.ano}&pagina=${parametros.pagina}&itensPorPagina=${parametros.itensPorPagina}`;

    await fetch(url, headers)
      .then((response) => response.json())
    .then(response2 => {
      if (typeof response2.content == "undefined" || response2.content == null){
        console.log("response2 é undefined (certeza que o usuario e senha estavam corretos?)");
        Router.push("/", "/");
      }
      else{
        console.log("Sucesso: " + response2.content);
        setTransacoes(response2.content);

        const mesInt = String(parametros.mes).replace('0', '');
        const transacoesPorDia = PrepararTransacoes(response2.content, parametros.anoBissexto, mesInt);

        if (transacoesPorDia !== []) {
            if (requisitou == false){
                setRequisitou(true);
                setEntradasESaidas(transacoesPorDia);
            }
        }
      }
    }).catch(error => {
      console.log("Error: ", error)});
}

const ExibirTransacoes = (transacoes, entradasESaidas) => {    
    //Object.keys(objeto) retorna um array contendo o nome de todas as chaves (keys) daquele objeto
    console.log(transacoes);
    console.log(entradasESaidas);
    const listaDias = Object.keys(entradasESaidas);
    let indexAtual = 0;
    if (typeof entradasESaidas[indexAtual] != "undefined") {
        transacoes.map(
            (listaDias) => {
            let entradas = [];
            let saidas = [];
    
            for (let i = 0; i < entradasESaidas[indexAtual].length; i++){
                if (transacoes[item] >= 0){
                    entradas.push(i);
                }
    
                else {
                    saidas.push(i);
                }
            }
    
            let entradaTotal = 0;
            let saidaTotal = 0;
    
            for (let i; i < entradas.length; i++){
                entradaTotal += i;
            }
    
            for (let i; i < saidas.length; i++){
                saidaTotal += i;
            }
    
            indexAtual += 1;
    
            const dia = indexAtual + 1;
            
            //é uma soma pois o valor de "saidaTotal" é negativo (ou nulo)
            const resultado = entradaTotal + saidaTotal;
            return(
                <div>
                    <tr key={indexAtual}>
                        <td>{dia}</td>
                        <td>{entradaTotal}</td>
                        <td>{saidaTotal}</td>
                        <td>{resultado}</td>
                        {/* calcular saldo, pegar saldo antigo de algum lugar (talvez do mes anterior?) e somar com a entradaTotal e a saidaTotal, ou somar com a lista com todas as entradas*/}
                        <td>{}</td>
                    </tr>
                </div>
            );
        });
    }
}

export default function Relatorio() {
    const [entradasESaidas, setEntradasESaidas] = useState([]);
    const [requisitou, setRequisitou] = useState(false);
    const [transacoes, setTransacoes] = useState([]);

    //Apenas roda na primeira vez que a página renderiza
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
            console.log("'token' é null");
            Router.push("/", "/");
        }
        else {
            if (requisitou == false){
                Requisicao(token, parametros, requisitou, setRequisitou, setEntradasESaidas, setTransacoes);
            }
        }
            
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
                    {typeof transacoes == "undefined" ? null : ExibirTransacoes(transacoes, entradasESaidas)}
                </tbody>
            </Table>
        </Container>  
    );
}
