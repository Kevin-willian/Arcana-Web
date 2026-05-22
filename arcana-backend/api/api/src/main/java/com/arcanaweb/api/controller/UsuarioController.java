package com.arcanaweb.api.controller;

import com.arcanaweb.api.dto.DadosCadastroUsuario;
import com.arcanaweb.api.dto.DadosLoginUsuario;
import com.arcanaweb.api.dto.DadosRespostaUsuario;
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
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastroUsuario dados){

        if (repository.findByEmail(dados.email()).isPresent()){
            return ResponseEntity.badRequest().body("Email já cadastrado"); // esse if verifica no cadastro se ja exite o email no banco de dados se não tiver ele retorna true e continua o fluxo
        }
        var usuario = new Usuario(dados);
        usuario.setSenha(encoder.encode(dados.senha()));
        repository.save(usuario);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/login")
    public ResponseEntity login (@RequestBody @Valid DadosLoginUsuario dados){
        var usuario = repository.findByEmail(dados.email()); //busca usuario pelo email

        if (usuario.isEmpty()){ // retorna true se não encontrou ninguem
            return ResponseEntity.badRequest().body("Email não encontrado");
        }

        if (!encoder.matches(dados.senha(),usuario.get().getSenha())){ // compara a senha com o hash do banco. usuario get pega o usuario dentro do optional
            //com getsenha, pega  asenha criptografada do banco confere, se as senhas não batem retorna 400
            return ResponseEntity.badRequest().body("Senha incorreta");
        }

        return ResponseEntity.ok(new DadosRespostaUsuario(usuario.get())); // se passou pelas duas verificações login correto, e retorna 200

    }

}