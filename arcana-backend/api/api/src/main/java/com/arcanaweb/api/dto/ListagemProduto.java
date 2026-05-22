package com.arcanaweb.api.dto;

import com.arcanaweb.api.model.Produto;

import java.math.BigDecimal;

public record ListagemProduto(Long id, String nome, BigDecimal preco, int estoque) {

    public ListagemProduto(Produto produto){
        this(produto.getId(), produto.getNome(), produto.getPreco(), produto.getEstoque());
    }

}
