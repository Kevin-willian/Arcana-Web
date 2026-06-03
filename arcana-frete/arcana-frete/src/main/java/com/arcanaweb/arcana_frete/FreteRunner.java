package com.arcanaweb.arcana_frete;

import com.arcanaweb.arcana_frete.service.FreteService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Scanner;

@Component
public class FreteRunner implements CommandLineRunner {

    private final FreteService freteService;

    public FreteRunner(FreteService freteService) {
        this.freteService = freteService;
    }

    @Override
    public void run(String... args) throws Exception {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n========== SISTEMA DE FRETE ==========");
            System.out.println("1. Ver todos os pedidos");
            System.out.println("2. Atualizar status de pedido");
            System.out.println("0. Sair");
            System.out.print("Escolha: ");

            String opcao = scanner.nextLine();

            switch (opcao) {
                case "1" -> freteService.listarPedidos();
                case "2" -> freteService.atualizarStatus(scanner);
                case "0" -> {
                    System.out.println("Encerrando sistema de frete...");
                    return;
                }
                default -> System.out.println("Opcao invalida!");
            }
        }
    }
}