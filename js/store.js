// Camada de dados ISOLADA. Hoje: localStorage no aparelho + backup em arquivo.
// Para crescer (login, sincronização), troque só este arquivo mantendo a interface:
// carregar(), salvar(raiz), exportar(raiz), importar(texto).
//
// Raiz: { v: 2, ativo: <idPerfil>, perfis: { [id]: Perfil } }
// Perfil: { id, nome, tipo: 'adulto'|'crianca', avatar: {pele, cabelo, manto}, ...progresso }

const CHAVE = 'ajornada.v2';
const CHAVE_V1 = 'jornada.v1';

export function progressoVazio() {
  return {
    criadoEm: hoje(),
    sessoes: {},     // id -> { data, entendi, estudo, aplicacao, criancas, familia, revisao: {data, texto} | null }
    quiz: {},        // qid -> { caixa, proxima, acertos, erros }
    xp: 0,
    log: [],         // { data, tipo, xp, ref }
    conquistas: {},  // id -> data
    vistas: {},      // cartas já reveladas (animação de abertura)
  };
}

export function novoPerfil(nome, tipo = 'adulto', avatar = {}) {
  const id = 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  return { id, nome, tipo, avatar: { pele: 1, cabelo: 0, manto: 0, ...avatar }, ...progressoVazio() };
}

export function raizVazia() {
  return { v: 2, ativo: null, perfis: {} };
}

export function carregar() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (bruto) return { ...raizVazia(), ...JSON.parse(bruto) };
    // Migração da v1 (um único usuário) para um perfil.
    const v1 = localStorage.getItem(CHAVE_V1);
    if (v1) {
      const e = JSON.parse(v1);
      const p = { ...novoPerfil('Rafael'), ...e };
      delete p.v;
      return { v: 2, ativo: p.id, perfis: { [p.id]: p } };
    }
  } catch { /* cai no vazio */ }
  return raizVazia();
}

export function salvar(raiz) {
  try { localStorage.setItem(CHAVE, JSON.stringify(raiz)); return true; } catch { return false; }
}

export function exportar(raiz) {
  return JSON.stringify({ app: 'a-jornada', exportadoEm: new Date().toISOString(), raiz }, null, 2);
}

export function importar(texto) {
  const obj = JSON.parse(texto);
  if (obj?.app === 'a-jornada' && obj.raiz?.perfis) return { ...raizVazia(), ...obj.raiz };
  if (obj?.app === 'jornada' && obj.estado?.sessoes) { // backup da v1
    const p = { ...novoPerfil('Rafael'), ...obj.estado }; delete p.v;
    return { v: 2, ativo: p.id, perfis: { [p.id]: p } };
  }
  throw new Error('Arquivo não é um backup d\'A Jornada.');
}

export function hoje(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function somarDias(dataISO, dias) {
  const [a, m, d] = dataISO.split('-').map(Number);
  return hoje(new Date(a, m - 1, d + dias));
}

export function diasEntre(a, b) {
  const t = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d).getTime(); };
  return Math.round((t(b) - t(a)) / 86400000);
}
