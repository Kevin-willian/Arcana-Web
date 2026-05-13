// ============================================================
// Navbar.jsx — pasta: src/components/
// Barra de navegacao fixa no topo.
// CRIA este arquivo (nao existe ainda no seu projeto).
//
// Recebe do App.jsx:
// - setPagina: funcao para trocar a pagina ativa
// - paginaAtual: nome da pagina atual
// ============================================================

import { useState } from 'react'
import '../styles/Navbar.css'

function Navbar({ setPagina, paginaAtual }) {

  // Controla se o menu mobile esta aberto ou fechado
  const [menuAberto, setMenuAberto] = useState(false)

  // Inverte o estado do menu: true vira false e vice-versa
  function toggleMenu() {
    setMenuAberto(!menuAberto)
  }

  // Troca de pagina e fecha o menu mobile
  function navegar(nomePagina) {
    setPagina(nomePagina)
    setMenuAberto(false)
  }

  return (
    <nav className="navbar">

      {/* Logo: clica e volta para home */}
      <span className="navbar-logo" onClick={() => navegar('home')}>
        Diabrera
      </span>

      {/* Botao hamburguer: aparece so no mobile */}
      <button className="navbar-toggle" onClick={toggleMenu}>
        {menuAberto ? '✕' : '☰'}
      </button>

      {/* Links: classe 'aberto' abre o menu no mobile */}
      <div className={`navbar-links ${menuAberto ? 'aberto' : ''}`}>

        {/* Classe 'active' destaca o link da pagina atual */}
        <span
          className={paginaAtual === 'home' ? 'active' : ''}
          onClick={() => navegar('home')}
        >
          Inicio
        </span>

        <span
          className={paginaAtual === 'loja' ? 'active' : ''}
          onClick={() => navegar('loja')}
        >
          Loja
        </span>

        <span
          className={paginaAtual === 'consultas' ? 'active' : ''}
          onClick={() => navegar('consultas')}
        >
          Consultas
        </span>

        <span
          className={`btn-login ${paginaAtual === 'login' ? 'active' : ''}`}
          onClick={() => navegar('login')}
        >
          Login
        </span>

      </div>
    </nav>
  )
}

export default Navbar
