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
            return (<tr><td colSpan={5}>Não foram encontradas categorias</td></tr>)
        } else {
            return (lista_api.map((element, index) => {
                return (
                    //numero,cate,desc,data,valor
                    <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.nome}</td>
                        <td><button title="Remover" onClick={() => deletar(element.id)} className="btn btn-danger">X</button></td>
                    </tr>
                )
            }))
        }
    }
    
    function deletar(id) {
        if (confirm("Deseja Excluir esta categoria ? ")) {
            
            const parametros = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                },
            }
            fetch('https://unifinan-api.herokuapp.com/categorias/' + id, parametros)
                .then(response => response.status == "204" ?  carregaLista() : alert("Ocorreu um erro ao processar sua solictação")
                
                )
                
        }
    }

    function carregaLista() {
        fetch('https://unifinan-api.herokuapp.com/categorias', requestOptions(window.localStorage.getItem('token')))
            .then(response => response.json())
            .then(data => setList_trasancao(data.content))
    }
    
    function addCat() {
        const nome_cat = document.getElementById("name_cat").value
        
        const parametros = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: `{"nome": "${nome_cat}","ativo":1,"cd_default":1,"userId":1}`
        }
        fetch('https://unifinan-api.herokuapp.com/categorias', parametros)
            .then(response => response.json())
            .then(data => carregaLista())
    }
    useEffect(() => {
        requestOptions(window.localStorage.getItem('token'))
        carregaLista()
    }, [])
    const [list_trasancao, setList_trasancao] = useState([])
    return (
        <>
            <Header />

            <div className="formCadastro">
                <h4 className="text-center">Adicionar Nova Categoria</h4>
            </div>
            <div className="formCadastro">
                <div className="row">
                    <div className="col-10">
                        <form>
                            <input type="text" id="name_cat" name="name_cat" placeholder="Nome da Categoria" />
                        </form>
                    </div>
                    <div className="col-2">
                        <input className="btn btn-primary" onClick={addCat} type="button" value="Cadastrar" />
                    </div>
                </div>
            </div>
            <div className="mt-2 formCadastro">
                <table className="table table-borderless table-dark float-right">
                    <thead>
                        <tr>
                            <th style={{ width: 10 }} className="text-center">N°</th>
                            <th className="text-center">Nome</th>
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
