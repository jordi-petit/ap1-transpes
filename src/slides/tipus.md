class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# Tipus de dades

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya

---

# Concepte

  - En Python, cada valor té un tipus.

  - Un **tipus de dades** defineix un conjunt de valors i un conjunt d'operacions.

  - La funció `type()` retorna el tipus d'un valor.


```python
>>> type(38)
<class 'int'>

>>> type(3.14)
<class 'float'>

>>> type('Coldplay')
<class 'str'>
```

---

# Tipus de les variables

  - El tipus d'una variable és el tipus del valor que conté en aquell moment.

  - El tipus d'una variable pot canviar, però és millor evitar-ho per prevenir errors.


```python
>>> x = 12
>>> type(x)
<class 'int'>

>>> y = 'Star Wars'
>>> type(y)
<class 'str'>

>>> y = x
>>> type(y)
<class 'int'>
```

---

# Literals

  - Són els valors constants d'un tipus que s'escriuen directament al codi.

  - Exemples: `38` (enter), `3.14` (real).

# Sistema de tipus

  - Vigila que les operacions s'apliquin a dades del tipus adient.

  - Pot resultar en una operació vàlida, una conversió automàtica o un **error de tipus**.

---

# Exemples del sistema de tipus

  - **Suma d'enters**: `3 + 4` → `7`
  - **Concatenació de texts**: `'Cold' + 'play'` → `'Coldplay'`
  - **Repetició de text**: `'ma' * 2` → `'mama'`
  - **Suma d'enter i real (conversió)**: `2 + 1.5` → `3.5`
  - **Error de tipus**: `'Marta' + 1` → `TypeError`

---

# Tipus bàsics de Python

  - **`int`**: Nombres enters.
  - **`float`**: Nombres reals (coma flotant).
  - **`str`**: Texts (cadenes de caràcters).
  - **`bool`**: Valors booleans (cert/fals).

---

class: center, middle

# El tipus enter

## (`int`)

---

# Literals i valors `int`

  - **Literals**: S'escriuen amb els seus dígits, amb un possible signe negatiu.
      - Exemples: `0`, `8437628`, `-15`.

  - **Valors**: Tots els nombres enters (... -2, -1, 0, 1, 2 ...).
      - Python no imposa límits de valor més enllà de la memòria disponible.

---

# Operacions amb `int`

## Operadors aritmètics

| Símbol | Operació |
|---|---|
| `+` | Suma |
| `-` | Resta / Canvi de signe |
| `*` | Producte |
| `//` | Divisió entera |
| `%` | Residu |
| `**` | Exponenciació |

<br/>

## Operadors relacionals (resultat `bool`)

| Símbol | Operació |
|---|---|
| `==`, `!=` | Igualtat, Diferència |
| `<`, `>` | Menor, Major estricte |
| `<=`, `>=` | Menor o igual, Major o igual |

---

class: center, middle

# El tipus real

## (`float`)

---

# Literals i valors `float`

  - **Literals**: Notació amb punt decimal o científica.
      - Exemples: `3.14`, `-12434.9`, `6.02252e23` ($6,02252 \\cdot 10^{23}$).

  - **Valors**: Són **aproximacions** de nombres reals, emmagatzemats amb la tècnica de **coma flotant**.
      - No poden representar tots els reals de forma exacta (ex: $\\pi$, 2/3).

---

# Problemes de precisió amb `float`

  - L'aritmètica amb `float` pot generar petits errors.

  - `0.1 + 0.2` no és exactament `0.3`.


```python
>>> 0.1 + 0.2
0.30000000000000004
>>> 0.1 + 0.2 == 0.3
False
```

  - **Solució**: Per comparar reals, utilitzeu un marge d'error (`ε`).
      - `abs(x - y) < 1e-9` en lloc de `x == y`.

---

class: center, middle

# El tipus Text

##  (`str`)

---

# Literals `str`

  - **Literals**: Seqüències de caràcters entre cometes simples (`'...'`) o dobles (`"..."`).

      - Exemples: `'Jordi'`, `"Hola"`, `''` (text buit).

      - `'666'` (text) és diferent de `666` (enter).

  - **Caràcters**: Python utilitza l'estàndard **Unicode**.

      - Permet qualsevol símbol: `'I 🧡 E = mc² 😛!'`.

      - Caràcters de control: `\n` (salt de línia), `\t` (tabulador), `\\` (barra).

---

# Operacions bàsiques amb `str`

  - **Concatenació (`+`)**: `'Black' + 'field'` → `'Blackfield'`

  - **Repetició (`*`)**: `'19' * 3` → `'191919'`

  - **Llargada (`len`)**: `len('I 💜 you')` → `7`

  - **Comparació (`<`, `>`, `==`, ...)**: Segueix un ordre alfabètic.

---

# Texts amb format (f-strings)

  - Permeten incrustar expressions dins d'un text utilitzant `{}`.

  - S'han de prefixar amb una `f`.


```python
>>> nom = 'James'
>>> cognom = 'Bond'
>>> f'El meu nom és {cognom}, {nom} {cognom}'
'El meu nom és Bond, James Bond'
```

```python
>>> a = 3.199
>>> b = 2.236
>>> f'La suma de {a:.02f} i {b:.02f} és {a+b:.02f}'
'La suma de 3.20 i 2.24 és 5.44'
```

---

# Alineació i farciment

```python
>>> s = 'Python'
>>> f'{s:>20}'  # Dreta
'              Python'
>>> f'{s:<20}'  # Esquerra
'Python              '
>>> f'{s:^20}'  # Centrat
'       Python       '
>>> f'{s:*>20}' # Farciment amb '*'
'**************Python'
```

---

# Texts multilínia

  - S'escriuen entre tres cometes (`'''...'''` o `"""..."""`).

  - Respecten els salts de línia i espais.


```python
poema = '''
La ginesta altre vegada,
la ginesta amb tanta olor,
és la meva enamorada
que ve al temps de la calor.

            — Joan Maragall
'''
```

  - També poden ser textos amb format (`f'''...'''`).

---


class: center, middle

# El tipus booleà

## (`bool`)

---

# Concepte `bool`

  - Representa valors de veritat: **cert** o **fals**.

  - Basat en l'Àlgebra de Boole.

  - Els dos únics literals són `True` i `False` (compte amb les majúscules).

---

# Operadors lògics

  - **Negació**: `not`

  - **Disjunció**: `or`

  - **Conjunció**: `and`

---

# Taules de veritat

| `a` | `not a` |
|---|---|
| `False` | `True` |
| `True` | `False` |

<br/>

| `a` | `b` | `a or b` | `a and b` |
|---|---|---|---|
| `False` | `False` | `False` | `False` |
| `False` | `True` | `True` | `False` |
| `True` | `False` | `True` | `False` |
| `True` | `True` | `True` | `True` |

---

# Ús dels booleans

  - Les condicions en `if` i `while` són expressions booleanes.

  - Podem guardar resultats lògics en variables.


```python
# 'temperatura <= 0' és una expressió booleana
if temperatura <= 0 and llum == 0:
    ... # Gela i és fosc

# Guardem la condició en una variable
gela = temperatura <= 0
es_fosc = llum == 0
anar_amb_compte = gela and es_fosc
if anar_amb_compte:
    ...
```

---

# Lleis de De Morgan

  - `not (a or b)` és equivalent a `(not a) and (not b)`

  - `not (a and b)` és equivalent a `(not a) or (not b)`

**Exemple**: El contrari de "gela **i** és fosc" és "no gela **o** no és fosc".

---

# Estil de codi amb booleans

## Bon estil 💜

```python
# Comprovar si és cert
if trobat:
    ...

# Comprovar si és fals
if not trobat:
    ...

# Assignació directa
gela = temperatura <= 0
```

## Mal estil 💩

```python
# No comparar explícitament amb True/False
if trobat == True:
    ...
if trobat == False:
    ...

# No usar un if/else per assignar un booleà
if temperatura <= 0:
    gela = True
else:
    gela = False
```