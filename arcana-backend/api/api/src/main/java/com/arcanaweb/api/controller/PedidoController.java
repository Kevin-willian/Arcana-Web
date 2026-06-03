package com.arcanaweb.api.controller;

import com.arcanaweb.api.dto.DadosCriarPedido;
import com.arcanaweb.api.dto.DadosItemPedido;
import com.arcanaweb.api.dto.DadosRespostaItemPedido;
import com.arcanaweb.api.dto.DadosRespostaPedido;
import com.arcanaweb.api.model.Endereco;
import com.arcanaweb.api.model.ItemPedido;
import com.arcanaweb.api.model.Pedido;
import com.arcanaweb.api.model.StatusPedido;
import com.arcanaweb.api.producer.PedidoProducer;
import com.arcanaweb.api.repository.PedidoRepository;
import com.arcanaweb.api.repository.ProdutoRepository;
import com.arcanaweb.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PedidoProducer pedidoProducer;

    @PostMapping
    @Transactional
    public ResponseEntity criarPedido(@RequestBody @Valid DadosCriarPedido dados, @RequestParam Long usuarioId){
        var usuario = usuarioRepository.getReferenceById(usuarioId);

        var pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setStatus(StatusPedido.PENDENTE);
        pedido.setFrete(dados.frete());
        pedido.setEndereco(new Endereco(dados.endereco()));

        BigDecimal total = BigDecimal.ZERO;
        List<ItemPedido> itens = new ArrayList<>();

        for (DadosItemPedido dadosItem : dados.itens()) {
            var produto = produtoRepository.getReferenceById(dadosItem.produtoId());
            var item = new ItemPedido();
            item.setPedido(pedido);
            item.setProduto(produto);
            item.setQuantidade(dadosItem.quantidade());
            item.setPrecoUnitario(produto.getPreco());
            total = total.add(produto.getPreco().multiply(BigDecimal.valueOf(dadosItem.quantidade())));
            itens.add(item);
        }

        pedido.setTotal(total.add(dados.frete()));
        pedido.setItens(itens);
        pedidoRepository.save(pedido);

        // publica a mensagem no RabbitMQ após salvar o pedido
        pedidoProducer.publicarPedidoCriado(
                pedido.getId(),
                pedido.getStatus().name(),
                pedido.getTotal().doubleValue()
        );

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<DadosRespostaPedido> listarPedido(@RequestParam Long usuarioId) {
        var usuario = usuarioRepository.getReferenceById(usuarioId);
        return pedidoRepository.findByUsuarioOrderByDataCriacaoDesc(usuario)
                .stream()
                .map(DadosRespostaPedido::new)
                .toList();
    }

    @PutMapping("/{id}/status")
    @Transactional
    public void atualizarStatus(@PathVariable Long id, @RequestBody StatusPedido status) {
        var pedido = pedidoRepository.getReferenceById(id);
        pedido.setStatus(status);
        pedido.setAtualizadoEm(LocalDateTime.now());
    }

    @GetMapping("/todos")
    public List<DadosRespostaPedido> listarTodosPedidos() {
        return pedidoRepository.findAllByOrderByDataCriacaoDesc()
                .stream()
                .map(DadosRespostaPedido::new)
                .toList();
    }
}