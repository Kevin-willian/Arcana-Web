package com.arcanaweb.api.dto;

import com.arcanaweb.api.model.ItemPedido;

import java.math.BigDecimal;

public record DadosRespostaItemPedido(
        String nomeProduto,
        int quantidade,
        BigDecimal precoUnitario
) {

    public DadosRespostaItemPedido(ItemPedido item){
        this(
                item.getProduto().getNome(),        // Construtor pra gera a lista de itens do pedido pra retorar pro front
                item.getQuantidade(),
                item.getPrecoUnitario()
        );
    }

}
