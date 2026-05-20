// ============================================================
// Loja.tsx — Loja de produtos com dois botoes:
// "Comprar" (vai direto ao carrinho) e "Adicionar" (carrinho)
// Emojis sao placeholders — substituir por <img> futuramente
// ============================================================

import { useState } from 'react'
import { Produto } from '../types.ts'
import { ShoppingCart } from 'lucide-react'
import '../styles/Loja.css'

interface LojaProps {
  setPagina: (pagina: string) => void
  onAdicionarCarrinho?: (produto: Produto) => void
}

interface CategoriaItem { id: string; label: string }

const categorias: CategoriaItem[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'cartas', label: 'Cartas e Oraculos' },
  { id: 'velas', label: 'Velas' },
  { id: 'incensos', label: 'Incensos' },
  { id: 'cristais', label: 'Cristais' },
  { id: 'livros', label: 'Livros' },
  { id: 'acessorios', label: 'Acessorios' },
]

// ---- Produtos --------------------------------------------
// Quando conectar ao backend, substituir por:
// const [produtos, setProdutos] = useState<Produto[]>([])
// useEffect(() => { fetch('/api/produtos').then(r => r.json()).then(setProdutos) }, [])
const produtos: Produto[] = [
  { id: 1,  nome: 'Baralho Rider-Waite Tarot', descricao: 'O tarot mais famoso do mundo. 78 cartas com simbolismo rico e detalhado.',      preco: 89.90, categoria: 'cartas',    emoji: '🃏' },
  { id: 2,  nome: 'Oraculo das Bruxas',         descricao: '44 cartas com mensagens de sabedoria ancestral e magia feminina.',               preco: 67.00, categoria: 'cartas',    emoji: '🔮' },
  { id: 3,  nome: 'Vela Preta — Protecao',      descricao: 'Vela artesanal com ervas de protecao. Aroma de patchouli e cedro.',             preco: 28.50, categoria: 'velas',     emoji: '🕯️' },
  { id: 4,  nome: 'Vela Roxa — Intuicao',       descricao: 'Desperta a intuicao e conexao espiritual. Aroma de lavanda e sandalo.',         preco: 28.50, categoria: 'velas',     emoji: '🕯️' },
  { id: 5,  nome: 'Incenso Nag Champa',         descricao: 'Caixa com 20 varetas. O incenso mais usado em rituais e meditacao.',            preco: 18.00, categoria: 'incensos',  emoji: '🪔' },
  { id: 6,  nome: 'Incenso Sandalo',            descricao: 'Purificacao e harmonia. Caixa com 20 varetas artesanais.',                      preco: 18.00, categoria: 'incensos',  emoji: '🪔' },
  { id: 7,  nome: 'Ametista Bruta',             descricao: 'Pedra natural de ametista para equilibrio emocional e protecao energetica.',    preco: 45.00, categoria: 'cristais',  emoji: '💜' },
  { id: 8,  nome: 'Quartzo Rosa',               descricao: 'Cristal do amor e da harmonia. Pedra bruta natural selecionada.',               preco: 35.00, categoria: 'cristais',  emoji: '🩷' },
  { id: 9,  nome: 'Guia do Tarot para Iniciantes', descricao: 'Aprenda a ler o tarot do zero. 200 paginas com exemplos praticos.',          preco: 52.00, categoria: 'livros',    emoji: '📖' },
  { id: 10, nome: 'Bolsa de Veludo para Cartas', descricao: 'Guarde e proteja seu baralho. Veludo roxo com fecho dourado.',                  preco: 22.00, categoria: 'acessorios',emoji: '👜' },
  { id: 11, nome: 'Suporte de Madeira para Cartas', descricao: 'Apoio artesanal em madeira para exibir suas cartas durante a leitura.',     preco: 38.00, categoria: 'acessorios',emoji: '🪵' },
  { id: 12, nome: 'Kit Iniciante Tarot',         descricao: 'Baralho + guia + bolsa de veludo. O kit completo para comecar sua jornada.',   preco: 149.00,categoria: 'cartas',    emoji: '✨' },
]

function Loja({ setPagina, onAdicionarCarrinho }: LojaProps) {

  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todos')
  const [busca, setBusca] = useState<string>('')
  // Feedback visual ao adicionar ao carrinho
  const [adicionado, setAdicionado] = useState<number | null>(null)

  const produtosFiltrados = produtos.filter(p => {
    const passaCategoria = categoriaAtiva === 'todos' || p.categoria === categoriaAtiva
    const passaBusca = busca === '' || p.nome.toLowerCase().includes(busca.toLowerCase()) || p.descricao.toLowerCase().includes(busca.toLowerCase())
    return passaCategoria && passaBusca
  })

  function formatarPreco(v: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
  }

  // Adiciona ao carrinho e mostra feedback visual por 1 segundo
  function handleAdicionarCarrinho(produto: Produto): void {
    if (onAdicionarCarrinho) onAdicionarCarrinho(produto)
    setAdicionado(produto.id)
    setTimeout(() => setAdicionado(null), 1000)
  }

  // Comprar: adiciona ao carrinho e vai direto para o carrinho
  function handleComprar(produto: Produto): void {
    if (onAdicionarCarrinho) onAdicionarCarrinho(produto)
    setPagina('carrinho')
  }

  return (
    <>
      <div className="loja-header">
        <h1 className="loja-titulo">Loja</h1>
        <p className="loja-subtitulo">Produtos selecionados para sua jornada espiritual.</p>

        <div className="loja-busca-wrap">
          <input type="search" className="loja-busca" placeholder="Buscar produto..." value={busca} onChange={e => setBusca(e.target.value)} aria-label="Buscar produto" />
        </div>

        <div className="loja-categorias" role="group" aria-label="Filtrar por categoria">
          {categorias.map(cat => (
            <button key={cat.id} className={`categoria-btn ${categoriaAtiva === cat.id ? 'ativo' : ''}`} onClick={() => setCategoriaAtiva(cat.id)} aria-pressed={categoriaAtiva === cat.id}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <p className="loja-contador" aria-live="polite">
        {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
      </p>

      <div className="produtos-grid">
        {produtosFiltrados.length === 0 && (
          <div className="loja-vazia" role="status">Nenhum produto encontrado para "{busca}".</div>
        )}

        {produtosFiltrados.map((produto: Produto) => (
          <article key={produto.id} className="produto-card" tabIndex={0} aria-label={`${produto.nome}, ${formatarPreco(produto.preco)}`}>

            {/* IMAGEM / EMOJI PLACEHOLDER
                Para colocar imagem real, substitua este bloco por:
                <img src={produto.imagem} alt={produto.nome} className="produto-imagem" />
                O campo produto.imagem vira do backend Spring Boot */}
            {produto.imagem ? (
              <img src={produto.imagem} alt={produto.nome} className="produto-imagem" />
            ) : (
              <div className="produto-imagem" role="img" aria-label={produto.nome}>
                {produto.emoji}
              </div>
            )}

            <div className="produto-info">
              <span className="produto-categoria">{produto.categoria}</span>
              <h2 className="produto-nome">{produto.nome}</h2>
              <p className="produto-descricao">{produto.descricao}</p>

              <div className="produto-preco-wrap">
                <span className="produto-preco">{formatarPreco(produto.preco)}</span>
              </div>

              {/* DOIS BOTOES: Comprar e Adicionar ao carrinho */}
              <div className="produto-botoes">
                <button
                  className="produto-btn-comprar"
                  onClick={() => handleComprar(produto)}
                  aria-label={`Comprar ${produto.nome}`}
                >
                  Comprar
                </button>
                <button
                  className={`produto-btn-carrinho ${adicionado === produto.id ? 'adicionado' : ''}`}
                  onClick={() => handleAdicionarCarrinho(produto)}
                  aria-label={`Adicionar ${produto.nome} ao carrinho`}
                  title="Adicionar ao carrinho"
                >
                  <ShoppingCart size={18} color="var(--cor-destaque)"/>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export default Loja
