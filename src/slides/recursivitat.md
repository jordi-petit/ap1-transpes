Aquí teniu el contingut del capítol transformat en unes transparències en format Markdown, ideals per a una presentació de classe.

---

# Recursivitat

\<img src='././recursivitat.png' style='height: 8em; float: right; margin: 1em 0;'/\>

Una funció o acció que realitza una tasca repetitiva **invocant-se a si mateixa**.

  - Redueix un problema complex en problemes més senzills del mateix tipus.
  - És una alternativa als bucles.

---

## 1\. Factorial Recursiu

Recordem la definició de factorial: $n\! = 1 · 2 ·\\ldots· n$.

### Versió Iterativa

```python
def factorial_iteratiu(n: int) -> int:
    """Retorna el factorial d'un natural n."""
    f = 1
    for i in range(2, n + 1):
        f = f * i
    return f
```

### Propietat Clau per a la Recursivitat

  - $0\! = 1$
  - Per a $n \> 0$, tenim que $n\! = (n-1)\! · n$

---

## Factorial: De Recurrència a Codi

La definició matemàtica (recurrència) és:

$$n! = \begin{cases} 1 & \text{si}\ n=0 \quad \text{(Cas Base)} \\\ (n-1)! · n & \text{altrament} \quad \text{(Cas Recursiu)}\end{cases}$$

Això es tradueix directament a codi.

```python
def factorial(n: int) -> int:
    """Retorna el factorial d'un natural n."""

    if n == 0:  # Cas Base
        return 1
    else:       # Cas Recursiu
        return factorial(n - 1) * n
```

---

## 2\. Escriptura Recursiva

**Problema**: Escriure `n` cops un caràcter `c`.
`escriure(8, 'o')` → `oooooooo`

### Idea Recursiva

  - **Cas Base**: Si `n == 0`, no fem res.
  - **Cas Recursiu**: Si `n > 0`, escrivim `c` un cop i després resolem el problema per a `n-1`.

### Implementació 1

```python
def escriure(n: int, c: str) -> None:
    """Escriu n ≥ 0 cops seguits c."""

    if n > 0:
        print(c, end='')
        escriure(n - 1, c)
```

---

## Escriptura Recursiva: Alternatives

L'ordre de la crida recursiva i l'acció canvia el procés, però no el resultat final.

### Implementació 2 (primer recursivitat, després acció)

```python
def escriure(n: int, c: str) -> None:
    """Escriu n ≥ 0 cops seguits c."""

    if n > 0:
        escriure(n - 1, c)
        print(c, end='')
```

### Implementació 3 (divideix i venceràs)

```python
def escriure(n: int, c: str) -> None:
    """Escriu n ≥ 0 cops seguits c."""

    if n > 0:
        escriure(n // 2, c)
        if n % 2 != 0:
            print(c, end='')
        escriure(n // 2, c)
```

---

## 3\. Màxim Comú Divisor Recursiu

Basat en l'algorisme d'Euclides.

### Versió Iterativa

```python
def mcd_iteratiu(x: int, y: int) -> int:
    """Retorna el MCD de x ≥ 0 i y ≥ 0."""

    while y != 0:
        x, y = y, x % y
    return x
```

### Versió Recursiva

Substituïm la iteració per una crida recursiva.

```python
def mcd_recursiu(x: int, y: int) -> int:
    """Retorna el MCD de x ≥ 0 i y ≥ 0."""

    if y == 0:
        return x
    else:
        return mcd_recursiu(y, x % y)
```

---

## 4\. Nombres de Fibonacci

Seqüència: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

### Recurrència Matemàtica

$$F(n) = \begin{cases} n & \text{si}\ n\le 1, \\\ F(n-1)+F(n-2) & \text{altrament.}\end{cases}$$

### Implementació Directa (i molt ineficient)

```python
def fibonacci(n: int) -> int:
    """Retorna l'n-èsim nombre de Fibonacci."""
    if n <= 1:
        return n
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)
```

Aquesta versió recalcula els mateixos valors moltes vegades. `fibonacci(36)` triga uns 5 segons.

---

## Fibonacci: Solució Eficient

**Idea**: Crear una funció auxiliar que retorni $F(n)$ i $F(n-1)$ alhora.

### Funció Auxiliar

```python
def fibonacci_aux(n: int) -> tuple[int, int]:
    """Donat n, retorna (F(n), F(n-1))."""

    if n == 0:
        return 0, 0
    elif n == 1:
        return 1, 0
    else:
        # Cridem per n-1 per obtenir (F(n-1), F(n-2))
        penultim, antepenultim = fibonacci_aux(n - 1)
        # Calculem F(n) i retornem el parell desitjat
        return penultim + antepenultim, penultim
```

### Funció Principal

```python
def fibonacci(n: int) -> int:
    """Retorna l'n-èsim nombre de Fibonacci."""
    return fibonacci_aux(n)[0]
```

Aquesta versió és immensament més ràpida.

---

## 5\. Escriure un Nombre en una Base

**Problema**: Escriure un nombre `n` en base `b`.
Exemple: `escriure_base(30, 4)` → `132`

**Idea**: El darrer dígit és `n % b`. La resta de dígits es troben aplicant el mateix procés a `n // b`.

  - Un procés iteratiu generaria els dígits en ordre invers.
  - La recursivitat ens permet invertir l'ordre d'execució.

### Implementació

```python
def escriure_base(n: int, b: int) -> None:
    """Escriu n en base b. Prec: n ≥ 0 i 2 ≤ b ≤ 10."""

    if n < b:  # Cas Base: n té un sol dígit en base b
        print(n, end='')
    else:      # Cas Recursiu
        escriure_base(n // b, b)  # 1. Escriu la part esquerra
        print(n % b, end='')      # 2. Escriu el darrer dígit
```

**Pregunta**: Què passaria si invertim les dues línies de l'`else`?

---

## 6\. Recursivitat i Inducció Matemàtica

Hi ha una relació directa entre les dues tècniques.

| Inducció Matemàtica | Disseny Recursiu |
| :--- | :--- |
| **Cas base**: Provar que la propietat és certa per a $n=0$. | **Cas base**: Resoldre el problema per a una entrada simple (p.ex., $n=0$) directament. |
| **Pas inductiu**: Suposant que és cert per a $n$, provar-ho per a $n+1$. | **Cas recursiu**: Resoldre el problema per a $n$ utilitzant la solució per a un problema més petit (p.ex., $n-1$). |

Podem utilitzar la inducció per **demostrar la correctesa** de funcions recursives.

---

## Aplicació: Fractal de Koch

\<img src='./koch.png' style='height: 8em; float: right; margin: 1em 0;'/\>

Un **fractal** és un objecte on les seves parts tenen la mateixa estructura que el tot (autosemblança).

La **corba de Koch** es construeix de forma iterativa/recursiva:

1.  Es parteix d'un segment.
2.  Es divideix en 3 parts.
3.  El segment central es reemplaça per dos costats d'un triangle equilàter.
4.  Es repeteix el procés per a cada nou segment.

---

## Corba de Koch: Codi

**Idea recursiva** per a `corba_koch(m, n)`:

  - **Cas Base (n=0)**: Dibuixa una línia recta de longitud `m`.
  - **Cas Recursiu (n\>0)**: Dibuixa 4 corbes de Koch de nivell `n-1` i mida `m/3`, amb els girs adequats.


```python
import turtle

def corba_koch(m: float, n: int) -> None:
    """Dibuixa la corba de Koch per una mida m i n nivells."""

    if n == 0:
        turtle.forward(m)
    else:
        corba_koch(m / 3, n - 1)
        turtle.left(60)
        corba_koch(m / 3, n - 1)
        turtle.right(120)
        corba_koch(m / 3, n - 1)
        turtle.left(60)
        corba_koch(m / 3, n - 1)
```

---

## Floc de Neu de Koch

Tres corbes de Koch formen un triangle tancat.

```python
def floc_koch(m: float, n: int) -> None:
    """Dibuixa el floc de neu de Koch."""
    for _ in range(3):
        corba_koch(m, n)
        turtle.right(120)

# Programa principal
def main() -> None:
    m, n = 200.0, 3  # Valors d'exemple
    turtle.speed(0)
    floc_koch(m, n)
    turtle.done()
```

---

## Aplicació: Arbres Fractals

\<img src='./arbres-fractals.png' style='height: 8em; float: right; margin: 1em 0;'/\>

Un arbre de nivell $n$ i mida $d$ es compon de:

  - Un tronc de mida $d$.
  - Dues branques, que són arbres de nivell $n-1$ i mida $\\frac{3}{4}d$.

Un arbre de nivell 0 és buit.

---

## Arbres Fractals: Codi

**Idea recursiva** per a `arbre(n, d, a)`:

  - **Cas Base (n=0)**: No fer res.
  - **Cas Recursiu (n\>0)**:
    1.  Dibuixar el tronc (`forward`).
    2.  Girar a la dreta, dibuixar el subarbre dret (crida recursiva).
    3.  Girar a l'esquerra, dibuixar el subarbre esquerre (crida recursiva).
    4.  Tornar a la posició i orientació originals (`backward`).


```python
def arbre(n: int, d: float, a: float) -> None:
    """Dibuixa un arbre fractal i retorna la tortuga a l'estat inicial."""

    if n > 0:
        turtle.forward(d)           # 1. Tronc
        turtle.right(a)
        arbre(n - 1, d * 3 / 4, a)  # 2. Branca dreta
        turtle.left(2 * a)
        arbre(n - 1, d * 3 / 4, a)  # 3. Branca esquerra
        turtle.right(a)
        turtle.backward(d)          # 4. Tornar
```

---

## Aplicació: Torres de Hanoi

\<img src='./hanoi.png' style='height: 8em; float: right; margin: 1em 0;'/\>

**Trencaclosques**: Moure $n$ discos de la torre origen a la destí, utilitzant una torre auxiliar.

**Regles**:

  - Moure un disc a la vegada.
  - Mai posar un disc gran sobre un de més petit.

---

## Torres de Hanoi: Solució Recursiva

Per moure $n$ discos de `ori` a `dst` usant `aux`:

  - **Cas Base (n=0)**: No fer res.
  - **Cas Recursiu (n\>0)**:
    1.  Moure $n-1$ discos de `ori` a `aux` (usant `dst` com a auxiliar).
    2.  Moure el disc més gran de `ori` a `dst`.
    3.  Moure $n-1$ discos de `aux` a `dst` (usant `ori` com a auxiliar).


```python
def hanoi(n: int,  ori: str,  aux: str,  dst: str) -> None:
    """Escriu com moure n discos del piu ori al piu dst."""

    if n > 0:
        # Pas 1
        hanoi(n - 1, ori, dst, aux)
        # Pas 2
        print(f'{ori} -> {dst}')
        # Pas 3
        hanoi(n - 1, aux, ori, dst)
```

---

## Torres de Hanoi: Anàlisi

Sigui $M(n)$ el nombre de moviments necessaris.

  - $M(0) = 0$
  - $M(n) = 2 \\cdot M(n-1) + 1$

La solució a aquesta recurrència és:
$$M(n) = 2^n - 1$$

  - Per a $n=3$, $M(3) = 2^3 - 1 = 7$ moviments.
  - Per a $n=5$, $M(5) = 2^5 - 1 = 31$ moviments.
  - Per a $n=64$, $M(64) = 2^{64} - 1 \\approx 1.84 \\times 10^{19}$ moviments.

Fins i tot amb un ordinador modern, trigaria segles a resoldre el problema dels 64 discos.