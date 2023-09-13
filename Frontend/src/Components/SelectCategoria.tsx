import React, { useState } from 'react';

interface SelectCategoriaProps {
  onSelectCategoria: (categoria: string) => void;
}

const SelectCategoria: React.FC<SelectCategoriaProps> = ({ onSelectCategoria }) => {
  const [categories, setCategories] = useState<string[]>([]);


  const handleCategoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoria = event.target.value;
    onSelectCategoria(selectedCategoria);
  };

  return (
    <div>
      <select
        className="styleSelect"
        name="selectCategorias"
        id="selectCategorias"
        onChange={handleCategoriaChange}
      >
        <option value="TodasCategorias">Todas as categorias</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategoria;
