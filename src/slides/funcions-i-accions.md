# Ús de funcions

---

## Funcions predefinides

Python ofereix funcions que es poden utilitzar directament. Una funció té un nom, rep paràmetres i calcula un valor.

  - `max()`: Retorna el valor més gran.
  - `min()`: Retorna el valor més petit.
  - `abs()`: Retorna el valor absolut.


```python
max(10, 20, 15)     # 👉 20
min(31, 37, 11)     # 👉 11
abs(-12)            # 👉 12
abs(-4 * max(1, 3)) # 👉 12
```

---

## Més funcions predefinides

  - `round()`: Arrodoneix un número real.
  - `len()`: Retorna la longitud (ex: nombre de caràcters d'un text).


```python
round(4.1)          # 👉 4
round(4.9)          # 👉 5
round(3.1111, 2)    # 👉 3.11
```

```python
len('Frank Zappa')  # 👉 11
len('')             # 👉 0
```

---

## Funcions de conversió de tipus

S'utilitzen per convertir valors d'un tipus a un altre.

```python
>>> int(3.9)
3
>>> float('3.50')
3.5
>>> str(45.5)
'45.5'
>>> bool(666)
True
>>> bool(0)
False
>>> bool('res')
True
>>> bool('')
False
```

---

## Funcions matemàtiques

El mòdul `math` ofereix funcions per a càlculs científics.

| Funció | Descripció |
|---|---|
| `sqrt` | arrel quadrada |
| `pow` | potència |
| `sin`, `cos`, `tan` | funcions trigonomètriques |
| `log` | logaritme |
| `ceil`, `floor` | arrodoniment cap amunt/avall |
| `factorial` | factorial |
| `gcd` | màxim comú divisor |

---

### Exemple: Distància Euclidiana

Calcular la distància entre dos punts $p = (x_p, y_p)$ i $q = (x_q, y_q)$.
Fórmula: $\sqrt{(x_p-x_q)^2 + (y_p-y_q)^2}$

```python
from yogi import read
from math import sqrt, pow

xp = read(float)
yp = read(float)
xq = read(float)
yq = read(float)

distancia = sqrt(pow(xp - xq, 2) + pow(yp - yq, 2))

print(distancia)
```

El mòdul `math` també inclou constants com `math.pi` (π) i `math.e`.

---

## Funcions aleatòries

El mòdul `random` genera nombres pseudoaleatoris.

  - `randint(a, b)`: Retorna un enter a l'atzar entre `a` i `b`.


```python
>>> import random
>>> random.randint(1, 6)
4
>>> random.randint(1, 6)
1
```

Per simular dos daus: `random.randint(1, 6) + random.randint(1, 6)`
**No** és el mateix que `2 * random.randint(1, 6)`. Per què?

---

## Més funcions aleatòries

  - `random()`: Retorna un real a l'atzar entre 0 i 1.
  - `uniform(a, b)`: Retorna un real a l'atzar entre `a` i `b`.


```python
>>> random.random()
0.21020758023523933
>>> random.uniform(0, 1/3)
0.25364034594325036
```

---

## Funcions de temps

El mòdul `time` proporciona funcions relacionades amb el temps.

  - `time.time()`: Retorna el nombre de segons transcorreguts des d'un punt en el passat.

Útil per mesurar la durada d'un fragment de codi:

```python
import time
inici = time.time()

# ... fragment de codi que volem mesurar ...

final = time.time()
print('temps transcorregut:', final - inici, 'segons')
```

---

# Definició de funcions

Una **funció** és un subprograma que, a partir d'unes entrades, calcula un resultat.

**Avantatges:**

  - Descompondre un programa en parts més petites.
  - Programes més llegibles i estructurats.
  - Faciliten la correcció i millora.
  - Permeten reutilitzar codi.

---

## Anatomia d'una funció

1.  **Capçalera (o interfície)**: Nom, paràmetres i tipus de retorn.
2.  **Especificació (o *docstring*)**: Descriu el propòsit de la funció.
3.  **Cos**: El codi que realitza la tasca.


```python
def maxim2(a: int, b: int) -> int:
    """Calcula el màxim de dos enters."""

    if a > b:
        m = a
    else:
        m = b
    return m
```

---

## La instrucció `return`

  - Indica que la funció ha acabat la seva feina.
  - Lliura el valor de l'expressió que té a la dreta.
  - L'execució de la funció s'atura immediatament en trobar un `return`.


```python
# Versió més curta
def maxim2(a: int, b: int) -> int:
    """Calcula el màxim de dos enters."""

    if a > b:
        return a
    else:
        return b
```

```python
# Encara més curta
def maxim2(a: int, b: int) -> int:
    """Calcula el màxim de dos enters."""

    if a > b:
        return a
    return b
```

---

## Reutilització de funcions

Una funció pot invocar (cridar) altres funcions.

```python
def maxim3(a: int, b: int, c: int) -> int:
    """Calcula el màxim de tres enters."""

    # Reutilitzem la funció maxim2
    return maxim2(maxim2(a, b), c)
```

Dissenyar funcions que aprofiten altres funcions més simples és una excel·lent pràctica.

---

## Paràmetres formals i reals

  - **Paràmetres formals**: Els noms que s'utilitzen en la **definició** de la funció (`a`, `b`).
  - **Paràmetres reals (o arguments)**: Els valors que es passen en la **invocació** de la funció (`10`, `x`, `x + y`).


```python
# Paràmetres formals: a, b
def maxim2(a: int, b: int) -> int: ...

# Invocació amb paràmetres reals
resultat = maxim2(10, x)
```

Al invocar, el valor dels paràmetres reals es copia als paràmetres formals.

---

## Variables locals

  - Les variables i paràmetres definits dins d'una funció són **locals** a aquesta funció.
  - No interfereixen amb variables del mateix nom en altres funcions o en el programa principal.


```python
def maxim2(a: int, b: int) -> int:
    m = ... # 'm' és local a maxim2
    return m

def maxim3(a: int, b: int, c: int) -> int:
    m = ... # 'm' és local a maxim3
    return m

# Programa principal
a, b, c = 1, 2, 3
print(maxim3(a, b, c))
```

Les dues variables `m` són completament independents.

---

## Error freqüent: `read`/`print` dins de funcions

Les funcions han de rebre dades a través dels paràmetres i retornar resultats amb `return`. No han de llegir de l'entrada ni escriure a la sortida (tret que aquest sigui el seu propòsit explícit, com en les "accions").

**Incorrecte ❌**

```python
def valor_absolut(x: float) -> float:
    """Retorna el valor absolut d'un real."""
    x = read(float)       # 😬 No! El valor ja ve com a paràmetre
    if x >= 0:
        y = x
    else:
        y = -x
    print(y)              # 😬 No! S'ha de retornar el valor
```

**Correcte ✅**

```python
def valor_absolut(x: float) -> float:
    """Retorna el valor absolut d'un real."""
    if x >= 0:
        return x
    else:
        return -x
```

---

# Exemples de funcions

---

## Funció Factorial

```python
def factorial(n: int) -> int:
    """Retorna el factorial d'un natural n."""

    f = 1
    for i in range(1, n + 1):
        f = f * i
    return f
```

### Jocs de proves

Cal provar valors normals i **casos extrems** (*edge cases*).

```python
>>> factorial(0)
1
>>> factorial(1)
1
>>> factorial(5)
120
```

---

## Funció `es_primer`

```python
def es_primer(n: int) -> bool:
    """Indica si el natural n és primer o no."""

    if n <= 1:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d = d + 1
    return True
```

---

## Funció Màxim Comú Divisor (MCD)

Basada en l'algorisme d'Euclides.

```python
def mcd(x: int, y: int) -> int:
    """
    Retorna el màxim comú divisor de dos naturals x i y.

    Prec: x >= 0 i y >= 0.
    """
    while y != 0:
        r = x % y
        x = y
        y = r
    return x
```

Les **precondicions** són condicions que han de complir les entrades perquè la funció operi correctament.

---

## Funció Mínim Comú Múltiple (MCM)

Aprofita la funció `mcd`.
Fórmula: $\text{mcm}(x,y) = \dfrac{x · y}{\text{mcd}(x,y)}$

Per evitar productes intermedis grans, és millor calcular-ho com:
$\text{mcm}(x,y) = \left(\dfrac{x}{\text{mcd}(x,y)}\right) · y$

```python
def mcm(x: int, y: int) -> int:
    """
    Retorna el mínim comú multiple de dos naturals x i y.

    Prec: x + y > 0.
    """
    return (x // mcd(x, y)) * y
```

---

# Funcions que retornen més d'un valor

---

## Retornar una tupla

Una funció només pot retornar un valor, però aquest valor pot ser una tupla que contingui múltiples elements.

```python
def minim_i_maxim(a: int, b: int) -> tuple[int, int]:
    """Funció que retorna el mínim i el màxim de dos enters."""
    if a <= b:
        return a, b  # Python crea una tupla (a, b)
    else:
        return b, a  # Python crea una tupla (b, a)
```

Per recollir els resultats, es pot "desempaquetar" la tupla:

```python
min_val, max_val = minim_i_maxim(4, 5)
print(min_val)  # 4
print(max_val)  # 5
```

---

## Exemple: Descomposició horària

```python
def descomposio_horaria(n: int) -> tuple[int, int, int]:
    """Converteix segons en hores, minuts i segons."""
    h = n // 3600
    m = (n // 60) % 60
    s = n % 60
    return h, m, s

# Ús
hores, minuts, segons = descomposio_horaria(4376)
print(hores, minuts, segons)  # 1 12 56
```

---

# Accions

---

## Què és una acció?

Un subprograma que produeix un efecte (ex: dibuixar a la pantalla, escriure text) enlloc de retornar un valor.

  - En Python, són funcions que retornen `None`.

### Exemple original: Dibuixar quadrats rotats

```python
import turtle
import yogi

mida = yogi.read(int)
rotacions = yogi.read(int)
angle = 360 / rotacions

j = 0
while j < rotacions:
    i = 0
    while i < 4:
        turtle.forward(mida)
        turtle.right(90)
        i = i + 1
    turtle.right(angle)
    j = j + 1
```

Aquest codi és difícil de llegir i reutilitzar.

---

## Descomposició en accions

Podem simplificar el programa dividint-lo en accions.

**Programa principal simplificat:**

```python
mida = yogi.read(float)
rotacions = yogi.read(int)
dibuixar_quadrats_rotats(mida, rotacions)
```

**Definició de les accions:**

```python
def dibuixar_quadrat(mida: float) -> None:
    """Dibuixa un quadrat amb costats de mida `mida`."""
    for i in range(4):
        turtle.forward(mida)
        turtle.right(90)

def dibuixar_quadrats_rotats(mida: float, nombre: int) -> None:
    """Dibuixa `nombre` quadrats de `mida` mida, rotant-los."""
    angle = 360 / nombre
    for i in range(nombre):
        dibuixar_quadrat(mida)
        turtle.right(angle)
```

El codi és més llarg, però cada part és més simple, entenedora i reutilitzable.

---

## Acció: Escriure divisors en ordre

```python
def escriure_divisors(n: int) -> None:
    """Escriu tots els divisors de n > 0 en ordre creixent."""

    # Escriu els divisors fins a sqrt(n)
    d = 1
    while d * d < n:
        if n % d == 0:
            print(d)
        d = d + 1
    # Si n és un quadrat perfecte, escriu l'arrel
    if d * d == n:
        print(d)
    d = d - 1
    # Escriu la resta de divisors (els "grans")
    while d >= 1:
        if n % d == 0:
            print(n // d)
        d = d - 1
```

---

## Acció: Escriure factors primers (optimitzat)

```python
def escriure_factors_primers(n: int) -> None:
    """Escriu els factors primers de n > 1 en ordre creixent."""

    d = 2
    while d * d <= n:
        if n % d == 0:
            print(d)
            while n % d == 0:
                n = n // d
        d = d + 1
    if n != 1:
        # El que queda de n és un factor primer
        print(n)
```

Aquesta versió és molt més eficient que provar divisors fins a `n`.

---

# Programa principal i variables globals

---

## El problema de les variables globals

Les variables definides fora de qualsevol funció són **globals**.

  - Poden ser llegides (i modificades) des de qualsevol lloc del programa.
  - Això dificulta la comprensió i el manteniment del codi, ja que una funció pot dependre d'estats "ocults".
  - **És una mala pràctica de programació.**


```python
c = 10 # Variable global

def alguna_funcio():
    print(c) # Pot accedir a 'c'
```

---

## La solució: l'acció `main`

Per evitar variables globals, encapsulem el codi principal dins d'una acció, per convenció anomenada `main`.

```python
from yogi import read

def maxim3(a: int, b: int, c: int) -> int:
    ...

def main() -> None:
    # Les variables a, b, c són ara LOCALS a main
    a = read(int)
    b = read(int)
    c = read(int)
    print(maxim3(a, b, c))

# Cridem l'acció principal per iniciar el programa
main()
```

Ara no hi ha variables globals.

---

## Executar vs. Importar

Volem que `main()` s'executi només quan el fitxer és el programa principal, no quan s'importa com un mòdul.

S'utilitza la construcció `if __name__ == '__main__':`

```python
def maxim3(a: int, b: int, c: int) -> int:
    ...

def main() -> None:
    ...

# Aquest bloc només s'executa si el fitxer es llança directament.
# No s'executarà si s'importa des d'un altre fitxer.
if __name__ == '__main__':
    main()
```

👆 Estructura estàndard i recomanada per a tots els programes en Python.