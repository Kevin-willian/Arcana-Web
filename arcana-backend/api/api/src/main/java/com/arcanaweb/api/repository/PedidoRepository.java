package com.arcanaweb.api.repository;

import com.arcanaweb.api.model.Pedido;
import com.arcanaweb.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido,Long> {

    List<Pedido> findByUsuarioOrderByDataCriacaoDesc(Usuario usuario);
    // bucar por campo do usuario da entidade, ordena por dada de criação do recente pro mais antigo
}
