// ============================================================
// main.tsx — pasta: src/
// Arquivo de entrada do React com TypeScript.
// SUBSTITUI o main.tsx que o Vite gerou.
//
// A extensao .tsx indica que o arquivo usa TypeScript + JSX.
// ============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Importa o CSS global — variaveis de cor e reset
// Importado aqui para funcionar em TODAS as paginas
import './index.css'

// Importa o componente principal App
import App from './App.tsx'

// Busca a div id="root" no index.html e injeta o React dentro
// O ! no final diz ao TypeScript que esse elemento sempre existe
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
