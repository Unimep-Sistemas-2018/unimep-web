import Header from "../components/Header";
import { useEffect } from "react";
import { useState } from "react";


export default function Home() {

    const [atividade, setatividade] = useState()

    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJtYXJpYUBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjM2NTA5MTI3LCJ1c2VyTmFtZSI6Ik1hcmlhIiwidXNlcklkIjoxLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoid0NGTDVXUXNGOTQ5Q2VMaGVkNzYtNjNXRkkwIiwiY2xpZW50X2lkIjoidW5pZmluYW4tdGVzdCJ9.UcvJJBGhe_Qec7gMAy4rF5KRMGycUuIyv3ioJr3TlS0',
                "Content-Type": "application/json;charset=UTF-8"
            }
        };
        fetch('https://unifinan-api.herokuapp.com/transacoes?conta=1&mes=07&ano=2021&pagina=0&itensPorPagina=10', requestOptions)
            .then(response => response.json())
            .then(data => setatividade(data.content.map(item => item.descricao)))
            // .then(data => data.content.map(item => (console.log(item.descricao))))

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
                            <p className="text-center card_txtValor">R$ 1000,00</p>
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
                                <tr>
                                    <td>Descrição: {atividade?.id}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}