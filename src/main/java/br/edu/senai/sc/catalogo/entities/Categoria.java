package br.edu.senai.sc.catalogo.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Categoria {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	
	@JsonIgnore
	@OneToMany
	private List<Produto> produtos = new ArrayList<>();
	
	public void addProduto(Produto produto) {
		this.produtos.add(produto);
	}
	public void removeProduto(Produto produto) {
		this.produtos.remove(produto);
	}
	
	
	public Categoria() {}
	
	public Categoria(Long id, String nome, List<Produto> produtos) {
		this.id = id;
		this.nome = nome;
		this.produtos = produtos;
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<Produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(List<Produto> produtos) {
		this.produtos = produtos;
	}
	
	
}
