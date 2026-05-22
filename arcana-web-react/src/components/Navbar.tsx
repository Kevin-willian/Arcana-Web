// ============================================================
// Navbar.tsx — Navbar inteligente com estado de autenticacao.
//
// Deslogado: Inicio | Loja | [carrinho] [Login]
// Logado:    Inicio | Loja | [carrinho] [inicial do nome]
//            Dropdown: Minha Conta, Meus Pedidos, Sair
// ============================================================

import { useState } from 'react'
import { ShoppingCart, User, LogOut, Package } from 'lucide-react'
import '../styles/Navbar.css'

export interface Usuario {
  id?: number
  nome: string
  sobrenome: string
  email: string
}

interface NavbarProps {
  setPagina: (pagina: string) => void
  paginaAtual: string
  usuario: Usuario | null
  onLogout: () => void
  qtdCarrinho: number
}

function Navbar({ setPagina, paginaAtual, usuario, onLogout, qtdCarrinho }: NavbarProps) {

  const [menuAberto, setMenuAberto] = useState<boolean>(false)
  const [dropdownAberto, setDropdownAberto] = useState<boolean>(false)

  function navegar(pagina: string): void {
    setPagina(pagina)
    setMenuAberto(false)
    setDropdownAberto(false)
  }

  const inicial: string = usuario ? usuario.nome.charAt(0).toUpperCase() : ''

  return (
    <nav className="navbar" role="navigation" aria-label="Menu principal">

      {/* Logo — clica e vai para home */}
      <span className="navbar-logo" onClick={() => navegar('home')} tabIndex={0}>
        ArcanaWeb
      </span>

      {/* Botao hamburguer — aparece so no mobile */}
      <button
        className="navbar-toggle"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-expanded={menuAberto}
        aria-label="Abrir menu"
      >
        {menuAberto ? '✕' : '☰'}
      </button>

      {/* Links centrais de navegacao */}
      <div className={`navbar-links ${menuAberto ? 'aberto' : ''}`}>
        <span
          className={paginaAtual === 'home' ? 'active' : ''}
          onClick={() => navegar('home')}
        >
          Início
        </span>
        <span
          className={paginaAtual === 'loja' ? 'active' : ''}
          onClick={() => navegar('loja')}
        >
          Loja
        </span>
      </div>

      {/* Acoes do lado direito: carrinho + login/usuario */}
      <div className="navbar-acoes">

        {/* Icone do carrinho com contador de itens */}
        <div
          className="navbar-carrinho"
          onClick={() => navegar('carrinho')}
          role="button"
          aria-label={`Carrinho com ${qtdCarrinho} itens`}
          tabIndex={0}
        >
          {/* Icone SVG do carrinho via lucide-react */}
          <ShoppingCart
            size={22}
            color="var(--cor-destaque)"
            className="navbar-carrinho-icone"
          />

          {/* Badge com quantidade — some quando carrinho esta vazio */}
          <span className={`navbar-carrinho-badge ${qtdCarrinho === 0 ? 'escondido' : ''}`}>
            {qtdCarrinho}
          </span>
        </div>

        {/* DESLOGADO: mostra botao de login */}
        {!usuario && (
          <button
            className="navbar-btn-login"
            onClick={() => navegar('login')}
          >
            Login
          </button>
        )}

        {/* LOGADO: mostra avatar com inicial do nome + dropdown */}
        {usuario && (
          <div className="navbar-usuario">

            {/* Botao circular com a inicial do nome */}
            <button
              className="navbar-usuario-btn"
              onClick={() => setDropdownAberto(!dropdownAberto)}
              aria-expanded={dropdownAberto}
              aria-label={`Menu de ${usuario.nome}`}
            >
              {inicial}
            </button>

            {/* Dropdown — aparece ao clicar no avatar */}
            {dropdownAberto && (
              <>
                {/* Overlay invisivel para fechar ao clicar fora */}
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: 199 }}
                  onClick={() => setDropdownAberto(false)}
                />

                <div className="navbar-dropdown" role="menu">

                  {/* Cabecalho com nome e email */}
                  <div className="dropdown-header">
                    <p className="dropdown-nome">{usuario.nome} {usuario.sobrenome}</p>
                    <p className="dropdown-email">{usuario.email}</p>
                  </div>

                  {/* Minha Conta */}
                  <div
                    className="dropdown-item"
                    role="menuitem"
                    onClick={() => navegar('conta')}
                  >
                    <User size={16} /> Minha Conta
                  </div>

                  {/* Meus Pedidos */}
                  <div
                    className="dropdown-item"
                    role="menuitem"
                    onClick={() => navegar('pedidos')}
                  >
                    <Package size={16} /> Meus Pedidos
                  </div>

                  {/* Sair */}
                  <div
                    className="dropdown-item sair"
                    role="menuitem"
                    onClick={() => { onLogout(); navegar('home') }}
                  >
                    <LogOut size={16} /> Sair
                  </div>

                </div>
              </>
            )}
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar
