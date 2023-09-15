// Interface para representar um produto
export interface TypesProduto {
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

// Interface para representar uma categoria
export interface TypesCategoria {
  id: number,
  nome: string
}
