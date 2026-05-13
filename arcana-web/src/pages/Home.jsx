// ============================================================
// Home.jsx — pasta: src/pages/
// Pagina principal do ArcanaWeb.
// CRIA este arquivo (nao existe ainda no seu projeto).
// ============================================================

import Button from '../components/Button.jsx'
import '../styles/Home.css'

// -- Dados dos metodos ---------------------------------------
const metodos = [
  {
    id: 1,
    nome: 'A Destemida',
    preco: 'R$ 250',
    tags: ['Completa', 'Amor', 'Trabalho', 'Espiritual'],
    descricao: 'Consulta integral da sua vida — ambito amoroso, profissional e espiritual. Presente, obstaculos e aconselhamentos futuros. Intensa. Reveladora.',
    textoBotao: 'Quero essa consulta',
  },
  {
    id: 2,
    nome: 'Quem soltou os caes?',
    preco: 'R$ 190',
    tags: ['Amoroso', 'Inconsciente do outro'],
    descricao: 'Entraremos no inconsciente do seu parceiro. Pensamentos, sentimentos e intencoes reais. Pode trazer a gloria ou a ruina.',
    textoBotao: 'Vamos farejar',
  },
  {
    id: 3,
    nome: 'Abutres do velho mundo',
    preco: 'R$ 120',
    tags: ['Analise energetica', 'Limpeza'],
    descricao: 'Existe algo travando seus caminhos? Analisamos com o oraculo se ha energia nociva agindo sobre voce.',
    textoBotao: 'Analisar minha energia',
  },
  {
    id: 4,
    nome: 'A cura ou o veneno?',
    preco: 'R$ 90',
    tags: ['Decisoes', '30 min', 'Nao amoroso'],
    descricao: 'Para situacoes sem saida aparente. Quando nao sabe o caminho, o oraculo mostra. Voce decide o que beber.',
    textoBotao: 'Mostrar o caminho',
  },
]

// -- Dados dos avisos ----------------------------------------
const avisos = [
  {
    id: 1,
    titulo: 'Posso ser carismatica — e tambem maldita',
    descricao: 'Nao me ofenda durante as consultas. A boca que abencoa tambem e a que amaldicoa.',
  },
  {
    id: 2,
    titulo: 'Oraculo nao substitui profissionais',
    descricao: 'Medicos, psicologos, psiquiatras, advogados — meu trabalho e espiritual, nao clinico.',
  },
  {
    id: 3,
    titulo: 'O que foi dito, fica entre nos',
    descricao: 'Sigilo absoluto. Confidencialidade ate a morte — e alem.',
  },
]

// -- Componente ----------------------------------------------
function Home({ setPagina }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-chip">
          <div className="hero-chip-dot"></div>
          BRUXA · FEITICEIRA · ORACULISTA
        </div>
        <h1 className="hero-title">Diabrera</h1>
        <p className="hero-by">por Selene</p>
        <p className="hero-sub">
          Tarot consciente. Sem filtros, sem enfeites — so o que o oraculo mostra.
        </p>
        <Button
          texto="Ver Consultas"
          variante="primary"
          onClick={() => {
            // Rola suavemente ate a secao de metodos
            document.getElementById('metodos').scrollIntoView({ behavior: 'smooth' })
          }}
        />
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

        {/* .map() cria um elemento para cada item do array avisos */}
        {avisos.map((aviso) => (
          <div key={aviso.id} className="aviso">
            <div className="aviso-ico">
              <div className="aviso-ico-dot"></div>
            </div>
            <div>
              <div className="aviso-title">{aviso.titulo}</div>
              <p className="aviso-desc">{aviso.descricao}</p>
            </div>
          </div>
        ))}

        <div className="aviso-warn">
          <p>
            Nao me responsabilizo por acoes tomadas apos a consulta.
            Eu mostro o caminho — o que voce faz com essa informacao e sua escolha.
          </p>
        </div>
      </section>

      {/* METODOS */}
      <section className="section" id="metodos">
        <div className="metodos-header">
          <div className="section-tag" style={{ marginBottom: 0 }}>Metodos</div>
          <span className="metodos-count">{metodos.length} consultas disponiveis</span>
        </div>

        {/* .map() cria um card para cada metodo */}
        {metodos.map((metodo) => (
          <div key={metodo.id} className="metodo">
            <div className="metodo-header">
              <div className="metodo-name">{metodo.nome}</div>
              <div className="metodo-price">{metodo.preco}</div>
            </div>
            <div className="metodo-tags">
              {metodo.tags.map((tag) => (
                <span key={tag} className="metodo-tag">{tag}</span>
              ))}
            </div>
            <p className="metodo-desc">{metodo.descricao}</p>
            <Button texto={metodo.textoBotao} variante="metodo" />
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>© 2025 <span>Diabrera</span> — por Selene. Todos os direitos reservados.</p>
      </footer>
    </>
  )
}

export default Home
