import React, { useState } from 'react';
import API from '../../Hooks/useAPI';

interface TypesCategoria {
  nome: string
}

const CadastroCategoria: React.FC = () => {
  const [newCategoria, setNewCategoria] = useState<TypesCategoria>({
    nome: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCategoria({ ...newCategoria, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    API.postCategoria(newCategoria)
      .then((data) => {
        console.log('Categoria cadastrada com sucesso:', data);
        setNewCategoria({
          nome: '',
        });
      })
      .catch((error) => {
        console.error('Erro ao cadastrar a categoria:', error);
      });
  };

  return (
    <div>
      <h2>Cadastro de Categoria</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nova Categoria:</label>
          <input
            type="text"
            name="nome"
            value={newCategoria.nome}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroCategoria;
