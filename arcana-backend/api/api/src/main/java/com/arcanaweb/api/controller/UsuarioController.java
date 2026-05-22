package com.arcanaweb.api.controller;

import com.arcanaweb.api.dto.DadosCadastroUsuario;
import com.arcanaweb.api.model.Usuario;
import com.arcanaweb.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(); // importamos a classe de criptografia do spring security

    @PostMapping("/cadastro")
    @Transactional
    public void cadastrar(@RequestBody @Valid DadosCadastroUsuario dados){

        if (repository.findByEmail(dados.email()).isPresent()){
            return; // esse if verifica no cadastro se ja exite o email no banco de dados se não tiver ele retorna true e continua o fluxo
        }
        var usuario = new Usuario(dados);
        usuario.setSenha(encoder.encode(dados.senha()));
        repository.save(usuario);
    }

    @PostMapping("/cadastro1/teste")
    @Transactional
    public void cadastrarTeste(@RequestBody @Valid DadosCadastroUsuario dados){
        if (repository.findByEmail(dados.email()).isPresent()){
            return ResponseEntity.body("Email já cadastrado");
        }

        var usuario = new Usuario(dados);
        usuario.setSenha(encoder.encode(dados.senha()));
        repository.save(usuario);
    }
}