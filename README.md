# Arcana Web

E-commerce de produtos esotéricos desenvolvido com React no front-end e Spring Boot no back-end, com banco de dados MySQL hospedado no Railway.

## Integrantes
- Kevin Willian
- Matheus Henrique
- Kaiky Lobo

## Acesso

- Aplicacao: https://arcana-web-inky.vercel.app

## Tecnologias

| Camada    | Tecnologia                                                        |
|-----------|-------------------------------------------------------------------|
| Front-end | React 19, TypeScript, Vite, CSS puro, Lucide React               |
| Back-end  | Java 21, Spring Boot 4, Spring Data JPA, Hibernate, Flyway        |
| Segurança | Spring Security Crypto (hash de senha)                            |
| Banco     | MySQL 8                                                           |
| Deploy    | Vercel (front-end), Railway (back-end e banco)                    |

## Funcionalidades

- Listagem de produtos com filtro por categoria e busca
- Cadastro e login de usuarios com validacao de formulario
- Carrinho de compras com controle de quantidade
- Finalizacao de pedido com endereco de entrega
- Historico de pedidos por usuario com atualizacao automatica a cada 30 segundos
- Rastreamento de status do pedido (PENDENTE, PREPARANDO, ENVIADO, SAINDO, ENTREGUE, CANCELADO)
- Pagina de conta do usuario

## Estrutura do projeto

```
Arcana-Web/
├── arcana-backend/
│   └── api/
│       └── src/main/java/com/arcanaweb/api/
│           ├── config/
│           │   └── CorsConfig.java
│           ├── controller/
│           │   ├── AuthController.java
│           │   ├── PedidoController.java
│           │   ├── ProdutoController.java
│           │   └── UsuarioController.java
│           ├── dto/
│           ├── model/
│           │   ├── Produto.java
│           │   ├── Usuario.java
│           │   ├── Pedido.java
│           │   ├── ItemPedido.java
│           │   ├── Endereco.java
│           │   └── StatusPedido.java
│           └── repository/
└── arcana-web-react/
    └── src/
        ├── components/
        │   ├── Navbar.tsx
        │   └── Button.tsx
        ├── pages/
        │   ├── Home.tsx
        │   ├── Loja.tsx
        │   ├── Carrinho.tsx
        │   ├── Login.tsx
        │   ├── Pedidos.tsx
        │   └── Conta.tsx
        ├── styles/
        ├── types.ts
        └── App.tsx
```

## Banco de dados

O banco e gerenciado pelo Flyway, que executa as migrations automaticamente ao subir o back-end.

### Tabelas

**produto**
- id, nome, preco, estoque

**usuario**
- id, nome, sobrenome, email, senha (hash bcrypt), endereco, ativo, data_criacao

**pedido**
- id, usuario_id (FK), status, total, frete, endereco de entrega, data_criacao, atualizado_em

**item_pedido**
- id, pedido_id (FK), produto_id (FK), quantidade, preco_unitario

## Endpoints da API

| Metodo | Rota                          | Descricao                    |
|--------|-------------------------------|------------------------------|
| POST   | /api/auth/login               | Login do usuario             |
| POST   | /api/auth/cadastro            | Cadastro de usuario          |
| GET    | /api/produtos                 | Listar todos os produtos     |
| POST   | /api/pedidos?usuarioId={id}   | Criar novo pedido            |
| GET    | /api/pedidos?usuarioId={id}   | Listar pedidos do usuario    |
| PUT    | /api/pedidos/{id}/status      | Atualizar status do pedido   |
| GET    | /api/usuarios/{id}            | Buscar dados do usuario      |
| PUT    | /api/usuarios/{id}            | Atualizar dados do usuario   |

## Como rodar localmente

### Pre-requisitos

- Java 21+
- Node.js 18+
- MySQL 8 rodando na porta 3306

### Back-end

Crie um banco MySQL chamado `arcana_db` e configure as variaveis de ambiente ou edite o `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/arcana_db
spring.datasource.username=root
spring.datasource.password=SUA_SENHA
```

Execute:

```bash
cd arcana-backend/api/api
./mvnw spring-boot:run
```

O Flyway vai criar e popular as tabelas automaticamente. A API ficara disponivel em `http://localhost:8080`.

### Front-end

```bash
cd arcana-web-react
npm install
npm run dev
```

Acesse `http://localhost:5173`.

O front-end aponta para o back-end em producao por padrao. Para apontar para o local, troque a constante `API_URL` nos arquivos `Loja.tsx`, `Carrinho.tsx`, `Login.tsx` e `Pedidos.tsx`:

```typescript
const API_URL = 'http://localhost:8080'
```

## CORS

Configurado em `CorsConfig.java` via `WebMvcConfigurer`, liberando requisicoes de `localhost:5173` em desenvolvimento e da URL do Vercel em producao, com os metodos GET, POST, PUT e DELETE.

## Prints da aplicacao
> (adicionar antes de entregar)
