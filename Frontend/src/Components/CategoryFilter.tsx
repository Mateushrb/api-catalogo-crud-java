import React, { useState, useEffect } from 'react';
import API from '../Hooks/useAPI';

interface Category {
  id: number;
  nome: string;
}

interface CategoryFilterProps {
  onSelectCategory: (categoryId: number) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    API.getCategoria()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Erro ao carregar categorias:', error);
      });
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(event.target.value, 10);
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div>
      <label className='cadastroLabel' htmlFor="categorySelect">Selecione a Categoria: </label>
      <select
        className='mb categorFilter'
        id="categorySelect"
        name="category"
        value={selectedCategory || ''}
        onChange={handleCategoryChange}
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
