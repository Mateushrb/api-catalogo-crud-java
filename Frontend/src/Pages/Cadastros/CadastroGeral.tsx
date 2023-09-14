import React, { useState } from 'react';
import CadastroProduto from './CadastroProduto';
import CadastroCategoria from './CadastroCategoria';
import CadastroImage from './CadastroImage';

const CadastroPorEtapas: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [productData, setProductData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [imageData, setImageData] = useState({});

  const handleNextStep = (data) => {
    if (currentStep === 1) {
      // Avançar para a próxima etapa (Cadastro de Categoria)
      setProductData(data);
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      // Avançar para a próxima etapa (Cadastro de Imagem)
      setCategoryData(data);
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      // Última etapa: Concluir Cadastro
      setImageData(data);

      // Agora você tem todos os dados coletados de todas as etapas
      // Você pode realizar a lógica de envio dos dados para a API ou fazer o que for necessário
      console.log('Dados do Produto:', productData);
      console.log('Dados da Categoria:', categoryData);
      console.log('Dados da Imagem:', imageData);

      // Reiniciar o processo de cadastro
      setCurrentStep(1);
      setProductData({});
      setCategoryData({});
      setImageData({});
    }
  };

  return (
    <div>
      {currentStep === 1 && <CadastroProduto onNext={handleNextStep} />}
      {currentStep === 2 && <CadastroCategoria onNext={handleNextStep} />}
      {currentStep === 3 && <CadastroImage onNext={handleNextStep} />}
    </div>
  );
};

export default CadastroPorEtapas;