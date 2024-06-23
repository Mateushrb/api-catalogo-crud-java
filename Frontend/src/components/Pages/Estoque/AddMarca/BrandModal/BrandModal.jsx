import React, { useState } from 'react';
import styles from './BrandModal.module.scss';

const BrandModal = ({ onClose }) => {
    const [marca, setMarca] = useState('');

    const handleBrandNameChange = (e) => {
        setMarca(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://45.235.53.125:8080/api/marca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: 0, nome: marca }), // Ajustado para o formato correto
            });

            if (response.ok) {
                alert('Marca adicionada com sucesso!');
                onClose();
            } else {
                alert('Falha ao adicionar a marca.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar a marca.');
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.modalContent__closeButton} onClick={onClose}>x</button>
                <h2 className={styles.modalContent__Heading}>Adicionar nova marca</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.modalContent__formGroup}>
                        <label className={styles.modalContent__formGroup__Label} htmlFor="marca">Nome da marca:</label>
                        <input
                            type="text"
                            id="marca"
                            value={marca}
                            onChange={handleBrandNameChange}
                            className={styles.modalContent__formGroup__Input}
                            required
                        />
                    </div>
                    <div className={styles.modalContent__modalButtons}>
                        <button type="submit" className={styles.modalContent__modalButtons__buttonSave}>Salvar</button>
                        <button type="button" onClick={onClose} className={styles.modalContent__modalButtons__buttonCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BrandModal;
