import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { httpPost, httpGet } from "../../utils/httpApi";
import { UsuarioContext } from "../../UsuarioContext";

const AlunoInserir = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState({
        nome: '',
        altura: 0,
        peso: 0,
        treinadorId: 0 
    });
    const [treinadores, setTreinadores] = useState([]);  
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        httpGet('treinadores', (dados) => {
            setTreinadores(dados);  
        }, setFalha, setUsuario);
    }, []);

    const salvar = e => {
        e.preventDefault();
        httpPost('atletas', objeto, resp => {
            navigate('/atletas');  
        }, setFalha, setUsuario);
    };

    const voltar = e => {
        e.preventDefault();
        navigate('/atletas');  
    };

    const atualizarCampo = (nome, valor) => {
        let objNovo = { ...objeto };
        objNovo[nome] = valor;
        setObjeto(objNovo);
    };

    let mensagemFalha = null;

    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
        setTimeout(() => {
            setFalha(null);  
        }, 10000);
    }

    return (
        <div className="p-2">
            <h3>Inserindo Atleta</h3>
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
                    <label className="form-label">Altura</label>
                    <input
                        className="form-control"
                        value={objeto.altura}
                        onChange={e => atualizarCampo('altura', e.target.value)}
                        type="number"
                        step=".1"
                    />
                </div>
                <div>
                    <label className="form-label">Peso</label>
                    <input
                        className="form-control"
                        value={objeto.peso}
                        onChange={e => atualizarCampo('peso', e.target.value)}
                        type="number"
                        step=".1"
                    />
                </div>
                <div>
                    <label className="form-label">Treinador</label>
                    <select
                        className="form-control"
                        value={objeto.treinadorId}
                        onChange={e => atualizarCampo('treinadorId', e.target.value)}
                    >
                        <option value={0}>Selecione um Treinador</option>
                        {treinadores.map(treinador => (
                            <option key={treinador.id} value={treinador.id}>
                                {treinador.nome} - {treinador.especialidade}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary mt-2" onClick={e => salvar(e)}>Salvar</button>
                <button className="btn btn-secondary mt-2" onClick={e => voltar(e)}>Voltar</button>
            </form>
        </div>
    );
};

export default AlunoInserir;
