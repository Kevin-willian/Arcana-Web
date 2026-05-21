package com.arcanaweb.api.dto;

import com.arcanaweb.api.model.Endereco;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroUsuario(

        @NotBlank
        String nome,
        @NotBlank
        String sobrenome,

        @NotBlank
        @Email
        String email,

        @NotBlank
        String senha,


        DadosEndereco endereco) {
}
