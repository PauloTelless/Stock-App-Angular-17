export interface ProductsCategories{
  categoriaId: string,
  nomeCategoria: string,
  produtos: [
    {
      produtoId: string,
      nomeProduto: string,
      descricaoProduto: string,
      precoProduto: string,
      quantidadeProduto: string,
      categoriaId: string
    }
  ]
}
