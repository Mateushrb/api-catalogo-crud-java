import React, { useEffect, useState } from 'react';
import API from '../../Hooks/useAPI';
import SelectCategoria from '../../Components/SelectCategoria';

interface CategoryData {
  categoria: string;
}

interface Props {
  onNext: (data: CategoryData) => void;
}

const CategoryStep: React.FC<Props> = ({ onNext }) => {
  const [formData, setFormData] = useState<CategoryData>({
    categoria: '',
  });

  const [idCategoria, setIdCategoria] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleNext = () => {
    // Patch no endpoint /api/produto/addCategoria
    // Passar id do produto e da categoria por parâmetro
    // conforme documentação key = categoria key = produto

    API.patchAddCategoria(idCategoria, idProduto)
    
    onNext(formData);
  };

  return (
    <div>
      <h2>Cadastro de Categoria</h2>
      <form>
        <div>
          <label>Categoria:</label>
          <SelectCategoria onChange={(id) => setIdCategoria(id)}/>
        </div>
      </form>
      <button onClick={handleNext}>Próxima Etapa</button>
    </div>
  );
};

export default CategoryStep;
