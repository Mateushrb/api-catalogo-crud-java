## Desenvolvimento de uma API em Java utilizando Spring Framework.

# API - Catálogo de Produtos <sup>```1.0```</sup>

**Versão:** ```1.0```

Esta é uma API para o cadastro de produtos.

A documentação está disponível no seguinte endpoint: ```http://localhost:8080/swagger-ui/```

**Licença:** Open Source ([Mais informações](https://opensource.org/))

 ### Métodos Disponíveis

Os seguintes métodos estão disponíveis na API:
#EBF3FB
1. <span style="background:#E8F6F0">**Create**</span>  - Criar um novo produto.
2. <span style="background:#EBF3FB">**Read**</span> - Ler informações de um produto.
3. <span style="background:#FBF1E6">**Update**</span> - Atualizar informações de um produto.
4. <span style="background:#FAE7E7">**Delete**</span> - Excluir um produto.
5. <span style="background:#50E3C2">**Patch**</span> - Atualizar parcialmente um produto.

#### Notas da Versão 1.0

- Para cadastrar um produto, é necessário fornecer:
  - Nome
  - Descrição
  - Preço
  - Quantidade

- Também é possível cadastrar uma categoria, fornecendo apenas o nome e, em seguida, adicioná-la a um produto.
