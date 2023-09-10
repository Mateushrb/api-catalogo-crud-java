import React, { useState } from 'react';
import API from '../../Hooks/useAPI';
import CategoryFilter from '../../Components/CategoryFilter';
interface TypesProduto {
  nome: string,
  idImagem: string,
  descricao: string,
  preco: number,
  quantidade: number,
  categoria: {
    nome: string,
  },
}

const CadastroProduto: React.FC = () => {
  const [newProduto, setNewProduto] = useState<TypesProduto>({
    nome: '',
    idImagem: '',
    descricao: '',
    preco: 0,
    quantidade: 0,
    categoria: {
      nome: '',
    },

  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduto({ ...newProduto, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const handleCategoryChange = (categoryId: number) => {
      setNewProduto({
        ...newProduto,
        categoria: { nome: categoryId.toString() },
      });
    };

    API.postProduto(newProduto)
      .then((data) => {
        console.log('Produto cadastrado com sucesso:', data);
        setNewProduto({
          nome: '',
          idImagem: '',
          descricao: '',
          preco: 0,
          quantidade: 0,
          categoria: {
            nome: '',
          },
        });
      })
      .catch((error) => {
        console.error('Erro ao cadastrar o Produto:', error);
      });
  };

  function handleCategoryChange(categoryId: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='box'>
      <h2>Cadastro de Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Produto:</label>
          <input
            type="text"
            name="nome"
            value={newProduto.nome}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>ID da Imagem:</label>
          <input
            type="text"
            name="idImagem"
            value={newProduto.idImagem}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descrição do Produto:</label>
          <input
            type="text"
            name="descricao"
            value={newProduto.descricao}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Preço do Produto:</label>
          <input
            type="number"
            name="preco"
            value={newProduto.preco}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Quantidade do Produto:</label>
          <input
            type="number"
            name="quantidade"
            value={newProduto.quantidade}
            onChange={handleInputChange}
          />
        </div>
        <CategoryFilter onSelectCategory={(categoryId) => handleCategoryChange(categoryId)} />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroProduto;
