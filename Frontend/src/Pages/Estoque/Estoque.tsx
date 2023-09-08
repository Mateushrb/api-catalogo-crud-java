import { useApi } from '../../Hooks/useAPI';

type TypeProduto = {
  id: 0,
  nome: string,
  idImagem: string,
  descricao: string,
  preco: 0,
  quantidade: 0
  categoria: {
    id: 0,
    nome: string
  },
}

function Estoque() {
  const { data: produtos, loading, error } = useApi<TypeProduto>('produtos');

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar produtos: {error}</div>;
  }

  return (
    <div>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div>
          {produtos?.map((produto) => (
            <div key={produto.id}>
              <h2>Detalhes do Produto</h2>
              <p>Nome: {produto.nome}</p>
              <p>Descrição: {produto.descricao}</p>
              <p>Preço: R$ {produto.preco.toFixed(2)}</p>
              <p>Quantidade: {produto.quantidade}</p>
              <p>Categoria: {produto.categoria.id}</p>
              <img alt='Imagem produto' src={`http://45.235.53.125:8080/api/imagem/${produto.idImagem}`}></img>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Estoque;
