import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './BrandModal.module.scss';

const BrandModal = ({ onClose }) => {
    const [marca, setMarca] = useState('');

    const handleBrandNameChange = (e) => {
        setMarca(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const checkResponse = await fetch(`https://backend.suldailhanet.com.br/api/marca/nome?nome=${marca}`);
            if (checkResponse.ok) {
                const checkData = await checkResponse.json();
                if (checkData.length > 0) {
                    toast.error('Marca já cadastrada.');
                    return;
                }
            }


            const response = await fetch('https://backend.suldailhanet.com.br/api/marca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: 0, nome: marca }),
            });

            if (response.ok) {
                const id = toast.success('Marca adicionada com sucesso!', {
                    onClose: () => {
                        onClose();
                        window.location.reload();
                    }
                });
            } else {
                toast.error('Falha ao adicionar a marca.');
            }
        } catch (error) {
            console.error('Erro:', error);
            toast.error('Erro ao adicionar a marca.');
        }
    };

    return (
        <div className={styles.modal}>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
