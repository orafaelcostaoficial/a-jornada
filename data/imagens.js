// Cartas que já têm imagem em img/cartas/<id>.webp (geradas no Gemini a partir de PROMPTS-CARTAS.md).
// Ao adicionar uma imagem, inclua o id aqui.
export const COM_IMAGEM = new Set([
]);

// Selos com imagem em img/selos/<id>.webp (objeto recortado, sem fundo; PROMPTS-SELOS.md).
// Ao adicionar uma imagem, inclua o id aqui. Vale também para os selos especiais (ex.: 'natal-2026').
export const SELOS_COM_IMAGEM = new Set([
  'luz', 'arvore', 'arca', 'arcoiris', 'estrelas', 'carneiro', 'poco', 'escada', 'tunica', 'espiga', 'ouro', 'redemoinho',
  'sarca', 'pao', 'coluna', 'cajado', 'mana', 'arcaalianca', 'tabuas', 'trombetas', 'uvas', 'vara', 'serpente',
]);
