class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# Cerca i ordenació

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya


---

# Cerca i Ordenació en Python

---

# El Problema de la Cerca

  * Donada una llista i un valor, determinar si el valor és a la llista.

  * **Versió estesa**: Retornar la posició de l'element si hi és, o `None` si no hi és.

<!-- end list -->

```python
from typing import TypeVar, Optional

T = TypeVar('T')

def cerca(L: list[T], x: T) -> Optional[int]:
    """
    Si x ∈ L, retorna una posició p tal que L[p] == x.
    Si x ∉ L, retorna None.
    """
```

---

# Cerca Lineal

  * Es recorre la llista element a element i es compara amb el valor buscat.

  * Si es troba, es retorna la posició.

  * Si s'acaba la llista, es retorna `None`.

<!-- end list -->

```python
def cerca(L: list[T], x: T) -> Optional[int]:
    """
    Si x ∈ L, retorna una posició p tal que L[p] == x.
    Si x ∉ L, retorna None.
    """
    for i in range(len(L)):
        if L[i] == x:
            return i
    return None
```

---

# Cerca Lineal: Eficiència

  * Cost: $O(n)$, on $n$ és la llargada de la llista.

  * El cas pitjor és quan l'element no hi és (cal recórrer tota la llista).

  * Si la mida de la llista es dobla, el temps de cerca (en el cas pitjor) també es dobla.

---

# Cerca Binària (Dicotòmica)

  * **Precondició**: La llista ha d'estar **ordenada**.

  * Idea:

      * Compara l'element del mig amb el valor buscat.
      * Si és igual, ja l'hem trobat.
      * Si és més petit, busquem a la meitat dreta.
      * Si és més gran, busquem a la meitat esquerra.

  * A cada pas, descartem la meitat dels elements restants.

---

# Cerca Binària: Implementació Iterativa

```python
def cerca_binaria(L: list[T], x: T) -> Optional[int]:
    """
    Precondició: L és una llista ordenada creixentment.
    """
    esq, dre = 0, len(L) - 1
    while esq <= dre:
        mig = (esq + dre) // 2
        if L[mig] < x:
            esq = mig + 1
        elif L[mig] > x:
            dre = mig - 1
        else:  # L[mig] == x
            return mig
    return None
```

---

# Cerca Binària: Implementació Recursiva

```python
def cerca_binaria(L: list[T], x: T) -> Optional[int]:
    return cerca_binaria_rec(L, x, 0, len(L) - 1)


def cerca_binaria_rec(L: list[T], x: T, esq: int, dre: int) -> Optional[int]:
    if esq > dre:
        return None
    else:
        mig = (esq + dre) // 2
        if L[mig] < x:
            return cerca_binaria_rec(L, x, mig + 1, dre)
        elif L[mig] > x:
            return cerca_binaria_rec(L, x, esq, mig - 1)
        else:  # L[mig] == x
            return mig
```

---

# Cerca Binària: Eficiència

  * Cost: $O(\log n)$.

  * Per una llista d'un milió d'elements:

      * Cerca lineal: \~1.000.000 de passos.
      * Cerca binària: \~20 passos (`log₂ 1.000.000 ≈ 19.9`).

---

# El Problema de l'Ordenació

  * Consisteix a reordenar els elements d'una llista perquè quedin en ordre creixent.

<!-- end list -->

```python
from typing import Any

def ordena(L: list[Any]) -> None:
    """Ordena la llista L en ordre creixent."""
```

  * Exemple:
      * `[40, 53, 40, 10, 22]`
      * després d'ordenar: `[10, 22, 40, 40, 53]`

---

# Ordenació per Selecció: Idea

  * Per a cada posició `i` de la llista (començant per `0`):

    1.  Trobar l'element més petit a la subllista `L[i:]`.
    2.  Intercanviar aquest element amb l'element de la posició `i`.

  * Després de cada pas, la part esquerra de la llista (`L[:i+1]`) conté els elements més petits i està ordenada.

---

# Ordenació per Selecció: Exemple

|`i`|`L`|
|-|---|
|0|`4  3  7  8  2  5  1  9`|
|1|`1  3  7  8  2  5  4  9`|
|2|`1  2  7  8  3  5  4  9`|
|3|`1  2  3  8  7  5  4  9`|
|4|`1  2  3  4  7  5  8  9`|
|5|`1  2  3  4  5  7  8  9`|
|6|`1  2  3  4  5  7  8  9`|
|7|`1  2  3  4  5  7  8  9`|

---

# Ordenació per Selecció: Implementació

```python
def posicio_minim(L: list[Any], i: int) -> int:
    """Retorna la posició de l'element més petit de L[i:]."""
    p = i
    for j in range(i + 1, len(L)):
        if L[j] < L[p]:
            p = j
    return p

def ordena_per_seleccio(L: list[Any]) -> None:
    """Ordena la llista L en ordre creixent."""
    n = len(L)
    for i in range(n - 1):
        p = posicio_minim(L, i)
        L[i], L[p] = L[p], L[i]
```

---

# Ordenació per Selecció: Eficiència

  * Cost: $O(n^2)$.
    $$T(n) = \sum_{i=1}^{n-1} \sum_{j=i+1}^n \text{O}(1) = \text{O}(n^2)$$

  * El temps d'execució no depèn de si la llista està quasi ordenada o no.

  * Si la mida de la llista es dobla, el temps es quadruplica.

---

# Ordenació per Inserció: Idea

  * Es processa la llista d'esquerra a dreta.

  * S'assumeix que la subllista `L[:i]` ja està ordenada.

  * S'agafa l'element `L[i]` i s'insereix en la seva posició correcta dins de `L[:i]`, desplaçant els altres elements si cal.

  * És similar a com molta gent ordena una mà de cartes.

---

# Ordenació per Inserció: Implementació

```python
def ordena_per_insercio(L: list[T]) -> None:
    """Ordena la llista L en ordre creixent."""
    n = len(L)
    for i in range(1, n):
        # Insereix L[i] a la part ordenada L[:i]
        x = L[i]
        j = i
        while j > 0 and L[j - 1] > x:
            L[j] = L[j - 1]
            j -= 1
        L[j] = x
```

---

# Ordenació per Inserció: Eficiència

| Cas        | Cost         | Descripció                      |
|--------|----------|---------------------|
| **Pitjor** | $O(n^2)$     | La llista està ordenada a la inversa. |
| **Mig** | $O(n^2)$     | Llista amb elements aleatoris.    |
| **Millor** | $O(n)$       | La llista ja està ordenada.       |

  * Molt eficient per a llistes que ja estan **quasi ordenades**.

---

# Selecció vs. Inserció (Cas Aleatori)

  * En el cas mig (elements aleatoris), ambdós són $O(n^2)$, però selecció sol ser una mica més ràpid.

---

# Selecció vs. Inserció (Cas Quasi Ordenat)

  * Per llistes quasi ordenades, inserció ($O(n)$) és molt superior a selecció ($O(n^2)$).

---

# Ordenació per Fusió (Merge Sort): Idea

  * És un algorisme recursiu basat en la tècnica "Divideix i Venceràs" (*Divide and Conquer*).

  * **Divideix**: Parteix la llista en dues meitats.

  * **Vença**: Ordena recursivament cada meitat.

  * **Combina**: Fusiona (*merge*) les dues meitats ja ordenades per obtenir la llista final ordenada.

---

# Ordenació per Fusió: Visualització

\<img src='./mergesort1.png' style='height: 46ex; margin-top: 2ex;'/\>

---

# Ordenació per Fusió: Exemple Detallat

\<img src='./mergesort2.png' style='height: 40ex; margin-top: 2ex;'/\>

---

# Ordenació per Fusió: Implementació

```python
def ordena(L: list[Any]) -> None:
    ordena_per_fusio_rec(L, 0, len(L) - 1)

def ordena_per_fusio_rec(L: list[Any], esq: int, dre: int) -> None:
    if esq < dre:
        mig = (esq + dre) // 2
        ordena_per_fusio_rec(L, esq, mig)
        ordena_per_fusio_rec(L, mig + 1, dre)
        fusiona(L, esq, mig, dre)

def fusiona(L: list[int], esq: int, mig: int, dre: int) -> None:
    R = []
    i, j = esq, mig + 1
    while i <= mig and j <= dre:
        if L[i] <= L[j]:
            R.append(L[i]); i += 1
        else:
            R.append(L[j]); j += 1
    R.extend(L[i:mig + 1])
    R.extend(L[j:dre + 1])
    L[esq:dre + 1] = R
```

---

# Ordenació per Fusió: Eficiència

  * Cost: $O(n \log n)$ en tots els casos (pitjor, mig i millor).

  * La recurrència del temps és: $T(n) = 2T(n/2) + O(n)$.

\<img src='./mergesort3.png' style='height: 24ex; margin-top: 2ex;'/\>

---

# Comparativa de Costos: $O(n^2)$ vs $O(n \log n)$

  * L'ordenació per fusió és significativament més ràpida per a llistes grans.

---

# Ordenació per Fusió: Inconvenients

  * **Memòria addicional**: Necessita una llista auxiliar de la mateixa mida que la llista original per realitzar la fusió.

  * Pot ser un problema si es treballa amb conjunts de dades molt grans i memòria limitada.

---

# Ordenació amb Funcions Predefinides

  * Python ofereix mètodes d'ordenació altament optimitzats.

  * En la majoria dels casos, és la millor opció.

  * Implementen algorismes eficients com *Timsort* (una barreja d'Inserció i Fusió).

---

# `sorted()` vs `.sort()`

  * **`sorted(L)`**: Funció que retorna una **nova** llista ordenada. La llista original no canvia.

  * **`L.sort()`**: Mètode que ordena la llista **in situ** (*in-place*). No retorna res (`None`).

<!-- end list -->

```python
>>> L = [6, -2, 4, -3, 2, 4, 6, 9, 1]
>>> sorted(L)
[-3, -2, 1, 2, 4, 4, 6, 6, 9]
>>> L
[6, -2, 4, -3, 2, 4, 6, 9, 1]
>>> L.sort()
>>> L
[-3, -2, 1, 2, 4, 4, 6, 6, 9]
```

---

# Ordenació Decreixent

  * S'utilitza el paràmetre `reverse=True`.

<!-- end list -->

```python
>>> L = [6, -2, 4, -3, 2, 4, 6, 9, 1]
>>> sorted(L, reverse=True)
[9, 6, 6, 4, 4, 2, 1, -2, -3]
```

---

# Ordenació per Clau (`key`)

  * El paràmetre `key` especifica una funció que s'aplica a cada element abans de comparar-lo.

  * **Exemple 1: Ordenar per valor absolut**

<!-- end list -->

```python
>>> L = [6, -2, 4, -3, 2, 4, 6, 9, 1]
>>> sorted(L, key=abs)
[1, -2, 2, -3, 4, 4, 6, 6, 9]
```

  * **Exemple 2: Ordenar punts per distància a l'origen**

<!-- end list -->

```python
def dist2(p: tuple[float, float]) -> float:
    return p[0]*p[0] + p[1]*p[1]

>>> L = [(7, 2), (5, 1), (1,1), (0, 0), (10, 2)]
>>> sorted(L, key=dist2)
[(0, 0), (1, 1), (5, 1), (7, 2), (10, 2)]
```

---

# Ordenació de Textos

  * Per defecte, l'ordenació distingeix entre majúscules i minúscules (`'Z' < 'a'`).

  * **Solució: `key=str.lower`**

<!-- end list -->

```python
>>> L = 'La Rosa porta la rosa'.split()
>>> sorted(L, key=str.lower)
['La', 'la', 'porta', 'Rosa', 'rosa']
```

  * **Problema: Accents i caràcters especials**

<!-- end list -->

```python
>>> sorted('Àgata Abel Èric Enric'.split())
['Abel', 'Enric', 'Àgata', 'Èric']
```

  * **Solució: `locale.strxfrm`**

<!-- end list -->

```python
import locale
# locale.setlocale(locale.LC_COLLATE, 'ca_ES.UTF-8')
>>> sorted('Àgata Abel Èric Enric'.split(), key=locale.strxfrm)
['Abel', 'Àgata', 'Enric', 'Èric']
```