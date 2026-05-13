// ============================================================
// App.tsx — pasta: src/
// Componente raiz da aplicacao.
// SUBSTITUI o App.tsx que o Vite gerou.
// ============================================================

import { useState } from 'react'

import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'

// -- Proximas paginas: descomente quando criar os arquivos ---
// import Loja from './pages/Loja.tsx'
// import Pedidos from './pages/Pedidos.tsx'

// Tipo da pagina: so aceita esses valores
type Pagina = 'home' | 'login' | 'loja' | 'pedidos'

function App() {

  // Estado da pagina atual
  const [pagina, setPagina] = useState<Pagina>('home')

  // Decide qual pagina renderizar
  function renderizarPagina(): JSX.Element {

    if (pagina === 'home') {
      return <Home setPagina={setPagina} />
    }

    if (pagina === 'login') {
      return <Login setPagina={setPagina} />
    }

    // Descomente quando criar Loja.tsx
    // if (pagina === 'loja') {
    //   return <Loja setPagina={setPagina} />
    // }

    // Descomente quando criar Pedidos.tsx
    // if (pagina === 'pedidos') {
    //   return <Pedidos setPagina={setPagina} />
    // }

    return <Home setPagina={setPagina} />
  }

  return (
    <div>
      <Navbar setPagina={setPagina} paginaAtual={pagina} />
      <main>
        {renderizarPagina()}
      </main>
    </div>
  )
}

export default App
