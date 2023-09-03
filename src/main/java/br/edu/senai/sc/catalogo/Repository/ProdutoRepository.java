package br.edu.senai.sc.catalogo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.senai.sc.catalogo.entities.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
