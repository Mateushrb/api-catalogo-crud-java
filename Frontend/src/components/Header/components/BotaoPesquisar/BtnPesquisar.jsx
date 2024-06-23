import React from 'react';
import Styles from "../../../../Styles/Header/BtnPesquisar.module.scss"

function BtnPesquisar() {
    return (
        <>
            <button className={Styles.BtnPesquisar} type="submit">Pesquisar</button>
        </>
    );
}

export default BtnPesquisar;
