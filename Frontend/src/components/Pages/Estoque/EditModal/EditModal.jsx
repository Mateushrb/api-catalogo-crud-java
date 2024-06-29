import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './EditModal.module.scss';
import CurrencyInput from 'react-currency-input-field';

const EditModal = ({ product, onSave, onClose }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [novaImagem, setNovaImagem] = useState(null);
    const [isProdutoSelecionado, setIsProdutoSelecionado] = useState(false);

    useEffect(() => {
        fetch('https://backend.suldailhanet.com.br/api/categoria')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar categorias');
                }
                return response.json();
            })
            .then(data => {
                console.log('Categorias recebidas:', data);
                setCategorias(data);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });

        fetch('https://backend.suldailhanet.com.br/api/marca')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar marcas');
                }
                return response.json();
            })
            .then(data => {
                console.log('Marcas recebidas:', data);
                setMarcas(data);
            })
            .catch(error => {
                console.error('Erro ao buscar marcas:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`handleChange: ${name} => ${value}`);
        if (name === 'categoria') {
            const selectedCategory = categorias.find(cat => cat.id === parseInt(value));
            setEditedProduct({ ...editedProduct, categoria: selectedCategory });
        } else if (name === 'marca') {
            const selectedMarca = marcas.find(marca => marca.id === parseInt(value));
            setEditedProduct({ ...editedProduct, marca: selectedMarca });
        } else {
            setEditedProduct({ ...editedProduct, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('Nova imagem selecionada:', file);
        setNovaImagem(file);
    };

    const handleCurrencyChange = (value) => {
        setEditedProduct({
            ...editedProduct,
            preco: value,
        });
    };

    const cadastrarImagem = async () => {
        try {
            const imagemData = new FormData();
            imagemData.append('imagem', novaImagem);

            const response = await fetch('https://backend.suldailhanet.com.br/api/imagem', {
                method: 'POST',
                body: imagemData,
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar imagem: ' + response.statusText);
            }

            const imageData = await response.json();
            const idImagem = imageData.id;
            console.log('Imagem cadastrada com sucesso. ID:', idImagem);
            return idImagem;
        } catch (error) {
            console.error('Erro ao cadastrar imagem:', error);
            throw error;
        }
    };

    const handleSave = async () => {
        console.log('Dados do produto a serem salvos:', editedProduct);

        let updatedProduct = { ...editedProduct };

        if (novaImagem) {
            console.log('Nova imagem selecionada:', novaImagem.name);

            try {
                const idImagem = await cadastrarImagem();
                updatedProduct.idImagem = idImagem;
            } catch (error) {
                console.error('Erro ao adicionar nova imagem:', error);
                alert(`Erro ao adicionar nova imagem: ${error.message}. Verifique o console para mais detalhes.`);
                return;
            }
        }

        fetch('https://backend.suldailhanet.com.br/api/produto', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
            .then(response => response.text().then(text => {
                if (!response.ok) {
                    console.error('Resposta do servidor:', text);
                    throw new Error(`Erro ao atualizar produto: ${text}`);
                }
                if (text.includes("Produto alterado com sucesso")) {
                    return { message: text };
                } else {
                    return JSON.parse(text);
                }
            }))
            .then(data => {
                console.log('Produto atualizado com sucesso:', data);
                onSave(editedProduct);
                onClose();
            })
            .catch(error => {
                console.error('Erro ao atualizar produto:', error);
                alert(`Erro ao atualizar produto: ${error.message}. Verifique o console para mais detalhes.`);
            });
    };

    useEffect(() => {
        setIsProdutoSelecionado(!!editedProduct.id);
    }, [editedProduct]);

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button className={styles.modalContent__closeButton} onClick={onClose}>x</button>
                <h2 className={styles.modalContent__Heading}>Editar Produto</h2>
                <form>
                    <div className={styles.modalContent__formGroup}>
                        <label className={styles.modalContent__formGroup__Label} htmlFor="nome">Nome do produto:</label>
                        <input className={styles.modalContent__formGroup__Input} type="text" id="nome" name="nome" value={editedProduct.nome} onChange={handleChange} />
                    </div>
                    <div className={styles.modalContent__formGroup}>
                        <label className={styles.modalContent__formGroup__Label} htmlFor="categoria">Categoria:</label>
                        <select className={styles.modalContent__formGroup__Select} id="categoria" name="categoria" value={editedProduct.categoria.id} onChange={handleChange}>
                            <option value="">Selecione uma categoria</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.modalContent__formGroup}>
                        <label className={styles.modalContent__formGroup__Label} htmlFor="marca">Marca:</label>
                        <select className={styles.modalContent__formGroup__Select} id="marca" name="marca" value={editedProduct.marca.id} onChange={handleChange}>
                            <option value="">Selecione uma marca</option>
                            {marcas.map(marca => (
                                <option key={marca.id} value={marca.id}>{marca.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.modalContent__formGroup}>
                        <label className={styles.modalContent__formGroup__Label} htmlFor="preco">Preço:</label>
                        <CurrencyInput
                            className={styles.modalContent__formGroup__Input}
                            id="preco"
                            name="preco"
                            value={editedProduct.preco}
                            decimalsLimit={2}
                            decimalSeparator=","
                            groupSeparator="."
                            prefix="R$ "
                            onValueChange={(value) => handleCurrencyChange(value)}
                        />
                    </div>
                    <div className={styles.modalContent__formGroup}>
                        <label className={styles.modalContent__formGroup__Label} htmlFor="quantidade">Quantidade do produto:</label>
                        <input className={styles.modalContent__formGroup__Input} type="number" id="quantidade" name="quantidade" value={editedProduct.quantidade} onChange={handleChange} />
                    </div>
                    <div className={styles.modalContent__formGroup}>
                        <label className={styles.modalContent__formGroup__Label} htmlFor="descricao">Descrição do produto:</label>
                        <textarea className={styles.modalContent__formGroup__TextArea} id="descricao" name="descricao" value={editedProduct.descricao} onChange={handleChange} />
                    </div>
                    <div className={styles.modalContent__formGroup}>
                        <label className={styles.modalContent__formGroup__Label} htmlFor="imagem">Adicionar nova imagem (opcional):</label>
                        <input className={styles.modalContent__formGroup__InputUpload} type="file" id="imagem" name="imagem" onChange={handleImageChange} />
                    </div>
                    <div className={styles.modalContent__modalButtons}>
                        <button type="button" onClick={handleSave} className={styles.modalContent__modalButtons__buttonSave}>Salvar</button>
                        <button type="button" onClick={onClose} className={styles.modalContent__modalButtons__buttonCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

EditModal.propTypes = {
    product: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EditModal;
