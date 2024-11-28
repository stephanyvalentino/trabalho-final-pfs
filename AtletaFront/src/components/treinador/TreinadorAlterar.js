import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpGet, httpPut } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const TreinadorAlterar = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState(null);  
    const [falha, setFalha] = useState(null);  
    const navigate = useNavigate();  

    const { id } = useParams();  

    useEffect(() => {
        if (objeto === null) {
            httpGet(`treinadores/${id}`, dado => {
                setObjeto(dado);  
            }, setFalha, setUsuario);
        }
    }, [objeto, id, setFalha, setUsuario]);  

    const atualizarCampo = (nome, valor) => {
        let objNovo = { ...objeto };  
        objNovo[nome] = valor;  
        setObjeto(objNovo);  
    };

    const salvar = e => {
        e.preventDefault();  
        httpPut(`treinadores/${id}`, id, objeto, _ => {
            navigate('/treinadores');  
        }, setFalha, setUsuario);  
    };

    const voltar = e => {
        e.preventDefault();
        navigate('/treinadores'); 
    };

    let mensagemFalha = null;
    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
        setTimeout(() => {
            setFalha(null);  
        }, 10000);
    }

    if (!objeto) {
        return (
            <div>
                <Carregando mensagem="Carregando informações do treinador..." />
                {mensagemFalha}
            </div>
        );
    }

    return (
        <div className="p-2">
            <h3>Alterando Treinador</h3>
            {mensagemFalha}
            <form>
                <div>
                    <label className="form-label">Nome</label>
                    <input
                        className="form-control"
                        value={objeto.nome}  
                        onChange={e => atualizarCampo('nome', e.target.value)}  
                        type="text"
                    />
                </div>
                <div>
                    <label className="form-label">Especialidade</label>
                    <input
                        className="form-control"
                        value={objeto.especialidade}  
                        onChange={e => atualizarCampo('especialidade', e.target.value)}  
                        type="text"
                    />
                </div>

                <button className="btn btn-primary mt-2" onClick={e => salvar(e)}>Salvar</button>
                <button className="btn btn-secondary mt-2" onClick={e => voltar(e)}>Voltar</button>
            </form>
        </div>
    );
};

export default TreinadorAlterar;
