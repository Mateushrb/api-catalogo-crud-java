import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import InputEstoque from './InputEstoque';

const Header = () => {
  const [title, setTitle] = useState("Página Inicial");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setTitle("Página Inicial");
      document.title = "Refrigera + | Página Inicial"
    } else if (location.pathname === '/cadastro/geral') {
      setTitle("Cadastro Geral")
      document.title = "Refrigera + | Cadastro Geral"
    } else if (location.pathname === '/estoque') {
      setTitle("Controle de Estoque")
      document.title = "Refrigera + | Controle de Estoque"
    } else if (location.pathname === '/relatorio') {
      setTitle("Relatórios de Desempenho")
      document.title = "Refrigera + | Relatórios de Desempenho"
    } else if (location.pathname === '/gestao') {
      setTitle("Gestão")
      document.title = "Refrigera + | Gestão"
    } else if (location.pathname === '/suporte') {
      setTitle("Suporte e Contato")
      document.title = "Refrigera + | Suporte e Contato"
    } else if (location.pathname === '/sair') {
      setTitle("Sair")
      document.title = "Refrigera + | Sair"
    }
  }, [location])

  return (
    <header className='mb'>
      <h1 className='box bg-3 color-title'>{title}</h1>
    </header >
  )
}

export default Header
