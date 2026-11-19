// Camada de dados ISOLADA. Hoje: localStorage no aparelho + backup em arquivo.
// Para crescer (login, vários usuários), troque só este arquivo por um backend
// mantendo a mesma interface: carregar(), salvar(estado), exportar(), importar(json).

const CHAVE = 'jornada.v1';
const VERSAO = 1;

export function estadoVazio() {
  return {
    v: VERSAO,
    criadoEm: hoje(),
    sessoes: {},     // id -> { data, entendi, aplicacao, estudo, revisao: {data, texto} | null }
    quiz: {},        // qid -> { caixa, proxima, acertos, erros }
    xp: 0,
    log: [],         // { data, tipo, xp, ref }
    conquistas: {},  // id -> data
  };
}

export function carregar() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return estadoVazio();
    const e = JSON.parse(bruto);
    return { ...estadoVazio(), ...e };
  } catch {
    return estadoVazio();
  }
}

export function salvar(estado) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
    return true;
  } catch {
    return false;
  }
}

export function exportar(estado) {
  return JSON.stringify({ app: 'jornada', exportadoEm: new Date().toISOString(), estado }, null, 2);
}

export function importar(texto) {
  const obj = JSON.parse(texto);
  if (obj?.app !== 'jornada' || !obj.estado?.sessoes) throw new Error('Arquivo não é um backup do app.');
  return { ...estadoVazio(), ...obj.estado };
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
