package com.arcanaweb.api.dto;

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
}
