// Regras de progresso e gamificação (sem interface).
import { ERAS, LIVROS } from '../data/plano.js';
import * as E1 from '../data/era-principio.js';
import { hoje, somarDias, diasEntre } from './store.js';

// Quando escrever novas eras, importar aqui e somar nas listas.
export const SESSOES = [...E1.SESSOES];
export const PERSONAGENS = { ...E1.PERSONAGENS };
export const MARCOS = [...E1.MARCOS.map((m) => ({ ...m, era: 'principio' }))];
export const INTRODUCOES = { ...E1.INTRODUCOES };

export const XP = { sessao: 10, revisao: 5, acerto: 2, livro: 25, era: 50 };
export const META_SEMANA = 5;
export const DIAS_PARA_REVISAR_APLICACAO = 3;
const INTERVALOS = [0, 1, 3, 7, 14, 30]; // dias por caixa (Leitner)

export const sessaoPorId = (id) => SESSOES.find((s) => s.id === id);
export const qid = (s, i) => `${s.id}#${i}`;

export const refSessao = (s) => {
  const l = LIVROS[s.livro];
  const [a, b] = s.caps;
  return a === b ? `${l.nome} ${a}` : `${l.nome} ${a}–${b}`;
};

export const concluida = (e, id) => !!e.sessoes[id]?.data;
export const concluidas = (e) => SESSOES.filter((s) => concluida(e, s.id));
export const proxima = (e) => SESSOES.find((s) => !concluida(e, s.id)) || null;
export const liberada = (e, s) => concluida(e, s.id) || proxima(e)?.id === s.id;

export function personagensLiberados(e) {
  const set = new Set();
  for (const s of concluidas(e)) s.personagens.forEach((p) => set.add(p));
  return set;
}

export function marcosLiberados(e) {
  return new Set(concluidas(e).map((s) => s.marco).filter(Boolean));
}

export function progressoLivro(e, livroId) {
  const lista = SESSOES.filter((s) => s.livro === livroId);
  const feitas = lista.filter((s) => concluida(e, s.id)).length;
  return { feitas, total: lista.length, completo: lista.length > 0 && feitas === lista.length };
}

export function progressoEra(e, eraId) {
  const era = ERAS.find((x) => x.id === eraId);
  const lista = SESSOES.filter((s) => LIVROS[s.livro].era === eraId);
  const feitas = lista.filter((s) => concluida(e, s.id)).length;
  return { feitas, total: lista.length, completo: !!era.conteudo && lista.length > 0 && feitas === lista.length };
}

export function nivel(xp) {
  // nível n começa em 25·n·(n−1) XP: 0, 50, 150, 300, 500…
  let n = 1;
  while (25 * (n + 1) * n <= xp) n++;
  const ini = 25 * n * (n - 1), fim = 25 * (n + 1) * n;
  return { n, ini, fim, pct: Math.round(((xp - ini) / (fim - ini)) * 100) };
}

export function semanaAtual(e) {
  // segunda a domingo
  const d = new Date();
  const dow = (d.getDay() + 6) % 7;
  const seg = somarDias(hoje(), -dow);
  const dias = Array.from({ length: 7 }, (_, i) => somarDias(seg, i));
  const ativos = new Set(e.log.filter((l) => l.tipo === 'sessao').map((l) => l.data));
  return { dias, ativos, feitos: dias.filter((x) => ativos.has(x)).length };
}

export function aplicacoesParaRevisar(e) {
  const h = hoje();
  return SESSOES.filter((s) => {
    const r = e.sessoes[s.id];
    return r?.aplicacao?.trim() && !r.revisao && diasEntre(r.data, h) >= DIAS_PARA_REVISAR_APLICACAO;
  });
}

export function quizPendente(e) {
  const h = hoje();
  const lista = [];
  for (const s of SESSOES) {
    s.quiz.forEach((q, i) => {
      const st = e.quiz[qid(s, i)];
      if (st && st.proxima <= h) lista.push({ s, q, id: qid(s, i) });
    });
  }
  return lista;
}

function ganhar(e, tipo, xp, ref) {
  e.xp += xp;
  e.log.push({ data: hoje(), tipo, xp, ref });
}

// Conclui a sessão e devolve o que foi desbloqueado (para a tela de resultado).
export function concluirSessao(e, s, dados) {
  const antesP = personagensLiberados(e);
  const antesM = marcosLiberados(e);
  const ganhos = [];
  e.sessoes[s.id] = { data: hoje(), revisao: null, ...dados };
  ganhar(e, 'sessao', XP.sessao, s.id); ganhos.push(['Sessão concluída', XP.sessao]);
  s.quiz.forEach((_, i) => { e.quiz[qid(s, i)] = { caixa: 1, proxima: somarDias(hoje(), 1), acertos: 0, erros: 0 }; });
  if (progressoLivro(e, s.livro).completo) {
    ganhar(e, 'livro', XP.livro, s.livro); ganhos.push([`${LIVROS[s.livro].nome} concluído`, XP.livro]);
  }
  const era = LIVROS[s.livro].era;
  if (progressoEra(e, era).completo) {
    ganhar(e, 'era', XP.era, era); ganhos.push(['Era concluída', XP.era]);
  }
  const novosP = [...personagensLiberados(e)].filter((p) => !antesP.has(p));
  const novosM = [...marcosLiberados(e)].filter((m) => !antesM.has(m));
  const novasC = verificarConquistas(e);
  return { ganhos, novosP, novosM, novasC };
}

export function revisarAplicacao(e, s, texto) {
  e.sessoes[s.id].revisao = { data: hoje(), texto };
  ganhar(e, 'revisao', XP.revisao, s.id);
  return verificarConquistas(e);
}

export function responderQuiz(e, id, acertou) {
  const st = e.quiz[id];
  if (acertou) {
    st.acertos++; st.caixa = Math.min(5, st.caixa + 1);
    st.proxima = somarDias(hoje(), INTERVALOS[st.caixa]);
    ganhar(e, 'acerto', XP.acerto, id);
  } else {
    st.erros++; st.caixa = 1; st.proxima = somarDias(hoje(), 1);
  }
}

export const CONQUISTAS = [
  { id: 'primeira', nome: 'Primeiro passo', desc: 'Concluir a primeira sessão', ok: (e) => concluidas(e).length >= 1 },
  { id: 'cinco', nome: 'Pegando o ritmo', desc: 'Concluir 5 sessões', ok: (e) => concluidas(e).length >= 5 },
  { id: 'quinze', nome: 'Caminhante', desc: 'Concluir 15 sessões', ok: (e) => concluidas(e).length >= 15 },
  { id: 'semana', nome: 'Semana firme', desc: `Estudar ${META_SEMANA} dias numa mesma semana`, ok: (e) => semanaAtual(e).feitos >= META_SEMANA },
  { id: 'pers10', nome: 'Rostos conhecidos', desc: 'Desbloquear 10 personagens', ok: (e) => personagensLiberados(e).size >= 10 },
  { id: 'pers25', nome: 'Árvore da família', desc: 'Desbloquear 25 personagens', ok: (e) => personagensLiberados(e).size >= 25 },
  { id: 'aplic1', nome: 'Da página para a vida', desc: 'Contar como foi uma aplicação', ok: (e) => Object.values(e.sessoes).some((s) => s.revisao) },
  { id: 'aplic5', nome: 'Praticante', desc: 'Contar como foram 5 aplicações', ok: (e) => Object.values(e.sessoes).filter((s) => s.revisao).length >= 5 },
  { id: 'estudo5', nome: 'Na Bíblia de Estudo', desc: 'Registrar 5 anotações da Bíblia de Estudo', ok: (e) => Object.values(e.sessoes).filter((s) => s.estudo?.trim()).length >= 5 },
  { id: 'quiz25', nome: 'Memória firme', desc: 'Acertar 25 perguntas de revisão', ok: (e) => e.log.filter((l) => l.tipo === 'acerto').length >= 25 },
  { id: 'gn', nome: 'No princípio', desc: 'Concluir Gênesis', ok: (e) => progressoLivro(e, 'gn').completo },
  { id: 'jo', nome: 'Meus olhos te veem', desc: 'Concluir Jó', ok: (e) => progressoLivro(e, 'jo').completo },
  { id: 'era1', nome: 'Era dos Patriarcas', desc: 'Concluir a era Princípio e Patriarcas', ok: (e) => progressoEra(e, 'principio').completo },
];

export function verificarConquistas(e) {
  const novas = [];
  for (const c of CONQUISTAS) {
    if (!e.conquistas[c.id] && c.ok(e)) { e.conquistas[c.id] = hoje(); novas.push(c); }
  }
  return novas;
}
