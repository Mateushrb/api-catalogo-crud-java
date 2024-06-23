import React, { useState, useEffect } from 'react';
import Styles from '../../../Styles/Pages/Gestao/GestaoContent.module.scss';
import bannerImage from '../../../assets/banner-analise.png';

function GestaoContent() {
  const [products, setProducts] = useState([]);
  const [lowStockPercentage, setLowStockPercentage] = useState(0);
  const [highStockPercentage, setHighStockPercentage] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [showDataAnalysis, setShowDataAnalysis] = useState(false);
  const [showPromotionsAnalysis, setShowPromotionsAnalysis] = useState(false);
  const [showFinancialAnalysis, setShowFinancialAnalysis] = useState(false);

  useEffect(() => {
    if (showDataAnalysis || showPromotionsAnalysis || showFinancialAnalysis) {
      fetchProducts();
    }
  }, [showDataAnalysis, showPromotionsAnalysis, showFinancialAnalysis]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://45.235.53.125:8080/api/produto');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
      }
      const data = await response.json();
      setProducts(data);

      const lowStockProducts = data.filter(product => product.quantidade <= 10);
      const highStockProducts = data.filter(product => product.quantidade > 50);
      const totalProducts = data.length;

      const lowStockPercentage = (lowStockProducts.length / totalProducts) * 100;
      const highStockPercentage = (highStockProducts.length / totalProducts) * 100;

      setLowStockPercentage(lowStockPercentage);
      setHighStockPercentage(highStockPercentage);

      const total = data.reduce((accumulator, product) => accumulator + product.preco, 0);
      setTotalPrice(total);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setError('Erro ao carregar os dados. Por favor, tente novamente mais tarde.');
    }
  };

  const getProgressBarColor = (percentage) => {
    if (percentage < 30) {
      return 'green';
    } else if (percentage < 70) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const handleDataAnalysisClick = () => {
    setShowDataAnalysis(true);
    setShowPromotionsAnalysis(false);
    setShowFinancialAnalysis(false);
  };

  const handlePromotionsClick = () => {
    setShowPromotionsAnalysis(true);
    setShowDataAnalysis(false);
    setShowFinancialAnalysis(false);
  };

  const handleFinancialClick = () => {
    setShowFinancialAnalysis(true);
    setShowDataAnalysis(false);
    setShowPromotionsAnalysis(false);
  };

  return (
    <>
      <main className={Styles.GestaoContent}>
        <div className={Styles.GestaoContent__bannerContainer}>
          <img className={Styles.GestaoContent__bannerContainer__image} src={bannerImage} alt="Banner"/>
        </div>
        <h2 className={Styles.GestaoContent__title}>Página de Gestão</h2>
        <div className={Styles.GestaoContainer}>
          <div className={Styles.GestaoContainer__box}>
            <a className={Styles.GestaoContainer__subtitle} href="#" onClick={handleDataAnalysisClick}>Análise de Dados</a>
            <a className={Styles.GestaoContainer__subtitle} href="#" onClick={handlePromotionsClick}>Gestão de Promoções e Descontos</a>
            <a className={Styles.GestaoContainer__subtitle} href="#" onClick={handleFinancialClick}>Gestão Financeira e Contabilidade</a>
          </div>
        </div>
        <div className={Styles.containerAnalise}>
          {showDataAnalysis && (
            <div className={Styles.containerAnalise__content}>
              <h2 className={Styles.containerAnalise__content__title}>Análise de Dados</h2>
              <div>
                <p className={Styles.containerAnalise__content__subtitle}>Total de produtos cadastrados: {products.length}</p>
                <p className={Styles.containerAnalise__content__subtitle}>Produtos com alto estoque:</p>
                <div className="progress-bar" style={{ width: '300px', backgroundColor: '#EBEBEB', borderRadius: '8px'}}>
                  <div className="progress" style={{ width: `${highStockPercentage}%`, backgroundColor: getProgressBarColor(highStockPercentage) }}>{highStockPercentage.toFixed(2)}%</div>
                </div>
                <br />
                <p className={Styles.containerAnalise__content__subtitle} >Produtos com baixo estoque:</p>
                <div className="progress-bar" style={{ width: '300px', backgroundColor: '#EBEBEB', borderRadius: '8px'}}>
                  <div className="progress" style={{ width: `${lowStockPercentage}%`, backgroundColor: getProgressBarColor(lowStockPercentage) }}>{lowStockPercentage.toFixed(2)}%</div>
                </div>
              </div>
            </div>
          )}
          {showPromotionsAnalysis && (
            <div className={Styles.containerAnalise__content}>
              <h2 className={Styles.containerAnalise__content__title}>Gestão de Promoções e Descontos</h2>
              <p className={Styles.containerAnalise__content__subtitle}>No momento não há promoções ou descontos disponíveis.</p>
            </div>
          )}
          {showFinancialAnalysis && (
            <div className={Styles.containerAnalise__content}>
              <h2 className={Styles.containerAnalise__content__title}>Gestão Financeira e Contabilidade</h2>
              <p className={Styles.containerAnalise__content__subtitle}>Aqui você pode visualizar e analisar dados financeiros e contábeis.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default GestaoContent;
