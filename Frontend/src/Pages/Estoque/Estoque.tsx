import { useEffect, useState } from 'react';
import API from '../../Hooks/useAPI';
import { Card, Button, Badge } from "react-bootstrap";

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

  const EstoqueStatus = (quantidade: number) => {
    if (quantidade > 5) {
      return 'Em-estoque';
    } else if (quantidade > 0) {
      return 'Estoque-baixo';
    } else {
      return 'Fora-de-estoque';
    }
  }

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  return (
    <div>
      <div className='container_estoque'>
        {produto?.map((produto) => (
          <div className="product-card" key={produto.id}>
            <Card>
              <div style={{ position: 'relative' }}>
                <Card.Img variant="top" src={`http://45.235.53.125:8080/api/imagem/${produto.idImagem}`} style={{ width: '100%' }} />
                <Badge
                  className={EstoqueStatus(produto.quantidade)}
                  bg={produto.quantidade > 0 ? 'success' : 'danger'}
                  text="light"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                  }}
                >
                  {EstoqueStatus(produto.quantidade)}
                </Badge>
              </div>
              <Card.Body>
                <Card.Title>{produto.nome}</Card.Title>
                <Card.Text>{produto.descricao}</Card.Text>
                <p>Preço: ${produto.preco.toFixed(2)}</p>
                <p>Quantidade: {produto.quantidade}</p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Estoque;
