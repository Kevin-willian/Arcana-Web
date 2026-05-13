// ============================================================
// Login.tsx — pasta: src/pages/
// Pagina de Login e Cadastro com abas.
// CRIA este arquivo.
//
// Conceitos de TypeScript usados aqui:
// - useState<string>: guarda qual aba esta ativa
// - interface: define o formato dos dados do formulario
// - type: define os valores possiveis da aba ativa
// ============================================================

import { useState } from 'react'
import '../styles/Login.css'

// ---- Tipo da aba ativa ------------------------------------
// So pode ser 'entrar' ou 'cadastrar'
// Se tentar outro valor, TypeScript avisa
type AbaAtiva = 'entrar' | 'cadastrar'

// ---- Interface das Props ----------------------------------
interface LoginProps {
  setPagina: (pagina: string) => void
}

// ---- Interface dos dados do formulario de login -----------
// Define quais campos o formulario de login tem
interface DadosLogin {
  email: string
  senha: string
}

// ---- Interface dos dados do formulario de cadastro --------
interface DadosCadastro {
  nome: string
  sobrenome: string
  email: string
  senha: string
  confirmarSenha: string
}

// ---- Componente Login -------------------------------------
function Login({ setPagina }: LoginProps) {

  // -- Aba ativa: 'entrar' ou 'cadastrar' -------------------
  // Controla qual formulario esta visivel
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('entrar')

  // -- Dados do formulario de login -------------------------
  // Cada campo do formulario tem seu proprio estado
  const [dadosLogin, setDadosLogin] = useState<DadosLogin>({
    email: '',
    senha: '',
  })

  // -- Dados do formulario de cadastro ----------------------
  const [dadosCadastro, setDadosCadastro] = useState<DadosCadastro>({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })

  // -- Mensagem de erro -------------------------------------
  // Guarda mensagens de erro para exibir ao usuario
  const [erro, setErro] = useState<string>('')

  // -- Funcao: atualiza campo do login ---------------------
  // "e" e o evento do input, e.target.value e o valor digitado
  // keyof DadosLogin significa que "campo" so pode ser
  // 'email' ou 'senha' — os campos definidos na interface
  function atualizarLogin(campo: keyof DadosLogin, valor: string): void {
    setDadosLogin({ ...dadosLogin, [campo]: valor })
    setErro('') // limpa o erro ao digitar
  }

  // -- Funcao: atualiza campo do cadastro ------------------
  function atualizarCadastro(campo: keyof DadosCadastro, valor: string): void {
    setDadosCadastro({ ...dadosCadastro, [campo]: valor })
    setErro('')
  }

  // -- Funcao: envia o formulario de login -----------------
  function submeterLogin(): void {
    // Validacao basica: campos vazios
    if (!dadosLogin.email || !dadosLogin.senha) {
      setErro('Preencha todos os campos.')
      return
    }

    // Validacao de formato de email
    if (!dadosLogin.email.includes('@')) {
      setErro('Digite um e-mail valido.')
      return
    }

    // Aqui futuramente vai a chamada para a API do backend
    // Por enquanto, so mostra um alert de sucesso
    alert(`Login realizado! Email: ${dadosLogin.email}`)
  }

  // -- Funcao: envia o formulario de cadastro --------------
  function submeterCadastro(): void {
    // Validacao: campos vazios
    if (!dadosCadastro.nome || !dadosCadastro.email || !dadosCadastro.senha) {
      setErro('Preencha todos os campos obrigatorios.')
      return
    }

    // Validacao: formato de email
    if (!dadosCadastro.email.includes('@')) {
      setErro('Digite um e-mail valido.')
      return
    }

    // Validacao: senhas iguais
    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      setErro('As senhas nao coincidem.')
      return
    }

    // Validacao: senha minima de 6 caracteres
    if (dadosCadastro.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    // Aqui futuramente vai a chamada para a API do backend
    alert(`Cadastro realizado! Bem-vindo(a), ${dadosCadastro.nome}!`)
  }

  return (
    <div className="login-page">
      <div className="login-card">

        {/* CABECALHO: logo e subtitulo */}
        <div className="login-header">
          <span className="login-logo">Diabrera</span>
          <p className="login-subtitle">Acesse sua conta</p>
        </div>

        {/* ABAS: ENTRAR e CADASTRAR */}
        <div className="login-tabs">

          {/* Aba Entrar: adiciona classe 'ativo' quando selecionada */}
          <button
            className={`login-tab ${abaAtiva === 'entrar' ? 'ativo' : ''}`}
            onClick={() => {
              setAbaAtiva('entrar')
              setErro('') // limpa erro ao trocar de aba
            }}
          >
            Entrar
          </button>

          {/* Aba Cadastrar */}
          <button
            className={`login-tab ${abaAtiva === 'cadastrar' ? 'ativo' : ''}`}
            onClick={() => {
              setAbaAtiva('cadastrar')
              setErro('')
            }}
          >
            Cadastrar
          </button>

        </div>

        {/* CORPO: renderiza o formulario da aba ativa */}
        <div className="login-body">

          {/* ---- FORMULARIO DE LOGIN ---------------------- */}
          {/* O operador && renderiza o JSX so se a condicao for true */}
          {abaAtiva === 'entrar' && (
            <>
              {/* Campo E-mail */}
              <div className="campo-grupo">
                <label className="campo-label">E-mail</label>
                <input
                  type="email"
                  className="campo-input"
                  placeholder="seu@email.com"
                  value={dadosLogin.email}
                  onChange={(e) => atualizarLogin('email', e.target.value)}
                />
              </div>

              {/* Campo Senha */}
              <div className="campo-grupo">
                <label className="campo-label">Senha</label>
                <input
                  type="password"
                  className="campo-input"
                  placeholder="••••••••"
                  value={dadosLogin.senha}
                  onChange={(e) => atualizarLogin('senha', e.target.value)}
                />
              </div>

              {/* Mensagem de erro (aparece so se "erro" tiver valor) */}
              {erro && <span className="campo-erro">{erro}</span>}

              {/* Botao de entrar */}
              <button className="login-btn" onClick={submeterLogin}>
                Entrar
              </button>

              {/* Link para ir para cadastro */}
              <div className="login-footer">
                Nao tem conta?{' '}
                <span onClick={() => setAbaAtiva('cadastrar')}>
                  Cadastre-se
                </span>
              </div>
            </>
          )}

          {/* ---- FORMULARIO DE CADASTRO ------------------- */}
          {abaAtiva === 'cadastrar' && (
            <>
              {/* Campos Nome e Sobrenome lado a lado */}
              <div className="campos-duplos">
                <div className="campo-grupo">
                  <label className="campo-label">Nome</label>
                  <input
                    type="text"
                    className="campo-input"
                    placeholder="Seu nome"
                    value={dadosCadastro.nome}
                    onChange={(e) => atualizarCadastro('nome', e.target.value)}
                  />
                </div>
                <div className="campo-grupo">
                  <label className="campo-label">Sobrenome</label>
                  <input
                    type="text"
                    className="campo-input"
                    placeholder="Seu sobrenome"
                    value={dadosCadastro.sobrenome}
                    onChange={(e) => atualizarCadastro('sobrenome', e.target.value)}
                  />
                </div>
              </div>

              {/* Campo E-mail */}
              <div className="campo-grupo">
                <label className="campo-label">E-mail</label>
                <input
                  type="email"
                  className="campo-input"
                  placeholder="seu@email.com"
                  value={dadosCadastro.email}
                  onChange={(e) => atualizarCadastro('email', e.target.value)}
                />
              </div>

              {/* Campo Senha */}
              <div className="campo-grupo">
                <label className="campo-label">Senha</label>
                <input
                  type="password"
                  className="campo-input"
                  placeholder="Minimo 6 caracteres"
                  value={dadosCadastro.senha}
                  onChange={(e) => atualizarCadastro('senha', e.target.value)}
                />
              </div>

              {/* Campo Confirmar Senha */}
              <div className="campo-grupo">
                <label className="campo-label">Confirmar Senha</label>
                <input
                  type="password"
                  className="campo-input"
                  placeholder="Repita a senha"
                  value={dadosCadastro.confirmarSenha}
                  onChange={(e) => atualizarCadastro('confirmarSenha', e.target.value)}
                />
              </div>

              {/* Mensagem de erro */}
              {erro && <span className="campo-erro">{erro}</span>}

              {/* Botao de cadastrar */}
              <button className="login-btn" onClick={submeterCadastro}>
                Criar conta
              </button>

              {/* Link para ir para login */}
              <div className="login-footer">
                Ja tem conta?{' '}
                <span onClick={() => setAbaAtiva('entrar')}>
                  Entrar
                </span>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default Login
