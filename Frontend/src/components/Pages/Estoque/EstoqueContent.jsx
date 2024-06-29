import React, { useState, useEffect } from 'react';
import Styles from '../../../Styles/Pages/Estoque/EstoqueContent.module.scss';
import ListaEstoque from "./ListaEstoque";
import { FaArrowUp } from 'react-icons/fa';
import CurrencyInput from 'react-currency-input-field';
import { toast, ToastContainer } from 'react-toastify';
import AddBrandButton from './AddMarca/AddBrandButton';

function EstoqueContent() {
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [imagem, setImagem] = useState(null);
  const [idProduto, setIdProduto] = useState(null);
  const [marcaId, setMarcaId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('https://backend.suldailhanet.com.br/api/categoria');
        if (!response.ok) {
          throw new Error('Erro ao obter categorias: ' + response.statusText);
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Erro ao obter categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await fetch('https://backend.suldailhanet.com.br/api/marca');
        if (!response.ok) {
          throw new Error('Erro ao obter marcas: ' + response.statusText);
        }
        const data = await response.json();
        setMarcas(data);
      } catch (error) {
        console.error('Erro ao obter marcas:', error);
      }
    };

    fetchMarcas();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'categoriaId':
        setCategoriaId(value);
        break;
      case 'descricao':
        setDescricao(value);
        break;
      case 'nome':
        setNome(value);
        break;
      case 'quantidade':
        setQuantidade(value);
        break;
      case 'marcaId':
        setMarcaId(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (event) => {
    setImagem(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const idImagem = await cadastrarImagem();
      const idProdutoResponse = await cadastrarProduto(idImagem);

      await atualizarProdutoComImagem(idImagem, idProdutoResponse);

      console.log('Produto cadastrado com sucesso e imagem associada.');
      setShowModal(false);
      toast.success('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  const handleCurrencyChange = (value) => {
    setPreco(value);
  };

  const cadastrarImagem = async () => {
    try {
      const imagemData = new FormData();
      imagemData.append('imagem', imagem);

      const response = await fetch('https://backend.suldailhanet.com.br/api/imagem', {
        method: 'POST',
        body: imagemData
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

  const cadastrarProduto = async (idImagem) => {
    try {
      const precoNumerico = parseFloat(preco.replace('R$', '').replace('.', '').replace(',', '.'));

      const produtoData = {
        categoria: { id: categoriaId },
        descricao,
        nome,
        preco: precoNumerico,
        quantidade,
        idImagem,
        marca: { id: marcaId }
      };

      const response = await fetch('https://backend.suldailhanet.com.br/api/produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(produtoData)
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar produto: ' + response.statusText);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const produtoDataResponse = await response.json();
        const idProdutoResponse = produtoDataResponse.id;
        setIdProduto(idProdutoResponse);
        return idProdutoResponse;
      } else {
        const text = await response.text();
        console.log('Resposta do servidor:', text);
        return null;
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      throw error;
    }
  };

  const atualizarProdutoComImagem = async (idImagem, idProdutoResponse) => {
    try {
      const url = `https://backend.suldailhanet.com.br/api/produto/addImagem?imagem=${idImagem}&produto=${idProdutoResponse}`;

      const response = await fetch(url, {
        method: 'PATCH'
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar produto com imagem: ' + response.statusText);
      }

      console.log('Produto atualizado com imagem com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar produto com imagem:', error);
      throw error;
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToastClose = () => {
    setShowToast(false);
    window.location.reload();
  };

  return (
    <>
      <div className={Styles.EstoqueMain}>
        <div className={Styles.EstoqueMain__containerButton}>
          <button className={Styles.Estoque__add_button} onClick={openModal}>
            Adicionar novo produto
          </button>
          <AddBrandButton />
        </div>
        <ListaEstoque />
        {showModal && (
          <div className={Styles.Modal} onClick={closeModal}>
            <div className={Styles.Modal__content} onClick={(e) => e.stopPropagation()}>
              <button className={Styles.Modal__content__closeButton} onClick={closeModal}>X</button>
              <form className={Styles.Modal__content__form} onSubmit={handleSubmit}>
                <div className={Styles.Modal__content__formGroup}>
                  <h2 className={Styles.Modal__content__title}>Adicionar novo produto</h2>
                  <label className={Styles.Modal__content__label} htmlFor="nome">
                    Nome do produto:
                    <input
                      className={Styles.Modal__content__formControl}
                      name="nome"
                      type="text"
                      value={nome}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className={Styles.Modal__content__formGroup}>
                  <label className={Styles.Modal__content__label} htmlFor="categoriaId">
                    Categoria:
                    <select
                      className={Styles.Modal__content__formControl}
                      name="categoriaId"
                      value={categoriaId}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione uma categoria</option>
                      {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className={Styles.Modal__content__formGroup}>
                  <label className={Styles.Modal__content__label} htmlFor="marcaId">
                    Marca:
                    <select
                      className={Styles.Modal__content__formControl}
                      name="marcaId"
                      value={marcaId}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecione uma marca</option>
                      {marcas.map(marca => (
                        <option key={marca.id} value={marca.id}>{marca.nome}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className={Styles.Modal__content__formGroup}>
                  <label className={Styles.Modal__content__label} htmlFor="preco">
                    Preço:
                    <CurrencyInput
                      className={Styles.Modal__content__formControl}
                      id="preco"
                      name="preco"
                      value={preco}
                      decimalsLimit={2}
                      decimalSeparator=","
                      groupSeparator="."
                      prefix="R$ "
                      onValueChange={handleCurrencyChange}
                    />
                  </label>
                </div>
                <div className={Styles.Modal__content__formGroup}>
                  <label className={Styles.Modal__content__label} htmlFor="quantidade">
                    Quantidade:
                    <input
                      className={Styles.Modal__content__formControl}
                      name="quantidade"
                      type="number"
                      value={quantidade}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className={Styles.Modal__content__formGroup}>
                  <label className={Styles.Modal__content__label} htmlFor="descricao">
                    Descrição do produto:
                    <textarea
                      className={Styles.Modal__content__formControl}
                      name="descricao"
                      value={descricao}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className={Styles.Modal__content__formGroup}>
                  <label className={Styles.Modal__content__label} htmlFor="imagem">
                    Imagem do produto:
                    <input
                      className={Styles.Modal__content__formControl__Upload}
                      name="imagem"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div className={Styles.Modal__content__containerAdd}>
                  <button className={Styles.Modal__content__containerAdd__addButton} type="submit">Cadastrar Produto</button>
                  <button className={Styles.Modal__content__containerAdd__closeButton} onClick={closeModal}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showScrollButton && (
          <button className={Styles.ScrollToTopButton} onClick={scrollToTop}>
            <FaArrowUp />
          </button>
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          onClose={handleToastClose}
        />
        {showToast && (
          toast.success('Produto cadastrado com sucesso!')
        )}
      </div>
    </>
  );
}

export default EstoqueContent;
