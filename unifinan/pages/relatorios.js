import React, {useState, useEffect} from 'react';

import Router from 'next/router'

import Container from 'react-bootstrap/Container';

import Table from 'react-bootstrap/Table';

import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

import Header from "../components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';

const CompararValores = (a, b) => {
    if ( a.total < b.total ){
        return -1;
    }

    if ( a.total > b.total ){
        return 1;
    }

    return 0;
      
}

const CompararDatas = (a, b) => {
    if ( a.data > b.data ){
        return -1;
    }

    if ( a.data < b.data ){
        return 1;
    }
    return 0;
      
}

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

    let anoBissexto = false;

    if (ano % 4 == 0){
        anoBissexto = true;
    }

    const pagina = parametros.get("pagina");
    const itensPorPagina = parametros.get("itensPorPagina");
    
    if (typeof conta == "undefined" || typeof mes == "undefined" || typeof ano == "undefined" || typeof pagina == "undefined" || typeof itensPorPagina == "undefined"){
        console.log('Um ou mais parâmetros são undefined');
        Router.push("/", "/");
    }
    else{
        return {conta: conta, mes: mes, ano: ano, pagina: pagina, itensPorPagina: itensPorPagina, anoBissexto: anoBissexto};
    }

}

const CalcularDiasNoMes = (mesString, anoBissexto) => {
    const mes = parseInt(mesString, 10);

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


    return diasPorMes[mesExtenso];
}

const PrepararTransacoes = (transacoes, anoBissexto, mesString) => {
    const quantiaDias = CalcularDiasNoMes(mesString, anoBissexto);

    let transacoesPorDia = {};

    for (let i = 0; i < quantiaDias - 1; i++) {
        //checar se a key dia virou "dia" (exemplo: as keys devem ser "1","2","3" ao inserir os dias "1,2,3")
        const dia = i + 1;
        transacoesPorDia[dia] = [];
      }

    let diasJaContabilizados = [];

    for (let i = 0; i < transacoes.length; i++){
        const arrayData = transacoes[i].dtTransacao.split('-');
        const diaAtual = arrayData[2].substring(0,2);

        //Verifica se esse dia já existe no array "listaDias" (se não existe, o resultado será "-1")
        if (diasJaContabilizados.indexOf(diaAtual) == -1){
            diasJaContabilizados.push(diaAtual);
        }

        //se for uma despesa, o valor deverá ser convertido para negativo
        if (transacoes[i].tipo === 2) {
            transacoes[i].valor = -transacoes[i].valor;

        }

        transacoesPorDia[String(diaAtual)].push(transacoes[i].valor);
    }

    //essa lista tem todas as entradas e saídas separadas por dia
    return transacoesPorDia;
}

const RequisicaoTransacoes = async (token, parametros, requisitou, setEntradasESaidas, setTransacoes) => {
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
        setTransacoes(response2.content);

        const mesString = String(parametros.mes).replace('0', '');
        const transacoesPorDia = PrepararTransacoes(response2.content, parametros.anoBissexto, mesString);
        if (transacoesPorDia != {}) {
            if (requisitou == false){
                setEntradasESaidas(transacoesPorDia);
            }
        }
        else {
            console.log("A requisição voltou sem dados")
        }
      }
    }).catch(error => {
      console.log("Error: ", error)});
}

const RequisicaoSaldoAnterior = async (token, parametros, requisitou, setSaldoAnterior) => {
    const headers = {
    headers: {"Authorization": `Bearer ${token}`},
    "Content-type": "application/x-www-form-urlencoded",
    method: "GET"}

    //verificar depois se vieram todos os parametros, e se sao numeros válidos. Atualmente, se isso acontece, ou da pagina 404, ou da erro 401 e volta pro login

    const url =`https://unifinan-api.herokuapp.com/contas/${parametros.conta}/saldo?mes=${parametros.mes}&ano=${parametros.ano}`;

    await fetch(url, headers)
      .then((response) => response.json())
    .then(response2 => {
        if (requisitou == false){
            setSaldoAnterior(response2.content[0].saldo);
        }
    }).catch(error => {
      console.log("Error: ", error)});
}

const RequisicaoGraficoCategorias = async (token, parametros, requisitou, setGrafico1Data) => {
    const headers = {
    headers: {"Authorization": `Bearer ${token}`},
    "Content-type": "application/x-www-form-urlencoded",
    method: "GET"}

    //verificar depois se vieram todos os parametros, e se sao numeros válidos. Atualmente, se isso acontece, ou da pagina 404, ou da erro 401 e volta pro login

    const url =`https://unifinan-api.herokuapp.com/graficos/despesasPorCategoria?conta=${parametros.conta}&ano=${parametros.ano}&mes=${parametros.mes}`;

    await fetch(url, headers)
      .then((response) => response.json())
    .then(response2 => {
        if (requisitou == false){
            //ordena as despesas da maior para a menor (todas as que não estiverem entre as maiores irão depois para uma categoria chamada "Outras"))
            const despesas = response2.despesas.sort(CompararValores);
            if (despesas.length > 5){
                let totalDespesasMenores = 0;
                for (let i = 5; i < despesas.length; i ++){
                    totalDespesasMenores += despesas[i].total;
                }
            }

            //Caso a lista despesas tenha menos que 5 itens, o segundo parâmetro será o tamanho da lista de despesas (é assim que o "splice" funciona)
            let despesasArrumadas = despesas.slice(0, 5);

            const qtdeMaioresDespesas = despesasArrumadas.length;

            if (typeof totalDespesasMenores != 'undefined') {
                despesasArrumadas.push({nome : "Outras", total: totalDespesasMenores});
            }

            let listaLabels = [];
            let listaValores = [];

            for (let i = 0; i < despesasArrumadas.length; i++){
                listaLabels.push(despesasArrumadas[i].nome);
                listaValores.push(despesasArrumadas[i].total)
            }

            let listaCoresFundo = ['rgba(255, 215, 0, 0.6)',
            'rgba(128, 128, 128, 0.6)',
            'rgba(251, 223, 141, 0.6)',
            'rgba(179, 179, 179, 0.6)',
            'rgba(232, 232, 232, 0.6)'];

            let listaCoresBorda = ['rgba(255, 215, 0, 1)',
            'rgba(128, 128, 128, 1)',
            'rgba(251, 223, 141, 1)',
            'rgba(179, 179, 179, 1)',
            'rgba(232, 232, 232, 1)'];

            //corta as listas de cores caso não hajam categorias o suficiente para utilizar todas as cores
            listaCoresFundo = listaCoresFundo.slice(0,despesasArrumadas.length);
            listaCoresBorda = listaCoresBorda.slice(0,despesasArrumadas.length);

            const data = {
                labels: listaLabels, datasets: [{label: "Despesas por categoria", data: listaValores, backgroundColor: listaCoresFundo, borderColor: listaCoresBorda,
                borderWidth: 1,}]
        };
   
            setGrafico1Data(data);
        }
    }).catch(error => {
      console.log("Error: ", error)});
}

const RequisicaoGraficoHistorico = async (token, parametros, requisitou, setRequisitou, setGrafico2Data) => {
    const headers = {
    headers: {"Authorization": `Bearer ${token}`},
    "Content-type": "application/x-www-form-urlencoded",
    method: "GET"}

    //verificar depois se vieram todos os parametros, e se sao numeros válidos. Atualmente, se isso acontece, ou da pagina 404, ou da erro 401 e volta pro login

    const url =`https://unifinan-api.herokuapp.com/graficos/historicoDespesas?conta=${parametros.conta}`;

    await fetch(url, headers)
      .then((response) => response.json())
    .then(response2 => {
        if (requisitou == false){
            //ordena as despesas da maior para a menor (todas as que não estiverem entre as maiores irão depois para uma categoria chamada "Outras"))
            const historico = response2.historico.sort(CompararDatas);

            let listaLabels = [];
            let listaValores = [];

            for (let i = 0; i < historico.length; i++){
                listaLabels.push(historico[i].data);
                listaValores.push(historico[i].total)
            }

            let corFundo = ['rgba(255, 215, 0, 0.6)'];

            let corBorda = ['rgba(255, 215, 0, 1)'];

            const data = {
                labels: listaLabels, datasets: [{label: "Despesas por categoria", data: listaValores, backgroundColor: corFundo, borderColor: corBorda,
                borderWidth: 1,}]
        };
   
            setGrafico2Data(data);
            setRequisitou(true);
        }
    }).catch(error => {
      console.log("Error: ", error)});
}

const ExibirTransacoes = (entradasESaidas, saldoAnterior) => {    
    let saldoAtual = 0;
    //Object.keys(objeto) retorna um array contendo o nome de todas as chaves (keys) daquele objeto
    const listaDias = Object.keys(entradasESaidas);
    //se listaDias tiver tamanho de 0, significa que "entradasESaidas" também é um objeto vazio
    if (listaDias.length != 0) {
        return listaDias.map(
            (element, index) => {
            const dia = index + 1;
            let entradas = [];
            let saidas = [];

            let entradaTotal = 0;
            let saidaTotal = 0;
            
            let resultado = 0;

            //element é somente o número dia, precisamos converter em uma string e colocar entre "[]" após o nome do objeto "entradasESaidas" para procurar por uma propriedade do objeto que tenha como nome esse dia
            if (entradasESaidas[String(element)].length != 0){
                const diaAtual = entradasESaidas[String(element)];
                //itera da primeira transação do dia atual até a última transação do dia atual
                for (let i = 0; i < diaAtual.length; i++)
                //ATENCAO: COLOCAR COMPORTAMENTO PRA CASO TENHA 0 TRANSACOES NESSE DIA
                {
                    //identifica se é uma entrada, e se for, adiciona à lista de entradas
                    if (diaAtual[i] >= 0){
                        entradaTotal += diaAtual[i];
                        entradas.push(diaAtual[i]);
                    }
                    
                    //se não for uma entrada, então será uma saída. Adiciona à lista de saídas. Como o número é negativo, deverá ser feito uma soma ao valor total de saída
                    else {
                        saidaTotal += diaAtual[i];
                        saidas.push(diaAtual[i]);
                    }
                
                }
        
                //é uma soma pois o valor de "saidaTotal" é negativo
                resultado = entradaTotal + saidaTotal;

                //FALTANDO: vai ter que pegar saldo do último dia do mês anterior usando fetch, guarder em UseState?
            }

            if (index == 0)
            {
                saldoAtual = saldoAnterior;
            }

            else {
                saldoAtual += resultado;
            }

            saldoAtual = saldoAnterior + resultado;

            return(
                <tr key={index}>
                    <td>{dia}</td>
                    <td>{entradaTotal}</td>
                    <td>{saidaTotal}</td>
                    <td>{resultado}</td>
                    <td>{saldoAtual}</td>
                </tr>
            );
        });
    }
}

export default function Relatorio() {
    const [entradasESaidas, setEntradasESaidas] = useState([]);
    const [requisitou, setRequisitou] = useState(false);
    const [transacoes, setTransacoes] = useState([]);
    const [mes, setMes] = useState(null);
    const [ano, setAno] = useState(null);
    const [saldoAnterior, setSaldoAnterior] = useState(0);
    const [grafico1Data,setGrafico1Data] = useState({});
    const [grafico2Data,setGrafico2Data] = useState({});

    //Apenas roda na primeira vez que a página renderiza
    useEffect(async () =>{
        const parametros = TratarParametros();
        if (typeof parametros.mes != 'undefined'){
            setMes(parametros.mes);
        }
        if (typeof parametros.ano != 'undefined'){
            setAno(parametros.ano);
        }

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
                await RequisicaoTransacoes(token, parametros, requisitou, setEntradasESaidas, setTransacoes);
                await RequisicaoSaldoAnterior(token, parametros, requisitou, setSaldoAnterior);
                await RequisicaoGraficoCategorias(token, parametros, requisitou, setGrafico1Data);
                await RequisicaoGraficoHistorico(token, parametros, requisitou, setRequisitou, setGrafico2Data);
            }
        }
            
    }, []);

    return (
        <Container className="align-items-center d-flex flex-column text-center">
            <Header></Header>
            <Container className="align-items-baseline d-flex mt-3 px-3">
                <label className="text-center" style={{fontSize: "1.85rem"}}>Relatório:</label>
                <p className="text-center" style={{fontSize: "1.85rem", width: "80%"}}>
                    {typeof mes != 'undefined' ? mes : null} de {typeof ano != 'undefined' ? ano : null}
                </p>
            </Container>
            {/* definir a width da linha é necessário, do contrário o flexbox a define como 0 */}
            <hr className="mb-1 mt-0" style={{border: "1px solid", borderColor:"blue",width: "100%"}}/>
            <Container className="d-flex flex-column justify-content-around my-5 py-5" style={{height: "300px", width: "100%"}}>
                {requisitou && <Pie className="mt-5" data={grafico1Data} options={{responsive: true, maintainAspectRatio: false}}/>}
                <hr className="mb-4 mt-4" style={{border: "1px solid", borderColor:"blue",width: "100%"}}/>
                {requisitou && <Bar className="" data={grafico2Data} options={{responsive: true, maintainAspectRatio: false}} />}
            </Container>

            <Container className="mt-5">
                <Container className="mt-5">
                    <Table className="mt-5" striped bordered hover>
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
                            {typeof transacoes == "undefined" ? null : ExibirTransacoes(entradasESaidas, saldoAnterior)}
                        </tbody>
                    </Table>
                </Container>
            </Container>
        </Container>  
    );
}