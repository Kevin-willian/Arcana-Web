package com.arcanaweb.arcana_frete.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Scanner;

@Service
public class FreteService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${api.url:http://localhost:8080}")
    private String apiUrl;

    public void listarPedidos() {
        try {
            List<Map<String, Object>> pedidos = restTemplate.exchange(
                    apiUrl + "/api/pedidos/todos",
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            ).getBody();

            if (pedidos == null || pedidos.isEmpty()) {
                System.out.println("Nenhum pedido encontrado.");
                return;
            }

            System.out.println("\n--- Pedidos ---");
            for (Map<String, Object> pedido : pedidos) {
                System.out.println("ID: " + pedido.get("id")
                        + " | Status: " + pedido.get("status")
                        + " | Total: R$ " + pedido.get("total"));
            }
        } catch (Exception e) {
            System.out.println("Erro ao buscar pedidos: " + e.getMessage());
        }
    }

    public void atualizarStatus(Scanner scanner) {
        System.out.print("Digite o ID do pedido: ");
        String idStr = scanner.nextLine();

        System.out.println("Escolha o novo status:");
        System.out.println("1. PREPARANDO");
        System.out.println("2. ENVIADO");
        System.out.println("3. SAINDO");
        System.out.println("4. ENTREGUE");
        System.out.println("5. CANCELADO");
        System.out.print("Escolha: ");
        String opcao = scanner.nextLine();

        String status = switch (opcao) {
            case "1" -> "PREPARANDO";
            case "2" -> "ENVIADO";
            case "3" -> "SAINDO";
            case "4" -> "ENTREGUE";
            case "5" -> "CANCELADO";
            default -> null;
        };

        if (status == null) {
            System.out.println("Status invalido!");
            return;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>("\"" + status + "\"", headers);
            restTemplate.exchange(
                    apiUrl + "/api/pedidos/" + idStr + "/status",
                    HttpMethod.PUT,
                    entity,
                    Void.class
            );
            System.out.println("Pedido #" + idStr + " atualizado para " + status + "!");
        } catch (Exception e) {
            System.out.println("Erro ao atualizar: " + e.getMessage());
        }
    }
}