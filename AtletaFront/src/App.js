import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AtletaListar from './components/atletas/AtletaListar';
import AtletaConsultar from './components/atletas/AtletaConsultar';
import AtletaAlterar from './components/atletas/AtletaAlterar';
import AtletaInserir from './components/atletas/AtletaInserir';
import Login from './components/acessos/Login';
import Layout from './components/Layout';
import TreinadorListar from './components/treinador/TreinadorListar';
import TreinadorInserir from './components/treinador/TreinadorInserir';
import TreinadorConsultar from './components/treinador/TreinadorConsultar';
import TreinadorAlterar from './components/treinador/TreinadorAlterar';
import UnidadeListar from './components/unidades/UnidadeListar';
import UnidadeInserir from './components/unidades/UnidadeInserir';
import UnidadeConsultar from './components/unidades/UnidadeConsultar';
import UnidadeAlterar from './components/unidades/UnidadeAlterar';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/atletas" element={<AtletaListar />} />
          <Route path="/atletas/listar" element={<AtletaListar />} />
          <Route path="/atletas/inserir" element={<AtletaInserir />} />
          <Route path="/atletas/consultar/:id" element={<AtletaConsultar />} />
          <Route path="/atletas/alterar/:id" element={<AtletaAlterar />} />

          <Route path="/treinadores" element={<TreinadorListar />} />
          <Route path="/treinadores/listar" element={<TreinadorListar />} />
          <Route path="/treinadores/inserir" element={<TreinadorInserir />} />
          <Route path="/treinadores/consultar/:id" element={<TreinadorConsultar />} />
          <Route path="/treinadores/alterar/:id" element={<TreinadorAlterar />} />

          <Route path="/unidades" element={<UnidadeListar/>} />
          <Route path="/unidades/listar" element={<UnidadeListar />} />
          <Route path="/unidades/inserir" element={<UnidadeInserir />} />
          <Route path="/unidades/consultar/:id" element={<UnidadeConsultar />} />
          <Route path="/unidades/alterar/:id" element={<UnidadeAlterar />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
