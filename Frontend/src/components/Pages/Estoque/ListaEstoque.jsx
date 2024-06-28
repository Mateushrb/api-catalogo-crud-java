import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import GenerateReportButton from './GenerateReportButton';
import VisualizarModal from './VisualizarModal/VisualizarModal';
import styles from '../../../Styles/Pages/Estoque/ListaEstoque.module.scss';
import LupaIcon from '../../../assets/icon_lupa.svg';

const ListaEstoque = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [pesquisa, setPesquisa] = useState('');

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://45.235.53.125:8080/api/produto');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const sortedData = data.sort((a, b) => a.id - b.id);
                setProdutos(sortedData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    const handleDelete = (id) => {
        setProdutos(produtos.filter((produto) => produto.id !== id));
    };

    const handleEdit = (produtoEditado) => {
        const produtosAtualizados = produtos.map(produto =>
            produto.id === produtoEditado.id ? produtoEditado : produto
        );
        setProdutos(produtosAtualizados);
    };

    const handleVisualizar = (id) => {
        setProdutoSelecionado(id);
    };

    const handleGenerateReport = () => {
        const header = ['ID', 'Nome', 'Preço', 'Descrição', 'Quantidade'];
        const rows = produtos.map(produto => [
            produto.id,
            produto.nome,
            formatarPreco(produto.preco),
            produto.descricao,
            produto.quantidade
        ]);

        const csvContent = [
            header.join(';'),
            ...rows.map(row => row.join(';'))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'relatorio_estoque.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar produtos: {error.message}</div>;
    }

    const formatarPreco = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div>
            
            <div className={styles.Search}>
                <div className={styles.Search__Content}>
                    <input
                        type="text"
                        placeholder="Pesquisar produtos..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                        className={styles.Search__Content__InputSearch}
                    />
                    <img className={styles.Search__Content__Icon} src={LupaIcon} width="26" height="26" alt="Ícone de Lupa" />
                </div>
                <GenerateReportButton onClick={handleGenerateReport} />
            </div>
            <table className={styles.table}>
                <thead className={styles.table__tSection}>
                    <tr className={styles.table__tRow}>
                        <th className={styles.table__tHeader__left}>ID</th>
                        <th className={styles.table__tHeader}>Nome</th>
                        <th className={styles.table__tHeader}>Categoria</th>
                        <th className={styles.table__tHeader}>Marca</th>
                        <th className={styles.table__tHeader}>Preço</th>
                        <th className={styles.table__tHeader}>Quantidade</th>
                        <th className={styles.table__tHeader}>Status</th>
                        <th className={styles.table__tHeader__Button}>Ações</th>
                    </tr>
                </thead>
                <tbody className={styles.table__TableSection}>
                    {produtosFiltrados.map((produto) => (
                        <tr className={styles.table__tRow} key={produto.id}>
                            <td className={styles.table__tDetailed__idProduto}>{produto.id}</td>
                            <td className={styles.table__tDetailed}>{produto.nome}</td>
                            <td className={styles.table__tDetailed}>{produto.categoria?.nome}</td>
                            <td className={styles.table__tDetailed}>{produto.marca?.nome}</td>
                            <td className={styles.table__tDetailed}>
                                {typeof produto.preco === 'number' && produto.preco !== null && produto.preco !== undefined ? formatarPreco(produto.preco) : ''}
                            </td>
                            <td className={styles.table__tDetailed}>{produto.quantidade} un.</td>
                            <td className={styles.table__tDetailed}>
                                <div className={`${styles.circle} ${produto.quantidade > 11 ? styles['circle--available'] : styles['circle--unavailable']}`}></div>
                            </td>
                            <td className={styles.table__tDetailed__Buttons}>
                                <EditButton product={produto} onEdit={handleEdit} />
                                <DeleteButton productId={produto.id} productName={produto.nome} onDelete={handleDelete} />
                                <button className={styles.table__tDetailed__ButtonVisualizar} onClick={() => handleVisualizar(produto.id)}>Visualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {produtoSelecionado && (
                <VisualizarModal productId={produtoSelecionado} onClose={() => setProdutoSelecionado(null)} />
            )}
        </div>
    );
};

export default ListaEstoque;
