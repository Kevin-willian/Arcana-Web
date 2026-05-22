import { useState, useEffect } from 'react'
import { Pedido, StatusPedido, ItemCarrinho } from '../types.ts'
import '../styles/Pedidos.css'

interface PedidosProps {
  setPagina: (pagina: string) => void
  usuario: { id?: number; nome: string; email: string } | null
}

const imagensPorNome: { [nome: string]: string } = {
  'Baralho Rider-Waite Tarot':      '/assets/baralho-wider-tarot.jpg',
  'Oraculo das Bruxas':             '/assets/oraculo-baralho-das-bruxas.webp',
  'Vela Preta — Protecao':          '/assets/vela-preta.webp',
  'Vela Roxa — Intuicao':           '/assets/vela-roxa.webp',
  'Incenso Nag Champa':             '/assets/incenso-nag-champa.webp',
  'Incenso Sandalo':                '/assets/incenso-tandalo.webp',
  'Ametista Bruta':                 '/assets/ametista-bruta.webp',
  'Quartzo Rosa':                   '/assets/quartzo-rosa.webp',
  'Guia do Tarot para Iniciantes':  '/assets/guia-do-tarot-para-iniciantes.webp',
  'Bolsa de Veludo para Cartas':    '/assets/bolsa-de-veludo-para-cartas.webp',
  'Suporte de Madeira para Cartas': '/assets/suporte-de-madeira-para-cartas.webp',
  'Kit Iniciante Tarot':            '/assets/kit-iniciante-tarot.webp',
}

const configStatus: Record<StatusPedido, { icone: string; titulo: string; desc: string; ativo: boolean }> = {
  PENDENTE:   { icone: '💳', titulo: 'Aguardando pagamento',  desc: 'Pedido recebido, aguardando confirmacao do pagamento.',               ativo: false },
  PREPARANDO: { icone: '📦', titulo: 'Sendo preparado',       desc: 'Estamos separando e embalando seus produtos com cuidado.',            ativo: true  },
  ENVIADO:    { icone: '🚚', titulo: 'Pedido enviado',        desc: 'Seu pedido saiu do estoque e esta a caminho da transportadora.',      ativo: true  },
  SAINDO:     { icone: '🏍️', titulo: 'Saindo para entrega',  desc: 'O entregador ja saiu com o seu pedido! Fique atento ao interfone.',   ativo: true  },
  ENTREGUE:   { icone: '✅', titulo: 'Pedido entregue!',      desc: 'Seu pedido foi entregue com sucesso. Obrigado pela compra!',          ativo: false },
  CANCELADO:  { icone: '❌', titulo: 'Pedido cancelado',      desc: 'Este pedido foi cancelado. Entre em contato se tiver duvidas.',       ativo: false },
}

const filtros = [
  { id: 'TODOS', label: 'Todos' }, { id: 'PENDENTE', label: 'Pendente' },
  { id: 'PREPARANDO', label: 'Preparando' }, { id: 'ENVIADO', label: 'Enviado' },
  { id: 'SAINDO', label: 'Saindo' }, { id: 'ENTREGUE', label: 'Entregue' },
]

const pedidosExemplo: Pedido[] = [
  { id: '#2025-001', dataCriacao: '10/05/2025', status: 'PREPARANDO', total: 125.90,
    itens: [
      { produto: { id: 1, nome: 'Baralho Rider-Waite Tarot', descricao: '', preco: 89.90, categoria: 'cartas', emoji: '🃏' }, quantidade: 1 },
      { produto: { id: 5, nome: 'Incenso Nag Champa', descricao: '', preco: 18.00, categoria: 'incensos', emoji: '🪔' }, quantidade: 2 },
    ]
  },
  { id: '#2025-002', dataCriacao: '05/05/2025', status: 'SAINDO', total: 73.50,
    itens: [
      { produto: { id: 7, nome: 'Ametista Bruta', descricao: '', preco: 45.00, categoria: 'cristais', emoji: '💜' }, quantidade: 1 },
      { produto: { id: 4, nome: 'Vela Roxa', descricao: '', preco: 28.50, categoria: 'velas', emoji: '🕯️' }, quantidade: 1 },
    ]
  },
  { id: '#2025-003', dataCriacao: '01/05/2025', status: 'ENTREGUE', total: 149.00,
    itens: [
      { produto: { id: 12, nome: 'Kit Iniciante Tarot', descricao: '', preco: 149.00, categoria: 'cartas', emoji: '✨' }, quantidade: 1 },
    ]
  },
]

function Pedidos({ setPagina, usuario }: PedidosProps) {

  const [filtroAtivo, setFiltroAtivo] = useState<string>('TODOS')
  const [expandido, setExpandido]     = useState<string | null>(null)
  const [pedidos, setPedidos]         = useState<Pedido[]>(pedidosExemplo)

  useEffect(() => {
    if (!usuario?.id) return
    async function buscarPedidos(): Promise<void> {
      const res = await fetch(`http://localhost:8080/api/pedidos?usuarioId=${usuario!.id}`)
      const dados = await res.json()
      setPedidos(dados.map((p: any) => ({
        id: `#${p.id.toString(16).toUpperCase().padStart(6, '0')}`,
        dataCriacao: new Date(p.dataCriacao).toLocaleDateString('pt-BR'),
        status: p.status,
        total: p.total,
        itens: p.itens.map((item: any) => ({
          produto: { id: item.nomeProduto, nome: item.nomeProduto, descricao: '', preco: item.precoUnitario, categoria: '', emoji: '' },
          quantidade: item.quantidade
        }))
      })))
    }
    buscarPedidos()
    const intervalo = setInterval(buscarPedidos, 30000)
    return () => clearInterval(intervalo)
  }, [usuario?.id])

  const pedidosFiltrados = pedidos.filter(p => filtroAtivo === 'TODOS' || p.status === filtroAtivo)

  function formatarPreco(v: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
  }

  function toggleCard(id: string): void {
    setExpandido(expandido === id ? null : id)
  }

  return (
    <div className="pedidos-page">
      <h1 className="pedidos-titulo">Meus Pedidos</h1>
      <p className="pedidos-subtitulo">Olá, {usuario?.nome || 'visitante'}! Acompanhe suas compras abaixo.</p>

      <div className="pedidos-filtros" role="group" aria-label="Filtrar por status">
        {filtros.map(f => (
          <button key={f.id} className={`filtro-btn ${filtroAtivo === f.id ? 'ativo' : ''}`} onClick={() => setFiltroAtivo(f.id)} aria-pressed={filtroAtivo === f.id}>
            {f.label}
          </button>
        ))}
      </div>

      {pedidosFiltrados.length === 0 && (
        <div className="pedidos-vazio" role="status">
          <span className="pedidos-vazio-emoji">🔮</span>
          <h2 className="pedidos-vazio-titulo">Nenhum pedido aqui</h2>
          <p className="pedidos-vazio-texto">Voce nao tem pedidos nessa categoria.</p>
          <button className="pedidos-vazio-btn" onClick={() => setPagina('loja')}>Ir para a loja</button>
        </div>
      )}

      <div className="pedidos-lista">
        {pedidosFiltrados.map((pedido: Pedido) => {
          const cfg = configStatus[pedido.status]
          const estaAberto = expandido === pedido.id

          return (
            <article key={pedido.id} className="pedido-card">
              <div className="pedido-header" onClick={() => toggleCard(pedido.id)} role="button" aria-expanded={estaAberto} tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleCard(pedido.id)}>
                <div>
                  <p className="pedido-numero">Pedido <strong>{pedido.id}</strong></p>
                  <p className="pedido-data">Realizado em {pedido.dataCriacao}</p>
                </div>
                <span className={`pedido-badge badge-${pedido.status}`}>
                  {pedido.status.charAt(0) + pedido.status.slice(1).toLowerCase()}
                </span>
              </div>

              <div className="pedido-status-desc">
                <span className="status-icone">{cfg.icone}</span>
                <div>
                  <p className="status-titulo">{cfg.titulo}</p>
                  <p className="status-desc">{cfg.desc}</p>
                </div>
                {cfg.ativo && (
                  <div className="status-live" aria-label="Atualizando em tempo real">
                    <div className="live-dot" />
                    <span>Ao vivo</span>
                  </div>
                )}
              </div>

              {estaAberto && (
                <>
                  <div className="pedido-itens">
                    <p className="pedido-itens-label">Itens do pedido</p>
                    {pedido.itens.map((item: ItemCarrinho) => (
                      <div key={item.produto.id} className="pedido-item">
                        <div className="pedido-item-info">
                          <img
                            src={imagensPorNome[item.produto.nome] || ''}
                            alt={item.produto.nome}
                            className="pedido-item-thumb"
                            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div>
                            <p className="pedido-item-nome">{item.produto.nome}</p>
                            <p className="pedido-item-qtd">Qtd: {item.quantidade}</p>
                          </div>
                        </div>
                        <span className="pedido-item-preco">{formatarPreco(item.produto.preco * item.quantidade)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pedido-total">
                    <span className="pedido-total-label">Total</span>
                    <span className="pedido-total-valor">{formatarPreco(pedido.total)}</span>
                  </div>
                </>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Pedidos