package com.arcanaweb.api.model;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Table(name = "item_pedido")
@Entity(name = "ItemPedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Pedido pedido;
    @ManyToOne
    private Produto produto;

    private int quantidade;
    private BigDecimal precoUnitario;

}
