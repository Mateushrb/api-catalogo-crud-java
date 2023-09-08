package br.edu.senai.sc.catalogo.Service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import br.edu.senai.sc.catalogo.Repository.ImagemRepository;
import br.edu.senai.sc.catalogo.entities.Imagem;

@Service
public class ImagemService {

	private final ImagemRepository imagemRepository;
	
	public ImagemService(ImagemRepository imagemRepository) {
		this.imagemRepository = imagemRepository;
	}
	
	public Imagem save(MultipartFile file) throws IOException {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		Imagem imagem = new Imagem(null, fileName, file.getContentType(), file.getBytes());
		
		return imagemRepository.save(imagem);
	}

	public void deleteById(String id) {
		imagemRepository.deleteById(id);
	}
	
	public Imagem get(String id) {
		return imagemRepository.findById(id).get();
	}
}
