import React, { useEffect, useState } from 'react'
import API from '../Hooks/useAPI';
import { Card, Button, Badge } from "react-bootstrap";

interface TypeCatologoCard {
  id: number,
  nome: string,
  idImagem: string,
  descricao: string,
  preco: number,
  quantidade: number
}

const CatalogoCard = () => {
  const [cardProduto, setCardProduto] = useState<TypeCatologoCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

    API.getProduto()
      .then((data) => {
        setCardProduto(data);
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
    <div className='container_catalogo'>
      {cardProduto.map((catalogo) => (
        <div className="product-card" key={catalogo.id}>
          <Card>
            <div style={{ position: 'relative' }}>
              <Card.Img variant="top" src={`http://45.235.53.125:8080/api/imagem/${catalogo.idImagem}`} style={{ width: '100%' }} />
              <Badge
                className={EstoqueStatus(catalogo.quantidade)}
                bg={catalogo.quantidade > 0 ? 'success' : 'danger'}
                text="light"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                }}
              >
                {EstoqueStatus(catalogo.quantidade)}
              </Badge>
            </div>
            <Card.Body>
              <Card.Title>{catalogo.nome}</Card.Title>
              <Card.Text>{catalogo.descricao}</Card.Text>
              <p>Preço: ${catalogo.preco.toFixed(2)}</p>
              <p>Quantidade: {catalogo.quantidade}</p>
              <Card.Footer>
                <Button className='cadastroButton' variant="primary">Comprar</Button>
              </Card.Footer>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>

  )
}

export default CatalogoCard
