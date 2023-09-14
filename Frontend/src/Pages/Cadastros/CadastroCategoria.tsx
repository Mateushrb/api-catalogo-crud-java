import React, { useState } from 'react';

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    onNext(formData);
  };

  return (
    <div>
      <h2>Cadastro de Categoria</h2>
      <form>
        <div>
          <label>Categoria:</label>
          <input type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} />
        </div>
      </form>
      <button onClick={handleNext}>Próxima Etapa</button>
    </div>
  );
};

export default CategoryStep;
