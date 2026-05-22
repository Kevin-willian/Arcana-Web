package com.arcanaweb.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DadosEndereco(

        @NotBlank
         String rua,

         @NotBlank
         @Pattern(regexp = "\\d{8}") // o cep so pode ter 8 digitos
         String cep,

         String numero, // sem VALID pois é opcional
         String complemento, // sem VALID pois é opcional

         @NotBlank
         String bairro,

         @NotBlank
         String cidade,
         @NotBlank
         String uf) {
}
