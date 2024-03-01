export interface Category{
  categoriaId: string,
  nomeCategoria: string,
  produtos: [
    {
      nomeProduto: string,
      descricaoProduto: string,
      categoriaName: string,
      precoProduto: string,
      quantidadeProduto: string,
      categoriaId: string,
      categoria: string

    }
  ];
}
