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
        }else{
            totalFinal = totalSaida
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
                <div className="row mt-2">
                    <div className="col-lg-3">
                        <a href="./categorias" className="btn btn-primary float-right" >Categorias</a>
                        
                    </div>
                    <div className="col-lg-3">
                        <a href="./transacoes" className="btn btn-primary float-right" >Nova Transação</a>
                        
                    </div>
                </div>
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
                            <p className="text-center card_txtCabecalho">Saldo Atual</p>
                            <p className="text-center card_txtValor">{"R$" + typeof list_trasancao == "undefined" ? null : monta_saldo(saldo)  }</p>
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
                    <h5>Sua atividade:</h5>
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