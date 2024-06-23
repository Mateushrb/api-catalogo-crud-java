package br.edu.senai.sc.catalogo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.edu.senai.sc.catalogo.Repository.MarcaRepository;
import br.edu.senai.sc.catalogo.entities.Marca;

@Service
public class MarcaService {

	private final MarcaRepository marcaRepository;
	
	public MarcaService(MarcaRepository marcaRepository) {
		this.marcaRepository = marcaRepository;
	}
	
	public Marca salvarMarca(Marca marca) {
		marcaRepository.save(marca);
		return marca;
	}
	
	public List<Marca> buscarMarcas() {
		return marcaRepository.findAll();
	}
	
	public Optional<Marca> buscarMarcaPorCodigo(Long codigo) {
		return marcaRepository.findById(codigo);
	}
	
	public List<Marca> buscarMarcaPorNome(String nome) {
		return marcaRepository.findMarcaByNomeContaining(nome);
	}
	
	public void excluirMarca(Long codigo) {
		marcaRepository.deleteById(codigo);
	}
	
	public void alterarNome(String nome, Long codig) {
		Optional<Marca> marca = marcaRepository.findById(codig);
		if(Optional.ofNullable(marca).isPresent()) {
			marca.get().setNome(nome);
			marcaRepository.save(marca.get());
		}
	}
	
}





