package com.arcanaweb.api.controller;

import com.arcanaweb.api.dto.ListagemProduto;
import com.arcanaweb.api.model.Produto;
import com.arcanaweb.api.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;


    @GetMapping
    public List<ListagemProduto> listar(){
        return repository.findAll().stream().map(ListagemProduto::new).toList();
    }
}
