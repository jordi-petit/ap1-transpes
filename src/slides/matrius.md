class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# Matrius

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya


---

# Matrius

<img src='./img/matrius/matrius.png' style='height: 8em; '>

  * Una matriu és una estructura de dades bidimensional (files i columnes).

  * En Python, les matrius són **llistes de llistes**.

  * Tenen aplicacions en matemàtiques, taulers de jocs, mapes, patrons, etc.

---

# Matrius en Python

  * La llista "exterior" representa les files.

  * Les llistes "interiors" representen els valors de cada fila.

  ```python
  m = [
      [ 3,  5, -1,  7,  2],
      [ 7,  1, -1, 17,  6],
      [ 6,  1,  3,  1, 12],
      [21,  0, -7,  4,  2]
  ]
  ```

  * Per accedir a l'element a la fila `i` i columna `j`: `m[i][j]`

      * `m[2][3]` retorna `1`.

  * Obtenir una columna no és directe: `[fila[j] for fila in m]`

---

# Tipus de les matrius

* Si els elements de la matriu són de tipus `T`, el tipus de la matriu és:

  ```python
  list[list[T]]
  ```

* Per exemple, per a aplicacions matemàtiques:

  ```python
  list[list[float]]
  ```



---

# Creació de matrius

Directament:

```python
m = [
    [ 3,  5, -1,  7,  2],
    [ 7,  1, -1, 17,  6],
    [ 6,  1,  3,  1, 12],
    [21,  0, -7,  4,  2], # La coma final és opcional
]
```

Amb comprensions:

  * Crear una matriu de `m ✕ n` zeros:

  ```python
  zeros = [[0 for _ in range(n)] for _ in range(m)]
  ```

  * Crear una matriu on cada element és la seva posició `(i, j)`:

  ```python
  posicions = [[(i, j) for j in range(n)] for i in range(m)]
  ```


---

# Matrius de més dimensions

<img src='./img/matrius/matriu3d.png' style='height: 8em'/>

  * Es poden crear niuant més llistes.

  * Per exemple, una matriu tridimensional de `m ✕ n ✕ r` zeros:

  ```python
  matriu_3d = [[[0.0 for k in range(r)] for j in range(n)] for i in range(m)]
  ```

---

# Declaracions de tipus amb `TypeAlias`

  * S'utilitza `TypeAlias` per donar noms més llegibles a tipus complexos.

  ```python
  from typing import TypeAlias

  Temperatures: TypeAlias = list[float]
  Registre: TypeAlias = list[Temperatures]

  registre: Registre = [[0.0 for h in range(24)] for d in range(365)]
  ```

  * Facilita la comprensió del codi:

  ```python
  def temperatura_mitjana(temperatures: Temperatures) -> float:
      ...
  ```

---

# Mides de les matrius

  * `len(mat)` retorna el **nombre de files**.

  * `len(mat[0])` retorna el **nombre de columnes** (de la primera fila).

  * El nombre total d'elements és `len(mat) * len(mat[0])`.

```python
>>> mat = [
    [ 3,  5, -1,  7,  2],
    [ 7,  1, -1, 17,  6],
    [ 6,  1,  3,  1, 12],
    [21,  0, -7,  4,  2],
]
>>> len(mat)
4
>>> len(mat[0])
5
>>> len(mat) * len(mat[0])
20
```

---

class: center, middle

## Matrius

# Operacions matemàtiques sobre matrius

---

# Tipus de dades

Definim àlies per als tipus de fila i matriu:

```python
from typing import TypeAlias

Fila: TypeAlias = list[float]
Matriu: TypeAlias = list[Fila]
```

---

# Suma de matrius


* Les dues matrius han de tenir les mateixes dimensions.

* La suma es realitza element a element.

<img src='img/matrius/suma-matrius.png' style='height: 9em'\>

```python
def suma(A: Matriu, B: Matriu) -> Matriu:
    """
    Retorna la suma de A i B.
    Prec: A i B són dues matrius m ⨉ n, amb m > 0.
    """

    m = len(A)
    n = len(A[0])
    return [[A[i][j] + B[i][j] for j in range(n)] for i in range(m)]
```

---

# Màxima suma de les files


Volem trobar el valor màxim entre les sumes de totes les files:

<img src='img/matrius/suma-fila.png' style='height: 10em;'/>

Es pot fer de forma concisa amb `max` i `sum`:

```python
def maxima_suma_fila(M: Matriu) -> float:
    """Retorna el màxim de les sumes de les files d'una matriu no buida M."""

    return max([sum(fila) for fila in M])
```

---

# Transposar una matriu (Acció)

<img src='img/matrius/transposa.png' style='height: 9em;'/>

Una **acció** modifica la matriu original (in-place).

S'intercanvien els elements `M[i][j]` i `M[j][i]`.

```python
def transposar(M: Matriu) -> None:
    """Transposa la matriu quadrada M."""

    n = len(M)
    for i in range(n):
        for j in range(i + 1, n):
            M[i][j], M[j][i] = M[j][i], M[i][j]
```

---

# Transposar una matriu (Funció)

Una **funció** retorna una nova matriu sense modificar l'original.

```python
def transposta(M: Matriu) -> Matriu:
    """Retorna la transposta de la matriu quadrada M."""

    n = len(M)
    return [[M[j][i] for j in range(n)] for i in range(n)]
```

---

# Comprovar si una matriu és simètrica

Una matriu és simètrica si `M[i][j] == M[j][i]` per a tots els `i, j`.

<img src='img/matrius/matriu_simetrica.png' style='height: 9em;'/>

Només cal comprovar la meitat de la matriu.

```python
def es_simetrica(M: Matriu) -> bool:
    """Indica si la matriu quadrada M és o no simètrica."""

    n = len(M)
    for i in range(n):
        for j in range(i + 1):
            if M[i][j] != M[j][i]:
                return False
    return True
```

---

# Producte de matrius

<img src='img/matrius/producte-matrius.png' style='height: 9em;'/>

Si $A$ és $m \times n$ i $B$ és $n \times p$, el producte $C=AB$ és $m \times p$.

L'element $c\_{ij}$ es calcula com:

  $$c\_{ij} = \sum\_{k=1}^n a\_{ik}b\_{kj}$$

---

# Producte de matrius

```python
def producte(A: Matriu, B: Matriu) -> Matriu:
    """
    Retorna el producte de A i B:
    Prec: A i B tenen mides compatibles per ser multiplicades.
    """

    m = len(A)
    n = len(B)
    p = len(B[0])
    return [
        [
            sum([A[i][k] * B[k][j] for k in range(n)])
            for j in range(p)
        ]
        for i in range(m)
    ]
```


---

class: center, middle

## Matrius

# Quadrats màgics

---

# Quadrats màgics

<img src='img/matrius/quadrat-magic.png' style='height: 8em; '/>

Un quadrat de $n \times n$ és **màgic** si:

    1.  Conté tots els nombres de 1 a $n^2$ exactament un cop.

    2.  Totes les files, columnes i les dues diagonals sumen el mateix valor.

---

# Problema P99555

**Entrada**: Una seqüència de quadrats, cadascun començant amb la seva mida `n`.

```text
3
1 6 8
5 7 3
9 2 4
4
4 5 16 9
14 11 2 7
1 8 13 12
15 10 3 6
```

**Sortida**: `yes` si és màgic, `no` si no ho és.

```text
no
yes
```

---

# Estructura del Programa Principal

Definim un tipus `Quadrat`.

El programa principal llegeix cada quadrat i crida una funció per verificar si és màgic.

```python
from typing import TypeAlias
from yogi import read, tokens

Quadrat: TypeAlias = list[list[int]]

def main() -> None:
    for n in tokens(int):
        q = [[read(int) for _ in range(n)] for _ in range(n)]
        print('yes' if es_quadrat_magic(q) else 'no')
```

---

# Funció `es_quadrat_magic`

Aquesta funció comprova les dues condicions d'un quadrat màgic.

La podem descompondre en dues funcions auxiliars.

```python
def es_quadrat_magic(q: Quadrat) -> bool:
    """Indica si q és un quadrat màgic o no."""

    return bons_valors(q) and sumes_iguals(q)
```

---

# Funció `bons_valors`

Comprova dues coses:

1.  Tots els valors estan en el rang $[1, n^2]$.

2.  No hi ha elements repetits (s'utilitza una llista de booleans `vistos`).

```python
def bons_valors(q: Quadrat) -> bool:
    n = len(q)
    # comprovar rang
    for i in range(n):
        for j in range(n):
            if not 1 <= q[i][j] <= n*n:
                return False
    # comprovar repeticions
    vistos = [False for i in range(n * n + 1)]
    for i in range(n):
        for j in range(n):
            x = q[i][j]
            if vistos[x]:
                return False
            vistos[x] = True
    return True
```

---

# Funció `sumes_iguals`

Calcula la suma de la primera diagonal (`suma`).

Comprova que la suma de la segona diagonal, cada fila i cada columna sigui igual a `suma`.

```python
def sumes_iguals(q: Quadrat) -> bool:
    n = len(q)
    suma = sum([q[i][i] for i in range(n)]) # 1a diagonal

    # 2a diagonal
    if suma != sum([q[n - i - 1][i] for i in range(n)]):
        return False
    # files
    for i in range(n):
        if suma != sum(q[i]):
            return False
    # columnes
    for j in range(n):
        if suma != sum([q[i][j] for i in range(n)]):
            return False

    return True
```

---

# Funcions `all` i `any`

  * `all(llista_booleans)`: retorna `True` si tots els elements són `True`.

  * `any(llista_booleans)`: retorna `True` si algun element és `True`.

  * Són útils amb llistes per comprensió per fer comprovacions més concises.

  * Exemple: comprovar si alguna suma de fila és diferent de `suma`.

```python
if any([sum(fila) != suma for fila in q]):
    return False
```


---

class: center, middle

## Matrius

# Referències i llistes de llistes

---


# Referències i llistes de llistes

<img src='img/matrius/referencies.png' style='height: 8em;'/>

  * Les matrius (llistes de llistes) es manipulen a través de referències.

  * Això pot portar a comportaments inesperats si no es té cura.

  * Passa exactament igual que amb les llistes normals, però en dues dimensions.

---

# *Aliasing*

  * Què imprimirà aquest codi?

  ```python
  fila = [0, 0, 0]
  matriu = [fila, fila, fila]
  matriu[0][0] = 9
  print(matriu)
  ```

  * **Resultat esperat:** `[[9, 0, 0], [0, 0, 0], [0, 0, 0]]`

  * **Resultat real:** `[[9, 0, 0], [9, 0, 0], [9, 0, 0]]` 😵‍💫

  * **Raó**: Les tres files de `matriu` són una **referència a la mateixa llista** `fila`.

---

# *Aliasing*

<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=fila%20%3D%20%5B0,%200,%200%5D%0Amatriu%20%3D%20%5Bfila,%20fila,%20fila%5D%0Amatriu%5B0%5D%5B0%5D%20%3D%209%0Aprint%28matriu%29&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=nevernest&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>


---


# Solucions (dolentes) a l'*aliasing*

Aquestes opcions **NO** funcionen perquè repliquen les referències, no creen noves llistes per a cada fila.

  * **Opció 1:** `matriu = [fila] * 3`

      * L'operador `*` copia les referències.

  * **Opció 2:** `matriu = [fila for _ in range(3)]`

      * La comprensió de llistes també copia la referència a `fila`.

---

# Solucions (bones) a l'*aliasing*

Aquestes opcions **SÍ** funcionen perquè creen llistes independents per a cada fila.

  * **Opció 1:** Creant còpies de la fila amb `[:]`

  ```python
  matriu = [fila[:] for _ in range(3)]
  ```

  * **Opció 2:** Creant una nova llista a cada iteració

  ```python
  matriu = [[0, 0, 0] for _ in range(3)]
  ```

---

# Exercici: Copiar una Matriu

Donada una matriu `m`, quina de les següents instruccions crea una còpia **completa** i **independent** a `m2`?

```python
m = [
    [1, 2, 3, 4],
    [9, 8, 7, 6]
]
```

  * `m2 = m`
  * `m2 = m[:]`
  * `m2 = [fila for fila in m]`
  * `m2 = [fila[:] for fila in m]`
  * `m2 = [[e for e in f] for f in m]`

---

# Matrius com a paràmetres

  * El pas de paràmetres és per referència (com una assignació).

  * Les funcions poden modificar la matriu original.

  * Reassignar el paràmetre (`matriu = ...`) trenca la connexió amb la variable original.

---

# Acció vs. Funció

**Acció**: Modifica la matriu. Sol ser més eficient (no crea duplicats).

  * S'acostuma a anomenar amb un verb (infinitiu o imperatiu).

  ```python
  def transposar(M: Matriu) -> None:
      n = len(M)
      for i in range(n):
          for j in range(i + 1, n):
              M[i][j], M[j][i] = M[j][i], M[i][j]
  ```

**Funció**: Retorna un nou resultat sense canviar l'original. Més segura.

  * S'acostuma a anomenar amb un substantiu.

  ```python
  def transposta(matriu: Matriu) -> Matriu:
      """Retorna la transposta d'una matriu quadrada donada."""
      n = len(matriu)
      return [[matriu[j][i] for j in range(n)] for i in range(n)]
  ```

---

# Sumari

  * Les llistes de llistes són referències a llistes de referències.

  * Això permet compartir dades fàcilment, la qual cosa pot ser útil (accions) o perillosa (aliasing).

  * Per evitar compartir dades i crear còpies independents, utilitzeu:

      * Llistes per comprensió que generin nous objectes a cada iteració.
      * Llesques (`[:]`) per copiar llistes.