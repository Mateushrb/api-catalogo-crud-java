package br.edu.senai.sc.catalogo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfiguration {
	
	@Bean
	Docket detalhesApio() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.any())
				.paths(PathSelectors.any())
				.build()
				.apiInfo(this.infosApi());
	}
	
	private ApiInfo infosApi() {
		return new ApiInfoBuilder()
				.version("1.0")
				.title("API - Catalogo de produtos")
				.description("API para cadastro de produtos.\nPara cadastrar um produto é necessário fornecer um nome, descrição, preço e quantidade.\nTambém é possível cadastrar uma categoria, fornecendo apenas o nome e em seguida adicioná-la a um produto.\n\nOs seguintes métodos estão disponíveis: Create, Read, Update, Delete e Patch.")
				.termsOfServiceUrl("https://sc.senai.br/")
				.license("Licenciada para todos")
				.licenseUrl("https://opensource.org/")
				.contact(new Contact("Mateus Henrique", "https://github.com/Mateushrb", ""))
				.build();
	}
}
