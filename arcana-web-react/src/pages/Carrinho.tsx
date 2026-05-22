import { useState } from 'react'
import { ItemCarrinho, Produto, Endereco } from '../types.ts'
import { ShoppingCart } from 'lucide-react'
import '../styles/Carrinho.css'
import '../styles/Loja.css'

interface CarrinhoProps {
  setPagina: (pagina: string) => void
  itens: ItemCarrinho[]
  onAtualizar: (itens: ItemCarrinho[]) => void
  onCompraFinalizada: () => void
  usuario: { id?: number; nome: string; sobrenome: string; email: string; endereco?: Endereco } | null
}

const FRETE_FIXO = 15.00

const imagensProdutos: { [id: number]: string } = {
  1:  '/assets/baralho-wider-tarot.jpg',
  2:  '/assets/oraculo-baralho-das-bruxas.webp',
  3:  '/assets/vela-preta.webp',
  4:  '/assets/vela-roxa.webp',
  5:  '/assets/incenso-nag-champa.webp',
  6:  '/assets/incenso-tandalo.webp',
  7:  '/assets/ametista-bruta.webp',
  8:  '/assets/quartzo-rosa.webp',
  9:  '/assets/guia-do-tarot-para-iniciantes.webp',
  10: '/assets/bolsa-de-veludo-para-cartas.webp',
  11: '/assets/suporte-de-madeira-para-cartas.webp',
  12: '/assets/kit-iniciante-tarot.webp',
}

const sugestoes: Produto[] = [
  { id: 3,  nome: 'Vela Preta — Protecao', descricao: 'Vela artesanal com ervas de protecao.', preco: 28.50, categoria: 'velas', emoji: '🕯️', imagem: '/assets/vela-preta.webp' },
  { id: 8,  nome: 'Quartzo Rosa', descricao: 'Cristal do amor e da harmonia.', preco: 35.00, categoria: 'cristais', emoji: '🩷', imagem: '/assets/quartzo-rosa.webp' },
  { id: 5,  nome: 'Incenso Nag Champa', descricao: 'Caixa com 20 varetas.', preco: 18.00, categoria: 'incensos', emoji: '🪔', imagem: '/assets/incenso-nag-champa.webp' },
  { id: 10, nome: 'Bolsa de Veludo para Cartas', descricao: 'Para guardar seu baralho.', preco: 22.00, categoria: 'acessorios', emoji: '👜', imagem: '/assets/bolsa-de-veludo-para-cartas.webp' },
]

function Carrinho({ setPagina, itens, onAtualizar, onCompraFinalizada, usuario }: CarrinhoProps) {

  const [finalizando, setFinalizando] = useState<boolean>(false)
  const [etapa, setEtapa] = useState<'carrinho' | 'endereco'>('carrinho')
  const [endereco, setEndereco] = useState<Endereco>(
    usuario?.endereco || { rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: '' }
  )
  const [erroEndereco, setErroEndereco] = useState<string>('')

  function formatarPreco(v: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
  }

  const subtotal = itens.reduce((acc, i) => acc + i.produto.preco * i.quantidade, 0)
  const frete = itens.length > 0 ? FRETE_FIXO : 0
  const total = subtotal + frete

  function alterarQuantidade(produtoId: number, delta: number): void {
    const novos = itens.map(i => {
      if (i.produto.id !== produtoId) return i
      const nova = i.quantidade + delta
      if (nova <= 0) return null
      return { ...i, quantidade: nova }
    }).filter(Boolean) as ItemCarrinho[]
    onAtualizar(novos)
  }

  function removerItem(produtoId: number): void {
    onAtualizar(itens.filter(i => i.produto.id !== produtoId))
  }

  function adicionarSugestao(produto: Produto): void {
    const ex = itens.find(i => i.produto.id === produto.id)
    if (ex) onAtualizar(itens.map(i => i.produto.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i))
    else onAtualizar([...itens, { produto, quantidade: 1 }])
  }

  function validarEndereco(): boolean {
    if (!endereco.cep.trim() || !endereco.rua.trim() || !endereco.bairro.trim() || !endereco.cidade.trim() || !endereco.estado.trim()) {
      setErroEndereco('Preencha todos os campos obrigatorios (CEP, rua, bairro, cidade, estado).')
      return false
    }
    if (endereco.cep.replace(/\D/g, '').length !== 8) {
      setErroEndereco('CEP invalido. Digite apenas os 8 numeros.')
      return false
    }
    setErroEndereco('')
    return true
  }

  async function finalizarCompra(): Promise<void> {
    if (!usuario) { setPagina('login'); return }
    if (!validarEndereco()) return
    setFinalizando(true)
    try {
      const response = await fetch(`http://localhost:8080/api/pedidos?usuarioId=${usuario.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itens: itens.map(i => ({ produtoId: i.produto.id, quantidade: i.quantidade })),
          frete: frete,
          endereco: {
            rua: endereco.rua,
            cep: endereco.cep.replace(/\D/g, ''),
            numero: endereco.numero,
            complemento: endereco.complemento,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            uf: endereco.estado
          }
        })
      })
      if (!response.ok) throw new Error()
      onAtualizar([])
      onCompraFinalizada()
    } catch {
      setErroEndereco('Erro ao finalizar compra. Tente novamente.')
    }
    setFinalizando(false)
  }

  return (
    <div className="carrinho-page">
      <h1 className="carrinho-titulo">
        {etapa === 'carrinho' ? 'Carrinho' : 'Endereco de Entrega'}
      </h1>

      {itens.length === 0 && etapa === 'carrinho' && (
        <div className="carrinho-vazio">
          <span className="carrinho-vazio-emoji"><ShoppingCart size={64} color="var(--cor-destaque)" /></span>
          <h2 className="carrinho-vazio-titulo">Seu carrinho esta vazio</h2>
          <p className="carrinho-vazio-texto">Explore nossa loja e adicione produtos.</p>
          <button className="carrinho-vazio-btn" onClick={() => setPagina('loja')}>Ir para a loja</button>
        </div>
      )}

      {itens.length > 0 && etapa === 'carrinho' && (
        <div className="carrinho-layout">
          <div className="carrinho-lista">
            {itens.map(item => (
              <div key={item.produto.id} className="carrinho-item">
                <img src={imagensProdutos[item.produto.id]} alt={item.produto.nome} className="carrinho-item-img" />
                <div className="carrinho-item-info">
                  <p className="carrinho-item-nome">{item.produto.nome}</p>
                  <p className="carrinho-item-preco-unit">{formatarPreco(item.produto.preco)} cada</p>
                  <div className="carrinho-qtd">
                    <button className="qtd-btn" onClick={() => alterarQuantidade(item.produto.id, -1)} aria-label="Diminuir">−</button>
                    <span className="qtd-valor">{item.quantidade}</span>
                    <button className="qtd-btn" onClick={() => alterarQuantidade(item.produto.id, +1)} aria-label="Aumentar">+</button>
                  </div>
                </div>
                <div className="carrinho-item-direita">
                  <span className="carrinho-item-total">{formatarPreco(item.produto.preco * item.quantidade)}</span>
                  <button className="carrinho-remover" onClick={() => removerItem(item.produto.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className="carrinho-resumo">
            <h2 className="resumo-titulo">Resumo</h2>
            <div className="resumo-linha"><span>Subtotal ({itens.reduce((a, i) => a + i.quantidade, 0)} itens)</span><span>{formatarPreco(subtotal)}</span></div>
            <div className="resumo-linha"><span>Frete</span><span>{formatarPreco(frete)}</span></div>
            <div className="resumo-total">
              <span className="resumo-total-label">Total</span>
              <span className="resumo-total-valor">{formatarPreco(total)}</span>
            </div>
            <button className="resumo-btn-comprar" onClick={() => {
              if (!usuario) { setPagina('login'); return }
              setEtapa('endereco')
            }}>
              {usuario ? 'Continuar para entrega' : 'Login para comprar'}
            </button>
          </div>
        </div>
      )}

      {etapa === 'endereco' && (
        <div className="endereco-layout">
          <div className="endereco-form">
            <h2 className="endereco-titulo">Onde entregar?</h2>
            {erroEndereco && <div className="campo-erro" role="alert" style={{ marginBottom: '16px', fontSize: 'var(--tamanho-sm)' }}>❌ {erroEndereco}</div>}
            <div className="campos-duplos" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="campo-grupo">
                <label className="campo-label">CEP *</label>
                <input className="campo-input" placeholder="00000-000" value={endereco.cep} onChange={e => setEndereco({ ...endereco, cep: e.target.value })} maxLength={9} />
              </div>
              <div className="campo-grupo">
                <label className="campo-label">Estado *</label>
                <input className="campo-input" placeholder="SP" value={endereco.estado} onChange={e => setEndereco({ ...endereco, estado: e.target.value })} maxLength={2} />
              </div>
            </div>
            <div className="campo-grupo" style={{ marginTop: '16px' }}>
              <label className="campo-label">Rua *</label>
              <input className="campo-input" placeholder="Nome da rua" value={endereco.rua} onChange={e => setEndereco({ ...endereco, rua: e.target.value })} />
            </div>
            <div className="campos-duplos" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginTop: '16px' }}>
              <div className="campo-grupo">
                <label className="campo-label">Numero</label>
                <input className="campo-input" placeholder="123" value={endereco.numero} onChange={e => setEndereco({ ...endereco, numero: e.target.value })} />
              </div>
              <div className="campo-grupo">
                <label className="campo-label">Complemento</label>
                <input className="campo-input" placeholder="Apto, bloco..." value={endereco.complemento || ''} onChange={e => setEndereco({ ...endereco, complemento: e.target.value })} />
              </div>
            </div>
            <div className="campos-duplos" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div className="campo-grupo">
                <label className="campo-label">Bairro *</label>
                <input className="campo-input" placeholder="Bairro" value={endereco.bairro} onChange={e => setEndereco({ ...endereco, bairro: e.target.value })} />
              </div>
              <div className="campo-grupo">
                <label className="campo-label">Cidade *</label>
                <input className="campo-input" placeholder="Cidade" value={endereco.cidade} onChange={e => setEndereco({ ...endereco, cidade: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="carrinho-resumo">
            <h2 className="resumo-titulo">Resumo final</h2>
            <div className="resumo-linha"><span>Subtotal</span><span>{formatarPreco(subtotal)}</span></div>
            <div className="resumo-linha"><span>Frete</span><span>{formatarPreco(frete)}</span></div>
            <div className="resumo-total">
              <span className="resumo-total-label">Total</span>
              <span className="resumo-total-valor">{formatarPreco(total)}</span>
            </div>
            <button className="resumo-btn-comprar" onClick={finalizarCompra} disabled={finalizando} aria-busy={finalizando}>
              {finalizando ? 'Finalizando...' : '✅ Confirmar compra'}
            </button>
            <button style={{ width: '100%', marginTop: '8px', background: 'transparent', color: 'var(--texto-sutil)', border: '1px solid var(--borda-sutil)', borderRadius: 'var(--radius-sm)', padding: '10px', cursor: 'pointer', fontSize: 'var(--tamanho-sm)', fontFamily: 'var(--fonte-corpo)' }} onClick={() => setEtapa('carrinho')}>
              Voltar ao carrinho
            </button>
          </div>
        </div>
      )}

      <div className="carrinho-sugestoes">
        <h2 className="sugestoes-titulo">Voce tambem pode gostar</h2>
        <div className="sugestoes-grid">
          {sugestoes.map(p => (
            <article key={p.id} className="produto-card">
              <img src={p.imagem} alt={p.nome} className="produto-imagem" />
              <div className="produto-info">
                <span className="produto-categoria">{p.categoria}</span>
                <h2 className="produto-nome">{p.nome}</h2>
                <p className="produto-descricao">{p.descricao}</p>
                <div className="produto-preco-wrap"><span className="produto-preco">{formatarPreco(p.preco)}</span></div>
                <div className="produto-botoes">
                  <button className="produto-btn-comprar" onClick={() => { adicionarSugestao(p); setPagina('carrinho') }}>Comprar</button>
                  <button className="produto-btn-carrinho" onClick={() => adicionarSugestao(p)} title="Adicionar ao carrinho"><ShoppingCart size={18} color="var(--cor-destaque)"/></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carrinho