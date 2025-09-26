class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# Inici

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya

---

class: center, middle

# Programes que saluden 👋

---

# Primer programa

La instrucció `print` serveix per escriure text per pantalla.

```python
print('Hola a tothom!')
```

  - És una **instrucció d'escriptura**.
  - El text (string) s'ha de posar entre cometes.


---

# Salutació amb una variable

Podem desar dades en **variables** mitjançant una **assignació** (`=`).

```python
nom = 'Mireia'
print('Hola', nom)
```

  - `nom` és la **variable**.
  - `'Mireia'` és el **valor** (la dada).
  - Les instruccions s'executen de forma **seqüencial**, de dalt a baix.
  - `print` separa els seus arguments amb un espai.

---

# Salutació interactiva: `input`

La instrucció `input` serveix per llegir dades de l'usuari.

```python
nom = input('Com et dius? ')
print('Hola', nom)
```

  - És una **instrucció de lectura** (entrada de dades).
  - Mostra un missatge a l'usuari (el text entre parèntesis).
  - El valor que l'usuari introdueix es desa a la variable `nom`.

---

# Entrada i Sortida

La interacció amb l'usuari es fa mitjançant:

  - **Entrada**: L'ordinador llegeix dades de l'usuari.
      - `input()`
  - **Sortida**: L'ordinador escriu dades per a l'usuari.
      - `print()`

---

class: center, middle

# Programes que calculen 🧮

---

# Calculadora de productes

```python
# Calculadora de productes.

# lectura de les dades d'entrada
x = int(input('Digues un número: '))
y = int(input('Digues un altre número: '))

# càlcul del producte
p = x * y

# escriptura de la dada de sortida
print('El producte és', p)
```

---

# Elements nous

  - **Comentaris**: Comencen amb `#`. Són ignorats per l'ordinador i serveixen per documentar el codi.

    ```python
    # Això és un comentari
    ```

  - **Llegir nombres enters**: Per llegir un nombre, cal convertir el text rebut per `input` a un enter amb `int()`.

    ```python
    x = int(input('Digues un número: '))
    ```

---

# Operacions Aritmètiques

| Operació | Operador |
| :--- | :---: |
| Suma | `+` |
| Resta | `-` |
| Producte | `*` |
| Divisió entera | `//` |
| Residu de la divisió | `%` |
| Exponenciació | `**` |

---

class: center, middle

# Programes que dibuixen 🐢

---

# Dibuixar un rectangle

```python
# Dibuixa un rectangle

import turtle

amplada = int(input('Amplada? '))
alcada = int(input('Alçada? '))

turtle.forward(amplada)
turtle.left(90)
turtle.forward(alcada)
turtle.left(90)
turtle.forward(amplada)
turtle.left(90)
turtle.forward(alcada)
turtle.left(90)
```

---

# La Tortuga de Python

  - Per utilitzar la tortuga, primer cal importar el **mòdul** `turtle`.

    ```python
    import turtle
    ```

  - La tortuga és un cursor virtual que dibuixa a la pantalla.

  - Les accions del mòdul s'invoquen amb `turtle.accio()`.

### Comandes bàsiques

  - `turtle.forward(distancia)`: Avança.
  - `turtle.left(angle)`: Gira a l'esquerra (en graus).
  - `turtle.right(angle)`: Gira a la dreta (en graus).

---

# Més comandes de la Tortuga

### Moviment

  - `turtle.backward(d)`: Recula.
  - `turtle.circle(r)`: Dibuixa un cercle de radi `r`.
  - `turtle.home()`: Torna a la posició inicial.

### Llapis

  - `turtle.penup()`: Aixeca el llapis (no pinta).
  - `turtle.pendown()`: Baixa el llapis (pinta).
  - `turtle.pensize(s)`: Canvia el gruix del traç.
  - `turtle.color(c)`: Canvia el color del llapis (ex: `'red'`, `'blue'`).

---

class: center, middle

# Variables, assignacions i expressions

---

# Variables i Assignacions

Una **assignació** desa una dada en una **variable**.

```python
variable = dada
```

  - Es llegeix: "*variable pren per valor dada*".
  - No és una igualtat matemàtica.


```python
jugador10 = 'Messi'
mida = 52
```

---

# Les variables són... variables\!

El valor d'una variable pot canviar durant l'execució del programa.

```python
x = 10
print(x)  # Escriu 10

x = 20
print(x)  # Escriu 20
```

  - Quan una variable rep un nou valor, **el valor anterior es perd**.

---

# Inicialització de variables

  - Una variable ha de rebre un primer valor (**inicialitzar-se**) abans de poder ser llegida.
  - Intentar utilitzar una variable no inicialitzada provoca un error (`NameError`).


```python
# Aquest codi peta! 💣
print(x)
x = 52
```

---

# Una assignació clau: l'increment

Com funciona `i = i + 1`?

```python
i = 12
print(i) # Escriu 12
i = i + 1
print(i) # Escriu 13
```

1.  **S'avalua la part dreta**: Es calcula el valor de `i + 1` (que és `12 + 1 = 13`).
2.  **S'assigna el resultat**: El resultat (13) es desa a la variable de l'esquerra (`i`).

---

# Un error freqüent a evitar

Les assignacions **NO** són retroactives. S'executen seqüencialment.

```python
a = 6
b = a * 2   # b pren el valor 6 * 2 = 12
a = a + 1   # a pren el valor 6 + 1 = 7
```

  - Al final, `a` val 7 i `b` val 12.
  - El valor de `b` no es recalcula automàticament quan `a` canvia.

---

# Intercanvi de dues variables

**Problema**: Tenim dues variables, `a` i `b`. Com intercanviem els seus valors?

**Solució incorrecta**:

```python
a = b  # El valor original de 'a' es perd
b = a
```

**Solució correcta** (amb una variable auxiliar):

```python
# c guarda el valor original de a
c = a
# a ja pot rebre el valor de b
a = b
# b rep el valor original de a, que havíem guardat a c
b = c
```

---

# Expressions

Una **expressió** és una combinació de valors, variables i operadors que Python pot avaluar per produir un resultat.

```python
# 'g' i 't' són variables
g = 9.8
t = 2

# 0.5 * g * (t**2) és una expressió
posicio = 0.5 * g * (t**2)

print('La posició és', posicio)
```

  - Es pot escriure una expressió a qualsevol lloc on s'esperi un valor.