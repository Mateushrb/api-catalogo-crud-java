import React from 'react';
import Styles from '../../Styles/Footer/Footer.module.scss';
import LogoSenai from "../../assets/senai-logo.svg"

function Footer() {
  return (
    <>
      <footer className={Styles.Footer}>
        <div className={Styles.Footer__container}>
          <div className={Styles.Footer__childrenOne}>
            <img className={Styles.Footer__logoSenai} src={LogoSenai} alt="Logo Senai" width="120" height="120" />
          </div>
          <div className={Styles.Footer__childrenTwo}>
            <p className={Styles.Footer__title}>&copy; 2024 Refrigera PluS. Todos os direitos reservados.</p>
            <p className={Styles.Footer__subtitle}>Florianópolis - SC Brasil.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
