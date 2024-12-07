class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# Generació exhaustiva

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya

---

class: center, middle

## Generació exhaustiva

# Seqüències d'uns i zeros

---

# Problema

Considerem que volem fer un programa que escrigui totes les possibles seqüències de llargada $n$ amb zeros i uns.

Per exemple, per a $n = 3$, caldria escriure

```text
0,0,0
0,0,1
0,1,0
0,1,1
1,0,0
1,0,1
1,1,0
1,1,1
```

--

# Especificació

```python
def generar_combinacions(n: int) -> None:
    """Escriu totes les combinacions d'n zeros i uns, per a n ≥ 0."""
```

---

# Funció recursiva

```python
def generar_combinacions_rec(n: int, L: list[int]) -> None:
    """Escriu totes les combinacions d'n zeros i uns
    que comencin amb L, per a n ≥ 0 i |L| ≤ n."""
```

Per exemple, `generar_combinacions_rec(6, [1, 0, 0, 1])` hauria d'escriure les quatre combinacions següents:

```text
1,0,0,1,0,0
1,0,0,1,0,1
1,0,0,1,1,0
1,0,0,1,1,1
```

--

# Crida inicial

```python
def generar_combinacions(n: int) -> None:
    """Escriu totes les combinacions d'n zeros i uns, per a n ≥ 0."""

    generar_combinacions_rec(n, [])
```

---

# Implementació

```python
def generar_combinacions_rec(n: int, L: list[int]) -> None:
    """Escriu totes les combinacions d'n zeros i uns que comencin amb L, per a n ≥ 0 i |L| ≤ n."""

    if len(L) == n:
        escriure(L)
    else:
        generar_combinacions_rec(n , L + [0])
        generar_combinacions_rec(n , L + [1])
```

--

```python
def escriure(L: list[int]) -> None:
    """Escriu els elements de L en el format prescrit."""

    print(','.join([str(x) for x in L]))
```

---

# Arbre d'exploració

<pre class="info custom-block" style='line-height: 1.25;'>
[]
├── [0]
│   ├── [0,0]
│   │   ├── [0,0,0]
│   │   └── [0,0,1]
│   └── [0,1]
│       ├── [0,1,0]
│       └── [0,1,1]
└── [1]
    ├── [1,0]
    │   ├── [1,0,0]
    │   └── [1,0,1]
    └── [1,1]
        ├── [1,1,0]
        └── [1,1,1]
</pre>

---

# Millora d'eficiència

```python
def generar_combinacions(n: int) -> None:
    """Escriu totes les combinacions d'n zeros i uns, per a n ≥ 0."""

    generar_combinacions_rec(n, [-1 for _ in range(n)], 0)
```

```python
def generar_combinacions_rec(n: int, L: list[int], i: int) -> None:
    """Escriu totes les combinacions d'n zeros i uns que comencin amb L[:i], amb |L| = n ≥ i ≥ 0."""

    if i == n:
        escriure(L)
    else:
        L[i] = 0
        generar_combinacions_rec(n, L, i + 1)
        L[i] = 1
        generar_combinacions_rec(n, L, i + 1)
```

---

# Arbre d'exploració

<pre class="info custom-block" style='line-height: 1.25;'>
[·,·,·]
├── [0,·,·]
│   ├── [0,0,·]
│   │   ├── [0,0,0]
│   │   └── [0,0,1]
│   └── [0,1,·]
│       ├── [0,1,0]
│       └── [0,1,1]
└── [1,·,·]
    ├── [1,0,·]
    │   ├── [1,0,0]
    │   └── [1,0,1]
    └── [1,1,·]
        ├── [1,1,0]
        └── [1,1,1]
</pre>

---

class: center, middle

## Generació exhaustiva

# Seqüències d'uns i zeros amb un nombre determinat d'uns

---

# Problema

Volem n programa que escrigui (en ordre lexicogràfic) totes les possibles seqüències de llargada $n$ amb $n - k$ zeros i $k$ uns, amb $n\ge k\ge 0$.

Per exemple, per a $n = 5$ i $k = 2$, caldria escriure

```text
0,0,0,1,1
0,0,1,0,1
0,0,1,1,0
0,1,0,0,1
0,1,0,1,0
0,1,1,0,0
1,0,0,0,1
1,0,0,1,0
1,0,1,0,0
1,1,0,0,0
```

---

# Idea dolenta

Usar el programa anterior i fer que l'acció `escriure` només escrigui les llistes que tenen exactament `k` uns.

$n = 5$ i $k = 2$ &nbsp; 63 crides

<pre class="info custom-block" style='line-height: 1.25; max-height: 20em; overflow: auto;'>
[·,·,·,·,·]
├── [0,·,·,·,·]
│   ├── [0,0,·,·,·]
│   │   ├── [0,0,0,·,·]
│   │   │   ├── [0,0,0,0,·] ❌
│   │   │   │   ├── [0,0,0,0,0] 🔴
│   │   │   │   └── [0,0,0,0,1] 🔴
│   │   │   └── [0,0,0,1,·]
│   │   │       ├── [0,0,0,1,0] 🔴
│   │   │       └── [0,0,0,1,1] 🟢
│   │   └── [0,0,1,·,·]
│   │       ├── [0,0,1,0,·]
│   │       │   ├── [0,0,1,0,0] 🔴
│   │       │   └── [0,0,1,0,1] 🟢
│   │       └── [0,0,1,1,·]
│   │           ├── [0,0,1,1,0] 🟢
│   │           └── [0,0,1,1,1] 🔴
│   └── [0,1,·,·,·]
│       ├── [0,1,0,·,·]
│       │   ├── [0,1,0,0,·]
│       │   │   ├── [0,1,0,0,0] 🔴
│       │   │   └── [0,1,0,0,1] 🟢
│       │   └── [0,1,0,1,·]
│       │       ├── [0,1,0,1,0] 🟢
│       │       └── [0,1,0,1,1] 🔴
│       └── [0,1,1,·,·]
│           ├── [0,1,1,0,·]
│           │   ├── [0,1,1,0,0] 🟢
│           │   └── [0,1,1,0,1] 🔴
│           └── [0,1,1,1,·] ❌
│               ├── [0,1,1,1,0] 🔴
│               └── [0,1,1,1,1] 🔴
└── [1,·,·,·,·]
    ├── [1,0,·,·,·]
    │   ├── [1,0,0,·,·]
    │   │   ├── [1,0,0,0,·]
    │   │   │   ├── [1,0,0,0,0] 🔴
    │   │   │   └── [1,0,0,0,1] 🟢
    │   │   └── [1,0,0,1,·]
    │   │       ├── [1,0,0,1,0] 🟢
    │   │       └── [1,0,0,1,1] 🔴
    │   └── [1,0,1,·,·]
    │       ├── [1,0,1,0,·]
    │       │   ├── [1,0,1,0,0] 🟢
    │       │   └── [1,0,1,0,1] 🔴
    │       └── [1,0,1,1,·] ❌
    │           ├── [1,0,1,1,0] 🔴
    │           └── [1,0,1,1,1] 🔴
    └── [1,1,·,·,·]
        ├── [1,1,0,·,·]
        │   ├── [1,1,0,0,·]
        │   │   ├── [1,1,0,0,0] 🟢
        │   │   └── [1,1,0,0,1] 🔴
        │   └── [1,1,0,1,·] ❌
        │       ├── [1,1,0,1,0] 🔴
        │       └── [1,1,0,1,1] 🔴
        └── [1,1,1,·,·] ❌
            ├── [1,1,1,0,·] ❌
            │   ├── [1,1,1,0,0] 🔴
            │   └── [1,1,1,0,1] 🔴
            └── [1,1,1,1,·] ❌
                ├── [1,1,1,1,0] 🔴
                └── [1,1,1,1,1] 🔴
</pre>

---

# Solució

```python
def generar_combinacions(n: int, k: int) -> None:
    """Escriu totes les combinacions d'n-k zeros i k uns, per a n ≥ k ≥ 0."""

    generar_combinacions_rec(n, [0 for _ in range(n)], 0, k)
```

```python
def generar_combinacions_rec(n: int, L: list[int], i: int, nb_uns: int) -> None:
    """
    Escriu totes les combinacions amb n zeros i uns, que comencin amb L[:i],
    amb |L| = n ≥ i ≥ 0, i on nb_uns és el nombre d'uns que cal posar en L[i:].
    """

    if nb_uns >= 0 and nb_uns <= n - i:
        if i == n:
            escriure(L)
        else:
            L[i] = 0
            generar_combinacions_rec(n, L, i + 1, nb_uns)
            L[i] = 1
            generar_combinacions_rec(n, L, i + 1, nb_uns - 1)
```

---

# Arbre d'exploració

$n = 5$ i $k = 2$ &nbsp; (50 crides)

<pre class="info custom-block" style='line-height: 1.25; max-height: 20em; overflow: auto;'>
[·,·,·,·,·]
├── [0,·,·,·,·]
│   ├── [0,0,·,·,·]
│   │   ├── [0,0,0,·,·]
│   │   │   ├── [0,0,0,0,·] ❌
│   │   │   └── [0,0,0,1,·]
│   │   │       ├── [0,0,0,1,0] 🔴
│   │   │       └── [0,0,0,1,1] 🟢
│   │   └── [0,0,1,·,·]
│   │       ├── [0,0,1,0,·]
│   │       │   ├── [0,0,1,0,0] 🔴
│   │       │   └── [0,0,1,0,1] 🟢
│   │       └── [0,0,1,1,·]
│   │           ├── [0,0,1,1,0] 🟢
│   │           └── [0,0,1,1,1] 🔴
│   └── [0,1,·,·,·]
│       ├── [0,1,0,·,·]
│       │   ├── [0,1,0,0,·]
│       │   │   ├── [0,1,0,0,0] 🔴
│       │   │   └── [0,1,0,0,1] 🟢
│       │   └── [0,1,0,1,·]
│       │       ├── [0,1,0,1,0] 🟢
│       │       └── [0,1,0,1,1] 🔴
│       └── [0,1,1,·,·]
│           ├── [0,1,1,0,·]
│           │   ├── [0,1,1,0,0] 🟢
│           │   └── [0,1,1,0,1] 🔴
│           └── [0,1,1,1,·] ❌
└── [1,·,·,·,·]
    ├── [1,0,·,·,·]
    │   ├── [1,0,0,·,·]
    │   │   ├── [1,0,0,0,·]
    │   │   │   ├── [1,0,0,0,0] 🔴
    │   │   │   └── [1,0,0,0,1] 🟢
    │   │   └── [1,0,0,1,·]
    │   │       ├── [1,0,0,1,0] 🟢
    │   │       └── [1,0,0,1,1] 🔴
    │   └── [1,0,1,·,·]
    │       ├── [1,0,1,0,·]
    │       │   ├── [1,0,1,0,0] 🟢
    │       │   └── [1,0,1,0,1] 🔴
    │       └── [1,0,1,1,·] ❌
    └── [1,1,·,·,·]
        ├── [1,1,0,·,·]
        │   ├── [1,1,0,0,·]
        │   │   ├── [1,1,0,0,0] 🟢
        │   │   └── [1,1,0,0,1] 🔴
        │   └── [1,1,0,1,·] ❌
        └── [1,1,1,·,·] ❌
</pre>

---

class: center, middle

## Generació exhaustiva

# Generar combinacions de mots

---

# Problema

Tenim una llista de mots i volem generar totes les seqüències de llargada $n$ formades amb aquests mots.

Per exemple, amb `anna`, `berta` i `carla`, les combinacions possibles de llargada `2` són aquestes:

```text
anna anna
anna berta
anna carla
berta anna
berta berta
berta carla
carla anna
carla berta
carla carla
```

---

# Solució

```python
def generar_combinacions(n: int, mots: list[str]) -> None:
    """Escriu totes les combinacions d'n elements triats en mots, per n ≥ 0."""

    generar_combinacions_rec(n, mots, ['' for _ in range(n)], 0)
```

```python
def generar_combinacions_rec(n: int, mots: list[str], L: list[str], i: int) -> None:
    """Escriu totes les combinacions d'n elements triats en mots, que comencin amb L[:i], amb |L| = n ≥ i ≥ 0."""

    if i == n:
        print(' '.join(L))
    else:
        for mot in mots:
            L[i] = mot
            generar_combinacions_rec(n, mots, L, i + 1)
```

---

class: center, middle

## Generació exhaustiva

# Generar combinacions de mots sense mots repetits consecutius

---

# Problema

Tenim una llista de mots i volem generar totes les seqüències de llargada $n$ formades amb aquests mots sense que cap parell de mots consecutius siguin repetits.

---

# Solució

```python
def generar_combinacions(n: int, mots: list[str]) -> None:
    """
    Escriu totes les combinacions d'n elements triats en mots,
    sense dos mots consecutius repetits, amb n ≥ 0.
    """

    generar_combinacions_rec(n, mots, ['' for _ in range(n)], 0)
```

```python
def generar_combinacions_rec(n: int, mots: list[str], L: list[str], i: int) -> None:
    """
    Escriu totes les combinacions d'n elements triats en mots, sense dos mots
    consecutius repetits, i que comencin amb L[:i], amb |L| = n ≥ i ≥ 0.
    """

    if i == n:
        print(' '.join(L))
    else:
        for mot in mots:
            if i == 0 or mot != L[i - 1]:
                L[i] = mot
                generar_combinacions_rec(n, mots, L, i + 1)
```

---

# Variació: comptatge

```python
def comptar_combinacions(n: int, mots: list[str]) -> int:
    """
    Retorna el nombre de combinacions d'n elements triats en mots,
    sense dos mots consecutius repetits, amb n ≥ 0.
    """

    return comptar_combinacions_rec(n, mots, ['' for _ in range(n)], 0)
```

```python
def comptar_combinacions_rec(n: int, mots: list[str], L: list[str], i: int) -> int:
    """
    Retorna el nombre de combinacions d'n elements triats en mots, sense dos mots
    consecutius repetits, i que comencin amb L[:i], amb |L| = n ≥ i ≥ 0.
    """

    if i == n:
        return 1
    else:
        c = 0
        for mot in mots:
            if i == 0 or mot != L[i - 1]:
                L[i] = mot
                c += comptar_combinacions_rec(n, mots, L, i + 1)
        return c
```

---

class: center, middle

## Generació exhaustiva

# Permutacions

---

# Problema

Programa que escrigui (en ordre lexicogràfic) totes les permutacions de $\\{1,...,n\\}$ per $n\ge0$.

Per exemple, per a $n = 3$:

```text
1,2,3
1,3,2
2,1,3
2,3,1
3,1,2
3,2,1
```

---

# Especificació

```python
def generar_permutacions(n: int) -> None:
    """Escriu totes les permutacions de {1..n}, per a n ≥ 0."""
```

---

# Funció recursiva

```python
def generar_permutacions_rec(n: int, L: list[int]) -> None:
    """Escriu totes les permutacions de {1..n} que comencin amb L, per a n ≥ |L| ≥ 0."""
```

Per exemple, `generar_permutacions_rec(4, [3, 2])` hauria d'escriure:

```text
3,2,1,4
3,2,4,1
```

# Crida inicial

```python
def generar_permutacions(n: int) -> None:
    """Escriu totes les permutacions de {1..n}, per a n ≥ 0."""

    generar_permutacions_rec(n, [])
```

---

# Implementació

```python
def generar_permutacions_rec(n: int, L: list[int]) -> None:
    """Escriu totes les permutacions de {1..n} que comencin amb L, per a n ≥ |L| ≥ 0."""

    if len(L) == n:
        escriure(n)
    else:
        for x in range(1, n+1):
            if x not L:
                generar_permutacions_rec(n , L + [x])
```

---

# Millora d'eficiència

```python
def generar_permutacions(n: int) -> None:
    """Escriu totes les permutacions de {1..n}, per a n ≥ 0."""

    L = [0 for _ in range(n)]  # els valors no són importants, la llargada sí
    usats = [False for _ in range(n + 1)]  # la posició 0 no s'utilitza
    generar_permutacions_rec(0, L, 0, usats)
```

```python
def generar_permutacions_rec(n: int, L: list[int], i: int, usats: list[bool]) -> None:
    """
    Escriu totes les permutacions de {1..n} que comencin amb L[:i],
    amb n ≥ i ≥ 0, |L| = n, |usats| = n+1 i amb usats[x] = (x ∈ L[:i]) per a tot x∈{1..n}.
    """

    if i == n:
        escriure(L)
    else:
        for x in range(1, n + 1):
            if not usats[x]:
                L[i] = x
                usats[x] = True
                generar_permutacions_rec(n, L, i + 1, usats)
                usats[x] = False
```

---

# Arbre d'exploració

<pre class="info custom-block" style='line-height: 1.25;'>
[·,·,·]
├── [1,·,·]
│   ├── [1,2,·]
│   │   └── [1,2,3]
│   └── [1,3,·]
│       └── [1,3,2]
├── [2,·,·]
│   ├── [2,1,·]
│   │   └── [2,1,3]
│   └── [2,3,·]
│       └── [2,3,1]
└── [3,·,·]
    ├── [3,1,·]
    │   └── [3,1,2]
    └── [3,2,·]
        └── [3,2,1]
</pre>

---

class: center, middle

## Generació exhaustiva

# Les _n_ &nbsp;reines

---

# Problema

Podeu col·locar vuit reines en un tauler d'escacs sense que cap reina amenaci cap altra?

Possible solució (n'hi ha 92):

<img src='./img/8reines.svg' style='height: 15em;'/>

---

# Generalització

Programa per resoldre una generalització del trencaclosques: donat un valor `n`, volem escriure totes les maneres de col·locar `n` reines en un tauler d'`n⨉n` escacs.

Per exemple, hiha 2 solucions per 4 reines en un tauler 4⨉4:

```text
· ♕ · ·
· · · ♕
♕ · · ·
· · ♕ ·

· · ♕ ·
♕ · · ·
· · · ♕
· ♕ · ·
```

Cal doncs posar `n` reines en un tauler `n⨉n` de forma que cap parell de reines es trobin:

- a la mateixa fila,
- a la mateixa columna,
- a la mateixa diagonal ascendent, ni
- a la mateixa diagonal descendent.

---

# Espai de cerca

Realitzarem una cerca exhaustiva en l'espai de possibles configuracions.

Per tauler 8⨉8, aquest espai de cerca és enorme:

- Si considerem posar o no posar una reina a cada casella, hi ha
  $2^{64}$ configuracions.

  Moltes són inútils: cal col·locar exactament 8 reines.

- Si considerem triar 8 posicions diferents, hi ha
  $\binom{64}{8} = 4.426.165.368$ configuracions.

  Moltes són inútils: no pot haver-hi mai més d'una reina per fila.

- Si considerem triar 8 posicions en files diferents, hi ha
  $8^8 = 16.777.216$ configuracions.

  Moltes són inútils: no pot haver-hi mai més d'una reina per fila _i_ per columna.

- Si considerem triar 8 posicions en files i columnes diferents, hi ha
  $8! = 40.320$ configuracions.

Descartant solucions on ja hi hagi amenaces, ho podem fer millor!

---

# Representació

Enlloc de representar tot el tauler

```text
· · ♕ · · · · ·
· · · · · · ♕ ·
· · · ♕ · · · ·
· ♕ · · · · · ·
· · · · · · · ♕
· · · · ♕ · · ·
· · · · · · ♕ ·
♕ · · · · · · ·
```

utilitzarem una versió equivalent més consisa:

```text
[7, 3, 0, 2, 5, 1, 6, 4]
```

Per a cada columna, indiquem la fila on hi ha una reina.

---

# Solucions parcials

Una solució parcial correspon a la col·locació d'un subconjunt de reines en les primeres columnes. Podem representar solucions parcial restringint els valors de la llista a unes quantes posicions inicials. Així, les primeres `5` posicions de la llista `[7, 3, 0, 2, 1, 2, 3, 4]` representen la solució parcial

```text
· · ♕ · · · · ·
· · · · ♕ · · ·
· · · ♕ · · · ·
· ♕ · · · · · ·
· · · · · · · ·
· · · · · · · ·
· · · · · · · ·
♕ · · · · · · ·
```

i les darreres 3 posicions són irrellevants.

Representarem les solucions parcials amb el tipus `SolParcial`:

```python
SolParcial: TypeAlias = list[int]
```

---

# Solució

```python
def genera_reines(n: int) -> None:
    """Escriu totes les maneres de col·locar n reines en un tauler n⨉n."""

    s: SolParcial = [-1 for _ in range(n)]  # els valors són irrellevants, la llargada no.
    genera_reines_rec(n, s, 0)
```

```python
def genera_reines_rec(n: int, s: SolParcial, i: int) -> None:
    """
    Escriu totes les maneres de col·locar n reines en un tauler n⨉n
    de forma que les i primeres reines es col·loquen a les primeres i
    posicions de s. Aquestes primeres i posicions són una solució parcial legal.
    """

    if i == n:
        escriure_reines(s)
    else:
        for j in range(n):
            if legal(s, i, j):
                s[i] = j
                genera_reines_rec(n, s, i+1)
```

---

# Funcions auxiliars

```python
def legal(s: SolParcial, i: int, j: int) -> bool:
    """Indica si és legal col·locar una reina a la fila i i columna j per a a solució parcial s."""

    for k in range(i):
        if j == s[k] or j - i == s[k] - k or j + i == s[k] + k:
            return False
    return True
```

```python
def escriure_reines(s: SolParcial) -> None:
    """Escriu en format tauler la solució emmagatzemada en s."""

    for p in s:
        print('· ' * p, '♕ ', '· ' * (len(s) - p - 1), sep='')
    print()
```

---

# Marcatges

Problema: La funció `legal` fa una cerca:

```python
def legal(s: SolParcial, i: int, j: int) -> bool:
    """Indica si és legal col·locar una reina a la fila i i columna j per a a solució parcial s."""

    for k in range(i):
        if j == s[k] or j - i == s[k] - k or j + i == s[k] + k:
            return False
    return True
```

---

# Marcatges

Solució:

- Per saber si ja hi ha una reina a la fila `i`, una llista de booleans `files` indica si ja hi ha una reina a la fila `i`.

- Per saber si ja hi ha una reina a la diagonal descendent ↘, una llista de booleans `descendents` indica si ja hi ha una reina a la diagonal descendent que passa per la fila `i` i columna `j`.

- Igualment, per la diagonal ascendent ↗:

    <img src='img/diagonals-desc.svg' style='height: 12em;'/>
    &nbsp; &nbsp; &nbsp;
    <img src='img/diagonals-asc.svg' style='height: 12em;'/>

---

# Implementació (1/2)

```python
def generar_reines(n: int) -> None:
    """Escriu totes les maneres de col·locar n reines en un tauler n⨉n."""

    s: SolParcial = [-1 for _ in range(n)]  # els valors són irrellevants, la llargada no.
    files = [False for _ in range(n)]  # marques de les files ocupades
    descendents = [False for _ in range(2 * n - 1)]  # marques de les diagonals descendents ocupades
    ascendents = [False for _ in range(2 * n - 1)]  # marques de les diagonals ascendents ocupades

    generar_reines_rec(n, s, 0, files, descendents, ascendents)
```

---

# Implementació (2/2)

```python
def generar_reines_rec(
    n: int, s: SolParcial, j: int,
    files: Marques, descendents: Marques, ascendents: Marques
) -> None:
    """
    Escriu totes les maneres de col·locar n reines en un tauler n⨉n
    de forma que les j primeres reines es col·loquen a les primeres j
    posicions de s. Aquestes primeres j posicions són una solució parcial legal
    i les marques indiquen les posicions ocupades.
    """

    if j == n:
        escriure_reines(s)
    else:
        for i in range(n):
            if not files[i] and not descendents[j - i + n - 1] and not ascendents[j + i]:
                s[j] = i
                files[i] = descendents[j - i + n - 1] = ascendents[j + i] = True
                generar_reines_rec(n, s, j + 1, files, descendents, ascendents)
                files[i] = descendents[j - i + n - 1] = ascendents[j + i] = False
```

---

class: center, middle

## Generació exhaustiva

# Sudokus

---

# Problema

Donat un sudoku (数独), volem trobar la seva solució.

<img src='img/1.inp.svg' style='height: 15em;'/>
&nbsp; &nbsp; &nbsp;
<img src='img/1.out.svg' style='height: 15em;'/>

---

# Entrada

```text
. . . . . 2 3 . 7
. . . . . 6 4 5 .
1 . . 9 3 . . . .
. . . . 6 1 8 . .
. 4 8 . . . 5 6 .
. . 6 4 2 . . . .
. . . . 7 5 . . 8
. 2 9 1 . . . . .
4 . 5 6 . . . . .
```

# Sortida

```text
9 6 4 8 5 2 3 1 7
3 8 2 7 1 6 4 5 9
1 5 7 9 3 4 2 8 6
7 9 3 5 6 1 8 2 4
2 4 8 3 9 7 5 6 1
5 1 6 4 2 8 7 9 3
6 3 1 2 7 5 9 4 8
8 2 9 1 4 3 6 7 5
4 7 5 6 8 9 1 3 2
```

---

# Programa principal

```python
def main() -> None:
    """Programa principal per resoldre un sudoku."""

    s: Sudoku = llegir()
    if resol(s):
        escriure(s)
    else:
        print('Sense solució')
```

---

# Tipus de dades

```python
@dataclass
class Sudoku:
    graella: list[list[int]]
    files: Usats
    columnes: Usats
    regions: Usats
```

```python
Usats: TypeAlias = list[list[bool]] # 9x10 (el 0 no s'utilitza)
```

Exemple:

```text
    9 . . . . 2 3 . 7
    3 . 2 . . 6 4 5 .
    1 5 7 9 3 . . . .
    . . . . 6 1 8 . .
    . 4 8 . . . 5 6 .
    . . 6 4 2 . . . .
    . . . . 7 5 . . 8
    . 2 9 1 . . . . .
    4 . 5 6 . . 1 3 2
```

- `files[0]` és `[·, False, True, True, False, False, False, True, False]`

- `columnes[8]` és `[·, False, True, False, False, False, True, True, False]`

- `regions[4]` és `[·, True, True, False, True, False, True, False, False]`.

---

# Funcions de suport

```python
def escriure(s: Sudoku) -> None:
    """Escriu el sudoku s amb el format establert."""

    for i in range(9):
        print(*s.graella[i])
```

```python
def llegir() -> Sudoku:
    """Llegeix un sudoku i el retorna."""

    s = buit()
    for i in range(9):
        for j in range(9):
            v = read(str)
            if v != ".":
                marcar_casella(s, i, j, int(v))
    return s
```

```python
def buit() -> Sudoku:
    """Retorn un sudoku buit."""

    graella = [[0 for _ in range(9)] for _ in range(9)]
    files = [[False for _ in range(10)] for _ in range(9)]
    columnes = [[False for _ in range(10)] for _ in range(9)]
    caixes = [[False for _ in range(10)] for _ in range(9)]
    return Sudoku(graella, files, columnes, caixes)
```

---

# Funcions de suport

```python
def marcar_casella(s: Sudoku, i: int, j: int, v: int):
    """Marca la casella i,j del sudoku s amb el valor v."""

    s.graella[i][j] = v
    s.files[i][v] = True
    s.columnes[j][v] = True
    s.caixes[regio(i, j)][v] = True
```

```python
def desmarcar_casella(s: Sudoku, i: int, j: int, v: int):
    """Desmarca la casella i,j del sudoku s."""

    s.graella[i][j] = 0
    s.files[i][v] = False
    s.columnes[j][v] = False
    s.caixes[regio(i, j)][v] = False
```

---

# Funcions de suport

```python
def regio(i: int, j: int) -> int:
    """Retorna l'índex de la regió on pertany la casella i,j."""

    return 3*(i//3) + j//3
```

```python
def seguent(i: int, j: int) -> Tuple[int, int]:
    """Retorna la següent posició a la graella."""

    if j == 8:
        return i + 1, 0
    return i, j + 1
```

---

# Solució recursiva

**Idea:** Anar resolent el sudoku per files, i per columnes dins de cada fila.

Funció principal:

```python
def resol(s: Sudoku) -> bool:
    """
    Resol el sudoku s i indica si s'ha trobat o no solució.
    En el cas afirmatiu, s conté la solució.
    """

    return resol_rec(s, 0, 0)
```

Especificació funció recursiva:

```python
def resol_rec(s: Sudoku, i: int, j: int) -> bool:
    """
    Resol el sudoku s recursivament sabent que és legal fins a la posició i,j
    (no inclosa). Indica si s'ha trobat o no solució.
    En el cas afirmatiu, s conté la solució.
    """
```

---

# Implementació

```python
def resol_rec(s: Sudoku, i: int, j: int) -> bool:
    """
    Resol el sudoku s recursivament sabent que és legal fins a la posició i,j
    (no inclosa). Indica si s'ha trobat o no solució.
    En el cas afirmatiu, s conté la solució.
    """

    if i == 9:
        return True

    si, sj = seguent(i, j)

    if s.graella[i][j] != 0:
        return resol_rec(s, si, sj)
    else:
        for v in range(1, 10):
            if legal(s, i, j, v):
                marcar_casella(s, i, j, v)
                if resol_rec(s, si, sj):
                    return True
                desmarcar_casella(s, i, j, v)
        return False
```

---

# Implementació

```python
def legal(s: Sudoku, i: int, j: int, v: int) -> bool:
    """Indica si és legal posar el valor v a la casella i,j de s."""

    return not s.files[i][v] and not s.columnes[j][v] and not s.caixes[regio(i, j)][v]
```

---

# Proves

...
