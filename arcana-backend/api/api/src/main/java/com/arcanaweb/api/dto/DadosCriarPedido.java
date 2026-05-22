package com.arcanaweb.api.dto;



import java.math.BigDecimal;
import java.util.List;

public record DadosCriarPedido(

        List<DadosItemPedido> itens,
        BigDecimal frete,
        DadosEndereco endereco

) {
}
