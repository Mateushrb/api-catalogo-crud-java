package br.edu.senai.sc.catalogo.Service;

import java.util.List;
import java.util.Optional;
 
import org.springframework.stereotype.Service;

import br.edu.senai.sc.catalogo.Repository.CategoriaRepository;
import br.edu.senai.sc.catalogo.Repository.ImagemRepository;
import br.edu.senai.sc.catalogo.Repository.MarcaRepository;
import br.edu.senai.sc.catalogo.Repository.ProdutoRepository;
import br.edu.senai.sc.catalogo.entities.Categoria;
import br.edu.senai.sc.catalogo.entities.Imagem;
import br.edu.senai.sc.catalogo.entities.Marca;
import br.edu.senai.sc.catalogo.entities.Produto;

@Service
public class ProdutoService {

	private final ProdutoRepository produtoRepository;
	private final CategoriaRepository categoriaRepository;
	private final MarcaRepository marcaRepository;
	private final ImagemRepository imagemRepository;
	
	public ProdutoService(ProdutoRepository produtoRepository, CategoriaRepository categoriaRepository, MarcaRepository marcaRepository, ImagemRepository imagemRepository) {
		this.produtoRepository = produtoRepository;
		this.categoriaRepository = categoriaRepository;
		this.marcaRepository = marcaRepository;
		this.imagemRepository = imagemRepository;
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
		if(buscarProdutoPorCodigo(codigo).get().getCategoria() != null) {
			removeCategoria(codigo);
		}
		if(buscarProdutoPorCodigo(codigo).get().getIdImagem() != "Sem imagem") {
			removeImagem(codigo);
		}
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
	
	public Produto addMarca(Long codigoProduto, Long codigoMarca) {
		Optional<Produto> produto = produtoRepository.findById(codigoProduto);
		Optional<Marca> marca = marcaRepository.findById(codigoMarca);
		
		if(Optional.ofNullable(produto).isPresent() && Optional.ofNullable(marca).isPresent()) {
			produto.get().setMarca(marca.get());
			marca.get().addProduto(produto.get());
			produtoRepository.save(produto.get());
			marcaRepository.save(marca.get());
		}
		return produto.get();
	}
	
	public Produto removeMarca(Long codigoProduto) {
		Optional<Produto> produto = produtoRepository.findById(codigoProduto);
		Marca marca = produto.get().getMarca();
		if(Optional.ofNullable(produto).isPresent()) {
			produto.get().setMarca(null);
			marca.removeProduto(produto.get());
			produtoRepository.save(produto.get());
			marcaRepository.save(marca);
		}
		return produto.get();
	}
	
	public Produto addImagem(Long codigoProduto, String codigoImagem) {
		Optional<Produto> produto = produtoRepository.findById(codigoProduto);
		Imagem imagem = imagemRepository.findById(codigoImagem).get();
		
		if(Optional.ofNullable(produto).isPresent() && Optional.ofNullable(imagem).isPresent()) {
			produto.get().setImagem(imagem);
			imagem.setProduto(produto.get());
			produtoRepository.save(produto.get());
			imagemRepository.save(imagem);
		}
		return produto.get();
	}
	
	public Produto removeImagem(Long codigoProduto) {
		Optional<Produto> produto = produtoRepository.findById(codigoProduto);
		String codigoImagem = produto.get().getIdImagem();
		if(Optional.ofNullable(produto).isPresent()) {
			produto.get().setImagem(null);
			produtoRepository.save(produto.get());
			imagemRepository.deleteById(codigoImagem);
		}
		return produto.get();
	}
	
	public Produto aumentarQuantidade(Long codigoProduto) {
		Optional<Produto> produto = produtoRepository.findById(codigoProduto);
		Long quantidade = produto.get().getQuantidade();
		if(Optional.ofNullable(produto).isPresent()) {
			produto.get().setQuantidade(quantidade+1);
			produtoRepository.save(produto.get());
		}
		return produto.get();
	}
	
	public Produto diminuirProduto(Long codigoProduto) {
		Optional<Produto> produto = produtoRepository.findById(codigoProduto);
		Long quantidade = produto.get().getQuantidade();
		if(Optional.ofNullable(produto).isPresent()) {
			produto.get().setQuantidade(quantidade-1);
			produtoRepository.save(produto.get());
		}
		return produto.get();
	}
	
}






