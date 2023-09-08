// Interface para representar um produto
export interface TypesProduto {
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

// Interface para representar uma categoria
export interface TypesCategoria {
  id: 0,
  nome: string
}
