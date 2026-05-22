package com.arcanaweb.api.dto;

import com.arcanaweb.api.model.Pedido;
import com.arcanaweb.api.model.StatusPedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record DadosRespostaPedido(
        Long id,
        LocalDateTime dataCriacao,
        StatusPedido status,
        BigDecimal total,
        List<DadosRespostaItemPedido> itens
) {

    public DadosRespostaPedido(Pedido pedido){
        //Contrutor para representar toda a listagem dos pedidos no GET do controller de pedido
        this(
                pedido.getId(),
                pedido.getDataCriacao(),
                pedido.getStatus(),
                pedido.getTotal(),
                pedido.getItens().stream().map(DadosRespostaItemPedido::new).toList()
        );
    }
}
