// FiltroMarcas.jsx

import React from "react";
import Styles from '../../Styles/Pages/Main/FiltroMarcas.module.scss';

function FiltroMarcas({ marcas, marcaSelecionada, onMarcaChange }) {
    const handleMarcaChange = (event) => {
        const marcaId = event.target.value ? parseInt(event.target.value) : null;
        onMarcaChange(marcaId);
    };

    return (
        <div className={Styles.Main}>
            <select className={Styles.Main__select} value={marcaSelecionada || ''} onChange={handleMarcaChange}>
                <option className={Styles.Main__option} value="">Filtrar por marca</option>
                {marcas.map(marca => (
                    <option key={marca.id} value={marca.id}>{marca.nome}</option>
                ))}
            </select>
        </div>
    );
}

export default FiltroMarcas;
