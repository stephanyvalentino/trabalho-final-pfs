import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const AlunoConsultar = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState(null);  
    const [treinador, setTreinador] = useState(null);  
    const [falha, setFalha] = useState(null);  
    const { id } = useParams();  

    useEffect(() => {
        
        httpGet(`atletas/${id}`, dado => {
            setObjeto(dado);  
            
            httpGet(`treinadores/${dado.treinadorId}`, dadosTreinador => {
                setTreinador(dadosTreinador);  
            }, setFalha, setUsuario);
        }, setFalha, setUsuario);
    }, [id, setFalha, setUsuario]);  

    let mensagemFalha = null;
    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
        setTimeout(() => {
            setFalha(null);  
        }, 10000);
    }

    if (!objeto || !treinador) {
        return (
            <div>
                <Carregando mensagem="" />
                {mensagemFalha}
            </div>
        );
    }

    return (
        <div className="p-2">
            <h3>Consultando Atleta</h3>
            {mensagemFalha}
            <div>
                <p><strong>Nome do Atleta:</strong> {objeto.nome}</p>
                <p><strong>Altura:</strong> {objeto.altura} cm</p>
                <p><strong>Peso:</strong> {objeto.peso} kg</p>
                <p><strong>Treinador:</strong> {treinador.nome} - {treinador.especialidade}</p>
            </div>
        </div>
    );
};

export default AlunoConsultar;
