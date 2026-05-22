// ============================================================
// Home.tsx — Pagina principal do ArcanaWeb.
//
// Servicos da cartomante: ao clicar no botao,
// o usuario e redirecionado ao WhatsApp com um prompt
// personalizado para cada servico.
// ============================================================

import '../styles/Home.css'

interface HomeProps {
  setPagina: (pagina: string) => void
}

// ---- Interface do Servico --------------------------------
interface Servico {
  id: number
  nome: string
  preco: string
  tags: string[]
  descricao: string
  textoBotao: string
  promptWhatsApp: string // mensagem pre-preenchida no WhatsApp
}

// ---- Interface do Aviso ----------------------------------
interface Aviso {
  id: number
  titulo: string
  descricao: string
}

// ---- Numero do WhatsApp da cartomante --------------------
// Substitua pelo numero real (somente digitos + DDI)
const WHATSAPP_NUMERO = '5562993238949'

// ---- Funcao que abre o WhatsApp com mensagem pronta ------
// encodeURIComponent codifica caracteres especiais para URL
function abrirWhatsApp(prompt: string): void {
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(prompt)}`
  window.open(url, '_blank') // abre em nova aba
}

// ---- Servicos da cartomante ------------------------------
const servicos: Servico[] = [
  {
    id: 1,
    nome: 'A Destemida',
    preco: 'R$ 250,00',
    tags: ['Completa', 'Amor', 'Trabalho', 'Espiritual'],
    descricao: 'Consulta integral da sua vida — ambito amoroso, profissional e espiritual. Presente, obstaculos e aconselhamentos futuros. Intensa. Reveladora.',
    textoBotao: 'Quero essa consulta',
    promptWhatsApp: 'Ola Selene! Tenho interesse na consulta *A Destemida* (R$ 250). Podemos agendar?',
  },
  {
    id: 2,
    nome: 'Quem soltou os caes?',
    preco: 'R$ 190,00',
    tags: ['Amoroso', 'Inconsciente do outro'],
    descricao: 'Entraremos no inconsciente do seu parceiro. Pensamentos, sentimentos e intencoes reais. Pode trazer a gloria ou a ruina.',
    textoBotao: 'Vamos farejar',
    promptWhatsApp: 'Ola Selene! Tenho interesse na consulta *Quem soltou os caes?* (R$ 190). Podemos agendar?',
  },
  {
    id: 3,
    nome: 'Abutres do velho mundo',
    preco: 'R$ 120,00',
    tags: ['Analise energetica', 'Limpeza'],
    descricao: 'Existe algo travando seus caminhos? Analisamos com o oraculo se ha energia nociva agindo sobre voce.',
    textoBotao: 'Analisar minha energia',
    promptWhatsApp: 'Ola Selene! Tenho interesse na consulta *Abutres do velho mundo* (R$ 120). Podemos agendar?',
  },
  {
    id: 4,
    nome: 'A cura ou o veneno?',
    preco: 'R$ 90,00',
    tags: ['Decisoes', '30 min', 'Nao amoroso'],
    descricao: 'Para situacoes sem saida aparente. Quando nao sabe o caminho, o oraculo mostra. Voce decide o que beber.',
    textoBotao: 'Mostrar o caminho',
    promptWhatsApp: 'Ola Selene! Tenho interesse na consulta *A cura ou o veneno?* (R$ 90). Podemos agendar?',
  },
]

const avisos: Aviso[] = [
  { id: 1, titulo: 'Posso ser carismatica — e tambem maldita', descricao: 'Nao me ofenda durante as consultas. A boca que abencoa tambem e a que amaldicoa.' },
  { id: 2, titulo: 'Oraculo nao substitui profissionais', descricao: 'Medicos, psicologos, psiquiatras, advogados — meu trabalho e espiritual, nao clinico.' },
  { id: 3, titulo: 'O que foi dito, fica entre nos', descricao: 'Sigilo absoluto. Confidencialidade ate a morte — e alem.' },
]

// ---- Componente Home -------------------------------------
function Home({ setPagina }: HomeProps) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-chip">
          <div className="hero-chip-dot"></div>
          BRUXA · FEITICEIRA · ORACULISTA
        </div>
        <h1 className="hero-title">ArcanaWeb</h1>
        <p className="hero-by">por Selene</p>
        <p className="hero-sub">
          Tarot consciente. Sem filtros, sem enfeites — so o que o oraculo mostra.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Ver Consultas
        </button>
      </section>

      {/* QUEM SOU EU */}
      <section className="section">
        <div className="section-tag">Quem sou eu</div>
        <p className="quem-body">
          Me chamo <span>Selene</span>. Tenho 21 anos e sou devota de Afrodite ha muitas vidas.
          Defendo uma bruxaria consciente — que resiste a imposicoes e luta contra opressoes.
        </p>
        <div className="quem-quote">Magia, se for magia, e politica.</div>
        <p className="quem-footer">
          Bruxa, feiticeira, pesquisadora eterna — vitima e aprendiz da minha propria consciencia.
        </p>
      </section>

      {/* ANTES DE COMECAR */}
      <section className="section">
        <div className="section-tag">Antes de comecar</div>
        {avisos.map((aviso: Aviso) => (
          <div key={aviso.id} className="aviso">
            <div className="aviso-ico"><div className="aviso-ico-dot"></div></div>
            <div>
              <div className="aviso-title">{aviso.titulo}</div>
              <p className="aviso-desc">{aviso.descricao}</p>
            </div>
          </div>
        ))}
        <div className="aviso-warn">
          <p>Nao me responsabilizo por acoes tomadas apos a consulta. Eu mostro o caminho — o que voce faz com essa informacao e sua escolha.</p>
        </div>
      </section>

      {/* SERVICOS — clique redireciona ao WhatsApp */}
      <section className="section" id="servicos">
        <div className="metodos-header">
          <div className="section-tag" style={{ marginBottom: 0 }}>Servicos</div>
          <span className="metodos-count">{servicos.length} consultas disponiveis</span>
        </div>
        <div className="metodos-grid">
          {servicos.map((servico: Servico) => (
            <div key={servico.id} className="metodo">
              <div className="metodo-header">
                <div className="metodo-name">{servico.nome}</div>
                <div className="metodo-price">{servico.preco}</div>
              </div>
              <div className="metodo-tags">
                {servico.tags.map((tag: string) => (
                  <span key={tag} className="metodo-tag">{tag}</span>
                ))}
              </div>
              <p className="metodo-desc">{servico.descricao}</p>

              {/* Botao redireciona para o WhatsApp com mensagem pronta */}
              <button
                className="btn btn-secondary"
                onClick={() => abrirWhatsApp(servico.promptWhatsApp)}
                aria-label={`Agendar ${servico.nome} via WhatsApp`}
              >
                 {servico.textoBotao}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA LOJA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="section-tag">Loja</div>
        <p style={{ color: 'var(--texto-medio)', fontSize: 'var(--tamanho-lg)', marginBottom: '24px', lineHeight: '1.8' }}>
          Explore nossos produtos: velas, incensos, cristais, cartas e muito mais.
        </p>
        <button className="btn btn-primary" onClick={() => setPagina('loja')}>
           Acessar a loja
        </button>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>© 2025 <span>ArcanaWeb</span> — por Selene. Todos os direitos reservados.</p>
      </footer>
    </>
  )
}

export default Home
