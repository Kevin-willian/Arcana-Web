// ============================================================
// App.tsx — pasta: src/
// Componente raiz da aplicacao.
// SUBSTITUI o App.tsx que o Vite gerou.
//
// Diferenca do .jsx para o .tsx:
// No TypeScript definimos os TIPOS das variaveis.
// Exemplo: useState<string> diz que "pagina" e uma string.
// ============================================================

import { useState } from 'react'

// Importa os componentes e paginas
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'

// -- Proximas paginas: descomente quando criar os arquivos ---
// import Login from './pages/Login.tsx'
// import Registro from './pages/Registro.tsx'
// import Loja from './pages/Loja.tsx'
// import Pedidos from './pages/Pedidos.tsx'

// ---- Tipo da pagina ----------------------------------------
// "type" define os valores possiveis para a variavel "pagina".
// Se voce tentar usar um valor diferente, o TypeScript avisa.
// Isso e uma das grandes vantagens do TypeScript sobre JS puro.
type Pagina = 'home' | 'login' | 'registro' | 'loja' | 'pedidos'

// ---- Componente App ----------------------------------------
function App() {

  // -- Estado da pagina atual --------------------------------
  // useState<Pagina> diz ao TypeScript que "pagina" so pode
  // receber os valores definidos no type Pagina acima.
  // Se tentar setPagina('qualquercoisa') o TS acusa erro.
  const [pagina, setPagina] = useState<Pagina>('home')

  // -- Funcao que decide qual pagina renderizar --------------
  // O tipo de retorno JSX.Element e automatico no TypeScript.
  function renderizarPagina(): JSX.Element {

    if (pagina === 'home') {
      return <Home setPagina={setPagina} />
    }

    // Descomente quando criar Login.tsx
    // if (pagina === 'login') {
    //   return <Login setPagina={setPagina} />
    // }

    // Descomente quando criar Registro.tsx
    // if (pagina === 'registro') {
    //   return <Registro setPagina={setPagina} />
    // }

    // Descomente quando criar Loja.tsx
    // if (pagina === 'loja') {
    //   return <Loja setPagina={setPagina} />
    // }

    // Descomente quando criar Pedidos.tsx
    // if (pagina === 'pedidos') {
    //   return <Pedidos setPagina={setPagina} />
    // }

    // Fallback: volta para home se pagina nao encontrada
    return <Home setPagina={setPagina} />
  }

  return (
    <div>
      {/* Navbar recebe setPagina e paginaAtual como props */}
      <Navbar setPagina={setPagina} paginaAtual={pagina} />

      {/* Renderiza a pagina ativa */}
      <main>
        {renderizarPagina()}
      </main>
    </div>
  )
}

export default App
