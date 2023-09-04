## Desenvolvimento de uma API em Java utilizando Spring Framework.

# API - Catálogo de Produtos <sup>```1.0```</sup>

**Versão:** ```1.0```

Esta é uma API para o cadastro de produtos.

A documentação está disponível no seguinte endpoint: ```http://localhost:8080/swagger-ui/```

**Licença:** Open Source ([Mais informações](https://opensource.org/))

 ### Métodos Disponíveis

Os seguintes métodos estão disponíveis na API:
#EBF3FB
1. **Create** - Criar um novo produto.
2. **Read** - Ler informações de um produto.
3. **Update** - Atualizar informações de um produto.
4. **Delete** - Excluir um produto.
5. **Patch** - Atualizar parcialmente um produto.

#### Notas da Versão 1.0

- Para cadastrar um produto, é necessário fornecer:
  - Nome
  - Descrição
  - Preço
  - Quantidade

- Também é possível cadastrar uma categoria, fornecendo apenas o nome e, em seguida, adicioná-la a um produto.
