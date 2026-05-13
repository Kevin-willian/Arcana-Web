// ============================================================
// main.jsx — pasta: src/
// Arquivo de entrada do React.
// SUBSTITUI o main.jsx que o Vite gerou.
//
// Ele conecta o React com o index.html (div id="root").
// Tambem importa o CSS global para valer em toda a aplicacao.
// ============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Importa o CSS global — variaveis de cor e reset
// Importado aqui para funcionar em TODAS as paginas
import './styles/global.css'

// Importa o componente principal
import App from './App.jsx'

// Injeta o React dentro da div id="root" do index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
