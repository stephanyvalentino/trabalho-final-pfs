import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container text-center py-5">
            <h1>Bem-vindo ao Sistema de Gerenciamento de Atletas</h1>
            <p className="mt-3">
                Use os links abaixo para navegar pelo sistema.
            </p>
            <div className="d-flex justify-content-center mt-4">
                <Link to="/treinadores" className="btn btn-primary mx-2">
                    Gerenciar Treinadores
                </Link>
                <Link to="/atletas" className="btn btn-secondary mx-2">
                    Gerenciar Atletas
                </Link>
                <Link to="/unidades" className="btn btn-success mx-2">
                    Gerenciar Unidades
                </Link>
            </div>
        </div>
    );
};

export default Home;
