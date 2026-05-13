// ============================================================
// Navbar.tsx — pasta: src/components/
// Barra de navegacao com TypeScript.
// CRIA este arquivo.
//
// No TypeScript usamos "interface" para definir o formato
// das props que o componente aceita.
// Se passar uma prop errada, o VS Code avisa na hora.
// ============================================================

import { useState } from 'react'
import '../styles/Navbar.css'

// ---- Interface das Props -----------------------------------
// "interface" define o contrato das props deste componente.
// setPagina: funcao que recebe uma string e nao retorna nada (void)
// paginaAtual: string com o nome da pagina ativa
interface NavbarProps {
  setPagina: (pagina: string) => void
  paginaAtual: string
}

// ---- Componente Navbar -------------------------------------
// As props sao tipadas com a interface NavbarProps acima.
// Se tentar passar uma prop diferente, TypeScript acusa erro.
function Navbar({ setPagina, paginaAtual }: NavbarProps) {

  // Estado do menu mobile: boolean (true ou false)
  // useState<boolean> define explicitamente o tipo
  const [menuAberto, setMenuAberto] = useState<boolean>(false)

  // Inverte o estado do menu mobile
  function toggleMenu(): void {
    setMenuAberto(!menuAberto)
  }

  // Navega para uma pagina e fecha o menu mobile
  function navegar(nomePagina: string): void {
    setPagina(nomePagina)
    setMenuAberto(false)
  }

  return (
    <nav className="navbar">

      {/* Logo: clica e volta para home */}
      <span className="navbar-logo" onClick={() => navegar('home')}>
        Diabrera
      </span>

      {/* Botao hamburguer: aparece so no mobile via CSS */}
      <button className="navbar-toggle" onClick={toggleMenu}>
        {menuAberto ? '✕' : '☰'}
      </button>

      {/* Links de navegacao */}
      {/* Adiciona classe 'aberto' quando menuAberto for true */}
      <div className={`navbar-links ${menuAberto ? 'aberto' : ''}`}>

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
