import React from 'react';
import Styles from '../../Styles/Pages/Main/BuyButton.module.scss'

function BuyButton({ onClick }) {
  return (
    <button className={Styles.BuyButton} onClick={onClick}>
      Comprar
    </button>
  );
}

export default BuyButton;
