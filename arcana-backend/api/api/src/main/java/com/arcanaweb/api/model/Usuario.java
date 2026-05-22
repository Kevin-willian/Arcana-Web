package com.arcanaweb.api.model;

import com.arcanaweb.api.dto.DadosAtualizacaoUsuario;
import com.arcanaweb.api.dto.DadosCadastroUsuario;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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

    //metodo para atualizar dados, somente os q o usuario escolher, atualiza somente os q não vierem nulo no json ou sem
    public void atualizarInformacoes(@Valid DadosAtualizacaoUsuario dados) {
        if(dados.nome() != null){
            this.nome= dados.nome();
        }

        if(dados.sobrenome() != null){
            this.sobrenome= dados.sobrenome();
        }

        if(dados.email() != null){
            this.email= dados.email();
        }


        if(dados.endereco() != null){
            if(this.endereco == null){
                this.endereco = new Endereco(dados.endereco());
            } else {
                this.endereco.atualizarInformacoesEndereco(dados.endereco());
            }
        }
    }
}
