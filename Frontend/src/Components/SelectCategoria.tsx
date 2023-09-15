import React, { useEffect, useState } from 'react';
import API from '../Hooks/useAPI';

type TypeCategoria = {
  category: {
    id: number,
    nome: string
  },
}

interface Props {
  onChange: (id: number) => {

  }; // Adicione uma função de retorno de chamada para passar o idCategoria
}

const SelectCategoria: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<number>(0);

  useEffect(() => {
    API.getCategoria()
      .then((data) => {
        setCategories(data);
      })
  }, [])


  const handleCategoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10); // Converte o valor selecionado em número
    setSelectedCategoria(selectedId); // Atualiza o estado com o idCategoria
    onChange(selectedId); // Chama a função de retorno de chamada para passar o idCategoria
  };

  return (
    <div>
      <select
        className="styleSelect"
        name="selectCategorias"
        id="selectCategorias"
        onChange={handleCategoriaChange}
        value={selectedCategoria}
      >
        <option value="TodasCategorias">Todas as categorias</option>
        {categories?.map((category) => (
          <option value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategoria;
