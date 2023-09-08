import { NavLink } from 'react-router-dom';
import paginaInicio from '../assets/Icons/icon-home.svg';
import iconCadastro from '../assets/Icons/icon-cadastro.svg';
import iconEstoque from '../assets/Icons/icon-estoque.svg';
import iconGestao from '../assets/Icons/icon-gestao.svg';
import iconRelatorio from '../assets/Icons/icon-relatorios.svg';
import iconSuporte from '../assets/Icons/icon-suporte.svg';
import iconSair from '../assets/Icons/icon-sair.svg';
import RefrigeraMaisSVG from '../assets/RefrigeraMaisSVG';

const Sidenav = () => {
  return (
    <nav className='sidenav box bg-3'>
      <RefrigeraMaisSVG />
      <ul>
        <li>
          <span>
            <img src={paginaInicio} alt="Icon Página Inicial" />
          </span>
          <NavLink to="/" >Página Inicial</NavLink >
        </li>
        <li>
          <span>
            <img src={iconCadastro} alt="Icon Cadastro" />
          </span>
          <NavLink to="/cadastro/geral" >Cadastro Geral</NavLink >
        </li>
        <li>
          <span>
            <img src={iconEstoque} alt="Icon Estoque" />
          </span>
          <NavLink to="/estoque" >Controle de Estoque</NavLink >
        </li>
        <li>
          <span>
            <img src={iconRelatorio} alt="Icon Relatório" />
          </span>
          <NavLink to="/relatorio" >Relatórios de Desempenho</NavLink >
        </li>
        <li>
          <span>
            <img src={iconGestao} alt="Icon Gestão" />
          </span>
          <NavLink to="/gestao" >Gestão</NavLink >
        </li>
        <li>
          <span>
            <img src={iconSuporte} alt="Icon Suporte" />
          </span>
          <NavLink to="/suporte" >Suporte e Contato</NavLink >
        </li>
        <li>
          <span>
            <img src={iconSair} alt="Icon Sair" />
          </span>
          <NavLink to="/sair" >Sair</NavLink >
        </li>
      </ul>
    </nav>
  )
}

export default Sidenav
