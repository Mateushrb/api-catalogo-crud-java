import React, { useState, useEffect } from 'react';
import Styles from '../../../Styles/Pages/Gestao/GestaoContent.module.scss';
import bannerImage from '../../../assets/banner-analise.png';

function GestaoContent() {
  const [produtos, setProdutos] = useState([]);
  const [quantidadeBaixoEstoque, setQuantidadeBaixoEstoque] = useState(0);
  const [quantidadeAltoEstoque, setQuantidadeAltoEstoque] = useState(0);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [erro, setErro] = useState(null);
  const [mostrarAnaliseDados, setMostrarAnaliseDados] = useState(false);
  const [mostrarAnalisePromocoes, setMostrarAnalisePromocoes] = useState(false);
  const [mostrarAnaliseFinanceira, setMostrarAnaliseFinanceira] = useState(false);

  useEffect(() => {
    if (mostrarAnaliseDados || mostrarAnalisePromocoes || mostrarAnaliseFinanceira) {
      buscarProdutos();
    }
  }, [mostrarAnaliseDados, mostrarAnalisePromocoes, mostrarAnaliseFinanceira]);

  const buscarProdutos = async () => {
    try {
      const response = await fetch('https://backend.suldailhanet.com.br/api/produto');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
      }
      const data = await response.json();
      setProdutos(data);

      const produtosBaixoEstoque = data.filter(produto => produto.quantidade > 0 && produto.quantidade <= 10);
      const produtosAltoEstoque = data.filter(produto => produto.quantidade > 11);

      console.log('Total de Produtos:', data.length);
      console.log('Produtos com Baixo Estoque:', produtosBaixoEstoque.length);
      console.log('Produtos com Alto Estoque:', produtosAltoEstoque.length);

      setQuantidadeBaixoEstoque(produtosBaixoEstoque.length);
      setQuantidadeAltoEstoque(produtosAltoEstoque.length);

      const total = data.reduce((accumulator, produto) => accumulator + (produto.preco * produto.quantidade), 0);
      setPrecoTotal(total);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setErro('Erro ao carregar os dados. Por favor, tente novamente mais tarde.');
    }
  };

  const formatarPreco = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleAnaliseDadosClick = () => {
    setMostrarAnaliseDados(true);
    setMostrarAnalisePromocoes(false);
    setMostrarAnaliseFinanceira(false);
  };

  const handlePromocoesClick = () => {
    setMostrarAnalisePromocoes(true);
    setMostrarAnaliseDados(false);
    setMostrarAnaliseFinanceira(false);
  };

  const handleFinanceiraClick = () => {
    setMostrarAnaliseFinanceira(true);
    setMostrarAnaliseDados(false);
    setMostrarAnalisePromocoes(false);
  };

  return (
    <>
      <main className={Styles.GestaoContent}>
        <div className={Styles.GestaoContent__bannerContainer}>
          <img className={Styles.GestaoContent__bannerContainer__image} src={bannerImage} alt="Banner" />
        </div>
        <h2 className={Styles.GestaoContent__title}>Página de Gestão</h2>
        <div className={Styles.GestaoContainer}>
          <div className={Styles.GestaoContainer__box}>
            <a className={Styles.GestaoContainer__subtitle} href="#" onClick={handleAnaliseDadosClick}>Análise de Dados</a>
            <a className={Styles.GestaoContainer__subtitle} href="#" onClick={handlePromocoesClick}>Gestão de Promoções e Descontos</a>
          </div>
        </div>
        <div className={Styles.containerAnalise}>
          {mostrarAnaliseDados && (
            <div className={Styles.containerAnalise__content}>
              <h2 className={Styles.containerAnalise__content__title}>Análise de Dados</h2>
              <div>
                <p className={Styles.containerAnalise__content__subtitle}>Total de produtos cadastrados: {produtos.length}</p>
                <p className={Styles.containerAnalise__content__subtitle}>Produtos com alto estoque: {quantidadeAltoEstoque}</p>
                <p className={Styles.containerAnalise__content__subtitle}>Produtos com baixo estoque: {quantidadeBaixoEstoque}</p>
                <p className={Styles.containerAnalise__content__subtitle}>Valor total dos preços dos produtos: {formatarPreco(precoTotal)}</p>
              </div>
            </div>
          )}
          {mostrarAnalisePromocoes && (
            <div className={Styles.containerAnalise__content}>
              <h2 className={Styles.containerAnalise__content__title}>Gestão de Promoções e Descontos</h2>
              <p className={Styles.containerAnalise__content__subtitle}>No momento não há promoções ou descontos disponíveis.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default GestaoContent;
