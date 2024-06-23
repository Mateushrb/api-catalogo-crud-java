import React from "react";
import Styles from '../../Styles/Pages/Main/FiltroCategorias.module.scss';

function FiltroCategorias({ categorias, categoriaSelecionada, onCategoriaChange }) {
  const handleCategoriaChange = (event) => {
    const categoriaId = event.target.value ? parseInt(event.target.value) : null;
    onCategoriaChange(categoriaId);
  };

  return (
    <div className={Styles.Main}>
      <select className={Styles.Main__select} value={categoriaSelecionada || ''} onChange={handleCategoriaChange}>
        <option className={Styles.Main__option} value="">Pesquisa por filtro</option>
        {categorias.map(categoria => (
          <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
        ))}
      </select>
    </div>
  );
}

export default FiltroCategorias;
