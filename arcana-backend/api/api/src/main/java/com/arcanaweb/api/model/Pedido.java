package com.arcanaweb.api.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Table(name = "pedido")
@Entity(name = "Pedido")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne                  //diz q muitos pedidos pertecem a um usuario, criando automaticamente pelo jpaa fk, usuario_id
    private Usuario usuario;

    @Enumerated(EnumType.STRING) // meu enum q o vai ser atulizado via docker com o sistema de frete
    private StatusPedido status;

    private BigDecimal frete; //valores do pedido bigdecimal
    private BigDecimal total;

    @Embedded
    private Endereco endereco;    //embutindo meu endereço com o @embedded fazendo reutilização

    @CreationTimestamp
    private LocalDateTime dataCriacao;    // usando LocalDateTime, pq o sistema em si o banco preenche automaticamente na hora da criação e é mais preciso do q Date

    private LocalDateTime atualizadoEm;   //sem o CreationTimeStamp pois não é o banco q cria so é atualizado quando o sistema de frete atuliza o pedido

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL) // Onetomany diz q esse pedido tem muitos itens no caso
    //mappedby diz q o lado dono da relação é o Item Pedido, ou seja Item pedido vai ter a fk de pedido
    // Cascade all diz q se deletar o pedido, deleta os itens do pedido
    private List<ItemPedido> itens; //aqui lista todos os itens desse pedido

}
