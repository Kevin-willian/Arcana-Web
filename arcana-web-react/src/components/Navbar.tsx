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
      <span className="navbar-logo" onClick={() => navegar('home')} tabIndex={0}>ArcanaWeb</span>
      <button className="navbar-toggle" onClick={() => setMenuAberto(!menuAberto)} aria-expanded={menuAberto} aria-label="Abrir menu">
        {menuAberto ? '✕' : '☰'}
      </button>
      <div className={`navbar-links ${menuAberto ? 'aberto' : ''}`}>
        <span className={paginaAtual === 'home' ? 'active' : ''} onClick={() => navegar('home')}>Início</span>
        <span className={paginaAtual === 'loja' ? 'active' : ''} onClick={() => navegar('loja')}>Loja</span>
      </div>
      <div className="navbar-acoes">
        <div className="navbar-carrinho" onClick={() => navegar('carrinho')} role="button" aria-label={`Carrinho com ${qtdCarrinho} itens`} tabIndex={0}>
          <ShoppingCart size={22} color="var(--cor-destaque)" className="navbar-carrinho-icone" />
          <span className={`navbar-carrinho-badge ${qtdCarrinho === 0 ? 'escondido' : ''}`}>{qtdCarrinho}</span>
        </div>
        {!usuario && <button className="navbar-btn-login" onClick={() => navegar('login')}>Login</button>}
        {usuario && (
          <div className="navbar-usuario">
            <button className="navbar-usuario-btn" onClick={() => setDropdownAberto(!dropdownAberto)} aria-expanded={dropdownAberto} aria-label={`Menu de ${usuario.nome}`}>
              {inicial}
            </button>
            {dropdownAberto && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 199 }} onClick={() => setDropdownAberto(false)} />
                <div className="navbar-dropdown" role="menu">
                  <div className="dropdown-header">
                    <p className="dropdown-nome">{usuario.nome} {usuario.sobrenome}</p>
                    <p className="dropdown-email">{usuario.email}</p>
                  </div>
                  <div className="dropdown-item" role="menuitem" onClick={() => navegar('conta')}><User size={16} /> Minha Conta</div>
                  <div className="dropdown-item" role="menuitem" onClick={() => navegar('pedidos')}><Package size={16} /> Meus Pedidos</div>
                  <div className="dropdown-item sair" role="menuitem" onClick={() => { onLogout(); navegar('home') }}><LogOut size={16} /> Sair</div>
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