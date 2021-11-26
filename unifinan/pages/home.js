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
                    <td>{element.categoria}</td>
                    <td>{element.descricao}</td>
                    <td>{data_format.toLocaleDateString()}</td>
                    <td>{parseFloat(element.valor).toFixed(2)}</td>
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

export default function Home() {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJtYXJpYUBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjM3OTc0MTU0LCJ1c2VyTmFtZSI6Ik1hcmlhIiwidXNlcklkIjoxLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoic1h5dDVOUlVwekhGOWxRM0JfbzJJX2tOX2pnIiwiY2xpZW50X2lkIjoidW5pZmluYW4tdGVzdCJ9.fUH5uPmnYYYx7uAWrCpF8YzrQJE3ZprYs_jZcdVSlSo',
            "Content-Type": "application/json;charset=UTF-8"
        }
    };

    function carregalista(mes) {
        
        fetch('https://unifinan-api.herokuapp.com/transacoes?conta=1&mes=' + mes + '&ano=2021&pagina=0&itensPorPagina=10', requestOptions)
            .then(response => response.json())
            .then(data => setList_trasancao(data.content))
    }

    function carregaSaldo(mes) {
        fetch('https://unifinan-api.herokuapp.com/contas/1/saldo?mes='+ mes +'&ano=2021', requestOptions)
        .then(response => response.json())
        .then(data => setsaldo(data.content))
    }

    const [list_trasancao, setList_trasancao] = useState([])
    const [saldo, setsaldo] = useState("")

    useEffect(() => {
        carregalista(parseInt("07",10))
        carregaSaldo(parseInt("07",10))
    }, [])


    return (
        <div className="home">
            <Header />
            <div className="formCadastro">
                <div className="row mt-5">
                    <div className="col-md-12 text-center">
                        <h3>Setembro</h3>
                    </div>
                </div>
                <div className="row container_cards ">
                    <div className="col-md-4">
                        <div className="card_custom border_cards">
                            <p className="text-center text-success card_txtCabecalho">Entrada</p>
                            <p className="text-center text-success card_txtValor">R$ 500,00</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card_main border_cards">
                            <p className="text-center card_txtCabecalho">Saldo Atual</p>
                            <p className="text-center card_txtValor">{"R$" +  monta_saldo(saldo)  }</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card_custom border_cards">
                            <p className="text-center text-danger card_txtCabecalho">Saida</p>
                            <p className="text-center text-danger card_txtValor">R$ 200,00</p>
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
                                    <th className="text-center">CATEGORIA</th>
                                    <th className="text-center">DESCRIÇÃO</th>
                                    <th className="text-center">DATA</th>
                                    <th className="text-center">VALOR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    //typeof list_trasancao == "undefined" ? null : monta_lista(list_trasancao)
                                    monta_lista(list_trasancao)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}