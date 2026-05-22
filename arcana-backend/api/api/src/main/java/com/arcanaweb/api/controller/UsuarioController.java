package com.arcanaweb.api.controller;

import com.arcanaweb.api.dto.DadosAtualizacaoUsuario;
import com.arcanaweb.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PutMapping("me")
    @Transactional
    public void atualizar(@RequestBody @Valid DadosAtualizacaoUsuario dados){
        var usuario = repository.getReferenceById(dados.id());// busca usuario pelo id q estamos recebendo no dto
        usuario.atualizarInformacoes(dados);

    }
}
