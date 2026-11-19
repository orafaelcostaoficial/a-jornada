"""Prepara as imagens do Gemini para o app.

Uso:  python3 ferramentas/recortar.py <entrada.png> <saida.webp> [--manter-fundo]

- Remove o fundo liso (branco ou de uma cor só) a partir das bordas, por preenchimento,
  sem apagar áreas da mesma cor dentro do desenho.
- Recorta para quadrado, redimensiona para 512x512 e salva em WebP com transparência.
- --manter-fundo: só recorta e redimensiona (para as cartas, que usam a cena inteira).
"""
import sys
from collections import deque
from PIL import Image

def remover_fundo(im, tolerancia=38):
    im = im.convert('RGBA')
    w, h = im.size
    px = im.load()
    cantos = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    ref = tuple(sum(c[i] for c in cantos) // 4 for i in range(3))
    perto = lambda c: sum(abs(c[i] - ref[i]) for i in range(3)) <= tolerancia
    visto = bytearray(w * h)
    fila = deque([(x, y) for x in range(w) for y in (0, h - 1)] + [(x, y) for y in range(h) for x in (0, w - 1)])
    while fila:
        x, y = fila.popleft()
        i = y * w + x
        if visto[i] or not perto(px[x, y]):
            continue
        visto[i] = 1
        px[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not visto[ny * w + nx]:
                fila.append((nx, ny))
    return im

def quadrado(im):
    w, h = im.size
    lado = min(w, h)
    # retrato: mantém a parte de baixo (ombros) e centraliza na horizontal
    return im.crop(((w - lado) // 2, h - lado, (w - lado) // 2 + lado, h))

if __name__ == '__main__':
    entrada, saida = sys.argv[1], sys.argv[2]
    im = Image.open(entrada)
    if '--manter-fundo' not in sys.argv:
        im = remover_fundo(im)
    im = quadrado(im).resize((512, 512), Image.LANCZOS)
    im.save(saida, 'WEBP', quality=86, method=6)
    print('ok', saida)
