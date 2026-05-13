// ============================================================
// Button.jsx — pasta: src/components/
// Componente de botao reutilizavel.
// CRIA este arquivo (nao existe ainda no seu projeto).
//
// Como usar em qualquer pagina:
// import Button from '../components/Button.jsx'
// <Button texto="Ver Consultas" variante="primary" />
// <Button texto="Saiba mais" variante="secondary" />
// ============================================================

import '../styles/Button.css'

// Props:
// texto    -> texto exibido no botao
// variante -> 'primary', 'secondary' ou 'metodo'
// onClick  -> funcao executada ao clicar (opcional)
// tipo     -> 'button' ou 'submit' (padrao: 'button')
function Button({ texto = 'Clique', variante = 'primary', onClick = null, tipo = 'button' }) {

  // Monta a classe: "btn btn-primary", "btn btn-secondary", etc
  const classe = `btn btn-${variante}`

  return (
    <button type={tipo} className={classe} onClick={onClick}>
      {texto}
    </button>
  )
}

export default Button
