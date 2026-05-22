package com.arcanaweb.api.dto;

import com.arcanaweb.api.model.Usuario;

/*DTO criado pra retornar o usuario logado, pq estava retornando com a senha criptografada kkkk
  e criar um DTO pra retornar esses dados muito mais eficiente */
public record DadosRespostaUsuario(
        Long id,
        String nome,
        String sobrenome,
        String email,
        boolean ativo
) {

    public DadosRespostaUsuario(Usuario usuario){ // segundo construtor criado para passar o Usuario direto e instaciar no retorno do metodo login
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getSobrenome(),
                usuario.getEmail(),
                usuario.getAtivo()
        );
    }
}
