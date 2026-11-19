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
