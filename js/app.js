import { ERAS, LIVROS, linkNAA } from '../data/plano.js';
import * as store from './store.js';
import * as J from './jogo.js';

const NOME_APP = 'Jornada';
let E = store.carregar();
const $app = document.getElementById('app');

const COR_ERA = {
  'principio': '#8a5a2b', 'moises': '#9a6a30', 'juizes': '#2f5d8a', 'reino-unido': '#3f7a4f',
  'reino-dividido': '#6b4a7a', 'exilio': '#7a2e2e', 'pos-exilio': '#3b6f8a', 'jesus': '#b8862b',
  'igreja': '#2d3b4f', 'fim-seculo': '#8a2a2a',
};

const esc = (t = '') => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const salvar = () => store.salvar(E);
const ir = (h) => { location.hash = h; };

// ─── Toast ───
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.innerHTML = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('on'));
  setTimeout(() => { t.classList.remove('on'); setTimeout(() => t.remove(), 300); }, 2600);
}
const toastConquistas = (lista) => lista.forEach((c, i) => setTimeout(() => toast(`🏆 <b>${esc(c.nome)}</b>`), 400 + i * 900));

// ─── Componentes ───
function cabecalhoNivel() {
  const nv = J.nivel(E.xp);
  return `<div class="nivel">
    <div class="nivel-top"><span class="nivel-n">Nível ${nv.n}</span><span class="nivel-xp">${E.xp} XP</span></div>
    <div class="barra"><i style="width:${nv.pct}%"></i></div>
    <div class="nivel-falta">${nv.fim - E.xp} XP para o nível ${nv.n + 1}</div>
  </div>`;
}

function semana() {
  const s = J.semanaAtual(E);
  const h = store.hoje();
  const letras = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  return `<div class="card semana">
    <div class="card-tit">Esta semana <span class="meta ${s.feitos >= J.META_SEMANA ? 'ok' : ''}">${s.feitos}/${J.META_SEMANA} dias</span></div>
    <div class="dias">${s.dias.map((d, i) => `<div class="dia ${s.ativos.has(d) ? 'feito' : ''} ${d === h ? 'hoje' : ''}"><span>${letras[i]}</span></div>`).join('')}</div>
    <p class="dica">A meta é ${J.META_SEMANA} de 7 dias. Perder um dia não zera nada.</p>
  </div>`;
}

function tagEra(eraId) {
  const era = ERAS.find((e) => e.id === eraId);
  return `<span class="tag-era" style="--c:${COR_ERA[eraId]}">${esc(era.nome)}</span>`;
}

// ─── Telas ───
function telaHoje() {
  const prox = J.proxima(E);
  const aplic = J.aplicacoesParaRevisar(E);
  const quiz = J.quizPendente(E);
  const novo = J.concluidas(E).length === 0;
  const feitaHoje = E.log.some((l) => l.tipo === 'sessao' && l.data === store.hoje());

  return `
  <header class="topo"><h1>${NOME_APP}</h1><p class="sub">Do princípio ao fim, na ordem da história</p></header>
  ${cabecalhoNivel()}
  ${novo ? `<div class="card boas-vindas">
    <div class="card-tit">Como funciona</div>
    <ol class="metodo">
      <li><b>Contexto</b> — cenário, notas e a sua Bíblia de Estudo.</li>
      <li><b>Leitura</b> — o texto na NAA.</li>
      <li><b>O que entendi</b> — uma frase sua.</li>
      <li><b>Aplicação</b> — o que muda na sua vida. Dias depois, o app pergunta: como foi?</li>
    </ol>
    <p class="dica">Cada sessão desbloqueia personagens e marcos da linha do tempo. A revisão fixa o que você aprendeu.</p>
  </div>` : ''}
  ${prox ? `<a class="card destaque" href="#/sessao/${prox.id}" style="--c:${COR_ERA[LIVROS[prox.livro].era]}">
    <div class="card-tit">${feitaHoje ? 'Quer avançar mais?' : 'Sessão de hoje'}</div>
    <div class="sessao-ref">${esc(J.refSessao(prox))}</div>
    <div class="sessao-tit">${esc(prox.titulo)}</div>
    <div class="btn">Começar</div>
  </a>` : `<div class="card"><div class="card-tit">Era concluída!</div><p>Você terminou todo o conteúdo disponível. A próxima era (Moisés) é a próxima a ser escrita.</p></div>`}
  ${aplic.length ? `<div class="card">
    <div class="card-tit">Como foi a aplicação?</div>
    ${aplic.map((s) => `<a class="linha-link" href="#/aplicacao/${s.id}"><span>${esc(E.sessoes[s.id].aplicacao)}</span><small>${esc(J.refSessao(s))} · +${J.XP.revisao} XP</small></a>`).join('')}
  </div>` : ''}
  ${quiz.length ? `<a class="card destaque-2" href="#/revisao">
    <div class="card-tit">Revisão</div><p>${quiz.length} pergunta${quiz.length > 1 ? 's' : ''} para fixar o que você já estudou · +${J.XP.acerto} XP por acerto</p>
  </a>` : ''}
  ${semana()}`;
}

function telaSessao(id, passo = 0) {
  const s = J.sessaoPorId(id);
  if (!s) return telaHoje();
  if (!J.liberada(E, s)) return `<div class="card"><p>Esta sessão ainda está bloqueada. Conclua as anteriores primeiro.</p><a class="btn" href="#/jornada">Voltar</a></div>`;
  if (J.concluida(E, s.id) && passo === 0) return telaSessaoFeita(s);

  const livro = LIVROS[s.livro];
  const rasc = rascunho(s.id);
  const primeiraDoLivro = J.SESSOES.find((x) => x.livro === s.livro).id === s.id;
  const passos = ['Contexto', 'Leitura', 'Entendi', 'Aplicação'];
  const barra = `<div class="passos">${passos.map((p, i) => `<span class="${i < passo ? 'ok' : ''} ${i === passo ? 'atual' : ''}">${p}</span>`).join('')}</div>`;
  const cab = `<header class="topo-sessao" style="--c:${COR_ERA[livro.era]}">
    <a class="voltar" href="#/hoje">‹</a>
    <div><div class="sessao-ref">${esc(J.refSessao(s))}</div><h2>${esc(s.titulo)}</h2></div></header>${barra}`;

  let corpo = '';
  if (passo === 0) {
    corpo = `
    ${primeiraDoLivro ? `<a class="card aviso" href="#/livro/${s.livro}">📖 Primeira sessão de ${esc(livro.nome)}: veja antes a <b>introdução do livro</b>.</a>` : ''}
    <div class="card estudo">
      <div class="rotulo">Cenário</div><p>${esc(s.cenario)}</p>
      <div class="rotulo">Contexto</div><p>${esc(s.contexto)}</p>
      <div class="rotulo">Notas</div>
      <ul class="notas">${s.notas.map(([r, t]) => `<li><b>${esc(r)}</b> ${esc(t)}</li>`).join('')}</ul>
    </div>
    <div class="card lembrete">Abra a sua <b>Bíblia de Estudo</b>: notas de rodapé deste trecho, mapas e quadros. Você vai anotar o que achar importante no passo 3.</div>
    <button class="btn" data-acao="passo" data-passo="1">Ir para a leitura</button>`;
  } else if (passo === 1) {
    const caps = []; for (let c = s.caps[0]; c <= s.caps[1]; c++) caps.push(c);
    corpo = `
    <div class="card">
      <p>Leia <b>${esc(J.refSessao(s))}</b> na sua Bíblia ou no site oficial da SBB (NAA):</p>
      <div class="caps">${caps.map((c) => {
        const url = linkNAA(livro, c);
        return url ? `<a class="cap" href="${url}" target="_blank" rel="noopener">${esc(livro.nome)} ${c} ↗</a>` : `<span class="cap">${esc(livro.nome)} ${c}</span>`;
      }).join('')}</div>
      <label class="check"><input type="checkbox" id="li" ${rasc.li ? 'checked' : ''}> Li o texto</label>
    </div>
    <button class="btn" data-acao="passo" data-passo="2" id="btn-li" ${rasc.li ? '' : 'disabled'}>Continuar</button>`;
  } else if (passo === 2) {
    corpo = `
    <div class="card">
      <label class="rotulo" for="entendi">O que eu entendi</label>
      <textarea id="entendi" rows="4" placeholder="Uma frase já basta.">${esc(rasc.entendi || '')}</textarea>
      <label class="rotulo" for="estudo">Da minha Bíblia de Estudo <small>(opcional)</small></label>
      <textarea id="estudo" rows="3" placeholder="Nota, mapa ou quadro que chamou atenção — e a página.">${esc(rasc.estudo || '')}</textarea>
    </div>
    <button class="btn" data-acao="passo" data-passo="3" id="btn-entendi" ${rasc.entendi?.trim() ? '' : 'disabled'}>Continuar</button>`;
  } else {
    corpo = `
    <div class="card">
      <div class="rotulo">Para pensar</div><p class="pergunta">${esc(s.pergunta)}</p>
      <label class="rotulo" for="aplicacao">Minha aplicação</label>
      <textarea id="aplicacao" rows="4" placeholder="Algo concreto que você vai fazer. Em ${J.DIAS_PARA_REVISAR_APLICACAO} dias o app pergunta como foi.">${esc(rasc.aplicacao || '')}</textarea>
    </div>
    <button class="btn" data-acao="concluir" data-id="${s.id}">Concluir sessão</button>`;
  }
  return cab + corpo;
}

function telaSessaoFeita(s) {
  const r = E.sessoes[s.id];
  return `<header class="topo-sessao" style="--c:${COR_ERA[LIVROS[s.livro].era]}"><a class="voltar" href="#/jornada">‹</a>
    <div><div class="sessao-ref">${esc(J.refSessao(s))} · ${fmtData(r.data)}</div><h2>${esc(s.titulo)}</h2></div></header>
  <div class="card"><div class="rotulo">O que entendi</div><p>${esc(r.entendi)}</p>
    ${r.estudo ? `<div class="rotulo">Da minha Bíblia de Estudo</div><p>${esc(r.estudo)}</p>` : ''}
    ${r.aplicacao ? `<div class="rotulo">Aplicação</div><p>${esc(r.aplicacao)}</p>` : ''}
    ${r.revisao ? `<div class="rotulo">Como foi (${fmtData(r.revisao.data)})</div><p>${esc(r.revisao.texto)}</p>` : ''}
  </div>
  <div class="card estudo"><div class="rotulo">Cenário</div><p>${esc(s.cenario)}</p><div class="rotulo">Contexto</div><p>${esc(s.contexto)}</p>
    <div class="rotulo">Notas</div><ul class="notas">${s.notas.map(([ref, t]) => `<li><b>${esc(ref)}</b> ${esc(t)}</li>`).join('')}</ul></div>
  <button class="btn sec" data-acao="refazer" data-id="${s.id}">Editar minhas anotações</button>`;
}

function telaResultado(res) {
  const total = res.ganhos.reduce((a, [, x]) => a + x, 0);
  return `<div class="resultado">
    <div class="selo">+${total} XP</div>
    <ul class="ganhos">${res.ganhos.map(([t, x]) => `<li>${esc(t)} <b>+${x}</b></li>`).join('')}</ul>
    ${res.novosP.length ? `<div class="card"><div class="card-tit">Personagens desbloqueados</div>
      <div class="grade">${res.novosP.map((p) => cartaPersonagem(p, true)).join('')}</div></div>` : ''}
    ${res.novosM.length ? `<div class="card"><div class="card-tit">Na linha do tempo</div>
      ${res.novosM.map((m) => `<p>📍 ${esc(J.MARCOS.find((x) => x.id === m).titulo)}</p>`).join('')}</div>` : ''}
    ${res.novasC.length ? `<div class="card"><div class="card-tit">Conquistas</div>${res.novasC.map((c) => `<p>🏆 <b>${esc(c.nome)}</b> — ${esc(c.desc)}</p>`).join('')}</div>` : ''}
    <a class="btn" href="#/hoje">Voltar ao início</a>
  </div>`;
}

function telaAplicacao(id) {
  const s = J.sessaoPorId(id); const r = E.sessoes[id];
  if (!r) return telaHoje();
  return `<header class="topo-sessao"><a class="voltar" href="#/hoje">‹</a><div><div class="sessao-ref">${esc(J.refSessao(s))} · ${fmtData(r.data)}</div><h2>Como foi?</h2></div></header>
  <div class="card"><div class="rotulo">Você se propôs</div><p class="pergunta">${esc(r.aplicacao)}</p>
    <label class="rotulo" for="como">Como foi na prática?</label>
    <textarea id="como" rows="4" placeholder="Deu certo? O que aprendeu? Se não deu, o que atrapalhou?"></textarea></div>
  <button class="btn" data-acao="revisar" data-id="${id}">Registrar (+${J.XP.revisao} XP)</button>`;
}

let filaQuiz = [];
function telaRevisao() {
  if (!filaQuiz.length) filaQuiz = J.quizPendente(E).sort(() => Math.random() - 0.5).slice(0, 10);
  if (!filaQuiz.length) return `<header class="topo"><h1>Revisão</h1></header><div class="card"><p>Nada para revisar hoje. As perguntas voltam em intervalos cada vez maiores conforme você acerta.</p></div><a class="btn" href="#/hoje">Voltar</a>`;
  const { q, s, id } = filaQuiz[0];
  return `<header class="topo"><h1>Revisão</h1><p class="sub">${filaQuiz.length} restante${filaQuiz.length > 1 ? 's' : ''}</p></header>
  <div class="card quiz"><div class="sessao-ref">${esc(J.refSessao(s))}</div><p class="pergunta">${esc(q.q)}</p>
    <div class="opcoes">${q.op.map((o, i) => `<button class="opcao" data-acao="responder" data-id="${id}" data-i="${i}">${esc(o)}</button>`).join('')}</div>
    <div id="feedback"></div></div>`;
}

function telaJornada() {
  return `<header class="topo"><h1>Jornada</h1><p class="sub">66 livros em ordem cronológica, em 10 eras</p></header>
  ${ERAS.map((era) => {
    const pe = J.progressoEra(E, era.id);
    return `<section class="era" style="--c:${COR_ERA[era.id]}">
      <div class="era-cab"><h3>${esc(era.nome)}</h3>${era.conteudo ? `<span>${pe.feitas}/${pe.total}</span>` : '<span class="breve">em breve</span>'}</div>
      ${era.livros.map((l) => {
        const pl = J.progressoLivro(E, l.id);
        const temConteudo = pl.total > 0;
        return `<div class="livro ${temConteudo ? '' : 'bloq'}">
          <div class="livro-cab">${temConteudo ? `<a href="#/livro/${l.id}">` : '<span>'}<span class="ordem">${l.ordem}</span> ${esc(l.nome)}${temConteudo ? '</a>' : '</span>'}
          ${temConteudo ? `<small>${pl.feitas}/${pl.total}</small>` : ''}</div>
          ${temConteudo ? `<div class="sessoes">${J.SESSOES.filter((s) => s.livro === l.id).map((s) => {
            const st = J.concluida(E, s.id) ? 'feita' : J.liberada(E, s) ? 'atual' : 'bloq';
            return `<a class="pino ${st}" href="${st === 'bloq' ? 'javascript:void 0' : `#/sessao/${s.id}`}" title="${esc(J.refSessao(s))}">${s.caps[0]}${s.caps[1] !== s.caps[0] ? '–' + s.caps[1] : ''}</a>`;
          }).join('')}</div>` : ''}
        </div>`;
      }).join('')}
    </section>`;
  }).join('')}`;
}

function telaLivro(id) {
  const l = LIVROS[id]; const it = J.INTRODUCOES[id];
  if (!it) return telaJornada();
  return `<header class="topo-sessao" style="--c:${COR_ERA[l.era]}"><a class="voltar" href="#/jornada">‹</a><div><div class="sessao-ref">Introdução</div><h2>${esc(l.nome)}</h2></div></header>
  <div class="card estudo intro">
    <div class="rotulo">Autor</div><p>${esc(it.autor)}</p>
    <div class="rotulo">Data</div><p>${esc(it.data)}</p>
    <div class="rotulo">Cenário</div><p>${esc(it.cenario)}</p>
    <div class="rotulo">Tema</div><p>${esc(it.tema)}</p>
    <div class="rotulo">Texto-chave</div><p><a href="${linkNAA(l, parseInt(it.chave.split(' ')[1]))}" target="_blank" rel="noopener">${esc(it.chave)} ↗</a></p>
    <div class="rotulo">Estrutura</div><p>${esc(it.estrutura)}</p>
    <div class="rotulo">Esboço</div>
    <table class="esboco">${it.esboco.map(([c, t]) => `<tr><td>${esc(c)}</td><td>${esc(t)}</td></tr>`).join('')}</table>
  </div>
  <div class="card lembrete">Compare com a introdução de ${esc(l.nome)} na sua Bíblia de Estudo.</div>`;
}

function cartaPersonagem(id, aberta) {
  const p = J.PERSONAGENS[id];
  if (!aberta) return `<div class="carta bloq"><div class="carta-ico">?</div><div class="carta-nome">???</div></div>`;
  return `<a class="carta" href="#/personagem/${id}"><div class="carta-ico">${esc(p.nome[0])}</div><div class="carta-nome">${esc(p.nome)}</div></a>`;
}

function telaPersonagens() {
  const lib = J.personagensLiberados(E);
  const ordem = [...new Set(J.SESSOES.flatMap((s) => s.personagens))];
  return `<header class="topo"><h1>Personagens</h1><p class="sub">${lib.size} de ${ordem.length} desbloqueados nesta era</p></header>
  <div class="grade">${ordem.map((id) => cartaPersonagem(id, lib.has(id))).join('')}</div>`;
}

function telaPersonagem(id) {
  const p = J.PERSONAGENS[id];
  if (!p || !J.personagensLiberados(E).has(id)) return telaPersonagens();
  const minhas = J.concluidas(E).filter((s) => s.personagens.includes(id));
  return `<header class="topo-sessao"><a class="voltar" href="#/personagens">‹</a><div><div class="sessao-ref">Personagem</div><h2>${esc(p.nome)}</h2></div></header>
  <div class="card estudo"><div class="rotulo">Quem foi</div><p>${esc(p.quem)}</p>
    <div class="rotulo">O que fez</div><p>${esc(p.vida)}</p>
    <div class="rotulo">Onde conferir</div><p class="refs">${esc(p.refs)}</p></div>
  ${minhas.length ? `<div class="card"><div class="card-tit">Minhas anotações</div>${minhas.map((s) => `<a class="linha-link" href="#/sessao/${s.id}"><span>${esc(E.sessoes[s.id].entendi)}</span><small>${esc(J.refSessao(s))}</small></a>`).join('')}</div>` : ''}`;
}

function telaLinha() {
  const lib = J.marcosLiberados(E);
  return `<header class="topo"><h1>Linha do tempo</h1><p class="sub">Ela se preenche conforme você avança</p></header>
  <div class="linha">${ERAS.map((era) => {
    const marcos = J.MARCOS.filter((m) => m.era === era.id);
    return `<div class="linha-era" style="--c:${COR_ERA[era.id]}"><div class="linha-era-nome">${esc(era.nome)}</div>
      ${marcos.length ? marcos.map((m) => lib.has(m.id)
        ? `<div class="marco on"><b>${esc(m.titulo)}</b><small>${esc(m.quando)}</small></div>`
        : `<div class="marco"><b>• • •</b></div>`).join('') : '<div class="marco"><small>em breve</small></div>'}
    </div>`;
  }).join('')}</div>`;
}

function telaPerfil() {
  const nv = J.nivel(E.xp);
  const total = J.concluidas(E).length;
  const aplic = Object.values(E.sessoes).filter((s) => s.revisao).length;
  return `<header class="topo"><h1>Progresso</h1></header>
  ${cabecalhoNivel()}
  <div class="stats">
    <div><b>${total}</b><small>sessões</small></div>
    <div><b>${J.personagensLiberados(E).size}</b><small>personagens</small></div>
    <div><b>${aplic}</b><small>aplicações vividas</small></div>
    <div><b>${E.log.filter((l) => l.tipo === 'acerto').length}</b><small>acertos</small></div>
  </div>
  <div class="card"><div class="card-tit">Conquistas</div>
    <div class="conquistas">${J.CONQUISTAS.map((c) => `<div class="conq ${E.conquistas[c.id] ? 'on' : ''}"><span>${E.conquistas[c.id] ? '🏆' : '🔒'}</span><div><b>${esc(c.nome)}</b><small>${esc(c.desc)}</small></div></div>`).join('')}</div></div>
  <div class="card"><div class="card-tit">Backup</div>
    <p class="dica">Seus dados ficam só neste aparelho. Exporte de vez em quando e guarde o arquivo (Drive, por exemplo).</p>
    <div class="linha-btns"><button class="btn sec" data-acao="exportar">Exportar</button>
    <label class="btn sec">Importar<input type="file" accept="application/json" id="importar" hidden></label></div></div>
  <p class="rodape">Texto bíblico: NAA © Sociedade Bíblica do Brasil, aberto no site oficial. Conteúdo de estudo próprio, com referências para conferir.</p>`;
}

// ─── Rascunho da sessão em andamento ───
const RASC = {};
function rascunho(id) { return (RASC[id] ||= { ...(E.sessoes[id] || {}), li: !!E.sessoes[id] }); }
function capturar(id) {
  const r = rascunho(id);
  for (const k of ['entendi', 'estudo', 'aplicacao']) { const el = document.getElementById(k); if (el) r[k] = el.value; }
  const li = document.getElementById('li'); if (li) r.li = li.checked;
  return r;
}

const fmtData = (d) => { const [, m, dd] = d.split('-'); return `${dd}/${m}`; };

// ─── Roteamento ───
let passoAtual = {};
let ultimoResultado = null;
function render() {
  const [, rota, arg] = (location.hash || '#/hoje').split('/');
  let html;
  switch (rota) {
    case 'sessao': html = telaSessao(arg, passoAtual[arg] || 0); break;
    case 'resultado': html = ultimoResultado ? telaResultado(ultimoResultado) : telaHoje(); break;
    case 'aplicacao': html = telaAplicacao(arg); break;
    case 'revisao': html = telaRevisao(); break;
    case 'jornada': html = telaJornada(); break;
    case 'livro': html = telaLivro(arg); break;
    case 'personagens': html = telaPersonagens(); break;
    case 'personagem': html = telaPersonagem(arg); break;
    case 'linha': html = telaLinha(); break;
    case 'perfil': html = telaPerfil(); break;
    default: html = telaHoje();
  }
  $app.innerHTML = html;
  document.querySelectorAll('nav a').forEach((a) => a.classList.toggle('on', a.dataset.r === (rota || 'hoje') || (a.dataset.r === 'jornada' && ['livro', 'sessao'].includes(rota)) || (a.dataset.r === 'personagens' && rota === 'personagem')));
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', () => { if (!location.hash.startsWith('#/sessao')) passoAtual = {}; render(); });

$app.addEventListener('input', (ev) => {
  const id = (location.hash.split('/')[2]);
  if (!location.hash.startsWith('#/sessao')) return;
  const r = capturar(id);
  const b1 = document.getElementById('btn-li'); if (b1) b1.disabled = !r.li;
  const b2 = document.getElementById('btn-entendi'); if (b2) b2.disabled = !r.entendi?.trim();
});

$app.addEventListener('change', async (ev) => {
  if (ev.target.id === 'li') { const r = capturar(location.hash.split('/')[2]); document.getElementById('btn-li').disabled = !r.li; }
  if (ev.target.id === 'importar' && ev.target.files[0]) {
    try {
      const novo = store.importar(await ev.target.files[0].text());
      if (!confirm('Substituir os dados deste aparelho pelo backup?')) return;
      E = novo; salvar(); toast('Backup restaurado'); render();
    } catch (e) { toast(esc(e.message)); }
  }
});

$app.addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-acao]'); if (!b) return;
  const acao = b.dataset.acao;
  const id = b.dataset.id || location.hash.split('/')[2];

  if (acao === 'passo') { capturar(id); passoAtual[id] = Number(b.dataset.passo); render(); }

  if (acao === 'concluir') {
    const r = capturar(id); const s = J.sessaoPorId(id);
    const jaFeita = J.concluida(E, id);
    const dados = { entendi: r.entendi?.trim() || '', estudo: r.estudo?.trim() || '', aplicacao: r.aplicacao?.trim() || '' };
    if (jaFeita) { Object.assign(E.sessoes[id], dados); salvar(); delete RASC[id]; passoAtual = {}; toast('Anotações atualizadas'); ir(`#/sessao/${id}`); render(); return; }
    ultimoResultado = J.concluirSessao(E, s, dados);
    salvar(); delete RASC[id]; passoAtual = {};
    ir('#/resultado');
  }

  if (acao === 'refazer') { passoAtual[id] = 2; render(); }

  if (acao === 'revisar') {
    const t = document.getElementById('como').value.trim();
    if (!t) { toast('Escreva como foi, mesmo que em uma frase.'); return; }
    const novas = J.revisarAplicacao(E, J.sessaoPorId(id), t); salvar();
    toast(`+${J.XP.revisao} XP · aplicação registrada`); toastConquistas(novas); ir('#/hoje');
  }

  if (acao === 'responder') {
    const item = filaQuiz[0]; const i = Number(b.dataset.i);
    const certo = i === item.q.a;
    J.responderQuiz(E, item.id, certo);
    const novas = J.verificarConquistas(E); salvar(); toastConquistas(novas);
    document.querySelectorAll('.opcao').forEach((o, k) => { o.disabled = true; if (k === item.q.a) o.classList.add('certa'); else if (k === i) o.classList.add('errada'); });
    document.getElementById('feedback').innerHTML = `<p class="${certo ? 'ok' : 'erro'}">${certo ? `Certo! +${J.XP.acerto} XP` : 'Não foi dessa vez — ela volta amanhã.'} <span class="refs">${esc(item.q.ref)}</span></p>
      <button class="btn" data-acao="proxima-q">${filaQuiz.length > 1 ? 'Próxima' : 'Terminar'}</button>`;
  }

  if (acao === 'proxima-q') { filaQuiz.shift(); if (!filaQuiz.length) { toast('Revisão concluída'); ir('#/hoje'); } else render(); }

  if (acao === 'exportar') {
    const blob = new Blob([store.exportar(E)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `jornada-backup-${store.hoje()}.json`; a.click(); URL.revokeObjectURL(a.href);
  }
});

render();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
