class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# LListes

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya


---

class: center, middle

## Llistes

# Introducció

---

# Què és una llista?

Una llista és estructura de dades que permet emmagatzemar moltes dades del mateix tipus en una sol paquet.

<center>
<img src="img/llista.png" style="height: 10em;">
</center>

Cada element de la col·lecció és accessible a través d'un **índex**.

  - L'índex és un enter que indica la posició, **començant per 0**.

  - Per a una llista de `n` elements, els índexs van de `0` a `n-1`.



Per exemple, si `v = [3, 5, -1, 7, 2]`, llavors `v[3]` és `7`.

---

# Sintaxi bàsica

Les llistes s'escriuen enumerant els seus elements entre claudàtors.

```python
>>> l1 = [1, 2, 3]
>>> l1
[1, 2, 3]

>>> l2 = [-3.4, 5.8, 2.0, 12.11]
>>> l2
[-3.4, 5.8, 2.0, 12.11]

>>> l3 = [False, False, True]
>>> l3
[False, False, True]
```

---

# Funcions predefinides

```python
# Llargada
>>> len([6, 3, 4, 6, 1])
5

# Mínim i Màxim
>>> min([6, 3, 4, 6, 1])
1
>>> max([3.14, 2.78, 0.0])
3.14

# Suma
>>> sum([3.14, 2.78, 0.0])
5.92

# Ordenar
>>> sorted([3.14, 2.78, 0.0])
[0.0, 2.78, 3.14]

# Invertir
>>> list(reversed([3.14, 2.78, 0.0]))
[0.0, 2.78, 3.14]
```

---

# Operadors

```python
# Concatenació (+)
>>> [1, 2, 3] + [4, 5, 6]
[1, 2, 3, 4, 5, 6]

# Repetició (*)
>>> 4 * [1, 2, 3]
[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]

# Relacions d'ordre (<, ==, !=, ...)
>>> [10, 20, 30] < [10, 40, 4]
True

# Pertinença (in, not in)
>>> "oca" in ["conill", "xai", "oca", "anec"]
True
>>> 6 not in [2, 5, 8]
True
```

---

# Accés als elements

S'accedeix a un element especificant el seu índex entre claudàtors.
```python
v = [11.5, -13.2, 4.6, 7.8]
print(v[2])         # escriu 4.6
if v[0] > 5:
    v[3] = 9.0      # modifica l'element a la posició 3
# la llista esdevé [11.5, -13.2, 4.6, 9.0]
```

<br>

Un accés a un índex invàlid provoca un error.

```python
noms = ["Mireia", "Marta", "Elvira", "Jana"]
noms[10] = "Jordi"              # 💥 la posició 10 no existeix
if noms[4] == "Carme": ...      # 💥 la posició  4 no existeix
```

<br>

Els índexs poden ser negatius (`-1` és el darrer element).


---

# Subllistes (*slices*)

Permeten crear noves llistes o modificar segments d'una llista existent.

- Les opcions són semblants al `range`.

- Com al `range`, el darrer índex és exclusiu.


Consultes:

```python
>>> xs = [30, 50, 10, 50, 60, 20, 50, 70]
>>> xs[2:6]
[10, 50, 60, 20]
>>> xs[:6]
[30, 50, 10, 50, 60, 20]
>>> xs[1:8:2]
[50, 50, 20, 70]
```

Modificacions:

```python
>>> L = [1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> L[2:5] = [33, 44, 55]
>>> L
[1, 2, 33, 44, 55, 6, 7, 8, 9]
```


---

# Afegir i treure elements

Mètodes per modificar la mida de la llista.

```python
>>> xs = [10, 20, 30]
>>> xs.append(40)     # Afegeix al final
>>> xs
[10, 20, 30, 40]
>>> ys = [60, 70, 80]
>>> xs.extend(ys)     # Afegeix una altra llista al final
>>> xs
[10, 20, 30, 40, 50, 60, 70, 80]
>>> del(xs[3])        # Esborra per posició (lent)
>>> xs
[10, 20, 30, 50, 60, 70, 80]
>>> xs.pop()          # Treu i retorna el darrer (ràpid)
80
>>> xs.clear()        # Buida la llista
>>> xs
[]
```

<br>

Afegir/treure pel final és eficient.

Fer-ho per altres posicions és lent, perquè cal desplaçar els elements.

---

# Recorregut d'una llista (lectura)

Per recórrer tots els elements, s'utilitza un bucle `for`.

```python
temperatures = [1.0, 12.5, 14.0, 10.1, -3.5]

for temperatura in temperatures:
    print(temperatura)
```

**Compte:** Assignar la variable sobre la qual s'itera no canvia la llista original:

```python
nombres = [3, 5, -2, 4]

for nombre in nombres:          #  👀 còpia
    nombre = nombre * 2

# nombres continua sent [3, 5, -2, 4] 😢
```

Per modificar els elements de la llista, cal iterar sobre els **índexs**.

```python
nombres = [3, 5, -2, 4]

for index in range(len(nombres)):
    nombres[index] = nombres[index] * 2

# nombres ara és [6, 10, -4, 8] 😃
```

---

# El tipus llista

  - En Python, les llistes són de tipus `list`.

  - És una bona pràctica que tots els elements d'una llista siguin del mateix tipus (llistes **homogènies**).

  - El sistema de tipus de Python utilitza la notació `list[T]`, on `T` és el tipus dels elements. Ex: `list[int]`, `list[str]`.

  - Cal anotar el tipus quan es crea una llista buida.

<br/>

```python
# No cal anotar, es dedueix
l1: list[int] = [40, 20, 34, 12, 40]

# Cal anotar, perquè la llista és buida
l2: list[float] = []

# Sintàxi alternativa (recomanada)
l3 = list[int]()
```

---

# Relació entre llistes i textos

El tipus `str` es comporta de forma similar a una llista de caràcters per a moltes operacions.

```python
>>> s = 'Blaumut'
>>> len(s)
7
>>> s * 2
'BlaumutBlaumut'
>>> s[0]
'B'
>>> s[4:]
'mut'
```

<br>

La diferència clau és que els textos són **immutables**: no es poden modificar els seus caràcters.

```python
>>> s[0] = 'C'
💣 TypeError: 'str' object does not support item assignment
```

---

# El mètode `split`

Trenca en bocins un text i retorna una llista amb els fragments.

```python
# Separar per espais en blanc
>>> 'és quan dormo que hi veig clar'.split()
['és', 'quan', 'dormo', 'que', 'hi', 'veig', 'clar']

# Separar per un caràcter específic
>>> '01/10/2017'.split('/')
['01', '10', '2017']
```

---

# Relació entre llistes i tuples

Llistes:
- mutables
- sovint homogènies (per convenció)
- moltes dades

Tuples:
- immutables
- sovint heterogènies (per representar registres)
- poques dades

Els elements de les llistes també es poden desempaquetar:

```python
>>> [a, b] = [1, 2]
>>> a
1
>>> b
2
```

---

# Resum d'operacions

|operació|significat|
|:---|:---|
|`[]`|crea una llista buida.|
|`[x1,x2,...]`|crea una llista amb elements `x1`, `x2`,...|
|`L1 + L2`|retorna la concatenació de la llista `L1` i la llista `L2`.|
|`L * n`|retorna la llista `L` repetida `n` cops.|
|`len(L)`|retorna el nombre d'elements de la llista `L`. |
|`sum(L)`|retorna la suma de tots els valors de la llista `L`.|
|`max(L)`|retorna el màxim de tots els valors de la llista `L`.|
|`min(L)`|retorna el mínim de tots els valors de la llista `L`.|
|`L[i]`| accedeix al valor de la posició `i` de llista `L`.|
|`L[i:j:p]`| retorna la subllista de `L` entre les posicions `i` i `j` amb pas `p`.|
|`x in L` o `x not in L`| diu si `x` és o no un element de la llista `L`.|
|`reversed(L)`|retorna la llista `L` del revés.|
|`sorted(L)`|retorna la llista `L` ordenada.|
|`L.clear()`|esborra tots els elements de la llista `L`.|
|`L.append(x)`|afegeix l'element `x` al final de la llista `L`.|
|`L1.extend(L2)`|afegeix la llista `L2` al final de la llista `L1`.|
|`L.pop()`|elimina i retorna el darrer element de la llista `L1`.|


---

class: center, middle

## Llistes

# Aplicacions

---

# Comptar iguals al darrer

**Problema**: Donada una seqüència de nombres, comptar quants són iguals al darrer.

**Idea**:

1.  Llegir tots els nombres i desar-los en una llista.
2.  Recórrer la llista i comparar cada element amb el darrer (`L[-1]`).

<!-- end list -->

```python
from yogi import *

# desar tota la seqüència en una llista
L = list[int]()
for x in tokens(int):
    L.append(x)

# comptar aparicions del darrer element
c = 0
for x in L:
    if x == L[-1]:
        c += 1
print(c)
```

---

# Comptar iguals al darrer

Estructurar el codi en funcions el fa més llegible i reutilitzable.

```python
from yogi import *

def llegir_llista() -> list[int]:
    """Retorna la llista de tots els enters de l'entrada."""
    L = list[int]()
    for x in tokens(int):
        L.append(x)
    return L

def ocurrencies(L: list[int], elem: int) -> int:
    """Retorna el nombre d'elements de L iguals a elem."""
    c = 0
    for x in L:
        if x == elem:
            c += 1
    return c

def main() -> None:
    L = llegir_llista()
    print(ocurrencies(L, L[-1]))

if __name__ == "__main__":
    main()
```

---

# Comptar iguals al darrer

Python sovint ofereix maneres més directes de fer les coses.

```python
from yogi import *

L = list(tokens(int))
print(L.count(L[-1]))
```

  - `list(tokens(int))`: Converteix directament l'entrada en una llista.

  - `L.count(x)`: Mètode de llista que compta les aparicions de `x`.

---

# És capicua?

Una llista és **capicua** (o palíndrom) si es llegeix igual del dret que del revés.

Ex: `[7, 5, 6, 5, 7]`

Implementació senzilla usant `reversed()`:

```python
def capicua(llista: list[int]) -> bool:
    """Indica si llista és capicua o no."""

    return llista == list(reversed(llista))
```

Més eficient: comparar els elements simètrics des dels extrems cap al centre, aturant-se a la primera diferència.

```python
def capicua(llista: list[int]) -> bool:
    """Indica si llista és capicua o no."""

    n = len(llista)
    for i in range(n // 2):
        if llista[i] != llista[n - i - 1]:
            return False
    return True
```

---

# Operacions amb vectors

Podem representar vectors matemàtics amb llistes de reals (`list[float]`).

El producte escalar de dos vectors $x=(x\_1,...,x\_n)$ i $y=(y\_1,...,y\_n)$ és $\sum\_{i=1}^{n} x_i y_i$:

```python
def producte_escalar(x: list[float], y: list[float]) -> float:
    """Retorna el producte escalar de dos vectors de la mateixa mida."""

    s = 0.0
    for i in range(len(x)):
        s += x[i] * y[i]
    return s
```

Compte: En Python, els índexs comencen en 0, no en 1.

---

# Operacions amb vectors

El mòdul d'un vector $x$ és $\sqrt{\sum_{i=1}^{n} x_i^2}$.

Això és equivalent a $\sqrt{x · x}$.

```python
import math

def modul(x: list[float]) -> float:
    """Retorna el mòdul d'un vector."""

    return math.sqrt(producte_escalar(x, x))
```

Reutilitzar codi és una bona pràctica!

---

# Operacions amb vectors

Dos vectors són perpendiculars si el seu producte escalar és zero.

```python
def perpendiculars(a: list[float], b: list[float]) -> bool:
    """Indica si dos vectors són o no perpendiculars."""

    return abs(producte_escalar(a, b)) < 1e-12
```

Quan es treballa amb reals (`float`), és més segur comprovar si el valor absolut del resultat és molt proper a zero, per evitar problemes de precisió.

---

# Cercar un subtext

**Problema**: Donats `text` i `subtext`, determinar si `text` conté `subtext`.

<br>

**Solució 1 (amb slices)**: Recórrer `text` i extreure subcadenes de la mateixa mida que `subtext` per comparar-les.

```python
def conte(text: str, subtext: str) -> bool:
    """Diu si text conté subtext."""

    n, m = len(text), len(subtext)
    for pos in range(n - m + 1):
        if text[pos : pos + m] == subtext:
            return True
    return False
```

---

# Cercar un subtext

**Solució 2 (més eficient)**: Evitar crear slices (que consumeixen memòria i temps) comparant caràcter a caràcter.

```python
def conte_a(text: str, subtext: str, pos: int) -> bool:
    """Diu si text conté subtext a la posició pos."""

    for i in range(len(subtext)):
        if subtext[i] != text[pos + i]:
            return False
    return True

def conte(text: str, subtext: str) -> bool:
    """Diu si text conté subtext."""

    n, m = len(text), len(subtext)
    for pos in range(n - m + 1):
        if conte_a(text, subtext, pos):
            return True
    return False
```


---

# Cercar un subtext

**Solució 3 (més eficient i simple)**:

```python
subtext in text
```


---

# Llistes per comprensió

Una manera concisa i expressiva de crear llistes, similar a la notació matemàtica de conjunts.

<br>

**Enfocament tradicional (amb bucle):**

```python
quadrats = list[int]()
for i in range(n):
    quadrats.append(i * i)
```

<br>

**Amb llista per comprensió:**

```python
quadrats = [i * i for i in range(n)]
```

---

# Llistes per comprensió amb condició

Es pot afegir una clàusula `if` per filtrar els elements que s'inclouen a la llista.

`[expressió for variable in seqüència if condició]`

<center>
<img src="img/esquema.png" style="height: 5em;">
</center>

**Exemple**: Quadrats de nombres entre 0 i 20 que acaben en 6.

```python
>>> [i * i for i in range(21) if i * i % 10 == 6]           # [16, 36, 196, 256]
```

Això és equivalent però més lleuger que:

```python
llista = []
for i in range(21):
    if i * i % 10 == 6:
        llista.append(i * i)
```

---

# Llistes per comprensió

**`for` aniuats**:

```python
# Sumes de dos daus
>>> sorted([dau1 + dau2 for dau1 in range(1, 7) for dau2 in range(1, 7)])
[2, 3, 3, 4, ..., 11, 11, 12]
```

<br>

**Llistes de tuples**:

```python
>>> [(a, b) for a in range(3) for b in 'gat']
[(0, 'g'), (0, 'a'), (0, 't'), (1, 'g'), (1, 'a'), (1, 't'), (2, 'g'), (2, 'a'), (2, 't')]
```

<br>

**Combinat amb `sum`**:

```python
def producte_escalar(x: list[float], y: list[float]) -> float:
    return sum([x[i] * y[i] for i in range(len(x))])
```

---

# Llistes per comprensió: ternes pitagòriques

Una terna pitagòrica són tres naturals $a$, $b$, $c$ tals que $a^2+b^2=c^2$.

```python
>>> n = 25  # llargada màxima

>>> [   (a, b, c)
...     for a in range(1, n + 1)
...     for b in range(a, n + 1)
...     for c in range(b, n + 1)
...     if a**2 + b**2 == c**2
... ]

# [(3, 4, 5), (5, 12, 13), (6, 8, 10), (7, 24, 25), (8, 15, 17), (9, 12, 15), (12, 16, 20), (15, 20, 25)]
```



---

class: center, middle

## Llistes

# Garbell d'Eratòstenes

---

# Trobar nombres primers

Es volen trobar tots els nombres primers fins a un valor `m`.

Exemple: per `m = 20`, la sortida ha de ser `[2, 3, 5, 7, 11, 13, 17, 19]`.

<br>


**Solució simple**:
Reutilitzar una funció `es_primer(n)` per a cada nombre.

```python
def primers(m: int) -> list[int]:
    """Donat un natural m, retorna la llista de tots els nombres primers de 0 a m."""

    return [n for n in range(m + 1) if es_primer(n)]
```

Inconvenient: és lent. Per `m = 1.000.000`, em triga uns 7 segons.

---

# El Garbell d'Eratòstenes: L'algorisme

La idea és eliminar (ratllar) els nombres compostos en lloc de comprovar la primalitat un per un.

1.  Crear una llista de nombres de 0 a `m`. Ratllar 0 i 1.

2.  El primer nombre no ratllat (el 2) és primer. Ratllar tots els seus múltiples.

3.  El següent nombre no ratllat (el 3) és primer. Ratllar tots els seus múltiples.

4.  Repetir el procés.

5.  Es pot aturar quan el primer trobat sigui més gran que $\sqrt{m}$.

Els nombres que queden sense ratllar són els primers.

**TODO:** Millorar aquesta transpa!

---

# Garbell d'Eratòstenes: Implementació

Primer, una funció que retorna una llista de booleans (`garbell`), on `garbell[i]` és `True` si `i` és primer.

```python
def eratostenes(m: int) -> list[bool]:
    """Retorna una llista de m+1 booleans tal que el valor a la posició i indica si i és o no és primer. Prec: m >= 2."""

    garbell = [False, False] + [True] * (m - 1)
    i = 2
    while i * i <= m:
        if garbell[i]:
            # Ratllem els múltiples de i
            for j in range(2 * i, m + 1, i):
                garbell[j] = False
        i += 1
    return garbell
```

---

# Garbell d'Eratòstenes: Implementació

Després, una funció `primers` que utilitza el garbell per construir la llista final de nombres primers.

```python
def primers(m: int) -> list[int]:
    """Donat un natural m, retorna la llista de tots els nombres primers de 0 a m."""

    if m <= 1:
        return []
    else:
        garbell = eratostenes(m)
        return [n for n in range(m + 1) if garbell[n]]
```

<br>

Per `m = 1.000.000`, ara triga només **0.36 segons**!

---

class: center, middle

## Llistes

# Referències

---

# Referències

  - En Python, les llistes són **objectes**.

  - Les variables no contenen la llista directament, sinó una **referència** (una "fletxa") a l'objecte llista.

    ```python
    L1 = [1, 2, 3, 4]
    L2 = L1
    ```

    <center>
    <img src="img/referencies1.png" style="height: 6em;">
    </center>


---

# Situació 1A: Tipus primitius

Per a tipus com `int`, `float`, `bool`, l'assignació (`=`) copia el **valor**.

La variable `b` té la seva pròpia còpia del valor `2` i no es veu afectada pel canvi a `a`.

<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=a%20%3D%202%0Ab%20%3D%20a%0Aa%20%3D%20a%20%2B%201%20%0Aprint%28a%29%0Aprint%28b%29%0A&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=nevernest&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>



---

# Situació 1B: Llistes (referències)

Per a llistes, l'assignació (`=`) copia la **referència**.

Les variables `a` i `b` apunten al **mateix objecte llista**.

<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=a%20%3D%20%5B3,%202,%201%5D%0Ab%20%3D%20a%0Aa.append%289%29%0Aprint%28a%29%0Aprint%28b%29&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=nevernest&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>


---

# Situació 1C: Copiar una llista

Per crear una còpia real i independent d'una llista, es pot utilitzar slicing `[:]`.

Ara `a` i `b` apunten a objectes diferents.

<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=a%20%3D%20%5B3,%202,%201%5D%0Ab%20%3D%20a%5B%3A%5D%0Aa.append%289%29%0Aprint%28a%29%0Aprint%28b%29&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=nevernest&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>



---

# Situació 2A: Funcions i tipus primitius

Quan es passa un tipus primitiu a una funció, es passa una **còpia del valor**.


La variable original `a` no canvia.

<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=def%20f%28x%3A%20int%29%20-%3E%20None%3A%0A%20%20%20%20x%20%3D%203%0A%0Aa%20%3D%202%0Af%28a%29%0Aprint%28a%29&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=nevernest&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>



---

# Situació 2B: Funcions i llistes

Quan es passa una llista a una funció, es passa una **còpia de la referència**.

El paràmetre `x` i la variable `a` apunten al mateix objecte. Si la funció **muta** l'objecte, el canvi és permanent.

<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=def%20f%28x%29%3A%0A%20%20%20%20x.append%289%29%0A%0Aa%20%3D%20%5B3,%202,%201%5D%0Af%28a%29%0Aprint%28a%29&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=nevernest&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>

---

# Resum sobre referències

  - **Mutació**: Canviar el contingut d'un objecte existent.

      - Ex: `L.append(x)`, `L[i] = y`, `L.clear()`.

      - Els canvis són visibles a través de totes les referències a l'objecte.

  - **Reassignació**: Canviar la referència que conté una variable per apuntar a un altre objecte (o a un de nou).

      - Ex: `L = [1, 2, 3]`, `L = L + L`.

      - Només afecta la variable local, no canvia l'objecte original al qual apuntava.

---

class: center, middle

## Llistes

# Tipus genèrics

---

# Problemàtica

Volem escriure una funció que funcioni amb llistes de diferents tipus sense duplicar codi.

```python
# Versió per a enters
def posicio_maxim_llista_enters(L: list[int]) -> int:
    ...

# Versió per a textos
def posicio_maxim_llista_textos(L: list[str]) -> int:
    ...
```

El codi intern és idèntic. La duplicació és una mala pràctica.

---

# El tipus `Any`

El mòdul `typing` proporciona `Any` per representar "qualsevol tipus".

```python
from typing import Any

def posicio_maxim(L: list[Any]) -> int:
    """
    Retorna una posició p tal que L[p] >= x per a tot x en L.
    Precondició: L no és buida.
    """

    p = 0
    for i in range(1, len(L) + 1):
        if L[i] > L[p]:
            p = i
    return p
```

Això fa que la funció sigui **genèrica**, acceptant llistes d'enters, reals, textos, etc.

---

# Variables de tipus

De vegades, `Any` és massa genèric. Per exemple, en una funció d'ordenació, volem expressar que el tipus de la llista de sortida és el **mateix** que el de la llista d'entrada.

```python
# Això no garanteix que el tipus de llista es preservi.
def ordena(L: list[Any]) -> list[Any]:
    ...
```

`ordena` podria, teòricament, rebre `list[int]` i retornar `list[str]`.

---

# Variables de tipus

`TypeVar` permet crear un "paràmetre de tipus" per enllaçar els tipus dins d'una signatura.

```python
from typing import TypeVar

# Creem una variable de tipus T
T = TypeVar('T')

# Ara podem dir que la funció rep una llista de T i retorna una llista de T
def ordena(L: list[T]) -> list[T]:
    ...
    x: T  # També podem usar T dins del cos de la funció
    ...
```

Amb `TypeVar`, si `ordena` rep una `list[int]`, el sistema sap que retorna una `list[int]`.