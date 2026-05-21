package com.arcanaweb.api.model;

import com.arcanaweb.api.dto.DadosEndereco;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Endereco {
    private String rua;
    private String numero;
    private String cep;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;

    public Endereco (DadosEndereco dados){
        this.rua= dados.rua();
        this.numero= dados.numero();
        this.cep= dados.cep();
        this.complemento= dados.complemento();
        this.bairro= dados.bairro();
        this.cidade= dados.cidade();
        this.uf = dados.uf();

    }
}
