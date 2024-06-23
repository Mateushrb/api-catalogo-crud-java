import React from "react";
import Styles from "../../../../Styles/Pages/Main/ModalCarrinho.module.scss";

function Modal({ produtosNoCarrinho, onClose, onFinalizarCompra }) {
    return (
        <div className={Styles.modalBackground}>
            <div className={Styles.modalContent}>
                <span className={Styles.close} onClick={onClose}>
                    &times;
                </span>
                <h2>Produtos Comprados</h2>
                <ul>
                    {Object.keys(produtosNoCarrinho).map((produtoId) => (
                        <li key={produtoId}>
                            Produto: {produtoId} - Quantidade: {produtosNoCarrinho[produtoId]}
                        </li>
                    ))}
                </ul>
                <button onClick={onFinalizarCompra} className={Styles.finalizarButton}>Finalizar Compra</button>
            </div>
        </div>
    );
}

export default Modal;
