// ============================================================
// App.jsx — pasta: src/
// Componente raiz da aplicacao.
// SUBSTITUI o App.jsx que o Vite gerou.
//
// Usa useState para controlar qual pagina esta visivel.
// A Navbar e os botoes chamam setPagina para trocar de pagina.
// ============================================================

import { useState } from 'react'

// Importa os componentes reutilizaveis
import Navbar from './components/Navbar.jsx'

// Importa as paginas
import Home from './pages/Home.jsx'

// -- Proximas paginas ---------------------------------------
// Quando criar o arquivo, descomente a linha correspondente
// import Login from './pages/Login.jsx'
// import Registro from './pages/Registro.jsx'
// import Loja from './pages/Loja.jsx'
// import Pedidos from './pages/Pedidos.jsx'

function App() {

  // -- Estado da pagina atual ------------------------------
  // Comeca em 'home'. Mude para testar outra pagina.
  // Valores possiveis: 'home', 'login', 'registro', 'loja', 'pedidos'
  const [pagina, setPagina] = useState('home')

  // -- Decide qual pagina mostrar --------------------------
  function renderizarPagina() {

    if (pagina === 'home') {
      // passa setPagina para Home poder navegar para outras paginas
      return <Home setPagina={setPagina} />
    }

    // Descomente quando criar Login.jsx
    // if (pagina === 'login') {
    //   return <Login setPagina={setPagina} />
    // }

    // Descomente quando criar Registro.jsx
    // if (pagina === 'registro') {
    //   return <Registro setPagina={setPagina} />
    // }

    // Descomente quando criar Loja.jsx
    // if (pagina === 'loja') {
    //   return <Loja setPagina={setPagina} />
    // }

    // Descomente quando criar Pedidos.jsx
    // if (pagina === 'pedidos') {
    //   return <Pedidos setPagina={setPagina} />
    // }

    // Se nao encontrar, volta para home
    return <Home setPagina={setPagina} />
  }

  return (
    <div>
      {/* Navbar aparece em todas as paginas */}
      <Navbar setPagina={setPagina} paginaAtual={pagina} />

      {/* Conteudo da pagina atual */}
      <main>
        {renderizarPagina()}
      </main>
    </div>
  )
}

export default App
