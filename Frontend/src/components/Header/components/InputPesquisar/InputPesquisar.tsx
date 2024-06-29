import React from 'react';
import Styles from "../../../../Styles/Header/Input.module.scss"

function InputPesquisar({ onSearchChange }) {
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        onSearchChange(searchTerm);
    };

    return (
        <>
            <input
                className={Styles.Input}
                type="text"
                placeholder="Pesquisar produtos..."
                onChange={handleSearchChange}
            />
        </>
    );
}

export default InputPesquisar;
