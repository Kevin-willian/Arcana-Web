// ============================================================
// Button.tsx — pasta: src/components/
// Componente de botao reutilizavel com TypeScript.
// CRIA este arquivo.
//
// Como usar em qualquer pagina:
// import Button from '../components/Button.tsx'
// <Button texto="Ver Consultas" variante="primary" />
// ============================================================

import '../styles/Button.css'

// ---- Interface das Props -----------------------------------
// Cada prop tem seu tipo definido.
// O "?" no final torna a prop OPCIONAL.
// Se nao passar, usa o valor padrao definido na funcao.
interface ButtonProps {
  texto: string                          // obrigatorio
  variante?: 'primary' | 'secondary' | 'metodo' // opcional, so aceita esses 3 valores
  onClick?: () => void                   // opcional, funcao sem parametros e sem retorno
  tipo?: 'button' | 'submit' | 'reset'  // opcional, tipo do botao HTML
}

// ---- Componente Button -------------------------------------
function Button({
  texto,
  variante = 'primary',   // valor padrao se nao passar
  onClick,
  tipo = 'button',
}: ButtonProps) {

  // Monta a classe CSS: "btn btn-primary", "btn btn-secondary"
  const classe: string = `btn btn-${variante}`

  return (
    <button type={tipo} className={classe} onClick={onClick}>
      {texto}
    </button>
  )
}

export default Button
