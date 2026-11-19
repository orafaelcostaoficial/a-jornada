import { avatarPorId, AVATARES_COM_IMAGEM } from '../data/avatares.js';
import { ico } from './icones.js';
// Personagem do jogador, desenhado em SVG. Evolui com os itens do nível.
export const PELES = ['#f6d3b3', '#e0ac85', '#b97c55', '#7d4f33'];
export const CABELOS = [
  { nome: 'Curto', cor: '#3b2a1e' }, { nome: 'Longo', cor: '#3b2a1e' }, { nome: 'Cacheado', cor: '#2a1d15' },
  { nome: 'Curto claro', cor: '#a8743f' }, { nome: 'Longo claro', cor: '#a8743f' }, { nome: 'Lenço', cor: '#c9a25b' },
];
export const MANTOS = ['#8a5a2b', '#3f7a4f', '#2f5d8a', '#7a3b5e', '#b8862b', '#5a5f6b'];

export function avatarSVG(av = {}, itens = [], tam = 120) {
  const pele = PELES[av.pele ?? 1], cab = CABELOS[av.cabelo ?? 0], manto = MANTOS[av.manto ?? 0];
  const tem = (i) => itens.includes(i);
  const estilo = av.cabelo ?? 0;
  const longo = estilo === 1 || estilo === 4;
  const cabelo = estilo === 5
    ? `<path d="M36 44c0-18 12-28 24-28s24 10 24 28v18c-4-8-8-12-8-12H44s-4 4-8 12z" fill="${cab.cor}"/><path d="M36 46c6-6 14-9 24-9s18 3 24 9" stroke="#a9843f" stroke-width="2" fill="none"/>`
    : estilo === 2
      ? `<g fill="${cab.cor}">${[[42, 32], [50, 24], [60, 21], [70, 24], [78, 32], [82, 42], [38, 42]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9"/>`).join('')}</g>`
      : `<path d="M37 46c-1-17 10-28 23-28s24 11 23 28c-4-7-11-11-23-11s-19 4-23 11z" fill="${cab.cor}"/>${longo ? `<path d="M37 44c-2 14 0 26 4 32l6-2c-4-8-5-18-4-28zM83 44c2 14 0 26-4 32l-6-2c4-8 5-18 4-28z" fill="${cab.cor}"/>` : ''}`;

  return `<svg viewBox="0 0 120 150" width="${tam}" height="${tam * 1.25}" class="avatar" aria-hidden="true">
    <defs>
      <radialGradient id="aura" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#ffe39a" stop-opacity=".9"/><stop offset="1" stop-color="#ffe39a" stop-opacity="0"/></radialGradient>
      <linearGradient id="mt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${manto}"/><stop offset="1" stop-color="${manto}" stop-opacity=".8"/></linearGradient>
    </defs>
    ${tem('aura') ? '<circle cx="60" cy="70" r="60" fill="url(#aura)"/>' : ''}
    <ellipse cx="60" cy="144" rx="34" ry="5" fill="#000" opacity=".12"/>
    ${tem('cajado') ? '<path d="M96 40v100" stroke="#6b4a2b" stroke-width="5" stroke-linecap="round"/><path d="M96 42c0-10 10-12 12-4" stroke="#6b4a2b" stroke-width="5" fill="none" stroke-linecap="round"/>' : ''}
    <path d="M34 140c2-30 8-58 26-58s24 28 26 58z" fill="#efe4cf"/>
    <path d="M40 140c2-26 7-50 20-50s18 24 20 50z" fill="${tem('manto') ? 'url(#mt)' : '#e4d6bb'}"/>
    ${tem('manto') ? `<path d="M34 140c2-30 8-58 26-58" stroke="${manto}" stroke-width="8" fill="none" opacity=".9"/><path d="M86 140c-2-30-8-58-26-58" stroke="${manto}" stroke-width="8" fill="none" opacity=".9"/>` : `<path d="M44 100h32" stroke="${manto}" stroke-width="5" stroke-linecap="round"/>`}
    ${tem('alforje') ? '<path d="M42 92l30 26" stroke="#7a5230" stroke-width="3"/><rect x="66" y="112" width="16" height="14" rx="3" fill="#9a6a3c"/>' : ''}
    <rect x="53" y="70" width="14" height="14" rx="5" fill="${pele}"/>
    <circle cx="60" cy="48" r="22" fill="${pele}"/>
    ${cabelo}
    <circle cx="52" cy="50" r="2.6" fill="#2a2420"/><circle cx="68" cy="50" r="2.6" fill="#2a2420"/>
    <path d="M54 59c3 3 9 3 12 0" stroke="#2a2420" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="47" cy="56" r="3" fill="#e88" opacity=".35"/><circle cx="73" cy="56" r="3" fill="#e88" opacity=".35"/>
    <circle cx="${tem('cajado') ? 92 : 40}" cy="${tem('cajado') ? 96 : 118}" r="6" fill="${pele}"/>
    ${tem('lamparina') ? '<g transform="translate(22 108)"><path d="M0 8h16l-3 8H3z" fill="#b8862b"/><path d="M8 0c3 3 3 6 0 8-3-2-3-5 0-8z" fill="#ffb238"/></g>' : ''}
    ${tem('pergaminho') ? '<g transform="translate(46 112) rotate(-15)"><rect width="22" height="10" rx="2" fill="#f4e6c4" stroke="#b39b6e"/><circle cx="0" cy="5" r="4" fill="#d9c49a"/><circle cx="22" cy="5" r="4" fill="#d9c49a"/></g>' : ''}
  </svg>`;
}

// ── Retrato de personagem bíblico escolhido (avatar.personagem) ──

// Item que marca cada estágio, mostrado como selo no retrato.
const SELO_ITEM = { cajado: 'footprints', alforje: 'backpack', manto: 'shirt', lamparina: 'lamp', pergaminho: 'scroll', aura: 'sparkles' };

// Cenário de fundo do retrato por estágio (0 Peregrino … 6 Ancião). O personagem fica por cima.
// Cada estágio acrescenta detalhes: estrada, dunas, ovelhas, lamparina e estrelas, muralhas, luz.
const FUNDOS = [
  // 0 Peregrino: amanhecer simples
  '<defs><linearGradient id="g0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe7c2"/><stop offset="1" stop-color="#f6c98f"/></linearGradient></defs><rect width="100" height="100" fill="url(#g0)"/><circle cx="50" cy="70" r="16" fill="#ffd27a" opacity=".8"/><path d="M0 78c20-6 35-6 50 0s32 6 50 0v22H0z" fill="#e2b07a"/>',
  // 1 Andarilho: colinas e estrada
  '<defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe8f7"/><stop offset="1" stop-color="#f3e2c3"/></linearGradient></defs><rect width="100" height="100" fill="url(#g1)"/><path d="M0 70c18-12 34-12 50-4s34 4 50-6v40H0z" fill="#a9c98a"/><path d="M42 100l6-30h4l6 30z" fill="#e8d2a6"/><circle cx="80" cy="22" r="7" fill="#fff3c4"/>',
  // 2 Viajante: deserto, dunas e palmeira
  '<defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd9a0"/><stop offset="1" stop-color="#f4b26b"/></linearGradient></defs><rect width="100" height="100" fill="url(#g2)"/><circle cx="24" cy="26" r="9" fill="#fff0c4"/><path d="M0 74c16-14 34-14 48-2 12-10 30-10 52 4v24H0z" fill="#e3a65c"/><path d="M84 74c0-12 1-20 3-26" stroke="#8a5a2b" stroke-width="3" fill="none"/><path d="M87 48c-6-5-14-3-17 2 6-2 11-2 17-2zm0 0c5-6 13-6 16-1-6-1-10-1-16 1z" fill="#3f8a3d"/>',
  // 3 Pastor: pastos verdes com ovelhas
  '<defs><linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3f5"/><stop offset="1" stop-color="#d7efc4"/></linearGradient></defs><rect width="100" height="100" fill="url(#g3)"/><path d="M0 66c22-10 40-10 56-2s30 6 44-2v38H0z" fill="#79b85e"/>' + [[16, 72], [84, 70], [72, 80]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse rx="6" ry="4.5" fill="#fff"/><circle cx="5" cy="-2" r="2.4" fill="#444"/></g>`).join(''),
  // 4 Guardião: noite, estrelas e lamparina acesa
  '<defs><radialGradient id="g4" cx="50%" cy="70%" r="70%"><stop offset="0" stop-color="#3b4a7a"/><stop offset="1" stop-color="#1b2140"/></radialGradient></defs><rect width="100" height="100" fill="url(#g4)"/>' + [[14, 16], [30, 10], [70, 14], [86, 26], [58, 24], [20, 34]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3" fill="#fff6c9"/>`).join('') + '<path d="M0 80c25-8 50-8 100 0v20H0z" fill="#2a3358"/><g transform="translate(78 64)"><path d="M0 8h12l-2 6H2z" fill="#d29a2c"/><path d="M6 0c3 3 3 6 0 8-3-2-3-5 0-8z" fill="#ffb238"/><circle cx="6" cy="5" r="9" fill="#ffd36b" opacity=".25"/></g>',
  // 5 Sábio: muralhas de cidade ao entardecer
  '<defs><linearGradient id="g5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9a6e8"/><stop offset="1" stop-color="#f6c98f"/></linearGradient></defs><rect width="100" height="100" fill="url(#g5)"/><path d="M0 62h10v-6h6v6h10v-8h6v8h12v-6h6v6h14v-8h6v8h10v-6h6v6h14v38H0z" fill="#c9955a"/><rect x="44" y="70" width="12" height="30" rx="6" fill="#7a5230"/>',
  // 6 Ancião: luz dourada (usa a imagem final)
  '<defs><radialGradient id="g6" cx="50%" cy="45%" r="65%"><stop offset="0" stop-color="#fff6d6"/><stop offset=".55" stop-color="#ffd36b"/><stop offset="1" stop-color="#d29a2c"/></radialGradient></defs><rect width="100" height="100" fill="url(#g6)"/>' + Array.from({ length: 12 }, (_, i) => `<path d="M50 45L${50 + 70 * Math.cos(i * Math.PI / 6)} ${45 + 70 * Math.sin(i * Math.PI / 6)}" stroke="#fff" stroke-width="5" opacity=".25"/>`).join(''),
];

export function retrato(id, itens = [], tam = 120) {
  const a = avatarPorId(id);
  if (!a) return '';
  const est = Math.min(itens.length, 6);
  const ultimo = itens[itens.length - 1];
  const final = est === 6 && AVATARES_COM_IMAGEM.has(id + '-final');
  const temImg = AVATARES_COM_IMAGEM.has(id);
  const fundo = `<svg class="retrato-fundo" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${FUNDOS[est]}</svg>`;
  const arte = final ? `<img src="img/avatares/${id}-final.webp" alt="${a.nome}" loading="lazy">`
    : temImg ? `<img src="img/avatares/${id}.webp" alt="${a.nome}" loading="lazy">`
      : `<span class="retrato-sim">${ico(a.simbolo)}</span>${tam >= 100 ? `<span class="retrato-ini">${a.nome}</span>` : ''}`;
  return `<span class="retrato est-${est} ${temImg ? 'com-img' : ''}" style="--rc:${a.cor};--rt:${tam}px"><span class="retrato-in">${fundo}${arte}</span>${ultimo && tam >= 44 ? `<span class="selo-item">${ico(SELO_ITEM[ultimo])}</span>` : ''}</span>`;
}

// Usar sempre esta. Viajantes antigos (boneco montado, sem personagem) ainda aparecem com o boneco
// até escolherem um personagem; a opção de montar não existe mais.
export function avatarHTML(av = {}, itens = [], tam = 120) {
  return av?.personagem ? retrato(av.personagem, itens, tam) : avatarSVG(av, itens, tam);
}
