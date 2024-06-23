import React from 'react';
import Styles from '../../../../Styles/Pages/Main/ModalConfirmacao.module.scss';

const ModalConfirmacao = ({ produto, onConfirm, onCancel }) => {
  if (!produto) return null;

  return (
    <div className={Styles.Modal}>
      <div className={Styles.Modal__Content}>
        <button className={Styles.Modal__closeButton} onClick={onCancel}>x</button>
        <p className={Styles.Modal__richText}>Tem certeza que deseja excluir o produto "{produto.nome}"?</p>
        <div className={Styles.Modal__contentButton}>
        <button className={Styles.Modal__buttonSim} onClick={onConfirm}>Sim</button>
        <button className={Styles.Modal__buttonNao} onClick={onCancel}>Não</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;
