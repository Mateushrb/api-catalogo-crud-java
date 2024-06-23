import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputPesquisar from './components/InputPesquisar/InputPesquisar'
import BtnPesquisar from './components/BotaoPesquisar/BtnPesquisar'
import Styles from '../../Styles/Header/Header.module.scss';
import LogoRefrigera from '../../assets/logo_refrigera.png'
import iconHome from '../../assets/icon_home01.svg'
import iconManagement from '../../assets/icon_chart01.svg'
import iconBox from '../../assets/icon_box01.svg'

function Header() {

  return (
    <header className={Styles.Header}>
      <div className={Styles.Header__container}>
        <Link to="/">
        <img src={LogoRefrigera} width="120" height="68" alt="Refrigera PluS" className={Styles.Header__container__logo} />
        </Link>
        <nav className={Styles.Header__container__nav}>
          <ul>
            <li className={Styles.Header__item}>
              <a className={Styles.Header__link} href="/">Página Inicial
                {/* <img src={iconHome} alt="Icone Inicio" className={Styles.Header__container__icon} /> */}
              </a>
            </li>
            <li className={Styles.Header__item}>
              <a className={Styles.Header__link} href="/gestao">Gestão
                {/* <img src={iconManagement} alt="Icone Gestão" className={Styles.Header__container__icon} /> */}
              </a>
            </li>
            <li className={Styles.Header__item}>
              <a className={Styles.Header__link} href="/estoque">Estoque
                {/* <img src={iconBox} alt="Icone Estoque" className={Styles.Header__container__icon} /> */}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
