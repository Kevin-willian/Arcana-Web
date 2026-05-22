package com.arcanaweb.api.dto;

import jakarta.validation.constraints.NotBlank;

public record AtualizaoSenha(
        Long id,
        @NotBlank
        String senhaAtual,
        @NotBlank
        String novaSenha
) {
}
