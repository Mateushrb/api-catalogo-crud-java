import { useEffect, useState } from 'react';
import { useCustomApi } from '../../Hooks/useCustomApi';
import { TypesProduto } from '../../types/types'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primeicons/primeicons.css';
import '../../Style.css'

const Estoque = () => {
  const [data, setData] = useState<TypesProduto[]>([]);
  const { loading, error, getProduto } = useCustomApi<{ produtos: TypesProduto[] }>('api/produto');

  useEffect(() => {
    getProduto()
      .then((responseData) => {
        setData(responseData.produtos);
      })
      .catch((error) => console.log(error))
  }, [getProduto])

  if (loading) {
    return <div>Carregando..................</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      {data && data.map((produto: TypesProduto) => (
        <div key={produto.id}>
          <div>
            <h2>Detalhes do Produto</h2>
            <p>Nome: {produto.nome}</p>
            <p>Descrição: {produto.descricao}</p>
            <p>Preço: R$ {produto.preco.toFixed(2)}</p>
            <p>Quantidade: {produto.quantidade}</p>
            <p>Categoria: {produto.categoria.nome}</p>
            {/* Você pode adicionar mais campos conforme necessário */}
          </div>
          {/* Renderize os dados do produto aqui */}
        </div>

      ))}
    </div>
  );
};

export default Estoque;
