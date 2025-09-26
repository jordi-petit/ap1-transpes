# Seqüències

Processament d'un gran nombre de dades obtingudes seqüencialment.

**Exemple principal:** Càlcul de la mitjana d'una seqüència de reals.

**Tres mètodes:**

  - Amb un comptador inicial.
  - Amb un marcador de final especial.
  - Detecció automàtica del final de l'entrada (`scan` i `tokens`).

---

## Mitjana amb comptador inicial

El primer número indica la quantitat d'elements a llegir.

**Exemple d'entrada:**

```text
4
9.5 2.5 7 2
```

**Codi:**

```python
from yogi import read

n = read(int)
s = 0.0
for i in range(n):
    x = read(float)
    s = s + x
print(s / n)
```

---

## Mitjana amb finalitzador especial

Un valor especial (p. ex., la paraula `fi`) marca el final de la seqüència. Més flexible per a l'usuari.

**Exemple d'entrada:**

```text
9.5
2.5
7
fi
```

**Codi:**

```python
from yogi import read

s = 0.0
n = 0
x = read(str)
while x != 'fi':
    s = s + float(x)
    n = n + 1
    x = read(str)
print(s / n)
```

---

## Mitjana sense finalitzador amb `scan`

Llegir dades fins que no en quedin més. La funció `read` donaria error.

### La funció `scan`

  - Similar a `read`, però retorna el valor especial `None` quan no pot llegir més.

**Exemple d'entrada:**

```text
9.5
2.5
7
2
```

**Codi:**

```python
from yogi import scan

s = 0.0
n = 0
x = scan(float)
while x != None:
    s = s + x
    n = n + 1
    x = scan(float)
print(s / n)
```

---

## Com indicar el final de l'entrada (EOF)

Quan s'executa un programa interactiu, cal indicar manualment el final de l'entrada.

  - **Linux i Mac OS:** \<kbd\>control\</kbd\>+\<kbd\>d\</kbd\>
  - **Windows:** \<kbd\>control\</kbd\>+\<kbd\>z\</kbd\>

Això fa que `scan` retorni `None`.

**Nota:** Per aturar (*matar*) un programa forçadament, es pot usar \<kbd\>control\</kbd\>+\<kbd\>c\</kbd\>.

---

## Mitjana sense finalitzador amb `tokens`

Una alternativa més concisa a `scan` per a bucles.

### La funció `tokens`

  - S'utilitza en bucles `for`.
  - Retorna tots els elements de l'entrada del tipus especificat, un per cada iteració.

**Llegiu-lo com:** "per a cada real `x` de l'entrada..."

**Codi:**

```python
from yogi import tokens

s = 0.0
n = 0
for x in tokens(float):
    s = s + x
    n = n + 1
print(s / n)
```

---

# Exemples de Seqüències

  - Suma d'una seqüència d'enters.
  - Màxim d'una seqüència d'enters.
  - Comptar aparicions d'una paraula.

---

## Suma d'una seqüència d'enters

Es pot resoldre fàcilment amb `tokens`.
Si la seqüència és buida, el resultat és correctament `0`.

**Codi:**

```python
from yogi import tokens

s = 0
for x in tokens(int):
    s = s + x
print(s)
```

---

## Màxim d'una seqüència d'enters

**Problema:** Com inicialitzem la variable `m` que guarda el màxim?

```python
m = ???                // 👁
for x in tokens(int):
    if x > m:
        m = x
print(m)
```

  - `m = 0` falla si tots els números són negatius.
  - `m = -∞` no és un valor `int` estàndard a Python.

---

## Màxim: Solució

La millor solució és **inicialitzar el màxim amb el primer element** de la seqüència.

S'assumeix que la seqüència no és buida.

**Codi:**

```python
from yogi import read, tokens

# Llegim el primer element per inicialitzar m
m = read(int)

# Processem la resta d'elements
for x in tokens(int):
    if x > m:
        m = x
print(m)
```

O, de forma més compacta amb `max()`:

```python
from yogi import read, tokens

m = read(int)
for x in tokens(int):
    m = max(m, x)
print(m)
```

---

## Comptar Gats 😸

**Problema:** Comptar quantes vegades apareix la paraula `gat` en un text.

**Exemple d'entrada:**

```text
A gat vell rateta jove
Al gat vell no cal mostrar-li rata
De nit tots els gats són negres
```

El programa hauria de donar `2`.

**Codi:**

```python
from yogi import tokens

c = 0  # comptador de gats
for p in tokens(str):
    if p == 'gat':
        c = c + 1
print(c)
```

---

# Aplicació: Llargades de paraules

## Enunciat

Donat un poema, calcular:

1.  El nombre total de paraules.
2.  La llargada mitjana de les paraules.
3.  La paraula més llarga.

**Exemple:**

  - **Entrada:** `quan els oques van al camp la primera va al davant`
  - **Sortida:**


```text
nombre de paraules: 11
llargada mitjana: 3.5454...
paraula més llarga: primera
```

---

## Llargades de paraules: Solució

Es recorren totes les paraules amb `tokens` i s'actualitzen tres variables:

  - `nombre_paraules`: S'incrementa a cada iteració.
  - `suma_llargades`: Acumula la llargada de cada paraula.
  - `paraula_mes_llarga`: Guarda la paraula més llarga trobada fins ara.

**Codi:**

```python
from yogi import tokens

nombre_paraules = 0
suma_llargades = 0
paraula_mes_llarga = ''

for paraula in tokens(str):
    nombre_paraules += 1
    suma_llargades += len(paraula)
    if len(paraula) > len(paraula_mes_llarga):
        paraula_mes_llarga = paraula

print('nombre de paraules:', nombre_paraules)
print('llargada mitjana:', suma_llargades / nombre_paraules)
print('paraula més llarga:', paraula_mes_llarga)
```

---

# Aplicació: Octògons facilets

## Enunciat (P87198)

Per a cada número `n` donat, escriure un octàgon de mida `n`.

**Exemple `n = 3`:**

```text
  XXX
 XXXXX
XXXXXXX
XXXXXXX
XXXXXXX
 XXXXX
  XXX
```

## Metodologia: Disseny Descendent

Descompondre un problema complex en subproblemes més simples.

---

## Octògons: `main`

El programa principal només llegeix els números i delega la feina a una altra funció.

```python
from yogi import tokens

def main() -> None:
    for n in tokens(int):
        escriure_octogon(n)
        print()

# ... aquí aniran les altres funcions ...

if __name__ == '__main__':
    main()
```

---

## Octògons: Descomposició

Un octàgon es pot dividir en tres parts: superior, mig i inferior.

```python
def escriure_octogon(n: int) -> None:
    """Acció que escriu un octògon de mida n."""
    escriure_part_superior(n)
    escriure_part_del_mig(n)
    escriure_part_inferior(n)
```

---

## Octògons: Implementació de les parts

Cada part es construeix línia a línia, delegant la impressió de cada línia a una nova funció.

```python
def escriure_part_superior(n: int) -> None:
    for i in range(n):
        escriure_linia(n - i - 1, n + 2 * i)

def escriure_part_del_mig(n: int) -> None:
    # Per n=3, la part del mig té n línies.
    # L'enunciat original sembla tenir un error (n-2).
    # Ajustem a n per coincidir amb l'exemple.
    for i in range(n):
        escriure_linia(0, 3 * n - 2)

def escriure_part_inferior(n: int) -> None:
    for i in range(n - 1, -1, -1):
        escriure_linia(n - i - 1, n + 2 * i)

```

---

## Octògons: La base

La funció més simple: escriu un nombre determinat d'espais i 'X'.

```python
def escriure_linia(espais: int, ics: int) -> None:
    """Acció que escriu 'espais' espais, 'ics' ics i un salt de línia."""
    print(' ' * espais, 'X' * ics, sep='')
```

Això completa el disseny descendent.

---

# Aplicació: Trens de dòminos

## Descripció del problema

Donada una seqüència de números que representen fitxes de dòmino, comptar quants errors d'encaix hi ha. Un error ocorre si el número dret d'una fitxa no coincideix amb el número esquerre de la següent.

**Exemple:**
`2 3 3 4 5 4` representa `[2|3] [3|4] [5|4]`.
Hi ha un error entre la segona i la tercera fitxa (`4` \!= `5`).

---

## Trens de dòminos: Solució

Recórrer la seqüència de dos en dos, comparant els valors adjacents de fitxes diferents.

**Codi amb `scan`:**

```python
from yogi import read, scan

errors = 0
read(int) # Ignorem el primer número
dret, esquerre = read(int), scan(int)
while esquerre is not None:
    if dret != esquerre:
        errors += 1
    # Llegim el següent parell
    dret, esquerre = read(int), scan(int)
print(errors)
```

---

## Problema similar: Hi ha algun error?

Ara només volem saber si el tren és `correcte` o `incorrecte`.

Una solució **ineficient** seria comptar tots els errors i després comprovar si el comptador és zero.

**Per què ineficient?** Si trobem un error al principi d'un tren d'un milió de fitxes, no cal seguir mirant.

---

## Solució eficient: Cerca

Parem tan bon punt trobem el primer error.

```python
from yogi import read, scan

correcte = True
read(int)
dret, esquerre = read(int), scan(int)

# El bucle s'atura si 'correcte' esdevé False
while correcte and esquerre is not None:
    if dret != esquerre:
        correcte = False
    else:
        dret, esquerre = read(int), scan(int)

if correcte:
    print('correcte')
else:
    print('incorrecte')
```

---

## Recorreguts vs. Cerques

### Algorisme de Recorregut

  - Processa **tots** els elements de l'entrada.
  - **Exemple:** Comptar el nombre total d'errors.

### Algorisme de Cerca

  - Processa els elements fins que es compleix una condició (o s'acaba l'entrada).
  - **Exemple:** Determinar si hi ha *algun* error.

---

# Tècnica de la Finestra

Consisteix a mantenir diverses variables que "apunten" a elements consecutius d'una seqüència per analitzar-los conjuntament.

---

## Problema: Paraules consecutives repetides

Comptar quants cops una paraula és igual a la immediatament anterior.

**Exemple:** `poma poma poma` conté **dues** repeticions consecutives.

Cal una **finestra de dos elements**.

**Codi:**

```python
from yogi import scan

r = 0           # comptador
a = scan(str)   # part esquerra de la finestra
if a is not None:
    b = scan(str)   # part dreta de la finestra
    while b is not None:
        if a == b:
            r += 1
        a, b = b, scan(str) # llisquem la finestra
print(r)
```

---

## Problema: Comptar pics

Un pic és un número estrictament més gran que els seus dos veïns.

**Exemple:** `5 2 4 7 6 2 2` té un pic (el `7`).

Cal una **finestra de tres elements**.

**Codi (Recorregut):**

```python
from yogi import read, scan

pics = 0
a, b, c = read(float), read(float), scan(float)
while c is not None:
    if a < b > c:
        pics += 1
    a, b, c = b, c, scan(float)
print(pics)
```

---

## Problema: Hi ha algun pic?

Adaptació del problema anterior a un algorisme de **cerca**.

**Codi (Cerca):**

```python
from yogi import read, scan

hi_ha_pics = False
a, b, c = read(float), read(float), scan(float)
while not hi_ha_pics and c is not None:
    if a < b > c:
        hi_ha_pics = True
    else:
        a, b, c = b, c, scan(float)
print(hi_ha_pics)
```