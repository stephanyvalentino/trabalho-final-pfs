import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { httpDelete, httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const UnidadeListar = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [unidades, setUnidades] = useState(null);
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarUnidades = () => {
            httpGet('unidades', dados => {
                setUnidades(dados);
            }, erro => setFalha(erro), setUsuario);
        };
        carregarUnidades();
    }, [setUsuario]);

    const excluir = (e, id) => {
        e.preventDefault();
        httpDelete('unidades', id, _ => navigate(0), erro => setFalha(erro), setUsuario);
    };

    let mensagemFalha = null;

    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
    }

    if (!unidades) {
        return (
            <div>
                <Carregando mensagem="Carregando unidades..." />
                {mensagemFalha}
            </div>
        );
    }

    return (
        <div className="p-2">
            <div className="d-flex justify-content-between">
                <h1>Unidades</h1>
            </div>
            {mensagemFalha}
            <Link to="/unidades/inserir" className="btn btn-primary">Inserir</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        unidades.map(unidade => {
                            return (
                                <tr key={unidade.id}>
                                    <td>{unidade.nome}</td>
                                    <td>{unidade.endereco}</td>
                                    <td>
                                        <Link to={`/unidades/consultar/${unidade.id}`} className="btn btn-secondary">Consultar</Link>
                                        <Link to={`/unidades/alterar/${unidade.id}`} className="btn btn-warning">Alterar</Link>
                                        <button className="btn btn-danger" onClick={e => excluir(e, unidade.id)}>Excluir</button>
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

export default UnidadeListar;
