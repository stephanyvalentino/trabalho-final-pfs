import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { httpPost } from "../../utils/httpApi";
import { UsuarioContext } from "../../UsuarioContext";

const UnidadeInserir = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState({
        nome: '',
        endereco: ''
    });
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    const salvar = e => {
        e.preventDefault();
        httpPost('unidades', objeto, resp => {
            navigate('/unidades'); // Navega de volta à lista de unidades após salvar
        }, setFalha, setUsuario);
    };

    const voltar = e => {
        e.preventDefault();
        navigate('/unidades'); // Navega de volta à lista de unidades
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
            setFalha(null); // Limpa a mensagem de falha após 10 segundos
        }, 10000);
    }

    return (
        <div className="p-2">
            <h3>Inserindo Unidade</h3>
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
                    <label className="form-label">Endereço</label>
                    <input
                        className="form-control"
                        value={objeto.endereco}
                        onChange={e => atualizarCampo('endereco', e.target.value)}
                        type="text"
                    />
                </div>
                <button className="btn btn-primary mt-2" onClick={e => salvar(e)}>Salvar</button>
                <button className="btn btn-secondary mt-2" onClick={e => voltar(e)}>Voltar</button>
            </form>
        </div>
    );
};

export default UnidadeInserir;
