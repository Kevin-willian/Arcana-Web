// ============================================================
// Conta.tsx — Dados do usuario com endereco de entrega.
// PUT /api/usuarios/me    -> atualiza dados
// PUT /api/usuarios/senha -> atualiza senha
// ============================================================

import { useState } from 'react'
import { Usuario, Endereco } from '../types.ts'
import '../styles/Conta.css'

interface ContaProps {
  setPagina: (pagina: string) => void
  usuario: Usuario | null
  onAtualizarUsuario: (usuario: Usuario) => void
  onLogout: () => void
}

interface FormSenha { senhaAtual: string; novaSenha: string; confirmarSenha: string }
interface Mensagem  { tipo: 'sucesso' | 'erro'; texto: string }

function validarEmail(email: string): string {
  if (!email.trim()) return 'E-mail e obrigatorio.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'E-mail invalido.'
  return ''
}

function Conta({ setPagina, usuario, onAtualizarUsuario, onLogout }: ContaProps) {

  if (!usuario) { setPagina('login'); return null }

  const enderecoInicial: Endereco = usuario.endereco || { rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: '' }

  const [formDados, setFormDados] = useState({ nome: usuario.nome, sobrenome: usuario.sobrenome, email: usuario.email })
  const [formEndereco, setFormEndereco] = useState<Endereco>(enderecoInicial)
  const [formSenha, setFormSenha] = useState<FormSenha>({ senhaAtual: '', novaSenha: '', confirmarSenha: '' })

  const [msgDados, setMsgDados]       = useState<Mensagem | null>(null)
  const [msgEndereco, setMsgEndereco] = useState<Mensagem | null>(null)
  const [msgSenha, setMsgSenha]       = useState<Mensagem | null>(null)
  const [salvando, setSalvando]       = useState<boolean>(false)

  async function salvarDados(): Promise<void> {
    const erroEmail = validarEmail(formDados.email)
    if (!formDados.nome.trim()) { setMsgDados({ tipo: 'erro', texto: 'Nome e obrigatorio.' }); return }
    if (erroEmail) { setMsgDados({ tipo: 'erro', texto: erroEmail }); return }

    setSalvando(true)
    // PUT /api/usuarios/me
    await new Promise(r => setTimeout(r, 800))
    onAtualizarUsuario({ ...usuario, ...formDados })
    setMsgDados({ tipo: 'sucesso', texto: 'Dados atualizados!' })
    setSalvando(false)
  }

  async function salvarEndereco(): Promise<void> {
    if (!formEndereco.rua.trim() || !formEndereco.numero.trim() || !formEndereco.cidade.trim()) {
      setMsgEndereco({ tipo: 'erro', texto: 'Preencha rua, numero e cidade.' }); return
    }
    setSalvando(true)
    // PUT /api/usuarios/me/endereco
    await new Promise(r => setTimeout(r, 800))
    onAtualizarUsuario({ ...usuario, endereco: formEndereco })
    setMsgEndereco({ tipo: 'sucesso', texto: 'Endereco salvo!' })
    setSalvando(false)
  }

  async function salvarSenha(): Promise<void> {
    if (!formSenha.senhaAtual || !formSenha.novaSenha) { setMsgSenha({ tipo: 'erro', texto: 'Preencha todos os campos.' }); return }
    if (formSenha.novaSenha.length < 6) { setMsgSenha({ tipo: 'erro', texto: 'Senha deve ter pelo menos 6 caracteres.' }); return }
    if (formSenha.novaSenha !== formSenha.confirmarSenha) { setMsgSenha({ tipo: 'erro', texto: 'Senhas nao coincidem.' }); return }

    setSalvando(true)
    // PUT /api/usuarios/senha
    await new Promise(r => setTimeout(r, 800))
    setFormSenha({ senhaAtual: '', novaSenha: '', confirmarSenha: '' })
    setMsgSenha({ tipo: 'sucesso', texto: 'Senha alterada!' })
    setSalvando(false)
  }

  const inicial = usuario.nome.charAt(0).toUpperCase()

  return (
    <div className="conta-page">

      {/* CABECALHO */}
      <div className="conta-header">
        <div className="conta-avatar" aria-hidden="true">{inicial}</div>
        <div className="conta-header-info">
          <h1 className="conta-nome-display">{usuario.nome} {usuario.sobrenome}</h1>
          <p className="conta-email-display">{usuario.email}</p>
        </div>
      </div>

      {/* DADOS PESSOAIS */}
      <div className="conta-secao">
        <div className="conta-secao-titulo">Dados pessoais</div>
        <div className="conta-secao-corpo">
          {msgDados && <div className={`conta-mensagem ${msgDados.tipo}`} role="alert">{msgDados.tipo === 'sucesso' ? '✅' : '❌'} {msgDados.texto}</div>}
          <div className="campos-duplos">
            <div className="campo-grupo"><label className="campo-label" htmlFor="nome">Nome</label><input id="nome" className="campo-input" value={formDados.nome} onChange={e => setFormDados({ ...formDados, nome: e.target.value })} /></div>
            <div className="campo-grupo"><label className="campo-label" htmlFor="sobrenome">Sobrenome</label><input id="sobrenome" className="campo-input" value={formDados.sobrenome} onChange={e => setFormDados({ ...formDados, sobrenome: e.target.value })} /></div>
          </div>
          <div className="campo-grupo"><label className="campo-label" htmlFor="email">E-mail</label><input id="email" type="email" className="campo-input" value={formDados.email} onChange={e => setFormDados({ ...formDados, email: e.target.value })} /><span className="campo-hint">Usado para login e notificacoes.</span></div>
          <div className="conta-acoes">
            <button className="btn-cancelar" onClick={() => setFormDados({ nome: usuario.nome, sobrenome: usuario.sobrenome, email: usuario.email })}>Cancelar</button>
            <button className="btn-salvar" onClick={salvarDados} disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar dados'}</button>
          </div>
        </div>
      </div>

      {/* ENDERECO DE ENTREGA */}
      <div className="conta-secao">
        <div className="conta-secao-titulo">Endereco de entrega</div>
        <div className="conta-secao-corpo">
          {msgEndereco && <div className={`conta-mensagem ${msgEndereco.tipo}`} role="alert">{msgEndereco.tipo === 'sucesso' ? '✅' : '❌'} {msgEndereco.texto}</div>}
          <div className="campos-duplos">
            <div className="campo-grupo"><label className="campo-label">CEP</label><input className="campo-input" placeholder="00000-000" value={formEndereco.cep} onChange={e => setFormEndereco({ ...formEndereco, cep: e.target.value })} maxLength={9} /></div>
            <div className="campo-grupo"><label className="campo-label">Estado</label><input className="campo-input" placeholder="SP" value={formEndereco.estado} onChange={e => setFormEndereco({ ...formEndereco, estado: e.target.value })} maxLength={2} /></div>
          </div>
          <div className="campo-grupo"><label className="campo-label">Rua</label><input className="campo-input" placeholder="Nome da rua" value={formEndereco.rua} onChange={e => setFormEndereco({ ...formEndereco, rua: e.target.value })} /></div>
          <div className="campos-duplos">
            <div className="campo-grupo"><label className="campo-label">Numero</label><input className="campo-input" placeholder="123" value={formEndereco.numero} onChange={e => setFormEndereco({ ...formEndereco, numero: e.target.value })} /></div>
            <div className="campo-grupo"><label className="campo-label">Complemento</label><input className="campo-input" placeholder="Apto, bloco..." value={formEndereco.complemento || ''} onChange={e => setFormEndereco({ ...formEndereco, complemento: e.target.value })} /></div>
          </div>
          <div className="campos-duplos">
            <div className="campo-grupo"><label className="campo-label">Bairro</label><input className="campo-input" placeholder="Bairro" value={formEndereco.bairro} onChange={e => setFormEndereco({ ...formEndereco, bairro: e.target.value })} /></div>
            <div className="campo-grupo"><label className="campo-label">Cidade</label><input className="campo-input" placeholder="Cidade" value={formEndereco.cidade} onChange={e => setFormEndereco({ ...formEndereco, cidade: e.target.value })} /></div>
          </div>
          <div className="conta-acoes">
            <button className="btn-salvar" onClick={salvarEndereco} disabled={salvando}>{salvando ? 'Salvando...' : 'Salvar endereco'}</button>
          </div>
        </div>
      </div>

      {/* ALTERAR SENHA */}
      <div className="conta-secao">
        <div className="conta-secao-titulo">Alterar senha</div>
        <div className="conta-secao-corpo">
          {msgSenha && <div className={`conta-mensagem ${msgSenha.tipo}`} role="alert">{msgSenha.tipo === 'sucesso' ? '✅' : '❌'} {msgSenha.texto}</div>}
          <div className="campo-grupo"><label className="campo-label">Senha atual</label><input type="password" className="campo-input" placeholder="••••••••" value={formSenha.senhaAtual} onChange={e => setFormSenha({ ...formSenha, senhaAtual: e.target.value })} /></div>
          <div className="campos-duplos">
            <div className="campo-grupo"><label className="campo-label">Nova senha</label><input type="password" className="campo-input" placeholder="Min. 6 caracteres" value={formSenha.novaSenha} onChange={e => setFormSenha({ ...formSenha, novaSenha: e.target.value })} /></div>
            <div className="campo-grupo"><label className="campo-label">Confirmar</label><input type="password" className="campo-input" placeholder="Repita a senha" value={formSenha.confirmarSenha} onChange={e => setFormSenha({ ...formSenha, confirmarSenha: e.target.value })} /></div>
          </div>
          <div className="conta-acoes"><button className="btn-salvar" onClick={salvarSenha} disabled={salvando}>{salvando ? 'Salvando...' : 'Alterar senha'}</button></div>
        </div>
      </div>

      {/* ZONA DE PERIGO */}
      <div className="conta-secao perigo">
        <div className="conta-secao-titulo">Zona de perigo</div>
        <div className="conta-secao-corpo">
          <p style={{ fontSize: 'var(--tamanho-sm)', color: 'var(--texto-secundario)', lineHeight: '1.7' }}>Ao excluir sua conta, todos os seus dados serao removidos permanentemente. Esta acao nao pode ser desfeita.</p>
          <div className="conta-acoes" style={{ justifyContent: 'flex-start' }}>
            <button className="btn-excluir" onClick={() => { if (window.confirm('Excluir conta permanentemente?')) { onLogout(); setPagina('home') } }}>Excluir minha conta</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Conta
