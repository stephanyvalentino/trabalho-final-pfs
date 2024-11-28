import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const UnidadeConsultar = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [unidade, setUnidade] = useState(null);  
    const [falha, setFalha] = useState(null);  
    const { id } = useParams();  

    useEffect(() => {
        httpGet(`unidades/${id}`, dadosUnidade => {
            setUnidade(dadosUnidade);  
        }, setFalha, setUsuario);
    }, [id, setFalha, setUsuario]);  

    let mensagemFalha = null;
    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
        setTimeout(() => {
            setFalha(null);  
        }, 10000);
    }

    if (!unidade) {
        return (
            <div>
                <Carregando mensagem="Carregando informações da unidade..." />
                {mensagemFalha}
            </div>
        );
    }

    return (
        <div className="p-2">
            <h3>Consultando Unidade</h3>
            {mensagemFalha}
            <div>
                <p><strong>Nome da Unidade:</strong> {unidade.nome}</p>
                <p><strong>Endereço:</strong> {unidade.endereco}</p>
            </div>
        </div>
    );
};

export default UnidadeConsultar;
