import { useEffect, useState } from 'react';
import API from '../../Hooks/useAPI';

type TypeProduto = {
  id: number,
  nome: string,
  idImagem: string,
  descricao: string,
  preco: number,
  quantidade: number
  categoria: {
    id: number,
    nome: string
  },
}

function Estoque() {
  const [produto, setProduto] = useState<TypeProduto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);

    API.getProduto()
      .then((data) => {
        setProduto(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <div>
      <div>
        {produto?.map((produto) => (
          <div key={produto.id}>
            <h2>Detalhes do Produto</h2>
            <p>Nome: {produto.nome}</p>
            <p>Descrição: {produto.descricao}</p>
            <p>Preço: R$ {produto.preco.toFixed(2)}</p>
            <p>Quantidade: {produto.quantidade}</p>
            <p>Categoria: {produto.categoria.nome}</p>
            <img alt='Imagem produto' src={`http://45.235.53.125:8080/api/imagem/${produto.idImagem}`}></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Estoque;
