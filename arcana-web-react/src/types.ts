// ============================================================
// types.ts — Tipos globais do projeto ArcanaWeb.
// Espelha as entidades do backend Spring Boot.
// ============================================================

// ---- Usuario ---------------------------------------------
export interface Usuario {
  id?: number
  nome: string
  sobrenome: string
  email: string
  senha?: string
  endereco?: Endereco
}

// ---- Endereco --------------------------------------------
export interface Endereco {
  rua: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  cep: string
}

// ---- Produto ---------------------------------------------
export interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  categoria: string
  emoji: string
  imagem?: string
  estoque?: number
}

// ---- Item do Carrinho ------------------------------------
export interface ItemCarrinho {
  produto: Produto
  quantidade: number
}

// ---- Status do Pedido ------------------------------------
export type StatusPedido =
  | 'PENDENTE'
  | 'PREPARANDO'
  | 'ENVIADO'
  | 'SAINDO'
  | 'ENTREGUE'
  | 'CANCELADO'

// ---- Pedido ----------------------------------------------
export interface Pedido {
  id: string
  dataCriacao: string
  status: StatusPedido
  itens: ItemCarrinho[]
  total: number
  frete: number
  endereco?: Endereco
  atualizadoEm?: string
}

// ---- Paginas disponiveis ---------------------------------
export type Pagina =
  | 'home'
  | 'loja'
  | 'login'
  | 'carrinho'
  | 'pedidos'
  | 'conta'
  | 'sucesso'

// ---- Servico ---------------------------------------------
export interface Servico {
  id: number
  nome: string
  descricao: string
  preco: string
  tags: string[]
  textoBotao: string
  promptWhatsApp: string
}

// ---- Erros de validacao ----------------------------------
export interface ErrosFormulario {
  [campo: string]: string
}