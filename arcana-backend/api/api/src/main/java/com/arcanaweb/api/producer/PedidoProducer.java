package com.arcanaweb.api.producer;

import com.arcanaweb.api.config.RabbitMQConfig;
import com.arcanaweb.api.message.PedidoCriadoMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class PedidoProducer {

    private final RabbitTemplate rabbitTemplate;

    public PedidoProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publicarPedidoCriado(Long pedidoId, String status, Double valorTotal) {
        PedidoCriadoMessage message = new PedidoCriadoMessage(pedidoId, status, valorTotal);
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.PEDIDO_ROUTING_KEY,
                message
        );
        System.out.println("Pedido publicado no RabbitMQ: " + pedidoId);
    }
}