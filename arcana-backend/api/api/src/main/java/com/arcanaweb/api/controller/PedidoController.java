package com.arcanaweb.api.controller;


import com.arcanaweb.api.dto.DadosCriarPedido;
import com.arcanaweb.api.dto.DadosItemPedido;
import com.arcanaweb.api.model.Endereco;
import com.arcanaweb.api.model.ItemPedido;
import com.arcanaweb.api.model.Pedido;
import com.arcanaweb.api.model.StatusPedido;
import com.arcanaweb.api.repository.PedidoRepository;
import com.arcanaweb.api.repository.ProdutoRepository;
import com.arcanaweb.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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

    @PostMapping
    @Transactional
    public ResponseEntity criarPedido(@RequestBody @Valid DadosCriarPedido dados, @RequestParam Long usuarioId){
        var usuario = usuarioRepository.getReferenceById(usuarioId);                                            //busca o usuario no banco pelo id

        //criação do pedido, instanciando tudo, usando os Setter do pedido
        var pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setStatus(StatusPedido.PENDENTE);
        pedido.setFrete(dados.frete());
        pedido.setEndereco(new Endereco(dados.endereco()));


        //criaçao dos itens do pedido e calculo do total
        BigDecimal total = BigDecimal.ZERO;                                                                     // começa o total em zero pra ir somando conforme passa pelos itens
        List<ItemPedido> itens = new ArrayList<>();                                                             //crio uma array da lista de todos os itens do produto, lista dinamica sem tamanho especifico

        for (DadosItemPedido dadosItem:dados.itens()){                                                      // ele vai entrar na lista e verificar cada produto q está na listaItens, verificando um por um
            var produto = produtoRepository.getReferenceById(dadosItem.produtoId());                        //busca o produto no banco pelo id , pra pegar o preco pelo banco de dados
            var item = new ItemPedido();                                                                     //cria o item do pedido com todos os campos, qual pedido pertence, qual produto, quantidade
            item.setPedido(pedido);
            item.setProduto(produto);
            item.setQuantidade(dadosItem.quantidade());
            item.setPrecoUnitario(produto.getPreco());
            total = total.add(produto.getPreco().multiply(BigDecimal.valueOf(dadosItem.quantidade())));      //pega a quantidade de itens q o usuario colocou,como é um int, converte em Bigdecimal
                                                                                                            // pega o preço do produto do banco, multiplica pela quantidade, soma o total de item por item
            itens.add(item);                                                                //adiciona o item na lista
        }

        pedido.setTotal(total.add(dados.frete()));                          // faz a atribuição final de todos os itens + o frete e coloca na lista de itens no pedido
        pedido.setItens(itens);

        pedidoRepository.save(pedido);
        return ResponseEntity.ok().build();

    }
}
