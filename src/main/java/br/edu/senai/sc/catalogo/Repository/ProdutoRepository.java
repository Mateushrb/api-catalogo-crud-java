package br.edu.senai.sc.catalogo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.senai.sc.catalogo.entities.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
	
	List<Produto> findProdutoByNomeContaining(String nome);
	
	@Query(value = "select c from Produto c where c.nome like ?1")
	List<Produto> buscarProdutoPorNome(String nome);

}
