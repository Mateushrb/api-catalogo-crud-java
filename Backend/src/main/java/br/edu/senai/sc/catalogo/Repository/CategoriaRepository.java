package br.edu.senai.sc.catalogo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.senai.sc.catalogo.entities.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
	
	List<Categoria> findCategoriaByNomeContaining(String nome);
	
	@Query(value = "select c from Categoria c where c.nome like ?1")
	List<Categoria> buscarCategoriaPorNome(String nome);
}
