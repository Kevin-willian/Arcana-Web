package com.arcanaweb.api.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;


@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "arcana.exchange";
    public static final String PEDIDO_QUEUE = "pedido.criado.queue";
    public static final String PEDIDO_ROUTING_KEY = "pedido.criado";

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Queue pedidoQueue() {
        return new Queue(PEDIDO_QUEUE, true);
    }

    @Bean
    public Binding pedidoBinding() {
        return BindingBuilder
                .bind(pedidoQueue())
                .to(exchange())
                .with(PEDIDO_ROUTING_KEY);
    }
}