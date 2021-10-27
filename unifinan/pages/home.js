import Header from "../components/Header";
import {useEffect} from "react";

export default function Home() {

    useEffect(() => {
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJtYXJpYUBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjM1Mzc5NjQ4LCJ1c2VyTmFtZSI6Ik1hcmlhIiwidXNlcklkIjoxLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiX19zNE93OGV2akpmUzhRQldjUFM4UENYMkhvIiwiY2xpZW50X2lkIjoidW5pZmluYW4tdGVzdCJ9.HNWNdY_xIhqW2xIbpHDz9_7T2N0dhvW1hPOkhihS3A8' },
        // };
        // fetch('https://unifinan-api.herokuapp.com/categorias', requestOptions)
        // .then(response => response.json())
        // .then(data => console.log(data))
        var formData = new FormData()
        formData.append("username","maria@gmail.com")
        formData.append("password","123456")
        formData.append("grant_type","password")

        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Basic dW5pZmluYW4tdGVzdDp1bmlmaW5hbi10ZXN0' },
            body:formData,
            "Content-Type":"application/x-www-form-urlencoded"
        };
        fetch('https://unifinan-api.herokuapp.com/oauth/token', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
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
                                    <td>Dados 1</td>
                                    <td>Dados 2</td>
                                    <td>Dados 3</td>
                                    <td>Dados 4</td>
                                    <td>Dados 5</td>
                                </tr>
                                <tr className="">
                                    <td>Dados 1</td>
                                    <td>Dados 2</td>
                                    <td>Dados 3</td>
                                    <td>Dados 4</td>
                                    <td>Dados 5</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}