import { ERAS, LIVROS, linkNAA } from '../data/plano.js';
import { COM_IMAGEM } from '../data/imagens.js';
import * as store from './store.js';
import * as J from './jogo.js';
import { ico } from './icones.js';
import { avatarSVG, PELES, CABELOS, MANTOS } from './avatar.js';

const NOME_APP = 'A Jornada';
let RAIZ = store.carregar();
const P = () => RAIZ.perfis[RAIZ.ativo];
const perfis = () => Object.values(RAIZ.perfis);
const $app = document.getElementById('app');

const COR_ERA = {
  'principio': '#b0712f', 'moises': '#c0843a', 'juizes': '#3a6ea5', 'reino-unido': '#3f8a5a',
  'reino-dividido': '#7a55a0', 'exilio': '#a33d3d', 'pos-exilio': '#3b84a5', 'jesus': '#d29a2c',
  'igreja': '#34506e', 'fim-seculo': '#9c2f3a',
};
const RARIDADE = {
  comum: { nome: 'Comum', gemas: 1 }, rara: { nome: 'Rara', gemas: 2 },
  epica: { nome: 'Épica', gemas: 3 }, lendaria: { nome: 'Lendária', gemas: 4 },
};

const esc = (t = '') => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const salvar = () => store.salvar(RAIZ);
const ir = (h) => { location.hash = h; };
const fmtData = (d) => { const [, m, dd] = d.split('-'); return `${dd}/${m}`; };
const eraDe = (s) => LIVROS[s.livro].era;

// ─── Efeitos ───
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.innerHTML = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('on'));
  setTimeout(() => { t.classList.remove('on'); setTimeout(() => t.remove(), 300); }, 2600);
}
function confete(n = 60) {
  const cores = ['#d29a2c', '#f1d48a', '#3f8a5a', '#3a6ea5', '#a33d3d', '#fff'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('i');
    c.className = 'confete';
    c.style.cssText = `left:${Math.random() * 100}vw;background:${cores[i % cores.length]};animation-delay:${Math.random() * .4}s;--x:${(Math.random() - .5) * 200}px;--r:${Math.random() * 720}deg`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2600);
  }
}
function overlay(html, aoFechar) {
  const o = document.createElement('div');
  o.className = 'overlay';
  o.innerHTML = `<div class="overlay-in">${html}</div>`;
  document.body.appendChild(o);
  requestAnimationFrame(() => o.classList.add('on'));
  o.addEventListener('click', (ev) => {
    if (ev.target.closest('[data-fechar]') || ev.target === o) {
      o.classList.remove('on'); setTimeout(() => { o.remove(); aoFechar?.(); }, 250);
    }
  });
  return o;
}

// ─── Componentes ───
function topo() {
  const p = P(); const nv = J.nivel(p.xp);
  return `<header class="topbar">
    <a class="eu" href="#/perfil"><span class="eu-av">${avatarSVG(p.avatar, J.itensAte(nv.n), 34)}</span><span><b>${esc(p.nome)}</b><small>Nível ${nv.n} · ${J.estagio(nv.n).nome}</small></span></a>
    <span class="xp-chip">${ico('sparkles')} ${p.xp} XP</span>
  </header>`;
}

function barraXP(p) {
  const nv = J.nivel(p.xp);
  const prox = J.ESTAGIOS.find((e) => e.nivel > nv.n);
  return `<div class="xpbar"><div class="xpbar-top"><b>Nível ${nv.n}</b><span>${p.xp - nv.ini}/${nv.fim - nv.ini} XP</span></div>
    <div class="barra"><i style="width:${nv.pct}%"></i></div>
    ${prox ? `<small>No nível ${prox.nivel} você vira <b>${prox.nome}</b></small>` : '<small>Estágio máximo alcançado</small>'}</div>`;
}

function carta(id, { aberta = true, nova = false, verso = false } = {}) {
  const c = J.PERSONAGENS[id]; const [sim, rar, tit] = J.CARTAS[id] || ['star', 'comum', ''];
  const s = J.SESSOES.find((x) => x.personagens.includes(id));
  const era = s ? eraDe(s) : 'principio';
  if (!aberta) return `<div class="carta bloq"><div class="carta-in"><div class="carta-arte">${ico('lock-keyhole', 'g')}</div><div class="carta-nome">???</div></div></div>`;
  const gemas = '◆'.repeat(RARIDADE[rar].gemas);
  return `<a class="carta r-${rar} ${nova ? 'nova' : ''}" href="#/carta/${id}" style="--c:${COR_ERA[era]}">
    <div class="carta-in">
      <div class="carta-cab"><span class="carta-nome">${esc(c.nome)}</span><span class="gemas">${gemas}</span></div>
      <div class="carta-arte"><span class="simbolo">${ico(sim)}</span>${COM_IMAGEM.has(id) ? `<img src="img/cartas/${id}.webp" alt="" loading="lazy">` : ''}</div>
      <div class="carta-tit">${esc(tit)}</div>
      <div class="carta-pe"><span>${esc(RARIDADE[rar].nome)}</span><span class="era-nome">${esc(ERAS.find((e) => e.id === era).nome)}</span></div>
    </div></a>`;
}

function semana(p) {
  const s = J.semanaAtual(p); const h = store.hoje();
  const letras = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  return `<section class="bloco semana">
    <div class="bloco-tit"><span>Esta semana</span><span class="${s.feitos >= J.META_SEMANA ? 'ok' : ''}">${s.feitos}/${J.META_SEMANA} dias · +${J.XP.semana} XP</span></div>
    <div class="dias">${s.dias.map((d, i) => `<div class="dia ${s.ativos.has(d) ? 'feito' : ''} ${d === h ? 'hoje' : ''}">${s.ativos.has(d) ? ico('check') : letras[i]}</div>`).join('')}</div>
  </section>`;
}

// ─── Telas ───
function telaBoasVindas() {
  return `<div class="boas">
    <div class="boas-av">${avatarSVG({ pele: 1, cabelo: 0, manto: 0 }, ['cajado'], 130)}</div>
    <h1>${NOME_APP}</h1>
    <p class="lead">Atravesse a Bíblia na ordem da história. Cada dia: contexto, leitura, o que você entendeu e o que muda na sua vida.</p>
    <a class="btn grande" href="#/novo-perfil">Criar meu viajante</a>
  </div>`;
}

function telaPerfilForm(editId) {
  const p = editId ? RAIZ.perfis[editId] : null;
  const f = FORM ||= { nome: p?.nome || '', tipo: p?.tipo || (perfis().length ? 'crianca' : 'adulto'), avatar: { ...(p?.avatar || { pele: 1, cabelo: 0, manto: 0 }) } };
  return `<header class="topo-sec"><a class="voltar" href="${perfis().length ? '#/perfil' : '#/hoje'}">${ico('chevron-left')}</a><h2>${p ? 'Editar viajante' : 'Novo viajante'}</h2></header>
  <div class="editor">
    <div class="editor-prev" id="prev">${avatarSVG(f.avatar, J.itensAte(p ? J.nivel(p.xp).n : 1), 140)}</div>
    <label class="rot" for="nome">Nome</label>
    <input id="nome" class="campo" value="${esc(f.nome)}" placeholder="Como chamar este viajante?" maxlength="20">
    <div class="rot">Perfil</div>
    <div class="seg">${[['adulto', 'Adulto'], ['crianca', 'Criança']].map(([v, t]) => `<button class="${f.tipo === v ? 'on' : ''}" data-acao="f-tipo" data-v="${v}">${t}</button>`).join('')}</div>
    <div class="rot">Pele</div>
    <div class="swatches">${PELES.map((c, i) => `<button class="sw ${f.avatar.pele === i ? 'on' : ''}" style="background:${c}" data-acao="f-av" data-k="pele" data-v="${i}" aria-label="Tom ${i + 1}"></button>`).join('')}</div>
    <div class="rot">Cabelo</div>
    <div class="chips">${CABELOS.map((c, i) => `<button class="chip ${f.avatar.cabelo === i ? 'on' : ''}" data-acao="f-av" data-k="cabelo" data-v="${i}">${c.nome}</button>`).join('')}</div>
    <div class="rot">Cor da faixa e do manto</div>
    <div class="swatches">${MANTOS.map((c, i) => `<button class="sw ${f.avatar.manto === i ? 'on' : ''}" style="background:${c}" data-acao="f-av" data-k="manto" data-v="${i}" aria-label="Cor ${i + 1}"></button>`).join('')}</div>
    <button class="btn grande" data-acao="f-salvar" data-id="${editId || ''}">${p ? 'Salvar' : 'Começar a jornada'}</button>
  </div>`;
}
let FORM = null;

function telaHoje() {
  const p = P(); const nv = J.nivel(p.xp);
  const prox = J.proxima(p);
  const aplic = J.aplicacoesParaRevisar(p);
  const quiz = J.quizPendente(p);
  const feitaHoje = p.log.some((l) => l.tipo === 'sessao' && l.data === store.hoje());
  const est = J.estagio(nv.n);

  const missoes = [
    { feito: feitaHoje, ico: 'book-open', txt: 'Fazer a sessão do dia', xp: `+${J.XP.sessao}–${J.XP.sessao + J.XP.aplicacao + J.XP.estudo}`, href: prox ? `#/sessao/${prox.id}` : null },
    quiz.length ? { feito: false, ico: 'medal', txt: `Revisar ${quiz.length} pergunta${quiz.length > 1 ? 's' : ''}`, xp: `+${J.XP.acerto} cada`, href: '#/revisao' } : null,
    ...aplic.map((s) => ({ feito: false, ico: 'heart', txt: `Como foi: “${p.sessoes[s.id].aplicacao}”`, xp: `+${J.XP.revisao}`, href: `#/aplicacao/${s.id}` })),
  ].filter(Boolean);

  return `${topo()}
  <section class="hero" style="--c:${prox ? COR_ERA[eraDe(prox)] : '#d29a2c'}">
    <div class="hero-av">${avatarSVG(p.avatar, J.itensAte(nv.n), 110)}</div>
    <div class="hero-info"><small>${est.nome}</small><h2>${esc(p.nome)}</h2>${barraXP(p)}</div>
  </section>
  ${prox ? `<a class="missao" href="#/sessao/${prox.id}" style="--c:${COR_ERA[eraDe(prox)]}">
      <div class="missao-top"><span>${feitaHoje ? 'Quer avançar mais?' : 'Sessão de hoje'}</span><span>${esc(ERAS.find((e) => e.id === eraDe(prox)).nome)}</span></div>
      <div class="missao-ref">${esc(J.refSessao(prox))}</div>
      <div class="missao-tit">${esc(prox.titulo)}</div>
      <div class="missao-go">Começar ${ico('chevron-right')}</div>
    </a>`
    : `<section class="bloco"><b>Era concluída!</b><p>Você terminou o conteúdo disponível. A próxima era, Moisés, é a próxima a ser escrita.</p></section>`}
  <section class="bloco"><div class="bloco-tit"><span>Missões</span></div>
    ${missoes.map((m) => `<a class="mis ${m.feito ? 'feito' : ''}" ${m.href && !m.feito ? `href="${m.href}"` : ''}>
      <span class="mis-ico">${ico(m.feito ? 'circle-check' : m.ico)}</span><span class="mis-txt">${esc(m.txt)}</span><span class="mis-xp">${m.xp}</span></a>`).join('')}
  </section>
  ${semana(p)}`;
}

function cabSessao(s, sub) {
  return `<header class="cab-sessao" style="--c:${COR_ERA[eraDe(s)]}">
    <a class="voltar" href="#/jornada">${ico('chevron-left')}</a>
    <div><small>${esc(sub || J.refSessao(s))}</small><h2>${esc(s.titulo)}</h2></div></header>`;
}

function telaSessao(id, passo = 0) {
  const s = J.sessaoPorId(id); const p = P();
  if (!s) return telaHoje();
  if (!J.liberada(p, s)) return `${topo()}<section class="bloco"><p>Esta sessão ainda está bloqueada. Conclua as anteriores primeiro.</p><a class="btn" href="#/jornada">Voltar</a></section>`;
  if (J.concluida(p, s.id) && passo === 0 && !EDITANDO[id]) return telaSessaoFeita(s);

  const livro = LIVROS[s.livro]; const r = rascunho(id);
  const crianca = p.tipo === 'crianca';
  const temCriancas = perfis().some((x) => x.tipo === 'crianca');
  const primeiraDoLivro = J.SESSOES.find((x) => x.livro === s.livro).id === s.id;
  const passos = ['Contexto', 'Leitura', 'Entendi', 'Aplicação'];
  const barra = `<div class="passos">${passos.map((t, i) => `<span class="${i < passo ? 'ok' : ''} ${i === passo ? 'atual' : ''}"><i>${i < passo ? ico('check') : i + 1}</i>${t}</span>`).join('')}</div>`;
  let corpo = '';

  if (passo === 0) {
    corpo = `
    ${primeiraDoLivro ? `<a class="aviso" href="#/livro/${s.livro}">${ico('book-open-text')}<span>Primeira sessão de ${esc(livro.nome)}. Veja a <b>introdução do livro</b>.</span>${ico('chevron-right')}</a>` : ''}
    <section class="folha">
      <div class="rot">Cenário</div><p class="cenario">${ico('map')} ${esc(s.cenario)}</p>
      <div class="rot">Contexto</div><p>${esc(s.contexto)}</p>
      <div class="rot">Notas</div>
      <ul class="notas">${s.notas.map(([ref, t]) => `<li><b>${esc(ref)}</b><span>${esc(t)}</span></li>`).join('')}</ul>
    </section>
    ${(temCriancas || crianca) && J.CRIANCAS[s.id] ? `<section class="kids">${ico('users-round')}<div><b>Para as crianças</b><p>${esc(J.CRIANCAS[s.id])}</p></div></section>` : ''}
    <div class="lembrete">${ico('book-open')} Abra a sua <b>Bíblia de Estudo</b> neste trecho: notas, mapas e quadros.</div>
    <button class="btn grande" data-acao="passo" data-passo="1">Ir para a leitura ${ico('chevron-right')}</button>`;
  } else if (passo === 1) {
    const caps = []; for (let c = s.caps[0]; c <= s.caps[1]; c++) caps.push(c);
    corpo = `
    <section class="bloco leitura">
      <p>Leia <b>${esc(J.refSessao(s))}</b>.</p>
      <div class="caps">${caps.map((c) => {
        const url = linkNAA(livro, c);
        return `<a class="cap" ${url ? `href="${url}" target="_blank" rel="noopener"` : ''}><b>${c}</b><small>NAA ${ico('external-link')}</small></a>`;
      }).join('')}</div>
      <label class="check"><input type="checkbox" id="li" ${r.li ? 'checked' : ''}><span>Li o texto</span></label>
    </section>
    <button class="btn grande" data-acao="passo" data-passo="2" id="btn-li" ${r.li ? '' : 'disabled'}>Continuar ${ico('chevron-right')}</button>`;
  } else if (passo === 2) {
    corpo = `
    <section class="bloco">
      <label class="rot" for="entendi">${crianca ? 'O que eu aprendi' : 'O que eu entendi'}</label>
      <textarea id="entendi" rows="4" placeholder="Uma frase já basta.">${esc(r.entendi || '')}</textarea>
      ${crianca ? '' : `<label class="rot" for="estudo">Da minha Bíblia de Estudo <em>+${J.XP.estudo} XP</em></label>
      <textarea id="estudo" rows="3" placeholder="Nota, mapa ou quadro que chamou atenção — e a página.">${esc(r.estudo || '')}</textarea>`}
    </section>
    <button class="btn grande" data-acao="passo" data-passo="3" id="btn-entendi" ${r.entendi?.trim() ? '' : 'disabled'}>Continuar ${ico('chevron-right')}</button>`;
  } else {
    const outros = perfis().filter((x) => x.id !== p.id);
    corpo = `
    <section class="bloco">
      <div class="rot">Para pensar</div><p class="pergunta">${esc(crianca && J.CRIANCAS[s.id] ? J.CRIANCAS[s.id] : s.pergunta)}</p>
      <label class="rot" for="aplicacao">${crianca ? 'O que eu vou fazer' : 'Minha aplicação'} <em>+${J.XP.aplicacao} XP</em></label>
      <textarea id="aplicacao" rows="4" placeholder="Algo concreto. Em ${J.DIAS_PARA_REVISAR_APLICACAO} dias o app pergunta como foi.">${esc(r.aplicacao || '')}</textarea>
    </section>
    ${outros.length && !J.concluida(p, s.id) ? `<section class="bloco"><div class="rot">Estudaram junto</div>
      <div class="juntos">${outros.map((o) => `<button class="junto ${r.juntos?.includes(o.id) ? 'on' : ''}" data-acao="junto" data-p="${o.id}">${avatarSVG(o.avatar, J.itensAte(J.nivel(o.xp).n), 30)}<span>${esc(o.nome)}</span></button>`).join('')}</div>
      <small class="dica">Quem for marcado também conclui a sessão e ganha XP e cartas.</small></section>` : ''}
    <button class="btn grande ouro" data-acao="concluir" data-id="${s.id}">${J.concluida(p, s.id) ? 'Salvar anotações' : 'Concluir sessão'}</button>`;
  }
  return cabSessao(s) + barra + `<div class="anima">${corpo}</div>`;
}
const EDITANDO = {};

function telaSessaoFeita(s) {
  const r = P().sessoes[s.id];
  return `${cabSessao(s, `${J.refSessao(s)} · ${fmtData(r.data)}`)}
  <section class="bloco"><div class="rot">O que entendi</div><p>${esc(r.entendi)}</p>
    ${r.estudo ? `<div class="rot">Da minha Bíblia de Estudo</div><p>${esc(r.estudo)}</p>` : ''}
    ${r.aplicacao ? `<div class="rot">Aplicação</div><p>${esc(r.aplicacao)}</p>` : ''}
    ${r.revisao ? `<div class="rot">Como foi · ${fmtData(r.revisao.data)}</div><p>${esc(r.revisao.texto)}</p>` : ''}
  </section>
  <section class="folha"><div class="rot">Cenário</div><p class="cenario">${ico('map')} ${esc(s.cenario)}</p><div class="rot">Contexto</div><p>${esc(s.contexto)}</p>
    <div class="rot">Notas</div><ul class="notas">${s.notas.map(([ref, t]) => `<li><b>${esc(ref)}</b><span>${esc(t)}</span></li>`).join('')}</ul></section>
  ${s.personagens.length ? `<section class="bloco"><div class="rot">Cartas desta sessão</div><div class="grade-cartas mini">${s.personagens.map((id) => carta(id)).join('')}</div></section>` : ''}
  <button class="btn sec" data-acao="editar" data-id="${s.id}">Editar minhas anotações</button>`;
}

function telaResultado(res) {
  const total = res.ganhos.reduce((a, [, x]) => a + x, 0);
  return `<div class="resultado">
    <div class="selo"><b>+${total}</b><span>XP</span></div>
    <h2>Sessão concluída!</h2>
    <ul class="ganhos">${res.ganhos.map(([t, x]) => `<li><span>${esc(t)}</span><b>+${x}</b></li>`).join('')}</ul>
    ${res.juntos?.length ? `<p class="dica">Também concluíram: ${res.juntos.map(esc).join(', ')}</p>` : ''}
    ${res.novosP.length ? `<button class="btn grande ouro pacote" data-acao="abrir-cartas">${ico('layers')} Abrir ${res.novosP.length} carta${res.novosP.length > 1 ? 's' : ''} nova${res.novosP.length > 1 ? 's' : ''}</button>` : ''}
    ${res.novosM.length ? `<section class="bloco"><div class="rot">Na linha do tempo</div>${res.novosM.map((m) => `<p>${ico('flag')} ${esc(J.MARCOS.find((x) => x.id === m).titulo)}</p>`).join('')}</section>` : ''}
    ${res.novasC.length ? `<section class="bloco"><div class="rot">Conquistas</div>${res.novasC.map((c) => `<p>${ico('trophy')} <b>${esc(c.nome)}</b> — ${esc(c.desc)}</p>`).join('')}</section>` : ''}
    <a class="btn sec" href="#/hoje">Voltar ao início</a>
  </div>`;
}

function abrirCartas(lista, i = 0) {
  if (i >= lista.length) return;
  const id = lista[i]; const [, rar] = J.CARTAS[id];
  const o = overlay(`<div class="revelar r-${rar}">
      <div class="revelar-carta"><div class="face verso"><div class="verso-logo">${ico('book-open')}<span>${NOME_APP}</span></div></div><div class="face frente">${carta(id, { nova: true })}</div></div>
      <div class="revelar-txt"><small>${RARIDADE[rar].nome}</small><b>${esc(J.PERSONAGENS[id].nome)}</b></div>
      <button class="btn grande" data-fechar>${i + 1 < lista.length ? `Próxima (${i + 2}/${lista.length})` : 'Guardar no álbum'}</button>
    </div>`, () => abrirCartas(lista, i + 1));
  setTimeout(() => { o.querySelector('.revelar-carta').classList.add('virada'); if (rar === 'lendaria' || rar === 'epica') confete(rar === 'lendaria' ? 90 : 40); }, 450);
}

function subiuNivel(n) {
  const p = P(); const est = J.ESTAGIOS.find((e) => e.nivel === n);
  overlay(`<div class="levelup">
    <small>Subiu de nível!</small><div class="lv-n">${n}</div>
    <div class="lv-av">${avatarSVG(p.avatar, J.itensAte(n), 130)}</div>
    ${est ? `<p>Agora você é <b>${est.nome}</b>${est.item ? ` e ganhou: <b>${{ cajado: 'cajado', alforje: 'alforje', manto: 'manto', lamparina: 'lamparina', pergaminho: 'pergaminho', aura: 'brilho' }[est.item]}</b>` : ''}.</p>` : `<p>Próximo nível: ${J.xpParaSubir(n)} XP.</p>`}
    <button class="btn grande" data-fechar>Continuar</button></div>`);
  confete(80);
}

function telaAplicacao(id) {
  const s = J.sessaoPorId(id); const r = P().sessoes[id];
  if (!r) return telaHoje();
  return `${cabSessao(s, `${J.refSessao(s)} · ${fmtData(r.data)}`)}
  <section class="bloco"><div class="rot">Você se propôs</div><p class="pergunta">${esc(r.aplicacao)}</p>
    <label class="rot" for="como">Como foi na prática?</label>
    <textarea id="como" rows="4" placeholder="Deu certo? O que aprendeu? Se não deu, o que atrapalhou?"></textarea></section>
  <button class="btn grande ouro" data-acao="revisar" data-id="${id}">Registrar · +${J.XP.revisao} XP</button>`;
}

let filaQuiz = [];
function telaRevisao() {
  if (!filaQuiz.length) filaQuiz = J.quizPendente(P()).sort(() => Math.random() - 0.5).slice(0, 10);
  if (!filaQuiz.length) return `${topo()}<section class="bloco vazio">${ico('medal', 'g')}<p>Nada para revisar hoje. As perguntas voltam em intervalos maiores conforme você acerta.</p><a class="btn" href="#/hoje">Voltar</a></section>`;
  const { q, s, id } = filaQuiz[0];
  return `<header class="topo-sec"><a class="voltar" href="#/hoje">${ico('chevron-left')}</a><h2>Revisão</h2><span class="contador">${filaQuiz.length}</span></header>
  <section class="quiz anima"><small>${esc(J.refSessao(s))}</small><p class="pergunta">${esc(q.q)}</p>
    <div class="opcoes">${q.op.map((o, i) => `<button class="opcao" data-acao="responder" data-id="${id}" data-i="${i}"><i>${'ABCD'[i]}</i>${esc(o)}</button>`).join('')}</div>
    <div id="feedback"></div></section>`;
}

function telaJornada() {
  const p = P(); const prox = J.proxima(p);
  return `${topo()}<h1 class="tit-tela">Jornada</h1><p class="sub">66 livros em ordem cronológica · 10 eras</p>
  ${ERAS.map((era) => {
    const pe = J.progressoEra(p, era.id);
    if (!era.conteudo) return `<section class="era-fech" style="--c:${COR_ERA[era.id]}"><div><b>${esc(era.nome)}</b><small>${era.livros.map((l) => esc(l.nome)).join(' · ')}</small></div><span>${ico('lock-keyhole')}</span></section>`;
    return `<section class="era-mapa" style="--c:${COR_ERA[era.id]}">
      <div class="era-banner"><small>Era ${ERAS.indexOf(era) + 1}</small><b>${esc(era.nome)}</b><span>${pe.feitas}/${pe.total}</span><div class="barra fina"><i style="width:${Math.round(pe.feitas / pe.total * 100)}%"></i></div></div>
      ${era.livros.map((l) => {
        const ss = J.SESSOES.filter((s) => s.livro === l.id);
        if (!ss.length) return '';
        return `<a class="livro-banner" href="#/livro/${l.id}"><span class="ordem">${l.ordem}</span><b>${esc(l.nome)}</b><small>Introdução ${ico('chevron-right')}</small></a>
        <div class="trilha">${ss.map((s, i) => {
          const st = J.concluida(p, s.id) ? 'feita' : J.liberada(p, s) ? 'atual' : 'bloq';
          const off = [0, 60, 90, 60, 0, -60, -90, -60][i % 8];
          return `<a class="no ${st}" style="--x:${off}px" ${st === 'bloq' ? '' : `href="#/sessao/${s.id}"`}>
            ${st === 'atual' && prox?.id === s.id ? `<span class="no-av">${avatarSVG(p.avatar, J.itensAte(J.nivel(p.xp).n), 44)}</span>` : ''}
            <span class="no-circ">${st === 'feita' ? ico('check') : st === 'bloq' ? ico('lock-keyhole') : ico('star')}</span>
            <span class="no-lbl">${s.caps[0]}${s.caps[1] !== s.caps[0] ? '–' + s.caps[1] : ''}</span></a>`;
        }).join('')}</div>`;
      }).join('')}
    </section>`;
  }).join('')}`;
}

function telaLivro(id) {
  const l = LIVROS[id]; const it = J.INTRODUCOES[id];
  if (!it) return telaJornada();
  const cap = parseInt(it.chave.split(' ')[1]);
  return `<header class="cab-sessao" style="--c:${COR_ERA[l.era]}"><a class="voltar" href="#/jornada">${ico('chevron-left')}</a><div><small>Introdução ao livro</small><h2>${esc(l.nome)}</h2></div></header>
  <section class="folha intro">
    <div class="intro-grid">
      <div><div class="rot">Autor</div><p>${esc(it.autor)}</p></div>
      <div><div class="rot">Data</div><p>${esc(it.data)}</p></div>
    </div>
    <div class="rot">Cenário</div><p>${esc(it.cenario)}</p>
    <div class="rot">Tema</div><p>${esc(it.tema)}</p>
    <div class="rot">Texto-chave</div><p><a class="link" href="${linkNAA(l, cap)}" target="_blank" rel="noopener">${esc(it.chave)} ${ico('external-link')}</a></p>
    <div class="rot">Estrutura</div><p>${esc(it.estrutura)}</p>
    <div class="rot">Esboço</div>
    <div class="esboco">${it.esboco.map(([c, t]) => `<div><b>${esc(c)}</b><span>${esc(t)}</span></div>`).join('')}</div>
  </section>
  <div class="lembrete">${ico('book-open')} Compare com a introdução de ${esc(l.nome)} na sua Bíblia de Estudo.</div>`;
}

function telaCartas() {
  const lib = J.personagensLiberados(P());
  const ordem = [...new Set(J.SESSOES.flatMap((s) => s.personagens))];
  const porRar = Object.keys(RARIDADE).map((r) => [r, ordem.filter((id) => J.CARTAS[id][1] === r && lib.has(id)).length, ordem.filter((id) => J.CARTAS[id][1] === r).length]);
  return `${topo()}<h1 class="tit-tela">Álbum</h1><p class="sub">${lib.size} de ${ordem.length} cartas nesta era</p>
  <div class="raridades">${porRar.map(([r, a, t]) => `<span class="r-${r}"><i></i>${RARIDADE[r].nome} ${a}/${t}</span>`).join('')}</div>
  <div class="grade-cartas">${ordem.map((id) => carta(id, { aberta: lib.has(id) })).join('')}</div>`;
}

function telaCarta(id) {
  const c = J.PERSONAGENS[id]; const p = P();
  if (!c || !J.personagensLiberados(p).has(id)) return telaCartas();
  const minhas = J.concluidas(p).filter((s) => s.personagens.includes(id));
  return `<header class="topo-sec"><a class="voltar" href="#/cartas">${ico('chevron-left')}</a><h2>Carta</h2></header>
  <div class="carta-grande">${carta(id)}</div>
  <section class="folha"><div class="rot">Quem foi</div><p>${esc(c.quem)}</p>
    <div class="rot">O que fez</div><p>${esc(c.vida)}</p>
    <div class="rot">Onde conferir</div><p class="refs">${esc(c.refs)}</p></section>
  ${minhas.length ? `<section class="bloco"><div class="rot">Minhas anotações</div>${minhas.map((s) => `<a class="linha-link" href="#/sessao/${s.id}"><span>${esc(p.sessoes[s.id].entendi)}</span><small>${esc(J.refSessao(s))}</small></a>`).join('')}</section>` : ''}`;
}

function telaLinha() {
  const lib = J.marcosLiberados(P());
  return `${topo()}<h1 class="tit-tela">Linha do tempo</h1><p class="sub">Ela se preenche conforme você avança</p>
  <div class="linha">${ERAS.map((era) => {
    const marcos = J.MARCOS.filter((m) => m.era === era.id);
    return `<div class="linha-era" style="--c:${COR_ERA[era.id]}"><div class="linha-era-nome">${esc(era.nome)}</div>
      ${marcos.length ? marcos.map((m) => lib.has(m.id)
        ? `<div class="marco on"><b>${esc(m.titulo)}</b><small>${esc(m.quando)}</small></div>`
        : '<div class="marco"><span class="oculto"></span></div>').join('') : '<div class="marco"><small>em breve</small></div>'}
    </div>`;
  }).join('')}</div>`;
}

function telaPerfil() {
  const p = P(); const nv = J.nivel(p.xp);
  const aplic = Object.values(p.sessoes).filter((s) => s.revisao).length;
  return `${topo()}
  <section class="perfil-hero"><div>${avatarSVG(p.avatar, J.itensAte(nv.n), 120)}</div>
    <div><h2>${esc(p.nome)}</h2><small>${J.estagio(nv.n).nome} · ${p.tipo === 'crianca' ? 'Criança' : 'Adulto'}</small>${barraXP(p)}
    <a class="link" href="#/editar/${p.id}">Editar viajante</a></div></section>
  <div class="stats">
    <div><b>${J.concluidas(p).length}</b><small>sessões</small></div>
    <div><b>${J.personagensLiberados(p).size}</b><small>cartas</small></div>
    <div><b>${aplic}</b><small>aplicações vividas</small></div>
    <div><b>${p.log.filter((l) => l.tipo === 'acerto').length}</b><small>acertos</small></div>
  </div>
  <section class="bloco"><div class="bloco-tit"><span>Família</span></div>
    <div class="familia">${perfis().map((o) => `<button class="membro ${o.id === p.id ? 'on' : ''}" data-acao="trocar" data-p="${o.id}">${avatarSVG(o.avatar, J.itensAte(J.nivel(o.xp).n), 46)}<b>${esc(o.nome)}</b><small>Nível ${J.nivel(o.xp).n}</small></button>`).join('')}
      <a class="membro novo" href="#/novo-perfil">${ico('plus')}<b>Adicionar</b><small>viajante</small></a></div></section>
  <section class="bloco"><div class="bloco-tit"><span>Conquistas</span><span>${J.CONQUISTAS.filter((c) => p.conquistas[c.id]).length}/${J.CONQUISTAS.length}</span></div>
    <div class="conquistas">${J.CONQUISTAS.map((c) => `<div class="conq ${p.conquistas[c.id] ? 'on' : ''}"><span>${ico(p.conquistas[c.id] ? 'award' : 'lock-keyhole')}</span><b>${esc(c.nome)}</b><small>${esc(c.desc)}</small></div>`).join('')}</div></section>
  <section class="bloco"><div class="bloco-tit"><span>Backup</span></div>
    <p class="dica">Os dados de todos os viajantes ficam neste aparelho. Exporte de vez em quando e guarde o arquivo, ou use para passar o progresso para outro celular.</p>
    <div class="linha-btns"><button class="btn sec" data-acao="exportar">${ico('download')} Exportar</button>
    <label class="btn sec">${ico('upload')} Importar<input type="file" accept="application/json" id="importar" hidden></label></div></section>
  <p class="rodape">Texto bíblico: NAA © Sociedade Bíblica do Brasil, aberto no site oficial. Conteúdo de estudo próprio, com referências para conferir. Ícones: Lucide (ISC).</p>`;
}

// ─── Rascunho da sessão ───
const RASC = {};
function rascunho(id) { return (RASC[id] ||= { ...(P().sessoes[id] || {}), li: !!P().sessoes[id], juntos: [] }); }
function capturar(id) {
  const r = rascunho(id);
  for (const k of ['entendi', 'estudo', 'aplicacao']) { const el = document.getElementById(k); if (el) r[k] = el.value; }
  const li = document.getElementById('li'); if (li) r.li = li.checked;
  return r;
}

// ─── Roteamento ───
let passoAtual = {};
let ultimoResultado = null;
const NAV = { hoje: 'hoje', jornada: 'jornada', sessao: 'jornada', livro: 'jornada', cartas: 'cartas', carta: 'cartas', linha: 'linha', perfil: 'perfil', editar: 'perfil', 'novo-perfil': 'perfil', revisao: 'hoje', aplicacao: 'hoje', resultado: 'hoje' };

function render() {
  const [, rota = 'hoje', arg] = (location.hash || '#/hoje').split('/');
  let html;
  if (!P() && rota !== 'novo-perfil') html = telaBoasVindas();
  else switch (rota) {
    case 'novo-perfil': html = telaPerfilForm(null); break;
    case 'editar': html = telaPerfilForm(arg); break;
    case 'sessao': html = telaSessao(arg, passoAtual[arg] || 0); break;
    case 'resultado': html = ultimoResultado ? telaResultado(ultimoResultado) : telaHoje(); break;
    case 'aplicacao': html = telaAplicacao(arg); break;
    case 'revisao': html = telaRevisao(); break;
    case 'jornada': html = telaJornada(); break;
    case 'livro': html = telaLivro(arg); break;
    case 'cartas': html = telaCartas(); break;
    case 'carta': html = telaCarta(arg); break;
    case 'linha': html = telaLinha(); break;
    case 'perfil': html = telaPerfil(); break;
    default: html = telaHoje();
  }
  $app.innerHTML = html;
  document.body.classList.toggle('sem-nav', !P() || ['novo-perfil', 'editar', 'sessao', 'resultado', 'revisao', 'aplicacao'].includes(rota));
  document.querySelectorAll('nav a').forEach((a) => a.classList.toggle('on', a.dataset.r === NAV[rota]));
  if (rota === 'jornada') document.querySelector('.no.atual')?.scrollIntoView({ block: 'center' });
  else window.scrollTo(0, 0);
}

window.addEventListener('hashchange', () => {
  if (!location.hash.startsWith('#/sessao')) { passoAtual = {}; Object.keys(EDITANDO).forEach((k) => delete EDITANDO[k]); }
  if (!location.hash.startsWith('#/novo-perfil') && !location.hash.startsWith('#/editar')) FORM = null;
  render();
});

$app.addEventListener('input', (ev) => {
  if (ev.target.id === 'nome' && FORM) { FORM.nome = ev.target.value; return; }
  if (!location.hash.startsWith('#/sessao')) return;
  const r = capturar(location.hash.split('/')[2]);
  const b1 = document.getElementById('btn-li'); if (b1) b1.disabled = !r.li;
  const b2 = document.getElementById('btn-entendi'); if (b2) b2.disabled = !r.entendi?.trim();
});

$app.addEventListener('change', async (ev) => {
  if (ev.target.id === 'li') { const r = capturar(location.hash.split('/')[2]); document.getElementById('btn-li').disabled = !r.li; }
  if (ev.target.id === 'importar' && ev.target.files[0]) {
    try {
      const nova = store.importar(await ev.target.files[0].text());
      if (!confirm('Substituir os dados deste aparelho pelo backup?')) return;
      RAIZ = nova; salvar(); toast('Backup restaurado'); render();
    } catch (e) { toast(esc(e.message)); }
  }
});

document.body.addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-acao]'); if (!b) return;
  const acao = b.dataset.acao;
  const id = b.dataset.id || location.hash.split('/')[2];

  if (acao === 'f-tipo') { FORM.tipo = b.dataset.v; render(); }
  if (acao === 'f-av') { FORM.avatar[b.dataset.k] = Number(b.dataset.v); render(); }
  if (acao === 'f-salvar') {
    const nome = (document.getElementById('nome').value || '').trim();
    if (!nome) { toast('Dê um nome ao viajante'); return; }
    if (b.dataset.id) Object.assign(RAIZ.perfis[b.dataset.id], { nome, tipo: FORM.tipo, avatar: FORM.avatar });
    else { const np = store.novoPerfil(nome, FORM.tipo, FORM.avatar); RAIZ.perfis[np.id] = np; RAIZ.ativo = np.id; }
    salvar(); FORM = null; ir(b.dataset.id ? '#/perfil' : '#/hoje');
  }
  if (acao === 'trocar') { RAIZ.ativo = b.dataset.p; salvar(); toast(`Agora: ${esc(P().nome)}`); ir('#/hoje'); render(); }

  if (acao === 'passo') { capturar(id); passoAtual[id] = Number(b.dataset.passo); render(); }
  if (acao === 'junto') { const r = rascunho(id); const pid = b.dataset.p; r.juntos = r.juntos.includes(pid) ? r.juntos.filter((x) => x !== pid) : [...r.juntos, pid]; b.classList.toggle('on'); }
  if (acao === 'editar') { EDITANDO[id] = true; passoAtual[id] = 2; render(); }

  if (acao === 'concluir') {
    const r = capturar(id); const s = J.sessaoPorId(id); const p = P();
    const dados = { entendi: r.entendi?.trim() || '', estudo: r.estudo?.trim() || '', aplicacao: r.aplicacao?.trim() || '' };
    if (J.concluida(p, id)) { Object.assign(p.sessoes[id], dados); salvar(); delete RASC[id]; delete EDITANDO[id]; passoAtual = {}; toast('Anotações atualizadas'); render(); return; }
    ultimoResultado = J.concluirSessao(p, s, dados);
    const juntos = [];
    for (const pid of r.juntos || []) {
      const o = RAIZ.perfis[pid];
      if (o && !J.concluida(o, id)) { J.concluirSessao(o, s, { entendi: dados.entendi, aplicacao: dados.aplicacao, familia: true }); juntos.push(o.nome); }
    }
    ultimoResultado.juntos = juntos;
    salvar(); delete RASC[id]; passoAtual = {};
    ir('#/resultado');
    confete(40);
    if (ultimoResultado.subiu) setTimeout(() => subiuNivel(ultimoResultado.subiu), 700);
  }
  if (acao === 'abrir-cartas') abrirCartas(ultimoResultado.novosP);

  if (acao === 'revisar') {
    const t = document.getElementById('como').value.trim();
    if (!t) { toast('Escreva como foi, mesmo que em uma frase.'); return; }
    const antes = J.nivel(P().xp).n;
    J.revisarAplicacao(P(), J.sessaoPorId(id), t); salvar();
    toast(`+${J.XP.revisao} XP · aplicação registrada`); ir('#/hoje');
    const depois = J.nivel(P().xp).n; if (depois > antes) setTimeout(() => subiuNivel(depois), 500);
  }

  if (acao === 'responder') {
    const item = filaQuiz[0]; const i = Number(b.dataset.i); const certo = i === item.q.a;
    const antes = J.nivel(P().xp).n;
    J.responderQuiz(P(), item.id, certo); J.verificarConquistas(P()); salvar();
    document.querySelectorAll('.opcao').forEach((o, k) => { o.disabled = true; if (k === item.q.a) o.classList.add('certa'); else if (k === i) o.classList.add('errada'); });
    document.getElementById('feedback').innerHTML = `<p class="${certo ? 'ok' : 'erro'}">${certo ? `${ico('circle-check')} Certo! +${J.XP.acerto} XP` : `${ico('x')} Não foi dessa vez — ela volta amanhã.`} <small>${esc(item.q.ref)}</small></p>
      <button class="btn grande" data-acao="proxima-q">${filaQuiz.length > 1 ? 'Próxima' : 'Terminar'}</button>`;
    if (certo) confete(15);
    const depois = J.nivel(P().xp).n; if (depois > antes) setTimeout(() => subiuNivel(depois), 600);
  }
  if (acao === 'proxima-q') { filaQuiz.shift(); if (!filaQuiz.length) { toast('Revisão concluída'); ir('#/hoje'); } else render(); }

  if (acao === 'exportar') {
    const blob = new Blob([store.exportar(RAIZ)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `a-jornada-backup-${store.hoje()}.json`; a.click(); URL.revokeObjectURL(a.href);
  }
});

document.querySelector('nav').innerHTML = [
  ['hoje', 'house', 'Hoje'], ['jornada', 'map', 'Jornada'], ['cartas', 'layers', 'Álbum'], ['linha', 'hourglass', 'Linha'], ['perfil', 'user-round', 'Perfil'],
].map(([r, i, t]) => `<a href="#/${r}" data-r="${r}">${ico(i)}<span>${t}</span></a>`).join('');

render();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
