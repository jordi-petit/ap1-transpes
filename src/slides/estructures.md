class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# Estructures

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya

---

# Estructures

Una **estructura** és una col·lecció de dades relacionades emmagatzemades com un tot.

Cada dada s'anomena **camp** i té un nom i un tipus.

Són mutables i s'accedeix als camps per nom.

---

# Analogia: Formularis

<img src="./img/estructures/formulari.png" style="height: 20em; display: flex; margin: auto;">

Una definició d'estructura és com una plantilla de formulari.

Una variable d'aquell tipus (instància) és com un formulari omplert.

---

# Definició: `dataclasses`

En Python, es defineixen amb `@dataclass` dins d'una `class`.

Cada camp es defineix amb el seu nom i el seu tipus.

<br/>
```python
from dataclasses import dataclass

@dataclass
class Pellicula:
    identificador: int
    titol:         str
    director:      str
    any:           int
    blanc_i_negre: bool
```

---

# Creació d'instàncies

Es creen instàncies cridant al tipus com si fos una funció (un **constructor**).

Els valors s'assignen per ordre.

<br/>
```python
p1 = Pellicula(
    1001,
    "Star Wars IV",
    "George Lucas",
    1977,
    False,
)

p2 = Pellicula(
    1234,
    "The Kid",
    "Buster Keaton",      # incorrecte!
    1921,
    True,
)
```

---

# Accés i modificació de camps

S'accedeix als camps amb la notació variable`.`camp.

Es poden consultar i modificar.

<br/>
```python
# Consultar

print(p1.titol)
print(p2.titol)

if p1.any < p2.any:
    print("Anterior")
else:
    print("Posterior")

# Modificar
p2.director = "Charlie Chaplin"

# Error: camp inexistent 💣
print(p1.protagonista)  
```

---

# Estructures vs. Tuples

1.  **Accés als camps**:

      * Tuples: per posició (`t[1]`). Cal recordar l'ordre.

      * Estructures: per nom (`p1.titol`). Més llegible.


2.  **Mutabilitat**:

      * Tuples: són **immutables** (no es poden canviar els seus camps).

      * Estructures: són **mutables** (es poden canviar els seus camps).
      

---

class: center, middle

## Estructures

# Rellotge despertador

---

# Rellotge despertador

<img src='./img/rellotge-digital.png' style='height: 6em; display: flex; margin: auto;'>

Definició del tipus:

  * Definim una estructura `Hora` amb tres camps enters: `h`, `m`, `s`.

  * Podem donar valors per defecte.

```python
@dataclass
class Hora:
    h: int = 0      # hora  (0..23)
    m: int = 0      # minut (0..59)
    s: int = 0      # segon (0..59)
```

---

# Rellotge: Construcció de valors

  * Constructor posicional:

    ```python
    migdia = Hora(12, 0, 0)
    ```

  * Constructor amb paràmetres anomenats:

    ```python
    alarma = Hora(s=0, m=30, h=7)  # 07:30:00
    ```

  * Utilitzant valors per defecte:

    ```python
    alarma = Hora(m=30, h=7)    # 07:30:00, s=0 per defecte
    alarma = Hora(7, 30)        # 07:30:00, s=0 per defecte
    mitjanit = Hora()           # 00:00:00, h=m=s=0 per defecte
    ```

---

# Rellotge: Operacions (I)

  * Acció per escriure una hora:

    ```python
    def escriure_hora(hora: Hora) -> None:
        print(f'{hora.h:02d}:{hora.m:02d}:{hora.s:02d}')
    ```

  * Acció per incrementar un segon (modifica el paràmetre):

    ```python
    def incrementar_un_segon(hora: Hora) -> None:
        hora.s += 1
        if hora.s == 60:
            hora.s = 0
            hora.m += 1
            if hora.m == 60:
                hora.m = 0
                hora.h += 1
                if hora.h == 24:
                    hora.h = 0
    ```

---

# Rellotge: Operacions (II)

  * Funció per incrementar un segon (retorna una nova instància):

  ```python
  import dataclasses

  def un_segon_mes_tard(hora: Hora) -> Hora:
      despres = dataclasses.replace(hora)
      despres.s += 1
      if despres.s == 60:
          despres.s = 0
          despres.m += 1
          if despres.m == 60:
              despres.m = 0
              despres.h += 1
              if despres.h == 24:
                  despres.h = 0
      return despres
  ```

  Es fa una còpia amb `dataclasses.replace` per no modificar l'original.

---

# Rellotge: Programa Principal

```python
import time
# ... (definició de Hora i funcions)

def main() -> None:
    hora = Hora(23, 59, 55)
    alarma = Hora(7, 30)
    while True:
        escriure_hora(hora)
        # La comparació amb == funciona camp a camp
        if hora == alarma:
            print('ring ring!')
        time.sleep(1)
        incrementar_un_segon(hora)

if __name__ == '__main__':
    main()
```


---

class: center, middle

## Estructures

# Aplicació: Polígons Simples

---

# Aplicació: Polígons Simples

<img src='./img/estructures/poligons.png' style='height: 15em; display: flex; margin: auto;'>

Volem manipular polígons simples per calcular-ne el perímetre i l'àrea.

Necessitarem un tipus per a **punts** i un altre per a **polígons**.


---

# Polígons: Tipus `Punt`

  * Un punt en el pla té dues coordenades (x, y).

  ```python
  @dataclass
  class Punt:
      x: float
      y: float
  ```

  * Podem definir operacions sobre punts, com la distància.

  ```python
  def distancia(p: Punt, q: Punt) -> float:
      """Retorna la distància euclidiana entre dos punts."""

      return ((p.x - q.x) ** 2 + (p.y - q.y) ** 2) ** 0.5
  ```

---

# Polígons: Tipus `Poligon`

<img src='./img/estructures/poligon-amb-coords.png' style='height: 10em; display: flex; margin: auto; '>

* Un polígon es pot representar com una llista de vèrtexs (`Punt`).

  ```python
  Poligon: TypeAlias = list[Punt]   # from typing import TypeAlias
```

* Creem un polígon com una llista d'instàncies de `Punt`.

  ```python
  pol = [ Punt(6, 5), Punt(0, 8), Punt(-5, 3), Punt(-2, -4), Punt(6, -1) ]
  ```

* Accés: `pol[2].x` retorna -5.
      * `pol` és una `list`, `pol[2]` selecciona el segon element.
      * `pol[2]` és un `Punt`, `.x` selecciona el seu camp `x` (un `float`).

---

# Polígons: Perímetre

  * Sumem les distàncies entre punts consecutius, <br/>
  incloent la distància entre el darrer i el primer.

  ```python
  def perimetre(poligon: Poligon) -> float:
      """Retorna el perímetre d'un polígon simple."""

      n = len(poligon)
      p = distancia(poligon[-1], poligon[0])
      for i in range(n - 1):
          p += distancia(poligon[i], poligon[i + 1])
      return p
  ```

  * Més compacte:

  ```python
  def perimetre(poligon: Poligon) -> float:
      n = len(poligon)
      return sum([distancia(poligon[i], poligon[i+1]) for i in range(-1, n-1)])
  ```

---

# Polígons: Àrea

  * Podem calcular l'àrea amb la **fórmula de Gauss**.

  ```python
  def area(poligon: Poligon) -> float:
      """Retorna l'àrea d'un polígon simple."""

      n = len(poligon)
      s = poligon[n - 1].x * poligon[0].y - poligon[0].x * poligon[n - 1].y
      for i in range(n - 1):
          s += poligon[i].x * poligon[i + 1].y - poligon[i + 1].x * poligon[i].y
      return s / 2
  ```


---

class: center, middle

## Estructures

# Ordenació d'Estructures

---

# Ordenació d'Estructures

Per defecte, les estructures no es poden ordenar amb `<`, `>`, etc.

```python
@dataclass
class Hora:
    h: int
    m: int
    s: int

>>> L = [Hora(15,30,0), Hora(9,0,0)]
>>> sorted(L)
TypeError: "'<' not supported between instances of 'Hora' and 'Hora'"
```

---

# Ordenació amb `key`

Es pot proporcionar una funció al paràmetre `key` que retorna un valor numèric per a cada element, que sí que es pot ordenar.

```python
def nombre_de_segons(hora: Hora) -> int:
    """Retorna el nombre de segons acumulats en una hora."""
    return hora.s + hora.m * 60 + hora.h * 60 * 60

L = [Hora(15,30,0), Hora(14,49,59), Hora(9,0,0)]

# Ordenem segons el resultat de la funció key
>>> sorted(L, key=nombre_de_segons)
[Hora(h=9, m=0, s=0), Hora(h=14, m=49, s=59), Hora(h=15, m=30, s=0)]
```

---

# Ordenació amb `cmp_to_key`

S'utilitza quan és més fàcil definir com comparar dos elements entre si que assignar un valor numèric a cadascun.

Cal una funció de comparació que, donats dos valors, ha de retornar:

* **Negatiu**: si el primer element és menor que el segon

* **Zero**: si són iguals

* **Positiu**: si el primer element és major que el segon

---

# `cmp_to_key`: Exemple

**Problema**: Ordenar rectangles per àrea (ascendent), després per perímetre (descendent) i finalment per amplada (ascendent).

```python
from dataclasses import dataclass
from functools import cmp_to_key

@dataclass
class Rectangle:
    amplada: int
    alçada: int

def comparacio(r1: Rectangle, r2: Rectangle) -> int:
    a1, a2 = r1.amplada * r1.alçada, r2.amplada * r2.alçada
    if a1 != a2: return a1 - a2  # Criteri 1: àrea

    p1, p2 = r1.amplada + r1.alçada, r2.amplada + r2.alçada
    if p1 != p2: return p2 - p1  # Criteri 2: perímetre (invers)

    return r1.amplada - r2.amplada # Criteri 3: amplada

L = [Rectangle(2, 4), Rectangle(6, 6), Rectangle(4, 9)]
print(sorted(L, key=cmp_to_key(comparacio)))
```