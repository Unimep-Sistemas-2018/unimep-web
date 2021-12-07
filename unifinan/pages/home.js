import Header from "../components/Header";
import { useEffect } from "react";
import { useState } from "react";




const monta_lista = (lista_api) => {
    if (lista_api.length == 0) {
        return (<tr><td colSpan={5}>Não foram encontrados movimentações</td></tr>)
    } else {
        return (lista_api.map((element, index) => {
            const data_format = new Date(element.dtTransacao)
            return (
                //numero,cate,desc,data,valor
                <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.tipo == '1' ? "Entrada" : "Saida"}</td>
                    <td>{element.categoriaObj?.nome}</td>
                    <td>{element.descricao}</td>
                    <td>{data_format.toLocaleDateString()}</td>
                    <td>{parseFloat(element.valor).toFixed(2).replace(".", ",")}</td>
                </tr>
            )
        }))
    }
}

const monta_saldo = (saldo) => {
    if (!saldo) {
        return ("Não foram encontrados movimentações")
    } else {
        
        return (saldo.map((element, index) => {
            return (
                element.saldo
            )
        }))
    }
}

const monta_entrada_ou_saida = (retorno_api, filter) => {
    if (!retorno_api) {
        return ("0,00")
    } else {
        const saldoEntradas = retorno_api.filter( e => e.tipo == 1)
        const saldoSaidas = retorno_api.filter( e => e.tipo == 2)
        
        function getTotal(total, item) {
            return total + parseFloat(item.valor) 
        }
        var totalEntrada = saldoEntradas.reduce(getTotal, 0);
        var totalSaida =  saldoSaidas.reduce(getTotal,0)
        var totalFinal

        if (filter == 1) {
            totalFinal = totalEntrada
        }else if (filter == 2) {
            totalFinal = totalSaida
        }else{
            totalFinal = totalEntrada - totalSaida
        }
        return (
            
            totalFinal.toFixed(2)
        )
        
    }
}


export default function Home() {

    
    const requestOptions = (token) => {
        return(
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json;charset=UTF-8"
                }   
        }
        )
    };

    

    function carregalista(mes) {
        
        fetch('https://unifinan-api.herokuapp.com/transacoes?conta=1&mes=' + mes + '&ano=2021&pagina=0&itensPorPagina=100', requestOptions(window.localStorage.getItem('token')))
            .then(response => response.json())
            .then(data => setList_trasancao(data.content))
    }

    function carregaSaldo(mes) {
        fetch('https://unifinan-api.herokuapp.com/contas/1/saldo?mes='+ mes +'&ano=2021&pagina=0&itensPorPagina=100', requestOptions(window.localStorage.getItem('token')))
        .then(response => response.json())
        .then(data => setsaldo(data.content))
    }


    function carregaEntrada(mes) {
        fetch('https://unifinan-api.herokuapp.com/transacoes?conta=1&mes=' + mes + '&ano=2021&pagina=0&itensPorPagina=100', requestOptions(window.localStorage.getItem('token')))
        .then(response => response.json())
        .then(data => setentrada(data.content))
    }
    
    const [list_trasancao, setList_trasancao] = useState([])
    const [saldo, setsaldo] = useState("")
    const [entrada, setentrada] = useState("")
  

    useEffect(() => {
        requestOptions(window.localStorage.getItem('token'))
        var data = new Date().toLocaleString('default', { month: 'numeric' })
        carregalista(parseInt(data,10))
        carregaSaldo(parseInt(data,10))
        
        carregaEntrada(parseInt(data,10))
    }, [])

    return (
        <div className="home">
            <Header />
            
            <div className="formCadastro">

                <div className="row mt-5">
                    <div className="col-md-12 text-center">
                        <h3>{}</h3>
                    </div>
                </div>
                <div className="row container_cards ">
                    <div className="col-md-4">
                        <div className="card_custom border_cards">
                            <p className="text-center text-success card_txtCabecalho">Entrada</p>
                            <p className="text-center text-success card_txtValor">{"R$" + typeof list_trasancao == "undefined" ? null : "R$ " + monta_entrada_ou_saida(entrada, 1)  }</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card_main border_cards">
                            <p className="text-center card_txtCabecalho">Saldo Total</p>
                            <p className="text-center card_txtValor">{"R$" + typeof list_trasancao == "undefined" ? null :`R$ ${monta_saldo(saldo)}`}</p>
                            <p className="text-center saldo-mensal"><label>Saldo Mensal </label> <br/> <label>{"R$" + typeof list_trasancao == "undefined" ? null : "R$ " + monta_entrada_ou_saida(entrada, 3)  }</label></p>
    

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card_custom border_cards">
                            <p className="text-center text-danger card_txtCabecalho">Saida</p>
                            <p className="text-center text-danger card_txtValor">{"R$" + typeof list_trasancao == "undefined" ? null : "R$ " + monta_entrada_ou_saida(entrada, 2)}</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-10"><h5>Sua atividade:</h5></div>
                    <div className="col-2">
                        <a href="./transacoes" className="btn btn-success float-end text-white" title="Novas Transações"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg></a>
                    </div>
                </div>
                <div className="row container_cards">
                    <div className="col-md-12">
                        <table className="table table-borderless table-dark">
                            <thead>
                                <tr>
                                    <th className="text-center">NUMERO</th>
                                    <th className="text-center">TIPO</th>
                                    <th className="text-center">CATEGORIA</th>
                                    <th className="text-center">DESCRIÇÃO</th>
                                    <th className="text-center">DATA</th>
                                    <th className="text-center">VALOR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    typeof list_trasancao == "undefined" ? null : monta_lista(list_trasancao)
                                    
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
    )
}