import React, { useEffect, useState } from 'react';
import API from '../../Hooks/useAPI';

interface ProductData {
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

interface Props {
  onNext: (data: ProductData) => void;
}

const CadastroProduto: React.FC<Props> = ({ onNext }) => {
  const [formData, setFormData] = useState<ProductData>({
    nome: '',
    descricao: '',
    preco: 0,
    quantidade: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    
      API.postProduto(formData)
        .then((data) => {
          setFormData(data);
          onNext(data);
        })
      onNext(formData);
      
  };

  return (
    <div>
      <h2>Cadastro de Produto</h2>
      <form>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
        </div>
        <div>
          <label>Descrição:</label>
          <input name="descricao" value={formData.descricao} onChange={handleInputChange} />
        </div>
        <div>
          <label>Preço:</label>
          <input type="number" name="preco" value={formData.preco} onChange={handleInputChange} />
        </div>
        <div>
          <label>Quantidade:</label>
          <input type="number" name="quantidade" value={formData.quantidade} onChange={handleInputChange} />
        </div>
      </form>
      <button onClick={handleNext}>Próxima Etapa</button>
    </div>
  );
};

export default CadastroProduto;
