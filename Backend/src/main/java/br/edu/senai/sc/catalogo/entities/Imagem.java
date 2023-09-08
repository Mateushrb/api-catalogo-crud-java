package br.edu.senai.sc.catalogo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Imagem {
	
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	
	private String nome;
	private String tipo;
	
	@JsonIgnore
	@OneToOne(mappedBy = "imagem")
	private Produto produto;
	
	public Produto getProduto() {
		return produto;
	}
	public void setProduto(Produto produto) {
		this.produto = produto;
	}
	public void removeProduto() {
		this.produto = null;
	}
	
	@javax.persistence.Lob
	private byte[] dadosImagem;
	
	public Imagem() {}
	
	public Imagem(String id, String nome, String tipo, byte[] dadosImagem) {
		super();
		this.id = id;
		this.nome = nome;
		this.tipo = tipo;
		this.dadosImagem = dadosImagem;
	}
	
	public String getId() {
		return id;
		
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	
	public byte[] getDadosImagem() {
		return dadosImagem;
	}
	public void setDadosImagem(byte[] dadosImagem) {
		this.dadosImagem = dadosImagem;
	}
}
