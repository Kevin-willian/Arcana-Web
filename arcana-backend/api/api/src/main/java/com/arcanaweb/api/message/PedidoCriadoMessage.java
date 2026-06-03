package com.arcanaweb.api.message;

import java.io.Serializable;

public class PedidoCriadoMessage implements Serializable {

    private Long pedidoId;
    private String status;
    private Double valorTotal;

    public PedidoCriadoMessage() {
    }

    public PedidoCriadoMessage(Long pedidoId, String status, Double valorTotal) {
        this.pedidoId = pedidoId;
        this.status = status;
        this.valorTotal = valorTotal;
    }

    public Long getPedidoId() {
        return pedidoId;
    }

    public String getStatus() {
        return status;
    }

    public Double getValorTotal() {
        return valorTotal;
    }
}