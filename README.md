# Arcana Web

E-commerce de produtos esotéricos desenvolvido com React no front-end e Spring Boot no back-end, com banco de dados MySQL hospedado no Railway.

## Integrantes

- Kevin Willian
- Matheus Henrique
- Kaiky Lobo

## Acesso

- Aplicacao: https://arcana-web-inky.vercel.app

---

## Branches do projeto

Este repositório possui duas branches principais com propósitos distintos:

| Branch | Propósito |
|--------|-----------|
| `main` | Versão de demonstração em produção. Front-end no Vercel + Back-end e banco no Railway. Acesse pelo link acima. |
| `mensageria-rabbitmq` | Projeto completo com sistema de mensageria (RabbitMQ). Inclui o microserviço `arcana-frete` para rastreamento e atualização de status de pedidos. Requer Docker para rodar localmente. |

> Para ver e testar o projeto completo com mensageria, use a branch `mensageria-rabbitmq`.

---

## Tecnologias

| Camada       | Tecnologia                                                        |
|--------------|-------------------------------------------------------------------|
| Front-end    | React 19, TypeScript, Vite, CSS puro, Lucide React               |
| Back-end     | Java 21, Spring Boot 4, Spring Data JPA, Hibernate, Flyway        |
| Segurança    | Spring Security Crypto (hash de senha BCrypt)                     |
| Banco        | MySQL 8                                                           |
| Mensageria   | RabbitMQ (via Docker), Spring AMQP                               |
| Deploy       | Vercel (front-end), Railway (back-end e banco)                    |

---

## Funcionalidades

- Listagem de produtos com filtro por categoria e busca
- Cadastro e login de usuarios com validacao de formulario
- Carrinho de compras com controle de quantidade
- Finalizacao de pedido com endereco de entrega
- Historico de pedidos por usuario com atualizacao automatica a cada 30 segundos
- Rastreamento de status do pedido (PENDENTE, PREPARANDO, ENVIADO, SAINDO, ENTREGUE, CANCELADO)
- Pagina de conta do usuario com edicao de dados, endereco e senha
- Sistema de mensageria com RabbitMQ para notificacao e atualizacao de pedidos *(branch mensageria-rabbitmq)*

---

## Estrutura do projeto

```
Arcana-Web/
├── arcana-backend/
│   └── api/
│       └── src/main/java/com/arcanaweb/api/
│           ├── config/
│           │   ├── CorsConfig.java
│           │   └── RabbitMQConfig.java          (branch mensageria-rabbitmq)
│           ├── controller/
│           │   ├── AuthController.java
│           │   ├── PedidoController.java
│           │   ├── ProdutoController.java
│           │   └── UsuarioController.java
│           ├── dto/
│           ├── message/
│           │   └── PedidoCriadoMessage.java     (branch mensageria-rabbitmq)
│           ├── model/
│           │   ├── Produto.java
│           │   ├── Usuario.java
│           │   ├── Pedido.java
│           │   ├── ItemPedido.java
│           │   ├── Endereco.java
│           │   └── StatusPedido.java
│           ├── producer/
│           │   └── PedidoProducer.java          (branch mensageria-rabbitmq)
│           └── repository/
├── arcana-frete/                                (branch mensageria-rabbitmq)
│   └── src/main/java/com/arcanaweb/arcana_frete/
│       ├── config/
│       │   └── RabbitMQConfig.java
│       ├── consumer/
│       │   └── PedidoConsumer.java
│       ├── message/
│       │   └── PedidoCriadoMessage.java
│       ├── service/
│       │   └── FreteService.java
│       ├── FreteRunner.java
│       └── ArcanaFreteApplication.java
├── arcana-web-react/
│   └── src/
│       ├── components/
│       │   ├── Navbar.tsx
│       │   └── Button.tsx
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Loja.tsx
│       │   ├── Carrinho.tsx
│       │   ├── Login.tsx
│       │   ├── Pedidos.tsx
│       │   └── Conta.tsx
│       ├── styles/
│       ├── types.ts
│       └── App.tsx
└── docker-compose.yml                           (branch mensageria-rabbitmq)
```

---

## Banco de dados

O banco é gerenciado pelo Flyway, que executa as migrations automaticamente ao subir o back-end.

### Tabelas

**produto**
- id, nome, preco, estoque

**usuario**
- id, nome, sobrenome, email, senha (hash bcrypt), endereco, ativo, data_criacao

**pedido**
- id, usuario_id (FK), status, total, frete, endereco de entrega, data_criacao, atualizado_em

**item_pedido**
- id, pedido_id (FK), produto_id (FK), quantidade, preco_unitario

---

## Endpoints da API

| Metodo | Rota                          | Descricao                    |
|--------|-------------------------------|------------------------------|
| POST   | /api/auth/login               | Login do usuario             |
| POST   | /api/auth/cadastro            | Cadastro de usuario          |
| GET    | /api/produtos                 | Listar todos os produtos     |
| POST   | /api/pedidos?usuarioId={id}   | Criar novo pedido            |
| GET    | /api/pedidos?usuarioId={id}   | Listar pedidos do usuario    |
| GET    | /api/pedidos/todos            | Listar todos os pedidos (usado pelo arcana-frete) |
| PUT    | /api/pedidos/{id}/status      | Atualizar status do pedido   |
| PUT    | /api/usuarios/me              | Atualizar dados do usuario   |
| PUT    | /api/usuarios/senha           | Alterar senha                |
| DELETE | /api/usuarios/me?id={id}      | Excluir conta                |

---

## Como rodar localmente

### Pre-requisitos

- Java 21+
- Node.js 18+
- MySQL 8 rodando na porta 3306
- Docker Desktop instalado *(necessario apenas na branch mensageria-rabbitmq)*

---

### Rodando a branch `main` (sem mensageria)

**Back-end**

Configure o `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/arcana_web
spring.datasource.username=root
spring.datasource.password=SUA_SENHA
```

Execute:

```bash
cd arcana-backend/api/api
./mvnw spring-boot:run
```

O Flyway cria e popula as tabelas automaticamente. A API fica disponivel em `http://localhost:8080`.

**Front-end**

```bash
cd arcana-web-react
npm install
npm run dev
```

Acesse `http://localhost:5173`.

> Para apontar o front-end para o back-end local, troque a constante `API_URL` nos arquivos `Loja.tsx`, `Carrinho.tsx`, `Login.tsx`, `Pedidos.tsx` e `Conta.tsx`:
> ```typescript
> const API_URL = 'http://localhost:8080'
> ```

---

### Rodando a branch `mensageria-rabbitmq` (projeto completo)

Este modo requer **3 projetos rodando ao mesmo tempo**: o back-end principal, o microserviço de frete e o front-end. O RabbitMQ sobe via Docker.

**1. Suba o RabbitMQ com Docker**

Na raiz do projeto, execute:

```bash
docker-compose up -d
```

Verifique se o container subiu:

```bash
docker ps
```

O painel de administracao do RabbitMQ fica disponivel em `http://localhost:15672` com login `guest` / senha `guest`.

**2. Suba o back-end principal (`arcana-backend`)**

Abra o projeto `arcana-backend/api` no IntelliJ e rode a classe `ApiApplication`.

Aguarde a mensagem no console:
```
Started ApiApplication in X seconds
```

A API fica disponivel em `http://localhost:8080`.

**3. Suba o microserviço de frete (`arcana-frete`)**

Abra o projeto `arcana-frete` no IntelliJ e rode a classe `ArcanaFreteApplication`.

Quando subir, o menu interativo aparece no console:

```
========== SISTEMA DE FRETE ==========
1. Ver todos os pedidos
2. Atualizar status de pedido
0. Sair
Escolha:
```

**4. Suba o front-end**

```bash
cd arcana-web-react
npm install
npm run dev
```

Acesse `http://localhost:5173`.

---

### Como usar o sistema de frete

Após realizar uma compra no front-end, o back-end publica uma mensagem no RabbitMQ automaticamente. O console do `arcana-frete` exibe a notificação:

```
========== CONSUMER ==========
Pedido recebido:
ID: 1
Status: PENDENTE
Valor: 239.80
==============================
```

Para atualizar o status do pedido manualmente pelo menu do frete:

1. Digite `2` e pressione Enter
2. Informe o **ID do pedido** que deseja atualizar
3. Escolha o novo status:
   - `1` → PREPARANDO
   - `2` → ENVIADO
   - `3` → SAINDO
   - `4` → ENTREGUE
   - `5` → CANCELADO
4. O status é atualizado na API e aparece no front-end em até 30 segundos (polling automático)

Para ver todos os pedidos cadastrados, digite `1` no menu.

---

## CORS

Configurado em `CorsConfig.java` via `WebMvcConfigurer`, liberando requisicoes de `localhost:5173` em desenvolvimento e da URL do Vercel em producao, com os metodos GET, POST, PUT e DELETE.
