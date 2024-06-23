import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteConfirmationModal from './DeleteModal/DeleteConfirmationModal';
import styles from '../../../Styles/Pages/Estoque/DeleteButton.module.scss';

const DeleteButton = ({ productId, productName, onDelete }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://45.235.53.125:8080/api/produto/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onDelete(productId);
            setModalOpen(false);
        } catch (err) {
            console.error("Erro ao deletar o produto:", err);
        }
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <button className={styles.deleteButton} onClick={handleOpenModal}>
                Deletar
            </button>
            <DeleteConfirmationModal
                isOpen={modalOpen}
                productName={productName}
                onConfirm={handleDelete}
                onCancel={handleCloseModal}
            />
        </>
    );
};

DeleteButton.propTypes = {
    productId: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
