package com.arcanaweb.api.dto;

public record DadosAtualizacaoUsuario(
        Long id,
        String nome,
        String sobrenome,
        String email,
        String senha,
        DadosEndereco endereco
) {
}
