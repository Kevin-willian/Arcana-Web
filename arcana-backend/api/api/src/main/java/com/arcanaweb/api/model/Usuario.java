package com.arcanaweb.api.model;

import com.arcanaweb.api.dto.DadosCadastroUsuario;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;


@Table(name = "usuario")
@Entity(name = "Usuario")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String sobrenome;

    @Column(unique = true) // define a coluna email como unica no banco de dados
    private String email;

    private String senha;

    @Embedded // puxa o DTO Endereço
    Endereco endereco;

    @CreationTimestamp
    private Date dataCriacao;

    private Boolean ativo;

    public Usuario(@Valid DadosCadastroUsuario dados) {
        this.ativo=true;
        this.nome= dados.nome();
        this.sobrenome= dados.sobrenome();
        this.email= dados.email();
        this.senha= dados.senha();
        this.endereco = dados.endereco() != null ? new Endereco(dados.endereco()) : null; // verifica se o endereço veio no cadastro se não veio deixa null
    }


}
