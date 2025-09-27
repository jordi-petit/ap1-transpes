class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# Conjunts i diccionaris

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya


---

# Conjunts

\<img src='./conjunts.png' style='height: 8em; float: right; margin: 2em 0 1em 1em;'/\>

  - Una col·lecció d’elements **sense repeticions**.

  - L'**ordre** dels elements **no és rellevant**.

  - Operacions principals: inserir, esborrar, pertinença.

  - Molt eficients per aquestes operacions.

---

# Creació de conjunts: Literals

  - Enumerant els seus elements entre claus `{}`.

  - Els elements repetits s'ignoren.

  - L'ordre és arbitrari.

<!-- end list -->

```python
>>> vocals = {'a', 'e', 'i', 'o', 'u'}
>>> vocals
{'a', 'o', 'i', 'e', 'u'}

>>> nombres = {10, 20, 10, 30, 10, 20, 40, 50}
>>> nombres
{50, 20, 40, 10, 30}
```

  - El conjunt buit es crea amb `set()`.

---

# Funcions predefinides

  - `len()`: Retorna el nombre d'elements (cardinal).

<!-- end list -->

```python
>>> len({8, 3, 4, 5, 1})
5
>>> len(set())      # set() és el conjunt buit
0
>>> len({66, 66})   # {66, 66} és el mateix que {66}
1
```

  - `min()`, `max()`, `sum()`: Retornen el mínim, màxim i la suma.

<!-- end list -->

```python
>>> min({8, 6, 3, 4, 6, 1})
1
>>> max({3.14, 2.78, 1.0})
3.14
>>> sum({3.14, 2.78, 1.0})
6.92
```

---

# Operadors de conjunts

  - Unió: `|`

  - Intersecció: `&`

  - Diferència: `-`

<!-- end list -->

```python
>>> {1, 2, 3} | {2, 3, 4}
{1, 2, 3, 4}

>>> {1, 2, 3} & {2, 3, 4}
{2, 3}

>>> {1, 2, 3} - {2, 3, 4}
{1}
```

---

# Operadors de relació i pertinença

  - `==`: Igualtat de conjunts.

  - `<=`: Subconjunt (`⊂`).

  - `>=`: Superconjunt.

<!-- end list -->

```python
>>> {1} == {1, 1}
True
>>> {1} <= {1, 2}
True
>>> {1} >= {1, 2}
False
```

  - `in` / `not in`: Comprova si un element pertany al conjunt.

<!-- end list -->

```python
>>> "oca" in {"conill", "xai", "oca", "anec"}
True
>>> "gos" not in {"conill", "xai", "oca", "anec"}
True
```

---

# Afegir i treure elements

  - `.add(x)`: Afegeix `x`. No fa res si ja hi és.

  - `.remove(x)`: Treu `x`. Dóna error si no hi és.

  - `.discard(x)`: Treu `x`. No fa res si no hi és.

  - `.pop()`: Elimina i retorna un element arbitrari.

<!-- end list -->

```python
>>> c = {10, 20, 30}
>>> c.add(40)
>>> c
{40, 10, 20, 30}
>>> c.remove(10)
>>> c
{40, 20, 30}
>>> c.remove(66)
KeyError: 66
>>> c.discard(66)
>>> c.pop()
40
```

---

# Recórrer un conjunt

  - S'utilitza un bucle `for`.

  - Es garanteix que es visiten tots els elements.

  - L'**ordre** en què es visiten és **indefinit**.

<!-- end list -->

```python
notes = {'do', 're', 'mi', 'fa', 'sol', 'la', 'si', 'do'}
for nota in notes:
    print(nota)
```

Resultat possible:

```text
la
sol
mi
fa
re
do
si
```

**Atenció**: No modifiqueu un conjunt mentre l'esteu recorrent.

---

# El tipus `set`

  - El tipus dels conjunts és `set`.

  - En el sistema de tipus, `set[T]` és un conjunt d'elements de tipus `T`.

  - Cal anotar el tipus en crear conjunts buits o en paràmetres de funcions.

<!-- end list -->

```python
# No cal anotar, es dedueix
c1: set[int] = {40, 20, 34, 12, 40}

# Cal anotar el tipus del conjunt buit
c2: set[float] = set()

# Cal anotar el tipus en paràmetres
def retorna_poder(jugador: str, daus: set[int]) -> float:
    ...
```

---

# Conversions

  - `set(iterable)`: Converteix un iterable (llista, rang, etc.) en un conjunt.

  - `list(conjunt)`: Converteix un conjunt en una llista (ordre arbitrari).

<!-- end list -->

```python
>>> set([10, 20, 10])
{10, 20}

>>> set(range(10))
{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

>>> set('do re mi fa sol la si do'.split())
{'mi', 'do', 'si', 'la', 'fa', 'sol', 're'}

>>> list({10, 20, 30, 40})
[40, 10, 20, 30]
```

---

# Conjunts per comprensió

  - Una forma concisa de crear conjunts.

  - S'utilitzen claus `{}` en lloc de claudàtors `[]`.

<!-- end list -->

```python
>>> {2**n for n in range(9)}
{32, 1, 2, 64, 4, 128, 256, 8, 16}

>>> {str(i) for i in {2,3,4,5,6} if i % 2 == 0}
{'4', '6', '2'}

>>> n = 20
>>> {(a, b, c) for a in range(1, n + 1) for b in range(a, n + 1) for c in range(b, n + 1) if a**2 + b**2 == c**2}
{(6, 8, 10), (3, 4, 5), (8, 15, 17), (9, 12, 15), (5, 12, 13), (12, 16, 20)}
```

---

# Els conjunts són objectes

  - Es manipulen a través de referències. L'assignació no crea una còpia.

<!-- end list -->

```python
>>> c1 = {1, 2, 3}
>>> c2 = c1
>>> c1.add(4)
>>> c1
{1, 2, 3, 4}
>>> c2
{1, 2, 3, 4}
```

  - Per crear una còpia independent, s'utilitza el mètode `.copy()`.

<!-- end list -->

```python
>>> c1 = {1, 2, 3}
>>> c2 = c1.copy()
>>> c1.add(4)
>>> c1
{1, 2, 3, 4}
>>> c2
{1, 2, 3}
```

---

# Exemple: Trobar paraules úniques

Objectiu: Llegir paraules i llistar les úniques que apareixen.

Solució: Utilitzar un conjunt per emmagatzemar les paraules.

```python
from yogi import tokens

paraules: set[str] = set()
for paraula in tokens(str):
    paraula = paraula.lower()
    paraules.add(paraula)

# Per imprimir-les ordenades
for paraula in sorted(paraules):
    print(paraula)
```

---

# Comparació d'eficiència

Comparació de la solució amb conjunts vs. llistes per al problema de les paraules úniques.

  - **Versió amb llistes**:

<!-- end list -->

```python
paraules: list[str] = []
for paraula in tokens(str):
    paraula = paraula.lower()
    if paraula not in paraules:
        paraules.append(paraula)
```

  - **Resultat de l'experiment (llibre Moby Dick)**:
      - Versió amb conjunts: **0,19 segons**.
      - Versió amb llistes: **12,18 segons**.

**Conclusió**: Els conjunts són molt més eficients per a cerques (`in`) i insercions.

---

# Exemple: Trobar l'element que falta

Objectiu: Donada una llista amb números de `0` a `n-1` (excepte un), trobar el que falta.
`quin_falta([3, 0, 2, 3, 0, 2], 4)` hauria de retornar `1`.

  - **Solució ineficient amb llistes**:

<!-- end list -->

```python
def quin_falta(L: list[int], n: int) -> int:
    for i in range(n):
        if i not in L: # Aquesta cerca és lenta
            return i
    assert False
```

---

# Trobar l'element que falta (solucions eficients)

  - **Solució 1: Eliminant elements del conjunt**

<!-- end list -->

```python
def quin_falta(L: list[int], n: int) -> int:
    s = set(range(n))
    for x in L:
        s.discard(x)
    assert len(s) == 1
    return s.pop()
```

  - **Solució 2: Amb diferència de conjunts**

<!-- end list -->

```python
def quin_falta(L: list[int], n: int) -> int:
    s = set(range(n)) - set(L)
    assert len(s) == 1
    return s.pop()
```

---

# Diccionaris

\<img src='./diccionaris.png' style='height: 8em; float: right; margin: 2em 0 1em 1em;'/\>

  - Col·lecció d'elements emmagatzemats com a parells **clau-valor**.

  - Les **claus** han de ser **úniques**.

  - Permeten una cerca, inserció i esborrat molt eficients a través de la clau.

  - Generalització de les llistes, on els índexs (claus) no han de ser enters consecutius.

---

# Creació de diccionaris: Literals

  - S'escriuen entre claus `{}` amb parells `clau: valor`.

<!-- end list -->

```python
>>> catala_angles = {'casa': 'house', 'gos': 'dog', 'gat': 'cat'}
>>> catala_angles
{'casa': 'house', 'gos': 'dog', 'gat': 'cat'}

>>> nombres = {1: 'un', 2: 'dos', 3: 'tres', 4: 'quatre'}
>>> nombres
{1: 'un', 2: 'dos', 3: 'tres', 4: 'quatre'}
```

  - El diccionari buit es crea amb `{}` o `dict()`.

---

# Manipulació de diccionaris

  - `len(d)`: Retorna el nombre de parells clau-valor.

  - `k in d`: Comprova si la clau `k` existeix al diccionari `d`.

<!-- end list -->

```python
>>> nombres = {1: 'un', 2: 'dos', 3: 'tres', 4: 'quatre'}
>>> 3 in nombres
True
>>> 'dos' in nombres # Cerca només en les claus
False
```

  - `d[k]`: Accedeix al valor associat a la clau `k`. Dóna `KeyError` si la clau no existeix.

  - `d[k] = v`: Assigna (o sobreescriu) el valor `v` a la clau `k`.

<!-- end list -->

```python
>>> nombres[2] = 'two'
>>> nombres
{1: 'un', 2: 'two', 3: 'tres', 4: 'quatre'}
>>> nombres[1000] = 'mil'
>>> nombres[1000]
'mil'
```

---

# Accés segur i esborrat

  - `d.get(k, x)`: Retorna `d[k]` si `k` existeix, altrament retorna el valor per defecte `x`.

<!-- end list -->

```python
>>> notes = {'do':'C', 're':'D', 'mi':'E'}
>>> print(notes.get('do', None))
C
>>> print(notes.get('ut', 'no hi és'))
'no hi és'
```

  - `del d[k]`: Esborra la clau `k` i el seu valor associat. Dóna `KeyError` si la clau no existeix.

<!-- end list -->

```python
>>> nombres = {1: 'un', 3: 'tres', 4: 'quatre'}
>>> del nombres[3]
>>> nombres
{1: 'un', 4: 'quatre'}
```

---

# Vistes: `keys`, `values` i `items`

  - `.keys()`: Retorna les claus del diccionari.

  - `.values()`: Retorna els valors del diccionari.

  - `.items()`: Retorna els parells (clau, valor) en forma de tuples.

<!-- end list -->

```python
>>> nombres = {1: 'un', 2: 'two', 3: 'tres'}
>>> nombres.keys()
dict_keys([1, 2, 3])

>>> nombres.values()
dict_values(['un', 'two', 'tres'])

>>> nombres.items()
dict_items([(1, 'un'), (2, 'two'), (3, 'tres')])
```

---

# Recórrer un diccionari

  - Es pot iterar sobre les claus, valors o ítems.

<!-- end list -->

```python
nombres = {1: 'un', 2: 'dos', 3: 'tres'}

# Recórrer claus
for k in nombres.keys():
    print(k)

# Recórrer valors
for v in nombres.values():
    print(v)

# Recórrer parells clau-valor
for k, v in nombres.items():
    print(k, v)
```

**Nota**: A partir de Python 3.6, l'ordre de recorregut és el d'inserció.

---

# El tipus `dict`

  - El tipus dels diccionaris és `dict`.

  - Al sistema de tipus, `dict[K, V]` és un diccionari amb claus de tipus `K` i valors de tipus `V`.

  - Cal anotar el tipus en crear diccionaris buits o en paràmetres de funcions.

<!-- end list -->

```python
# No cal anotar, es dedueix
d1: dict[int, int] = {1:1, 2:4}

# Cal anotar el tipus del diccionari buit
d2: dict[int, int] = {}

# Cal anotar el tipus en paràmetres
def pacient_amb_febra_mes_alta(dict[str, float]) -> str:
    ...
```

---

# Diccionaris per comprensió

  - Una forma concisa de crear diccionaris.

  - La sintaxi és `{clau: valor for ...}`.

<!-- end list -->

```python
>>> {n : n * n for n in range(10) if n % 2 == 0}
{0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

>>> nombres = {1: 'un', 2: 'dos', 3: 'tres'}
>>> {k : v.upper() for k, v in nombres.items()}
{1: 'UN', 2: 'DOS', 3: 'TRES'}
```

---

# Els diccionaris són objectes

  - Es manipulen a través de referències.

<!-- end list -->

```python
>>> d1 = {1:1, 2:2}
>>> d2 = d1
>>> d1[3] = 3
>>> d2
{1: 1, 2: 2, 3: 3}
```

  - Per fer una còpia independent, s'utilitza `.copy()`.

<!-- end list -->

```python
>>> d1 = {1:1, 2:2}
>>> d2 = d1.copy()
>>> d1[3] = 3
>>> d1
{1: 1, 2: 2, 3: 3}
>>> d2
{1: 1, 2: 2}
```

**Atenció**: `.copy()` fa una còpia superficial (les referències als objectes interns es mantenen).

---

# Exemple: Comptar paraules

Objectiu: Comptar les ocurrències de cada paraula en un text.

Solució: Un diccionari on les claus són les paraules i els valors són els seus comptadors.

```python
from yogi import tokens

# Crear el diccionari buit
ocurrencies: dict[str, int] = {}

# Llegir cada paraula i actualitzar el comptador
for paraula in tokens(str):
    paraula = paraula.lower()
    if paraula not in ocurrencies:
        ocurrencies[paraula] = 1
    else:
        ocurrencies[paraula] += 1

# Recórrer els elements per escriure'ls ordenats per paraula
for paraula, comptador in sorted(ocurrencies.items()):
    print(paraula, comptador)
```

---

# Exemple: Indexació de documents

Objectiu: Donada una paraula, trobar eficientment tots els documents que la contenen.

Solució: Construir un **índex**.

  - L'índex serà un diccionari.
  - **Claus**: Les paraules.
  - **Valors**: Un conjunt amb els identificadors dels documents que contenen la paraula.

<!-- end list -->

```python
from typing import TypeAlias

Document: TypeAlias = str
Index: TypeAlias = dict[str, set[Document]]
```

---

# Construcció de l'índex

Es llegeixen tots els documents i es construeix l'índex.

```python
def construir_index() -> Index:
    index: Index = {}
    for doc in tokens(str):
        n = read(int)
        for _ in range(n):
            par = read(str)
            if par in index:
                index[par].add(doc)
            else:
                index[par] = {doc}
    return index
```

---

# Consulta de l'índex

Un cop construït l'índex, la cerca és molt ràpida.

```python
def escriure_documents(index: Index, par: str) -> None:
    if par in index:
        print(f'La paraula {par} apareix en aquests documents:')
        for doc in index[par]:
            print(doc)
    else:
        print(f'La paraula {par} no apareix en cap document.')
```