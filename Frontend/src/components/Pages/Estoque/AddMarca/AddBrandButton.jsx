import React, { useState } from 'react';
import BrandModal from './BrandModal/BrandModal';
import styles from'./AddBrandButton.module.scss'

const AddBrandButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button  className={styles.MarcaButton} onClick={handleOpenModal}>Adicionar nova marca</button>
            {isModalOpen && <BrandModal onClose={handleCloseModal} />}
        </div>
    );
};

export default AddBrandButton;
