// Cenários do mapa da jornada. Cada trecho da história tem um fundo e enfeites próprios.
// Para uma nova era: adicionar cenas aqui e mapear as sessões em CENA_DA_SESSAO.

export const CENAS = {
  jardim:     { quando: 'Sem data', nome: 'O jardim do Éden', ceu: ['#d9f1d0', '#a7d98f'], enfeites: ['arvore', 'flor', 'rio', 'arvore', 'flor'] },
  diluvio:    { quando: 'Sem data', nome: 'O dilúvio', ceu: ['#cfe3f2', '#7fb0d6'], enfeites: ['onda', 'arca', 'onda', 'arcoiris'] },
  babel:      { quando: 'Sem data', nome: 'Babel', ceu: ['#f4e3c4', '#e0bf86'], enfeites: ['torre', 'tijolo'] },
  patriarcas: { quando: 'c. 2100–1900 a.C.', nome: 'Os patriarcas', ceu: ['#f8e6c6', '#e8c48d'], enfeites: ['tenda', 'estrelas', 'duna', 'poco', 'tenda', 'palmeira', 'estrelas'] },
  egito:      { quando: 'c. 1900–1800 a.C.', nome: 'O Egito', ceu: ['#fbe7b5', '#e7b45f'], enfeites: ['piramide', 'palmeira', 'nilo', 'espiga', 'piramide'] },
  uz:         { quando: 'Sem data no texto', nome: 'A terra de Uz', ceu: ['#d9dbe3', '#9aa3b8'], enfeites: ['nuvem', 'raio', 'nuvem', 'sol'] },
};

export function cenaDaSessao(id) {
  const [l, n] = [id.slice(0, 2), Number(id.slice(3))];
  if (l === 'jo') return 'uz';
  if (n <= 3) return 'jardim';
  if (n <= 5) return 'diluvio';
  if (n === 6) return 'babel';
  if (n <= 19) return 'patriarcas';
  return 'egito';
}

export const ENFEITES = {
  arvore: '<ellipse cx="30" cy="70" rx="16" ry="4" fill="#000" opacity=".1"/><rect x="27" y="40" width="6" height="30" rx="2" fill="#7a5230"/><circle cx="30" cy="30" r="20" fill="#4f9a4a"/><circle cx="20" cy="36" r="12" fill="#5fae55"/><circle cx="40" cy="34" r="13" fill="#3f8a3d"/><circle cx="26" cy="26" r="3" fill="#e2493f"/><circle cx="38" cy="38" r="3" fill="#e2493f"/>',
  flor: '<g transform="translate(30 50)"><path d="M0 20V0" stroke="#3f8a3d" stroke-width="3"/>' + [0, 72, 144, 216, 288].map((r) => `<ellipse rx="5" ry="9" transform="rotate(${r}) translate(0 -8)" fill="#f2a7c3"/>`).join('') + '<circle r="4" fill="#f6c945"/></g>',
  rio: '<path d="M0 40c15-10 25 10 40 0s25 10 40 0" stroke="#7fc1e8" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M5 55c15-10 25 10 40 0s20 8 30 2" stroke="#a9d8f2" stroke-width="5" fill="none" stroke-linecap="round"/>',
  onda: '<path d="M0 50c10-14 20-14 30 0s20 14 30 0 20-14 30 0" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/><path d="M5 62c10-10 20-10 30 0s20 10 30 0" stroke="#4f8fc0" stroke-width="5" fill="none" stroke-linecap="round"/>',
  arca: '<path d="M5 45h60l-8 16H13z" fill="#8a5a2b"/><rect x="18" y="30" width="34" height="15" rx="2" fill="#a9733f"/><path d="M15 28h40l-20-10z" fill="#6b4422"/><rect x="30" y="35" width="8" height="6" fill="#4a2e16"/>',
  arcoiris: '<g fill="none" stroke-width="5" stroke-linecap="round">' + ['#e2493f', '#f39c34', '#f6c945', '#5fae55', '#4f8fc0', '#7d4fc0'].map((c, i) => `<path d="M${8 + i * 5} 60a${27 - i * 5} ${27 - i * 5} 0 0 1 ${54 - i * 10} 0" stroke="${c}"/>`).join('') + '</g>',
  torre: '<path d="M20 70h40l-4-12H24z" fill="#c9955a"/><path d="M24 58h32l-4-12H28z" fill="#d6a66b"/><path d="M28 46h24l-4-12H32z" fill="#c9955a"/><path d="M32 34h16l-4-12h-8z" fill="#d6a66b"/><rect x="37" y="60" width="6" height="10" fill="#7a5230"/>',
  tijolo: '<g fill="#c27a45" stroke="#9a5a2e"><rect x="10" y="50" width="20" height="10" rx="1"/><rect x="32" y="50" width="20" height="10" rx="1"/><rect x="21" y="39" width="20" height="10" rx="1"/></g>',
  tenda: '<ellipse cx="35" cy="68" rx="28" ry="4" fill="#000" opacity=".1"/><path d="M5 66L35 24l30 42z" fill="#b5652e"/><path d="M35 24l30 42H45z" fill="#93501f"/><path d="M28 66l7-14 7 14z" fill="#4a2e16"/><path d="M35 24v-6" stroke="#6b4422" stroke-width="2"/>',
  estrelas: [[12, 18, 3], [40, 10, 4], [60, 30, 2.5], [25, 40, 2], [52, 52, 3]].map(([x, y, r]) => `<path d="M${x} ${y - r * 2}l${r * .6} ${r * 1.4} ${r * 1.4} ${r * .6}-${r * 1.4} ${r * .6}-${r * .6} ${r * 1.4}-${r * .6}-${r * 1.4}-${r * 1.4}-${r * .6} ${r * 1.4}-${r * .6}z" fill="#fff6c9"/>`).join(''),
  duna: '<path d="M0 70c15-25 35-25 50-8 8-10 20-12 30 8z" fill="#e3b46f"/><path d="M50 62c8-10 20-12 30 8H58z" fill="#cf9b52"/>',
  poco: '<ellipse cx="35" cy="66" rx="22" ry="5" fill="#000" opacity=".1"/><rect x="15" y="44" width="40" height="22" rx="4" fill="#a89a86"/><path d="M15 50h40M15 58h40M28 44v22M42 44v22" stroke="#8a7d6b" stroke-width="1.5"/><path d="M18 44V24h34v20" stroke="#6b4422" stroke-width="3" fill="none"/><path d="M14 24h42" stroke="#6b4422" stroke-width="4"/>',
  palmeira: '<path d="M34 70c0-20 2-34 6-44" stroke="#8a5a2b" stroke-width="6" fill="none" stroke-linecap="round"/><g fill="#3f8a3d"><path d="M40 26c-10-8-24-6-30 2 10-4 20-2 30-2z"/><path d="M40 26c8-10 22-10 28-2-10-2-18-2-28 2z"/><path d="M40 26c-4-12 0-20 8-24-4 8-6 16-8 24z"/><path d="M40 26c-12 2-20 10-22 18 6-8 14-14 22-18z"/><path d="M40 26c12 0 20 6 24 14-8-6-16-10-24-14z"/></g>',
  piramide: '<path d="M5 70L40 22l35 48z" fill="#e3b46f"/><path d="M40 22l35 48H48z" fill="#c8964e"/><path d="M20 50h30M14 60h48" stroke="#b9853f" stroke-width="1.2" opacity=".6"/>',
  nilo: '<path d="M0 50c20-8 30 8 50 0s20 8 30 2" stroke="#4f9fd0" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M14 38v14M20 34v18M62 40v12" stroke="#5fae55" stroke-width="3" stroke-linecap="round"/>',
  espiga: '<g transform="translate(35 70)"><path d="M0 0v-44" stroke="#c99a35" stroke-width="3"/>' + [-38, -30, -22, -14].map((y) => `<ellipse cx="-5" cy="${y}" rx="4" ry="7" transform="rotate(-25 -5 ${y})" fill="#e3b445"/><ellipse cx="5" cy="${y}" rx="4" ry="7" transform="rotate(25 5 ${y})" fill="#e3b445"/>`).join('') + '</g>',
  nuvem: '<g fill="#7b8396"><circle cx="25" cy="40" r="14"/><circle cx="42" cy="34" r="17"/><circle cx="58" cy="42" r="12"/><rect x="20" y="40" width="44" height="14" rx="7"/></g>',
  raio: '<path d="M42 10L24 44h14l-8 26 24-38H40z" fill="#f6c945"/>',
  sol: '<circle cx="40" cy="40" r="14" fill="#ffc84a"/>' + Array.from({ length: 8 }, (_, i) => `<path d="M40 16v-8" stroke="#ffc84a" stroke-width="4" stroke-linecap="round" transform="rotate(${i * 45} 40 40)"/>`).join(''),
};

export const enfeite = (nome) => `<svg viewBox="0 0 80 80" class="enfeite" aria-hidden="true">${ENFEITES[nome] || ''}</svg>`;
