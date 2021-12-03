import Head from 'next/head'
import Image from 'next/image'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Header from "../components/Header";



const requestOptions = (token) => {
    return (
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json;charset=UTF-8"
            }
        }
    )
};

export default function Cadastro_Cat() {
    const monta_lista = (lista_api) => {
        if (lista_api.length == 0) {
            return (<tr><td colSpan={5}>Não foram encontradas transações</td></tr>)
        } else {
            return (lista_api.map((element, index) => {
                var valor = element.valor
                valor = valor.toFixed(2).replace(".", ",")
                return (
                    <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.descricao}</td>
                        <td>{element.categoriaObj?.nome}</td>
                        <td>{element.tipo == 1 ? "Entrada" : "Saida"}</td>
                        <td>{"R$ " + valor}</td>
                        <td><button title="Remover" onClick={() => deletar(element.id)} className="btn btn-danger">X</button></td>
                    </tr>
                )
            }))
        }
    }

    const monta_lista_cat = (lista_api) => {
        if (lista_api.length == 0) {
            return (<option></option>)
        } else {
            return (lista_api.map((element, index) => {
                return (
                    <option key={element.id} value={element.id}>{element.nome}</option>
                )
            }))
        }
    }

    function deletar(id) {
        if (confirm("Deseja Excluir esta transação ? ")) {
            var mes_atual = new Date().toLocaleString('default', { month: 'numeric' })
            var ano_atual = new Date().toLocaleString('default', { year: 'numeric' })
            const parametros = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                },
            }
            fetch('https://unifinan-api.herokuapp.com/transacoes/' + id, parametros)
                .then(response => response.status == "204" ? carregaLista(mes_atual,ano_atual) : alert("Ocorreu um erro ao processar sua solictação")

                )

        }
    }

    function limpaForm() {
        document.getElementById("form_tran").reset()
    }
    function preparaPesqisa(data) {
     var data = new Date(data)   
     var mes = data.toLocaleString('default', { month: 'numeric' }) 
     var ano = data.toLocaleString('default', { year: 'numeric' })
    
     carregaLista(mes,ano)
    }
    function carregaLista(mes,ano) {
        fetch('https://unifinan-api.herokuapp.com/transacoes?conta=1&mes='+ mes +'&ano='+ ano +'&pagina=0&itensPorPagina=100&tipo=1', requestOptions(window.localStorage.getItem('token')))
            .then(response => response.json())
            .then(data => setList_trasancao(data.content))
    }
    function carregaCat() {
        fetch('https://unifinan-api.herokuapp.com/categorias', requestOptions(window.localStorage.getItem('token')))
            .then(response => response.json())
            .then(data => setList_cat(data.content))
    }

    function addTransaction() {
        const descricao = document.getElementById("descricao").value
        const tipo = document.getElementById("tipo").value
        const categoria = document.getElementById("cat_list").value
        const valor = document.getElementById("valor_tran").value
        const data = document.getElementById("data_tran").value
        const subtipo = document.getElementById("subtipo").value
        const qtdeParc = document.getElementById("qtdeParc").value

        var data_escolhida = new Date(data)
        var mes_escolhido = data_escolhida.toLocaleString('default',{month:'numeric'})
        var ano_escolhido = data_escolhida.toLocaleString('default',{year:'numeric'})



   
        const parametros = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: `{"tipo": "${tipo}","subTipo": "${subtipo}","conta": "1","valor": ${valor},"categoria": ${categoria},"descricao": "${descricao}","dtTransacao": "${data}","dtFim": "","qtdeParcelas": "${qtdeParc}"}`
        }

        fetch('https://unifinan-api.herokuapp.com/transacoes', parametros)
            .then(response => response.status == 201 ? carregaLista(mes_escolhido, ano_escolhido) : alert("Erro"))
            .then(limpaForm())
    }
    useEffect(() => {
        requestOptions(window.localStorage.getItem('token'))
        var mes = new Date().toLocaleString('default', { month: 'numeric' })
        var ano = new Date().toLocaleString('default', { year: 'numeric' })
        carregaLista(mes,ano)
        carregaCat()
    }, [])
    const [list_trasancao, setList_trasancao] = useState([])
    const [list_cat, setList_cat] = useState([])
    return (
        <>
            <Header />

            <div className="formCadastro">
                <h4 className="text-center">Adicionar Nova Transação</h4>
            </div>
            <div className="formCadastro">
                <div className="row">
                    <div className="col-12">
                        <form id="form_tran">
                            <label className="control-label">Descrição</label>
                            <input type="text" id="descricao" className="form-control" name="descricao" placeholder="Nome da Transação" />

                            <label className="control-label">Tipo</label>
                            <select className="form-control" name="tipo" id="tipo">
                                <option value="1">Entrada</option>
                                <option value="2">Saída</option>

                            </select>
                            <label className="control-label">Recorrência</label>
                            <select className="form-control" name="subtipo" id="subtipo">
                                <option value="1">Fixa</option>
                                <option value="2">Parcelada</option>
                                <option value="3">Única</option>
                            </select>
                            <label className="control-label">Parcelas</label>
                            <input type="number" id="qtdeParc" className="form-control" name="qtdeParc" />

                            <label className="control-label">Categoria</label>
                            <select className="form-control" name="cat_list" id="cat_list">
                                {monta_lista_cat(list_cat)}
                            </select>

                            <label className="control-label">Data</label>
                            <input type="date" id="data_tran" className="form-control" name="data_tran" placeholder="Nome da Transação" />

                            <label className="control-label">Valor</label>
                            <input type="text" id="valor_tran" className="form-control" name="valor_tran" placeholder="Valor" />

                        </form>
                    </div>
                    <div className="col-12">

                        <input className="btn btn-primary" onClick={addTransaction} type="button" value="Cadastrar" />
                    </div>
                </div>
            </div>
            <div className="mt-2 formCadastro">
                <h4 className="text-center">Lista de Transações</h4>
                <div className="row">
                    <div className="col-12">
                        <input onChange={(e) => preparaPesqisa(e.target.value)} type="date" className="form-control"/>
                    </div>
                </div>
                <table className="table table-borderless table-dark float-right mt-4">
                    <thead>
                        <tr>
                            <th style={{ width: 10 }} className="text-center">N°</th>
                            <th className="text-center">Nome</th>
                            <th className="text-center">Categoria</th>
                            <th className="text-center">Tipo</th>
                            <th className="text-center">Valor</th>
                            <th style={{ width: 10 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            typeof list_trasancao == "undefined" ? null : monta_lista(list_trasancao)

                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
