package br.edu.senai.sc.catalogo.Service;

import java.util.List;
import java.util.Optional;
 
import org.springframework.stereotype.Service;

import br.edu.senai.sc.catalogo.Repository.CategoriaRepository;
import br.edu.senai.sc.catalogo.Repository.ProdutoRepository;
import br.edu.senai.sc.catalogo.entities.Categoria;
import br.edu.senai.sc.catalogo.entities.Produto;

@Service
public class ProdutoService {

	private final ProdutoRepository produtoRepository;
	private final CategoriaRepository categoriaRepository;
	
	public ProdutoService(ProdutoRepository produtoRepository, CategoriaRepository categoriaRepository) {
		this.produtoRepository = produtoRepository;
		this.categoriaRepository = categoriaRepository;
	}

	public Produto salvarProduto(Produto produto) {
		produtoRepository.save(produto);
		return produto;
	}
	
	public List<Produto> buscarProdutos() {
		return produtoRepository.findAll();
	}
	
	public Optional<Produto> buscarProdutoPorCodigo(Long codigo) {
		return produtoRepository.findById(codigo);
	}
	
	public List<Produto> buscarProdutoPorNome(String nome) {
		return produtoRepository.findProdutoByNomeContaining(nome);
	}
	
	public void excluirProduto(Long codigo) {
		produtoRepository.deleteById(codigo);
	}
	
	public void alterarNome(String nome, Long codigo) {
		Optional<Produto> produto = produtoRepository.findById(codigo);
		if(Optional.ofNullable(produto).isPresent()) {
			produto.get().setNome(nome);
			produtoRepository.save(produto.get());
		}
	}
	
	public Produto addCategoria(Long codigoProduto, Long codigoCategoria) {
		Optional<Produto> produto = produtoRepository.findById(codigoProduto);
		Optional<Categoria> categoria = categoriaRepository.findById(codigoCategoria);
		
		if(Optional.ofNullable(produto).isPresent() && Optional.ofNullable(categoria).isPresent()) {
			produto.get().setCategoria(categoria.get());
			categoria.get().addProduto(produto.get());
			produtoRepository.save(produto.get());
			categoriaRepository.save(categoria.get());
		}
		return produto.get();
	}
	
	public Produto removeCategoria(Long codigoProduto) {
		Optional<Produto> produto = produtoRepository.findById(codigoProduto);
		Categoria categoria = produto.get().getCategoria();
		if(Optional.ofNullable(produto).isPresent()) {
			produto.get().setCategoria(null);
			categoria.removeProduto(produto.get());
			produtoRepository.save(produto.get());
			categoriaRepository.save(categoria);
		}
		return produto.get();
	}
	
}
