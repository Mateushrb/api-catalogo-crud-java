package br.edu.senai.sc.catalogo.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.edu.senai.sc.catalogo.Service.MarcaService;
import br.edu.senai.sc.catalogo.entities.Marca;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/marca")
public class MarcaController {
	
	private final MarcaService marcaService;
	
	public MarcaController(MarcaService marcaService) {
		this.marcaService = marcaService;
	}
	
	@ApiOperation(value = "Cadastrar marca")
	@PostMapping
	public ResponseEntity<String> cadastrarMarca(@RequestBody Marca marca) {
		try {
			marcaService.salvarMarca(marca);
		}catch (Exception exception ) {
			return new ResponseEntity<>("Erro ao cadastrar a Marca", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Marca cadastrada com sucesso!", HttpStatus.CREATED);
	}
	
	@ApiOperation(value = "Buscas todas as marcas")
	@GetMapping
	public ResponseEntity<List<Marca>> buscarMarcas() {
		try {
			List<Marca> marca = marcaService.buscarMarcas();
			return new ResponseEntity<>(marca, HttpStatus.OK);
		}catch (Exception exception ) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
		}		
	}
	
	@ApiOperation(value = "Buscar marca por código")
	@GetMapping("/{codigo}")
	public ResponseEntity<Marca> buscarMarca(@PathVariable("codigo") Long codigo) {
		try {
			Optional<Marca> marca = marcaService.buscarMarcaPorCodigo(codigo);
			if(Optional.ofNullable(marca).isPresent()) {
				return new ResponseEntity<>(marca.get(), HttpStatus.OK);
			}
		}catch (Exception exception) {
			return new ResponseEntity<>(new Marca(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(new Marca(), HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "Buscar marca por nome")
	@GetMapping("/nome")
	public ResponseEntity<List<Marca>> buscarMarca(@RequestParam("nome") String nome) {
		try {
			List<Marca> marcas = marcaService.buscarMarcaPorNome(nome);
			return new ResponseEntity<>(marcas, HttpStatus.OK);
		}catch (Exception exception) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "Apagar marca")
	@DeleteMapping("/{codigo}")
	public ResponseEntity<String> excluirMarca(@PathVariable("codigo") Long codigo) {
		try {
			marcaService.excluirMarca(codigo);
		}catch (Exception exception) {
			return new ResponseEntity<>("Erro ao excluir a Marca", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Marca excluída com sucesso", HttpStatus.OK);
	}
	
	@ApiOperation(value = "Alterar marca")
	@PutMapping
	public ResponseEntity<String> alterarMarca(@RequestBody Marca marca) {
		try {
			marcaService.salvarMarca(marca);
		}catch (Exception exception) {
			return new ResponseEntity<>("Erro ao atualizar a Marca", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Marca alterada com sucesso", HttpStatus.OK);
	}
	
	@ApiOperation(value = "Alterar o nome da Marca")
	@PatchMapping("/{codigo}")
	public ResponseEntity<String> alterarNome(@RequestParam("nome") String nome, @PathVariable("codigo") Long codigo) {
		try {
			marcaService.alterarNome(nome, codigo);
		}catch (Exception exception) {
			return new ResponseEntity<>("Erro ao alterar a Marca!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Marca alterada com sucesso!", HttpStatus.OK);
	}
}







