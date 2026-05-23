import { useState } from 'react'
type ErrosFormulario = { [campo: string]: string }
import '../styles/Login.css'

type AbaAtiva = 'entrar' | 'cadastrar'

interface LoginProps {
  setPagina: (pagina: string) => void
  onLogin?: (usuario: { id: number; nome: string; sobrenome: string; email: string }) => void
}

interface DadosLogin { email: string; senha: string }
interface DadosCadastro { nome: string; sobrenome: string; email: string; senha: string; confirmarSenha: string }

const API_URL = 'https://arcana-web-production.up.railway.app'

function validarEmail(email: string): string {
  if (!email.trim()) return 'E-mail e obrigatorio.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'E-mail invalido.'
  return ''
}

function validarSenha(senha: string): string {
  if (!senha) return 'Senha e obrigatoria.'
  if (senha.length < 6) return 'Senha deve ter pelo menos 6 caracteres.'
  return ''
}

function validarNome(nome: string): string {
  if (!nome.trim()) return 'Nome e obrigatorio.'
  if (nome.trim().length < 2) return 'Nome muito curto.'
  return ''
}

function Login({ setPagina, onLogin }: LoginProps) {

  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('entrar')
  const [carregando, setCarregando] = useState<boolean>(false)
  const [dadosLogin, setDadosLogin] = useState<DadosLogin>({ email: '', senha: '' })
  const [dadosCadastro, setDadosCadastro] = useState<DadosCadastro>({ nome: '', sobrenome: '', email: '', senha: '', confirmarSenha: '' })
  const [errosLogin, setErrosLogin] = useState<ErrosFormulario>({})
  const [errosCadastro, setErrosCadastro] = useState<ErrosFormulario>({})
  const [erroGeral, setErroGeral] = useState<string>('')

  function atualizarLogin(campo: keyof DadosLogin, valor: string): void {
    setDadosLogin({ ...dadosLogin, [campo]: valor })
    if (errosLogin[campo]) setErrosLogin({ ...errosLogin, [campo]: '' })
    setErroGeral('')
  }

  function atualizarCadastro(campo: keyof DadosCadastro, valor: string): void {
    setDadosCadastro({ ...dadosCadastro, [campo]: valor })
    if (errosCadastro[campo]) setErrosCadastro({ ...errosCadastro, [campo]: '' })
    setErroGeral('')
  }

  async function submeterLogin(): Promise<void> {
    const novosErros: ErrosFormulario = {
      email: validarEmail(dadosLogin.email),
      senha: validarSenha(dadosLogin.senha),
    }
    if (Object.values(novosErros).some(e => e !== '')) { setErrosLogin(novosErros); return }
    setCarregando(true)
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: dadosLogin.email, senha: dadosLogin.senha })
    })
    if (!response.ok) { setErroGeral('Email ou senha incorretos.'); setCarregando(false); return }
    const dados = await response.json()
    if (onLogin) onLogin({ id: dados.id, nome: dados.nome, sobrenome: dados.sobrenome, email: dados.email })
    setCarregando(false)
  }

  async function submeterCadastro(): Promise<void> {
    const novosErros: ErrosFormulario = {
      nome: validarNome(dadosCadastro.nome),
      email: validarEmail(dadosCadastro.email),
      senha: validarSenha(dadosCadastro.senha),
      confirmarSenha: dadosCadastro.senha !== dadosCadastro.confirmarSenha ? 'Senhas nao coincidem.' : '',
    }
    if (Object.values(novosErros).some(e => e !== '')) { setErrosCadastro(novosErros); return }
    setCarregando(true)
    const response = await fetch(`${API_URL}/api/auth/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: dadosCadastro.nome, sobrenome: dadosCadastro.sobrenome, email: dadosCadastro.email, senha: dadosCadastro.senha })
    })
    if (!response.ok) { setErroGeral('Este email já está em uso.'); setCarregando(false); return }
    if (onLogin) onLogin({ id: 0, nome: dadosCadastro.nome, sobrenome: dadosCadastro.sobrenome, email: dadosCadastro.email })
    setCarregando(false)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-logo">ArcanaWeb</span>
          <p className="login-subtitle">Acesse sua conta</p>
        </div>
        <div className="login-tabs">
          <button className={`login-tab ${abaAtiva === 'entrar' ? 'ativo' : ''}`} onClick={() => { setAbaAtiva('entrar'); setErroGeral('') }}>Entrar</button>
          <button className={`login-tab ${abaAtiva === 'cadastrar' ? 'ativo' : ''}`} onClick={() => { setAbaAtiva('cadastrar'); setErroGeral('') }}>Cadastrar</button>
        </div>
        <div className="login-body">
          {erroGeral && <div className="campo-erro" style={{ marginBottom: '12px', fontSize: 'var(--tamanho-sm)' }} role="alert">❌ {erroGeral}</div>}
          {abaAtiva === 'entrar' && (
            <>
              <div className="campo-grupo">
                <label className="campo-label" htmlFor="login-email">E-mail</label>
                <input id="login-email" type="email" className={`campo-input ${errosLogin.email ? 'erro' : ''}`} placeholder="seu@email.com" value={dadosLogin.email} onChange={e => atualizarLogin('email', e.target.value)} aria-invalid={!!errosLogin.email} />
                {errosLogin.email && <span className="campo-erro" role="alert">{errosLogin.email}</span>}
              </div>
              <div className="campo-grupo">
                <label className="campo-label" htmlFor="login-senha">Senha</label>
                <input id="login-senha" type="password" className={`campo-input ${errosLogin.senha ? 'erro' : ''}`} placeholder="••••••••" value={dadosLogin.senha} onChange={e => atualizarLogin('senha', e.target.value)} aria-invalid={!!errosLogin.senha} />
                {errosLogin.senha && <span className="campo-erro" role="alert">{errosLogin.senha}</span>}
              </div>
              <button className="login-btn" onClick={submeterLogin} disabled={carregando} aria-busy={carregando}>{carregando ? 'Entrando...' : 'Entrar'}</button>
              <div className="login-footer">Nao tem conta? <span onClick={() => setAbaAtiva('cadastrar')}>Cadastre-se</span></div>
            </>
          )}
          {abaAtiva === 'cadastrar' && (
            <>
              <div className="campos-duplos">
                <div className="campo-grupo">
                  <label className="campo-label" htmlFor="cad-nome">Nome *</label>
                  <input id="cad-nome" type="text" className={`campo-input ${errosCadastro.nome ? 'erro' : ''}`} placeholder="Seu nome" value={dadosCadastro.nome} onChange={e => atualizarCadastro('nome', e.target.value)} />
                  {errosCadastro.nome && <span className="campo-erro" role="alert">{errosCadastro.nome}</span>}
                </div>
                <div className="campo-grupo">
                  <label className="campo-label" htmlFor="cad-sobrenome">Sobrenome</label>
                  <input id="cad-sobrenome" type="text" className="campo-input" placeholder="Seu sobrenome" value={dadosCadastro.sobrenome} onChange={e => atualizarCadastro('sobrenome', e.target.value)} />
                </div>
              </div>
              <div className="campo-grupo">
                <label className="campo-label" htmlFor="cad-email">E-mail *</label>
                <input id="cad-email" type="email" className={`campo-input ${errosCadastro.email ? 'erro' : ''}`} placeholder="seu@email.com" value={dadosCadastro.email} onChange={e => atualizarCadastro('email', e.target.value)} />
                {errosCadastro.email && <span className="campo-erro" role="alert">{errosCadastro.email}</span>}
              </div>
              <div className="campos-duplos">
                <div className="campo-grupo">
                  <label className="campo-label" htmlFor="cad-senha">Senha *</label>
                  <input id="cad-senha" type="password" className={`campo-input ${errosCadastro.senha ? 'erro' : ''}`} placeholder="Min. 6 caracteres" value={dadosCadastro.senha} onChange={e => atualizarCadastro('senha', e.target.value)} />
                  {errosCadastro.senha && <span className="campo-erro" role="alert">{errosCadastro.senha}</span>}
                </div>
                <div className="campo-grupo">
                  <label className="campo-label" htmlFor="cad-confirmar">Confirmar *</label>
                  <input id="cad-confirmar" type="password" className={`campo-input ${errosCadastro.confirmarSenha ? 'erro' : ''}`} placeholder="Repita a senha" value={dadosCadastro.confirmarSenha} onChange={e => atualizarCadastro('confirmarSenha', e.target.value)} />
                  {errosCadastro.confirmarSenha && <span className="campo-erro" role="alert">{errosCadastro.confirmarSenha}</span>}
                </div>
              </div>
              <button className="login-btn" onClick={submeterCadastro} disabled={carregando} aria-busy={carregando}>{carregando ? 'Criando conta...' : 'Criar conta'}</button>
              <div className="login-footer">Ja tem conta? <span onClick={() => setAbaAtiva('entrar')}>Entrar</span></div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login