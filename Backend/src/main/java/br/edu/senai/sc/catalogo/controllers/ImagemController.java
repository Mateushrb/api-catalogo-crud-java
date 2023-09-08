package br.edu.senai.sc.catalogo.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.edu.senai.sc.catalogo.Service.ImagemService;
import br.edu.senai.sc.catalogo.entities.Imagem;
import io.swagger.annotations.ApiOperation;


@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/imagem")
public class ImagemController {

	private final ImagemService imagemService;
	
	public ImagemController(ImagemService imagemService) {
		this.imagemService = imagemService;
	}
	
	@ApiOperation(value = "Excluir imagem")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable String id) {
		imagemService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@ApiOperation(value = "Cadastrar imagem")
	@PostMapping
	public ResponseEntity<Imagem> save(@RequestParam("imagem") MultipartFile multipartFile) throws IOException {
		Imagem imagem = imagemService.save(multipartFile);
		
		return ResponseEntity.ok().body(imagem);
	}
	
	@ApiOperation(value = "Buscar imagem por código")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public void showImage(@PathVariable String id, HttpServletResponse response) throws IOException {
		Imagem imagem = imagemService.get(id);
		
		response.setContentType(imagem.getTipo());
		response.getOutputStream().write(imagem.getDadosImagem());
		response.getOutputStream().close();
	}
}
