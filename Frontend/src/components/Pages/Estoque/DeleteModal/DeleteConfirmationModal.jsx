import React from 'react';
import PropTypes from 'prop-types';
import styles from './DeleteConfirmationModal.module.scss';

const DeleteConfirmationModal = ({ isOpen, productName, onConfirm, onCancel }) => {
    if (!isOpen) {
        return null;
    }

    const handleConfirm = () => {
        onConfirm();
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
            <button className={styles.modalContent__closeButton} onClick={onCancel}>x</button>
                <p className={styles.modalContent__Paragraph}>Deseja deletar o produto <strong>{productName}</strong>?</p>
                <div className={styles.modalButtons}>
                    <button className={styles.modalButtons__confirmButton} onClick={handleConfirm}>Confirmar</button>
                    <button className={styles.modalButtons__cancelButton} onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

DeleteConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    productName: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;
