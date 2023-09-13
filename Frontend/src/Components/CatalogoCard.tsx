import React from 'react'
import { Card, Image, Button } from "react-bootstrap";

interface TypeCatologoCard {
  id: 0,
  nome: string,
  idImagem: string,
  descricao: string,
  preco: 0,
  quantidade: 0
}

const CatalogoCard: React.FC<TypeCatologoCard> = ({ nome, descricao, idImagem, preco, quantidade }) => {
  return (
    <Card>
      <Card.Img variant="top" src={idImagem} />
      <Card.Body>
        <Card.Title>{nome}</Card.Title>
        <Card.Text>{descricao}</Card.Text>
        <p>Preço: ${preco.toFixed(2)}</p>
        <p>Quantidade disponível: {quantidade}</p>
        <Card.Footer>
          <Button className='cadastroButton' variant="primary">Comprar</Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  )
}

export default CatalogoCard
