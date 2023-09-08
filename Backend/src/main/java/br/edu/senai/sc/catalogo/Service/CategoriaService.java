package br.edu.senai.sc.catalogo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.edu.senai.sc.catalogo.Repository.CategoriaRepository;
import br.edu.senai.sc.catalogo.entities.Categoria;

@Service
public class CategoriaService {
	
	private final CategoriaRepository categoriaRepository;
	
	public CategoriaService(CategoriaRepository categoriaRepository) {
		this.categoriaRepository = categoriaRepository;
	}
	
	public Categoria salvarCategoria(Categoria categoria) {
		categoriaRepository.save(categoria);
		return categoria;
	}
	
	public List<Categoria> buscarCategorias() {
		return categoriaRepository.findAll();
	}
	
	public Optional<Categoria> buscarCategoriaPorCodigo(Long codigo) {
		return categoriaRepository.findById(codigo);
	}
	
	public List<Categoria> buscarCategoriaPorNome(String nome) {
		return categoriaRepository.findCategoriaByNomeContaining(nome);
	}
	
	public void excluirCategoria(Long codigo) {
		categoriaRepository.deleteById(codigo);
	}
	
	public void alterarNome(String nome, Long codigo) {
		Optional<Categoria> categoria = categoriaRepository.findById(codigo);
		if(Optional.ofNullable(categoria).isPresent()) {
			categoria.get().setNome(nome);
			categoriaRepository.save(categoria.get());
		}
	}
}






