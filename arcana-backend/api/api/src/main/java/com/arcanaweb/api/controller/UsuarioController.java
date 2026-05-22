package com.arcanaweb.api.controller;

import com.arcanaweb.api.dto.AtualizaoSenha;
import com.arcanaweb.api.dto.DadosAtualizacaoUsuario;
import com.arcanaweb.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    @PutMapping("me")
    @Transactional
    public void atualizar(@RequestBody @Valid DadosAtualizacaoUsuario dados){
        var usuario = repository.getReferenceById(dados.id());// busca usuario pelo id q estamos recebendo no dto
        usuario.atualizarInformacoes(dados);
    }

    @PutMapping("senha")
    @Transactional
    public ResponseEntity atualizarsenha(@RequestBody @Valid AtualizaoSenha dados) {
        var usuario = repository.getReferenceById(dados.id());

        // verifica a senha atual dele se ela está incorreta
        if (!encoder.matches(dados.senhaAtual(), usuario.getSenha())) {
            return ResponseEntity.badRequest().body("Senha atual incorreta");
        }

        // verifica se a nova senha é igual a atual, usuario é usuario
        if (encoder.matches(dados.novaSenha(), usuario.getSenha())) {
            return ResponseEntity.badRequest().body("Você já está usando essa senha");
        }

        // atualiza a senha ja criptografada
        usuario.setSenha(encoder.encode(dados.novaSenha()));
        return ResponseEntity.ok().build();
    }
}
