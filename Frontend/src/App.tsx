import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidenav from './Components/Sidenav'
import CadastroGeral from './Pages/Cadastros/CadastroGeral'
import Estoque from './Pages/Estoque/Estoque'
import PaginaInicial from './Pages/PaginaInicial/PaginaInicial'
import Gestao from './Pages/Gestao/Gestao'
import Relatorio from './Pages/Relatorio/Relatorio'
import Suporte from './Pages/Suporte/Suporte'
import Sair from './Pages/Sair/Sair'
import Header from './Components/Header'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './Style.css'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Sidenav />
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<PaginaInicial />} />
            <Route path="/cadastro/geral" element={<CadastroGeral />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/relatorio" element={<Relatorio />} />
            <Route path="/gestao" element={<Gestao />} />
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/sair" element={<Sair />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
