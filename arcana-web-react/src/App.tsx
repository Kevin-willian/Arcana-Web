// ============================================================
// App.tsx — Estado global da aplicacao.
// ============================================================

import { useState } from 'react'
import { Usuario, ItemCarrinho, Produto, Pagina } from './types.ts'

import Navbar   from './components/Navbar.tsx'
import Home     from './pages/Home.tsx'
import Login    from './pages/Login.tsx'
import Loja     from './pages/Loja.tsx'
import Carrinho from './pages/Carrinho.tsx'
import Pedidos  from './pages/Pedidos.tsx'
import Conta    from './pages/Conta.tsx'

function App() {

  const [pagina,   setPagina]   = useState<Pagina>('home')
  const [usuario,  setUsuario]  = useState<Usuario | null>(null)
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])

  // Quantidade total de itens no carrinho (soma das quantidades)
  const qtdCarrinho = carrinho.reduce((acc, i) => acc + i.quantidade, 0)

  function adicionarAoCarrinho(produto: Produto): void {
    const ex = carrinho.find(i => i.produto.id === produto.id)
    if (ex) setCarrinho(carrinho.map(i => i.produto.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i))
    else    setCarrinho([...carrinho, { produto, quantidade: 1 }])
  }

  function fazerLogin(novoUsuario: Usuario): void {
    setUsuario(novoUsuario)
    setPagina('home')
  }

  function fazerLogout(): void {
    setUsuario(null)
    setCarrinho([])
    setPagina('home')
  }

  function atualizarUsuario(u: Usuario): void {
    setUsuario(u)
  }

  function navegar(p: string): void {
    setPagina(p as Pagina)
  }

  function renderizarPagina() {
    if (pagina === 'home')     return <Home setPagina={navegar} />
    if (pagina === 'login')    return <Login setPagina={navegar} onLogin={fazerLogin} />
    if (pagina === 'loja')     return <Loja setPagina={navegar} onAdicionarCarrinho={adicionarAoCarrinho} />
    if (pagina === 'carrinho') return (
      <Carrinho
        setPagina={navegar}
        itens={carrinho}
        onAtualizar={setCarrinho}
        onCompraFinalizada={() => navegar('pedidos')}
        usuario={usuario}
      />
    )
    if (pagina === 'pedidos')  return <Pedidos setPagina={navegar} usuario={usuario} />
    if (pagina === 'conta')    return (
      <Conta
        setPagina={navegar}
        usuario={usuario}
        onAtualizarUsuario={atualizarUsuario}
        onLogout={fazerLogout}
      />
    )
    return <Home setPagina={navegar} />
  }

  return (
    <div>
      <Navbar
        setPagina={navegar}
        paginaAtual={pagina}
        usuario={usuario}
        onLogout={fazerLogout}
        qtdCarrinho={qtdCarrinho}
      />
      <main>{renderizarPagina()}</main>
    </div>
  )
}

export default App
