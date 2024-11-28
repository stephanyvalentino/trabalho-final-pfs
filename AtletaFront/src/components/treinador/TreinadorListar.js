import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { httpDelete, httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando"; 
import { UsuarioContext } from "../../UsuarioContext";  

const TreinadorListar = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [treinadores, setTreinadores] = useState(null);  
    const [falha, setFalha] = useState(null);  
    const navigate = useNavigate();  

    useEffect(() => {
        const carregarTreinadores = () => {
            httpGet('treinadores', dados => {
                setTreinadores(dados);  
            }, erro => setFalha(erro), setUsuario);
        };
        carregarTreinadores();
    }, [setUsuario]);

    const excluir = (e, id) => {
        e.preventDefault();
        httpDelete('treinadores', id, _ => navigate(0), erro => setFalha(erro), setUsuario);  
    };

    let mensagemFalha = null;

    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
    }

    if (!treinadores) {
        return (
            <div>
                <Carregando mensagem="Carregando treinadores..." />
                {mensagemFalha}
            </div>
        );
    }

    return (
        <div className="p-2">
            <div className="d-flex justify-content-between">
                <h1>Treinador</h1>
            </div>
            {mensagemFalha}
            <Link to="/treinadores/inserir" className="btn btn-primary">Inserir</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Especialidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        treinadores.map(treinador => {
                            return (
                                <tr key={treinador.id}>
                                    <td>{treinador.nome}</td>
                                    <td>{treinador.especialidade}</td>
                                    <td>
                                        <Link to={`/treinadores/consultar/${treinador.id}`} className="btn btn-secondary">Consultar</Link>
                                        <Link to={`/treinadores/alterar/${treinador.id}`} className="btn btn-warning">Alterar</Link>
                                        <button className="btn btn-danger" onClick={e => excluir(e, treinador.id)}>Excluir</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TreinadorListar;
