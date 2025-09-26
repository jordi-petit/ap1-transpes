class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# Lectura i Escriptura en Python

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya

---

class: center, middle

# Conceptes Fonamentals

---

# Entrada-Sortida (E/S)

  - **Entrada**: Procés de rebre dades de fonts externes.
      - Exemples: teclat, ratolí, fitxers.
  - **Sortida**: Procés de lliurar dades a l'usuari o a altres dispositius.
      - Exemples: pantalla, impressora, altaveus.


# Canals Estàndard

El sistema operatiu proporciona canals de comunicació estàndard:

  - **`stdin` (Standard Input)**
      - Canal d'entrada per defecte (normalment el teclat).
  - **`stdout` (Standard Output)**
      - Canal de sortida per defecte (normalment la pantalla).

Aquests canals permeten que els programes llegeixin i escriguin dades sense conèixer els detalls dels dispositius.

---

class: center, middle

# Escriptura amb `print`

---

# La Funció `print`

La instrucció `print` serveix per escriure dades al canal de sortida estàndard (`stdout`).

Per defecte, afegeix un **salt de línia** al final.

```python
>>> print('Hola')
Hola
>>> print(2023)
2023
>>> var = 3.1416
>>> print(var)
3.1416
```

---

# `print` amb Múltiples Arguments

Es poden passar diversos valors a `print` separats per comes. Per defecte, els separa amb un espai.

Si no té arguments, escriu una línia buida.

```python
>>> print('Hola', 'Jordi')
Hola Jordi
>>> print(31, 12, 2023)
31 12 2023
>>> print()

>>> print(2023, 'Carles', 0.5)
2023 Carles 0.5
```

---

# Modificar `print` amb `sep`

El paràmetre `sep` (`separator`) canvia el text que separa els elements.

```python
>>> print('Hola', 'Jordi', sep='_')
Hola_Jordi
>>> print(31, 12, 2023, sep='_')
31_12_2023
>>> print(31, 12, 2023, sep='')
31122023
>>> print(31, 12, 2023, sep='   ')
31   12   2023
```

---

# Modificar `print` amb `end`

El paràmetre `end` canvia el text que s'escriu al final de tot. El valor per defecte és un salt de línia (`\n`).

```python
>>> print('Hola', 'Jordi', end='.')
Hola Jordi.>>> print('Hola', 'Jordi', end='\n\n')
Hola Jordi

>>>
```

---

# Combinant `sep` i `end`

Es poden utilitzar els dos paràmetres a la vegada per personalitzar completament la sortida.

```python
>>> print('Amalia', 'Maria', 'Emma', sep=',', end='.')
Amalia,Maria,Emma.>>>
```

---

class: center, middle

# Lectura amb el paquet `yogi`

---

# La Funció `input` i les seves Limitacions

  - La instrucció `input` de Python llegeix dades des de `stdin`.
  - Només permet llegir **una línia de text sencera**.
  - Per a una lectura més precisa i eficaç, en aquest curs farem servir el paquet `yogi`.

**Instal·lació:** `pip3 install yogi`

---

# Lectura amb `yogi.read`

1.  **Importar** el paquet: `import yogi`.
2.  **Llegir** especificant el tipus de dada:
      - `yogi.read(int)` per a enters.
      - `yogi.read(float)` per a reals.
      - `yogi.read(str)` per a paraules.


```python
>>> import yogi
>>> i = yogi.read(int)
12
>>> i
12
>>> f = yogi.read(float)
3.14
>>> f
3.14
>>> s = yogi.read(str)
Setembre
>>> s
'Setembre'
```

---

# Flexibilitat de `yogi.read`

`yogi` llegeix dades separades per espais o salts de línia de manera indiferent.

```python
>>> print(yogi.read(int) + yogi.read(int))
3 4
7
```

```python
>>> print(yogi.read(int) + yogi.read(int))


3



          4
7
```

---

# Errors de Tipus

Si el tipus de la dada llegida no coincideix amb l'esperat, es produeix un error.

```python
>>> i = yogi.read(int)
23.56
ValueError: invalid literal for int() with base 10: '23.56'
```

---

# Importar `read` Directament

Per estalviar haver d'escriure `yogi.` cada vegada, es pot importar la funció directament.

Això és convenient per a programes curts.

```python
>>> from yogi import read
>>> print(read(int) + read(int))
3 4
7
```