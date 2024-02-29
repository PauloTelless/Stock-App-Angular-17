export interface CategoryProducts{
  categoriaId: number,
  nomeCategoria: string,
  produtos: [
    produtoId: string,
    nomeProduto: string,
    descricaoProduto: string,
    categoriaName: string,
    precoProduto: string,
    quantidadeProduto: string,
    categoriaId: string
  ]
}
