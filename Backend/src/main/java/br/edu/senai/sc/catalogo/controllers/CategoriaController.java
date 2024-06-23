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

import br.edu.senai.sc.catalogo.Service.CategoriaService;
import br.edu.senai.sc.catalogo.entities.Categoria;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaController {
	
	private final CategoriaService categoriaService;
	
	public CategoriaController(CategoriaService categoriaService) {
		this.categoriaService = categoriaService;
	}
	
	@ApiOperation(value = "Cadastrar categoria")
	@PostMapping
	public ResponseEntity<String> cadastrarCategoria(@RequestBody Categoria categoria) {
		try {
			categoriaService.salvarCategoria(categoria);
		}catch (Exception exception) {
			return new ResponseEntity<>("Erro ao cadastrar a Categoria", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Categoria cadastrada com sucesso!", HttpStatus.CREATED);
	}
	
	@ApiOperation(value = "Buscar todas as categoria")
	@GetMapping
	public ResponseEntity<List<Categoria>> buscarCategorias() {
		try {
			List<Categoria> categoria = categoriaService.buscarCategorias();
			return new ResponseEntity<>(categoria, HttpStatus.OK);
		}catch (Exception exception) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "Buscar categoria por código")
	@GetMapping("/{codigo}")
	public ResponseEntity<Categoria> buscarCategoria(@PathVariable("codigo") Long codigo) {
		try {
			Optional<Categoria> categoria = categoriaService.buscarCategoriaPorCodigo(codigo);
			if(Optional.ofNullable(categoria).isPresent()) {
				return new ResponseEntity<>(categoria.get(), HttpStatus.OK);
			}
		}catch (Exception exception) {
			return new ResponseEntity<>(new Categoria(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(new Categoria(), HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value = "Buscar categoria por nome")
	@GetMapping("/nome")
	public ResponseEntity<List<Categoria>> buscarCategoria(@RequestParam("nome") String nome) {
		try {
			List<Categoria> categorias = categoriaService.buscarCategoriaPorNome(nome);
			return new ResponseEntity<>(categorias, HttpStatus.OK);
		}catch (Exception exception) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value = "Apagar categoria")
	@DeleteMapping("/{codigo}")
	public ResponseEntity<String> excluirCategoria(@PathVariable("codigo") Long codigo) {
		try {
			categoriaService.excluirCategoria(codigo);
		}catch (Exception exception) {
			return new ResponseEntity<>("Erro ao excluir a Categoria", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Categoria excluída com sucesso", HttpStatus.OK);
	}
	
	@ApiOperation(value = "Alterar categoria")
	@PutMapping
	public ResponseEntity<String> alterarCategoria(@RequestBody Categoria categoria) {
		try {
			categoriaService.salvarCategoria(categoria);
		}catch (Exception exception) {
			return new ResponseEntity<>("Erro ao atualizar Categoria!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Categoria alterada com sucesso!", HttpStatus.OK);
	}
	
	@ApiOperation(value = "Alterar o nome da categoria")
	@PatchMapping("/{codigo}")
	public ResponseEntity<String> alterarNome(@RequestParam("nome") String nome, @PathVariable("codigo") Long codigo) {
		try {
			categoriaService.alterarNome(nome, codigo);
		}catch (Exception exception) {
			return new ResponseEntity<>("Erro ao alterar a Categoria!", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Categoria alterada com sucesso!", HttpStatus.OK);
	}
	
}















