class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# Iteracions

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya

---

# Concepte

  * En informàtica, repetir instruccions s'anomena **iterar** o **fer bucles**.
  * Permet simplificar i potenciar els algorismes.
  * L'eina principal per a la iteració és la instrucció `while`.

---

# Problema: Escriure els nombres d'1 a `n`

Com fer un programa que llegeixi un nombre `n` i escrigui tots els nombres entre 1 i `n`?

Per exemple, si `n` és 4, la sortida ha de ser:

```text
1
2
3
4
```

Necessitem una nova instrucció per repetir accions.

---

# La instrucció `while`

La forma més bàsica d'instrucció iterativa en Python.

### Sintaxi

```python
while ⟨condició⟩:
    ⟨instruccions⟩
```

### Funcionament

1.  Es comprova la `⟨condició⟩`.
2.  Si és certa, s'executen les `⟨instruccions⟩` del cos del bucle.
3.  Es torna al pas 1.
4.  Si és falsa, el bucle acaba i el programa continua.

---

# Diagrama de Flux del `while`

\<img src='./flow-while.png' style='height: 25em;'/\>

---

# Solució: Escriure els nombres d'1 a `n`

```python
n = read(int)
i = 1
while i <= n:
    print(i)
    i = i + 1
```

  * La variable `i` actua com a **comptador**.
  * Comença a 1.
  * A cada iteració, s'imprimeix i s'incrementa.
  * El bucle s'atura quan `i` supera `n`.

---

# Un error comú: Condició `!=`

Què passa si fem servir `i != n`?

```python
n = read(int)
i = 1
while i != n:     # 💥 Compte!
    print(i)
    i = i + 1
```

  * Funciona per a `n > 0`.
  * Per a `n <= 0`, la condició `i != n` sempre serà certa.
  * El bucle no s'aturarà mai: el programa **es penja**.

> Per aturar un programa penjat, premeu \<kbd\>Control\</kbd\>+\<kbd\>C\</kbd\>.

---

# Problema: Escriure els senars d'1 a `n`

Si `n = 7`:

```text
1
3
5
7
```

Si `n = 10`:

```text
1
3
5
7
9
```

---

# Solució: Escriure els senars

Només cal canviar l'increment de `i`.

```python
n = read(int)
i = 1
while i <= n:
    print(i)
    i = i + 2 # Incrementem de 2 en 2
```

---

# Problema: Escriure els nombres d'`n` a 1

Si `n = 4`:

```text
4
3
2
1
```

---

# Solució: Escriure d'`n` a 1

Cal inicialitzar el comptador a `n` i anar decrementant.

```python
n = read(int)
i = n
while i > 0:    # o també i >= 1
    print(i)
    i = i - 1
```

### Alternativa

Podem fer servir la mateixa `n` (però perdem el seu valor original).

```python
n = read(int)
while n > 0:
    print(n)
    n = n - 1
```

---

# Raonament al voltant dels bucles

Donat el codi (amb `n >= 0`):

```python
n = read(int)
i = 1
while i <= n:
    print(i)
    i = i + 1
print('adéu')
```

  * **Quantes vegades s'executa `i = 1`?**
      * 1 cop.
  * **Quants nombres s'escriuen?**
      * `n` nombres.
  * **Quantes iteracions fa el bucle?**
      * `n` iteracions.
  * **Quin és el valor final d'`i`?**
      * `n + 1`.
  * **Quantes vegades s'avalua la condició?**
      * `n + 1` vegades (l'última per sortir).


---

class: center, middle

# Dibuixos de polígons amb bucles

---

# Dibuix d'un quadrat

### Sense bucles

Repetim el codi 4 vegades.

```python
import turtle
mida = 100
turtle.forward(mida)
turtle.right(90)
turtle.forward(mida)
turtle.right(90)
turtle.forward(mida)
turtle.right(90)
turtle.forward(mida)
turtle.right(90)
```

---

# Dibuix d'un quadrat

### Amb un bucle `while`

El codi és molt més curt i clar.

```python
import turtle
mida = 100
i = 0
while i < 4:
    turtle.forward(mida)
    turtle.right(90)
    i = i + 1
turtle.done()
```

---

# Dibuix d'un polígon regular

Un **polígon regular** té tots els costats i angles iguals.

Per dibuixar un polígon de `costats` costats:

  * Repetim `costats` vegades.
  * A cada pas, girem `360 / costats` graus.

---

### Exemple: Un hexàgon (`costats = 6`)

```python
import turtle
mida = 100
costats = 6
i = 0
while i < costats:
    turtle.forward(mida)
    turtle.right(360 / costats)
    i = i + 1
turtle.done()
```

---

# Programa general per a polígons

Podem llegir les dades de l'usuari i pre-calcular l'angle per a més eficiència.

```python
import turtle
import yogi

mida = yogi.read(int)
costats = yogi.read(int)
angle = 360 / costats

i = 0
while i < costats:
    turtle.forward(mida)
    turtle.right(angle)
    i = i + 1

turtle.done()
```

---

# Dibuix de molts quadrats rotats

Podem posar un bucle dins d'un altre (**bucles aniuats**).

  * **Bucle extern**: Gira la tortuga per a cada nou quadrat.
  * **Bucle intern**: Dibuixa un quadrat complet.

---

# Codi amb bucles aniuats

```python
import turtle
import yogi

mida = yogi.read(int)
rotacions = yogi.read(int)
angle = 360 / rotacions

j = 0 # Variable de control del bucle extern
while j < rotacions:
    # Bucle intern per pintar un quadrat
    i = 0 # Variable de control del bucle intern
    while i < 4:
        turtle.forward(mida)
        turtle.right(90)
        i = i + 1
    # Fi del bucle intern
    turtle.right(angle)
    j = j + 1

turtle.done()
```

---

class: center, middle

# Dibuixos de polígons amb bucles

Com trobar els divisors d'un nombre i determinar si és primer.

---

# Problema: Escriure tots els divisors d'`n`

Per exemple, per a `n = 30`, els divisors són 1, 2, 3, 5, 6, 10, 15, 30.

### Solució senzilla (però lenta)

Recórrer tots els nombres `d` de 1 a `n` i comprovar si `n % d == 0`.

```python
from yogi import read

n = read(int)
d = 1
while d <= n:
    if n % d == 0:
        print(d)
    d = d + 1
```

Aquest algorisme és molt lent per a nombres grans (ex: 1000000007).

---

# Un algorisme més eficient

### Idea clau

  * Si `d` és un divisor de `n`, llavors `n/d` també ho és.
  * N'hi ha prou amb buscar divisors fins a $\sqrt{n}$.
  * La condició `d <= √n` és equivalent a `d * d <= n`.


```python
from yogi import read

n = read(int)
d = 1
while d * d <= n:
    if n % d == 0:
        print(d)
        if d * d != n: # Evitem imprimir l'arrel dues vegades
             print(n // d)
    d = d + 1
```

---

# Eficiència: `n` vs. `√n`

El nou algorisme és molt més ràpid perquè `√n` creix molt més lentament que `n`.

\<img src='./plot-n-sqrt-n.svg' style='max: 100%px; margin: 2em 0 1em 1em;' /\>

Per `n = 1000000007`, passem de $\approx 10^9$ passos a $\approx 31500$.

---

# Primalitat

Un nombre natural és **primer** si té exactament dos divisors: 1 i ell mateix.
(0 i 1 no són primers).

### Idea

Un nombre `n > 1` és primer si no té cap divisor entre 2 i $\sqrt{n}$.

---

### Implementació

Podem adaptar el codi anterior per comptar quants divisors trobem.

```python
from yogi import *
n = read(int)
if n <= 1:
    print(n, 'no és primer')
else:
    es_primer = True
    d = 2
    while d * d <= n and es_primer:
        if n % d == 0:
            es_primer = False
        d = d + 1

    if es_primer:
        print(n, 'és primer')
    else:
        print(n, 'no és primer')
```

  * Gestionem els casos especials (0 i 1).
  * El bucle s'atura tan aviat com troba el primer divisor (`and es_primer`).

---

# Aplicació: Factorial

\<img src='./factorial.png' style='height: 9em; float: right; margin: 2em 0 1em 1em;'/\>

Calcular $n!$ amb bucles.

---

# Concepte matemàtic

El factorial de $n$, denotat com $n!$, és el producte de tots els enters positius fins a $n$.

$$n! = n \times (n-1) \times (n-2) \times \cdots \times 1$$

Per definició, $0! = 1$.

| $n$ | $n!$ |
| :-- | ---: |
| 0   | 1    |
| 1   | 1    |
| 2   | 2    |
| 3   | 6    |
| 4   | 24   |
| 5   | 120  |

---

# Programa per calcular el factorial

Calculem el producte acumulat en una variable `f`.

```python
from yogi import read

n = read(int)
f = 1
i = 1
while i <= n:
    f = f * i
    i = i + 1
print(f)
```

  * `f` s'inicialitza a 1 (element neutre del producte).
  * El bucle itera d'1 a `n`, multiplicant `f` pel valor de `i` a cada pas.

---

# Una millora menor

El primer producte (`f = 1 * 1`) és innecessari. Podem començar el bucle a 2.

```python
from yogi import read

n = read(int)
f = 1
i = 2 # Comencem a 2
while i <= n:
    f = f * i
    i = i + 1
print(f)
```

Estalviem una iteració. És una petita optimització, però demostra comprensió del problema.

---

# Aplicació: Màxim comú divisor

\<img src='./maxim-comu-divisor.png' style='height: 8em; float: right; margin: 2em 0 1em 1em;'/\>

Càlcul del MCD de dos nombres.

---

# Definició

  * El **màxim comú divisor** de $x$ i $y$, $\text{mcd}(x, y)$, és el nombre més gran que divideix a tots dos.
  * Exemple: $\text{mcd}(78, 66) = 6$.
  * Cas especial: $\text{mcd}(x, 0) = x$.

---

# Primera solució (lenta)

La idea és provar tots els possibles divisors `d` des del més gran (`x`) cap avall. El primer que sigui divisor de tots dos és el MCD.

```python
x = read(int)
y = read(int)
d = x
while not (x % d == 0 and y % d == 0):
    d = d - 1
print(d)
```

  * La condició `x % d != 0 or y % d != 0` (per la llei de De Morgan) és equivalent i més clara.

---

# Segona solució: Algorisme d'Euclides

\<img src='./euclides.png' style='height: 8em; float: right; margin: 2em 0 1em 1em;'/\>

> Resteu al més gran dels dos nombres el més petit, fins que siguin iguals; aquesta és la solució.

Es basa en la propietat: $\text{mcd}(x, y) = \text{mcd}(x-y, y)$ si $x > y$.

---

### Traça per a $\text{mcd}(78, 66)$

```text
     78  66
    -----
     12  66   (78-66)
     12  54   (66-12)
     12  42   (54-12)
     ...
     12   6
      6   6   (12-6)
    -----
        6
```

---

### Implementació de l'Algorisme d'Euclides

```python
x = read(int)
y = read(int)
# Mentre siguin diferents
while x != y:
    # Restem el més petit del més gran
    if x < y:
        y = y - x
    else:
        x = x - y
print(x)
```

És molt més eficient que la primera solució, però pot ser lent si un nombre és molt més gran que l'altre (ex: $\text{mcd}(10^9, 1)$).

---

# Tercera solució: Euclides amb mòduls

Les restes repetides són equivalents a l'operació mòdul (`%`).
$\text{mcd}(x, y) = \text{mcd}(y, x \pmod y)$

### Implementació final (la més eficient)

```python
x = read(int)
y = read(int)
while y != 0:
    r = x % y
    x = y
    y = r
print(x)
```

  * Aquest és l'algorisme estàndard per calcular el MCD.
  * És extremadament ràpid i funciona per a tots els casos, incloent-hi el 0.

---

# Iteracions amb `for`

\<img src='./bucles-for.png' style='height: 8em; float: right; margin: 2em 0 1em 1em;'/\>

Una forma més compacta i llegible per a bucles amb un comptador.

---

# El patró comú

Molts bucles `while` segueixen aquest esquema:

1.  Inicialitzar una variable de control.
2.  Iterar mentre la variable compleix una condició.
3.  Actualitzar la variable a cada pas.


```python
i = 1       # 1. Inicialització
while i <= n: # 2. Condició
    print(i)
    i = i + 1 # 3. Actualització
```

---

# La instrucció `for in range`

La instrucció `for` simplifica aquest patró.

### Sintaxi

```python
for ⟨variable⟩ in range(⟨inici⟩, ⟨final⟩, ⟨pas⟩):
    ⟨instruccions⟩
```

  * `inici`: (Opcional, per defecte 0) Valor inicial.
  * `final`: (Obligatori) El bucle s'atura **abans** d'arribar a aquest valor.
  * `pas`: (Opcional, per defecte 1) Increment.

---

# Exemples de `range`

| `range`             | Valors que genera |
| ------- | ------- |
| `range(5)`        | `0 1 2 3 4`       |
| `range(1, 6)`     | `1 2 3 4 5`       |
| `range(0, 8, 2)`  | `0 2 4 6`         |
| `range(5, 0, -1)` | `5 4 3 2 1`       |

---

# Reescrivint exemples amb `for`

### Factorial

```python
n = read(int)
f = 1
for i in range(2, n + 1):
    f = f * i
print(f)
```

### Dibuixar un polígon

```python
for i in range(costats):
    turtle.forward(mida)
    turtle.right(angle)
```

### Quadrats rotats (bucles aniuats)

```python
for i in range(rotacions):
    for j in range(4):
        turtle.forward(mida)
        turtle.right(90)
    turtle.right(angle)
```

---

# `while` vs `for`

  * **`for in range`**: Ideal per a bucles on el nombre d'iteracions és conegut per endavant (recorre una seqüència de nombres). És més compacte i menys propens a errors.

  * **`while`**: Més general. S'utilitza quan la condició per continuar és més complexa i no depèn només d'un comptador.

> **Recomanació**: Utilitzeu `for` sempre que sigui possible. Reserveu `while` per a la resta de casos.