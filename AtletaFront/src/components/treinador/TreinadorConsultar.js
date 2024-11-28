import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const TreinadorConsultar = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [treinador, setTreinador] = useState(null);  
    const [falha, setFalha] = useState(null);  
    const { id } = useParams();  

    useEffect(() => {
        httpGet(`treinadores/${id}`, dadosTreinador => {
            setTreinador(dadosTreinador);  
        }, setFalha, setUsuario);
    }, [id, setFalha, setUsuario]);  

    let mensagemFalha = null;
    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
        setTimeout(() => {
            setFalha(null);  
        }, 10000);
    }

    if (!treinador) {
        return (
            <div>
                <Carregando mensagem="Carregando informações do treinador..." />
                {mensagemFalha}
            </div>
        );
    }

    return (
        <div className="p-2">
            <h3>Consultando Treinador</h3>
            {mensagemFalha}
            <div>
                <p><strong>Nome do Treinador:</strong> {treinador.nome}</p>
                <p><strong>Especialidade:</strong> {treinador.especialidade}</p>
            </div>
        </div>
    );
};

export default TreinadorConsultar;
