package br.edu.senai.sc.catalogo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.edu.senai.sc.catalogo.entities.Marca;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long>{
	
	List<Marca> findMarcaByNomeContaining(String nome);
	
	@Query(value = "select m from Marca m where m.nome like ?1")
	List<Marca> buscarMarcaPorNome(String nome);
}
