package com.arcanaweb.arcana_frete.consumer;


import com.arcanaweb.arcana_frete.config.RabbitMQConfig;
import com.arcanaweb.arcana_frete.message.PedidoCriadoMessage;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;


@Component
public class PedidoConsumer {

    
    @RabbitListener(queues = RabbitMQConfig.PEDIDO_QUEUE)
    public void consumirPedido(PedidoCriadoMessage message) {

        System.out.println("========== CONSUMER ==========");
        System.out.println("Pedido recebido:");
        System.out.println("ID: " + message.getPedidoId());
        System.out.println("Status: " + message.getStatus());
        System.out.println("Valor: " + message.getValorTotal());
        System.out.println("==============================");
    }
}