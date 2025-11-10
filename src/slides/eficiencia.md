class: center, middle

# Algorísmia i Programació 1

<img src="img/ap1.png" style="height: 10em;">

# Eficiència dels algorismes

<br>

## Jordi Petit

Departament de Ciències de la Computació
<br>Universitat Politècnica de Catalunya


---

class: center, middle

## Eficiència dels algorismes

# Introducció

---

# Recursos

Per executar un algorisme calen recursos:

  * Temps

  * Memòria

  * Processadors

  * Energia

  * Ample de banda

<br/>

Els recursos són limitats i tenen un cost (*time is money\!*).

Un algorisme **eficient** resol un problema utilitzant la menor quantitat possible de recursos.

---

# Mesures Empíriques

Mesurar el temps que triga un algorisme en un computador concret.

**Problemes:**

* Depèn del computador, llenguatge de programació, compilador, sistema operatiu, càrrega del sistema...

* Aquests detalls són tecnològics i canvien amb el temps.

* Només és vàlida per a una entrada concreta.

* Pressuposa que l'algorisme ja està implementat.

---

# Anàlisi Matemàtica

  * Alternativa a les mesures empíriques.

  * Aplica tècniques matemàtiques per estudiar rigorosament l'eficiència.

  * Permet estudiar l'eficiència independentment dels factors tecnològics.

  * Obté resultats més generals i duradors.

---

# Funció de Cost


L'eficiència o cost és una funció $T$ de l'entrada $A$ a $\mathbb{N}$

$$T : A \rightarrow \mathbb{N}$$

que mesura l'ús de cert recurs (temps, espai, etc.) per a cada entrada $x \in A$.

<br/>

--

Caracteritzar $T$ per a cada entrada $x\in A$ és complicat.

Simplifiquem restringint-nos en funció de la mida de l'entrada ($n$).

Per això, $A_n = \\{ x \in A \mid \text{mida}(x) = n \\}$.



---

# Cas Pitjor, Millor i Mitjà


  * **Cost en el cas pitjor:**
    <div>
    $$
    T_{pitjor}(n) = \max_{x\in A_n} T(x)
    $$
    </div>

  * **Cost en el cas millor:**
    <div>
    $$
    T_{millor}(n) = \min_{x\in A_n} T(x)
    $$
    </div>

  * **Cost en el cas mitjà:**

    <div>
    $$
    T_{mitja}(n) = \sum_{x\in A_n} \text{Pr}(x) T(x)
    $$
    </div>


--

Sovint ens fixarem en el **cost en cas pitjor**:

* Proporciona garanties sobre l'eficiència (el cost mai l'excedirà).

* És més fàcil de calcular que el cost mitjà (que requereix conèixer la distribució de probabilitat de les entrades).


---

# Exemple: Trobar el Mínim

Problema: Calcular el mínim d'una llista (no buida) d'enters.


```python
def trobar_minim(llista: list[int]) -> int:
    n = len(llista)
    minim = llista[0]
    i = 1
    while i < n:
        if llista[i] < minim:
            minim = llista[i]
        i += 1
    return minim
```

---

```python
def trobar_minim(llista: list[int]) -> int:
    n = len(llista)
    minim = llista[0]
    i = 1
    while i < n:
        if llista[i] < minim:
            minim = llista[i]
        i += 1
    return minim
```


Assignem temps a cada operació elemental:

* $T_a$: assignació
* $T_i$: increment
* $T_c$: comparació
* $T_l$: accés a llista
* $T_r$: retorn

Fita superior:
    $$T(n) \le (3T_a + T_l) + (n - 1)(2T_c + T_l + T_i + T_a) + T_c + T_r$$

Fita inferior:
    $$T(n) \ge (3T_a + T_l) + (n - 1)(T_c + T_l + T_i) + T_c + T_r$$

---

# Simplificació de l'Anàlisi

  * Agrupant les constants $T_a, T_i$, etc. en noves constants $a$ i $b$, podem reescriure el temps:
    $$T(n) \le an + b$$

  * El que realment ens interessa és com es comporta l'algorisme quan $n$ és **gran**.

  * En aquest cas, el terme $b$ és menyspreable en comparació amb $an$.

  * Podem simplificar encara més:
    $$T(n) \le c n$$


  * El temps que triga l'algorisme creix, com a molt, de manera **lineal** amb $n$.

  * El factor $c$ depèn de la tecnologia, però el creixement lineal és una **propietat intrínseca** de l'algorisme.

  * Per expressar-ho, utilitzarem la notació **O gran**:
    $$T(n) = O(n)$$


---

class: center, middle

## Eficiència dels algorismes

# Ordres de Magnitud

---

# Comparació de Funcions

  * Quan $n$ és molt gran, ens interessa el **terme dominant** i ignorem constants.

  * $f(n) = 3n^2 + 2n + 23$

      * Creixement **quadràtic**.
      * Ordre $n^2$.

  * $g(n) = 5n^3 + 0.1n^2 + 1000$

      * Creixement **cúbic**.
      * Ordre $n^3$.

  * $h(n) = 3\log (n+1) + 1/n$

      * Creixement **logarítmic**.
      * Ordre $\log n$.

  * Essencialment, $h \ll f \ll g$.

---

# Ordres de Magnitud Comuns

| Ordre de magnitud | Descripció |
|-------------------|------------|
| $1$ | Constant |
| $\approx \log n$ | Logarítmic |
| $\approx n$ | Lineal |
| $\approx n\log n$ | Quasilineal |
| $\approx n^2$ | Quadràtic |
| $\approx n^3$ | Cúbic |
| $\approx n^c$ | Polinòmic |
| $\approx c^n$ | Exponencial |
| $\approx n!$ | Factorial |

---

# Comparació Visual (n petita)

  * Per a valors petits d'$n$, les diferències poden no ser tan evidents.

<img src="img/eficiencia/funcions-petites.svg" style="width: 85%; display: block; margin: auto; background: white; margin-bottom: 20px;" >

---

# Comparació Visual (n gran)

  * A mesura que $n$ creix, les diferències es fan extremadament pronunciades i dramàtiques.

<img src="img/eficiencia/funcions-grans.svg" style="width: 85%; display: block; margin: auto; background: white; margin-bottom: 20px;" />

---

# Temps d'Execució (1 op = 1 ns)

| **Funció** | **Temps per n = 10³** | **Temps per n = 10⁴** | **Temps per n = 10⁵** |
|----------|----------------:|----------------:|----------------:|
| $\log_2 n$ | 10 ns | 13.3 ns | 16.6 ns |
| $\sqrt{n}$ | 31.6 ns | 100 ns | 316 ns |
| $n$ | 1 µs | 10 µs | 100 µs |
| $n \log_2 n$ | 10 µs | 133 µs | 1.7 ms |
| $n^2$ | 1 ms | 100 ms | 10 s |
| $n^3$ | 1 s | 16.7 min | 11.6 dies |
| $n^4$ | 16.7 min | 116 dies | 3171 anys |
| $2^n$ | $3.4 \times 10^{284}$ anys | $6.3 \times 10^{2993}$ anys | $3.2 \times 10^{30086}$ anys |

---

# Límits Pràctics (Big Data)

  * Temps d'execució assumint 1 operació = 1 microsegon (µs).

<img src="img/eficiencia/bigdata.png" style="width: 95%; display: block; margin: auto;" />

  * Una millora hardware (p.ex. 10x) no soluciona un mal ordre de magnitud.

  * L'única alternativa real és disposar d'algorismes més eficients (ordres de magnitud més baixos).

---

class: center, middle

## Eficiència dels algorismes

# Notació Asimptòtica

---

# Notació O Gran

  * **Definició:** $O(g)$ és el conjunt de funcions $f$ tals que:
  <div>
    $$O(g) = \{ f: \mathbb{N} \rightarrow \mathbb{N} \mid \exists c \in \mathbb{N} \; : \exists n_0 \in \mathbb{N} \; : \forall n \ge n_0 \; : f(n) \le c \cdot g(n) \}$$
  </div>

  * $f$ creix **com a màxim** tan ràpidament com $g$.

  * Ignora constants multiplicatives i termes d'ordre menor (per a $n \ge n_0$).

## Exemple:

  * **Afirmació:** $f(n) = 3n^2 + 100n + 5 \in O(n^2)$

  * **Demostració:**

      * Cal trobar constants $c$ i $n_0$ tals que per a tot $n \ge n_0$:
      * $3n^2 + 100n + 5 \le c \cdot n^2$
      * Podem triar $c = 4$ i $n_0 = 101$.

---

# Notació $\Omega$

  * **Definició:** $\Omega(g)$ és el conjunt de funcions $f$ tals que:
  <div>
    $$\Omega (g) = \{ f: \mathbb{N} \rightarrow \mathbb{N} \mid \exists c \in \mathbb{N} \; : \exists n_0 \in \mathbb{N} \; : \forall n \ge n_0 \; : f(n) \ge c \cdot g(n) \}$$
  </div>

  * $f$ creix **com a mínim** tan ràpidament com $g$.

<br/>

# Notació $\Theta$

  * **Definició:** $\Theta(g)$ és el conjunt de funcions $f$ tals que:
  <div>
    $$\Theta (g) = \{ f: \mathbb{N} \rightarrow \mathbb{N} \mid \exists c_1, c_2 \in \mathbb{N} \; : \exists n_0 \in \mathbb{N} \; : $$
  </div>
  <div>
    $$ \forall n \ge n_0 \; : c_1 g(n) \le f(n) \le c_2 g(n) \}$$
  </div>

  * $f$ creix **exactament** com $g$ (ignorant constants).


---

# Convenció

Malgrat que $O(g)$ és un conjunt de funcions, sovint s'escriu:
$$f(n) = O(g(n))$$
per indicar
$$f \in O(g)$$

És una convenció àmpliament utilitzada que facilita la comunicació.

Exemple:
$$3(n− 1)(n + 2) = 3n^2 + 3n− 6 = O(n^2)$$


---

# Propietats

  * $f = \Omega(g) \Longleftrightarrow g = O(f)$

  * $\Theta(f) = O(f) \cap \Omega(f)$

  * $f = \Theta(g) \Longleftrightarrow f = O(g)$ i $f = \Omega(g)$

  * **Simetria:** $g = \Theta(f) \Longleftrightarrow f = \Theta(g)$

  * **Suma (Regla del més fort):**

      * $O(f_1) + O(f_2) = O(f_1 + f_2) = O(\max(f_1, f_2))$
      * $\Theta(f_1) + \Theta(f_2) = \Theta(f_1 + f_2) = \Theta(\max(f_1, f_2))$

  * **Producte:**

      * $O(f_1) \cdot O(f_2) = O(f_1 \cdot f_2)$
      * $\Theta(f_1) \cdot \Theta(f_2) = \Theta(f_1 \cdot f_2)$


---

class: center, middle

## Eficiència dels algorismes

# Anàlisi d'Algorismes Iteratius

---

# Exemple: `trobar_minim` (Revisitat)

```python
def trobar_minim(llista: list[int]) -> int:
    n = len(llista)             # O(1)
    minim = llista[0]           # O(1)
    i = 1                       # O(1)
    while i < n:                # n iteracions
        if llista[i] < minim:   # O(1)
            minim = llista[i]   # O(1) (en el pitjor cas)
        i += 1                  # O(1)
    return minim                # O(1)
```

  * El cost de cada instrucció elemental és $O(1)$ (constant).

  * Temps total $T(n)$: Cost abans del bucle + Cost del bucle + Cost després del bucle.

  <div>
  $$
  \begin{align*}
    T(n) &= O(1) + (n - 1) \cdot O(1) + O(1) \\
           &= O(1) + O(n-1) + O(1)\\
           &= O(n)\\
  \end{align*}
  $$
  </div>


---

# Temps de Bucles Habituals

Suposant que `f()` té cost $O(1)$.

* **Bucle simple:**

  ```python
  for i in range(n):
      f()
  ```

  $T(n) = n \cdot O(1) = O(n)$


* **Bucles seqüencials:**

  ```python
  for i in range(n):
      f()
  for i in range(n):
      f()
  ```

  $T(n) = O(n) + O(n) = O(n)$


---

# Temps de Bucles Habituals

* **Bucles aniuats (Quadràtic):**

    ```python
    for i in range(n):
        for j in range(n):
            f()
    ```

    $T(n) = n \cdot (n \cdot O(1)) = O(n^2)$


* **Bucles aniuats (Triangular):**

    ```python
    for i in range(n):
        for j in range(i):
            f()
    ```

    <div>
    $T(n) = \sum_{i=0}^{n-1} i \cdot O(1) = O(1)\sum_{i=0}^{n-1} i = O(1) \cdot \frac{(n-1)n}{2} = O(n^2)$
    </div>

---

# Regla del Més Fort (Seqüència)

El temps total és dominat pel terme (part) que creix més ràpidament.


```python
f1(n)       # cost O(n)
f2(n)       # cost O(n^2)
```

  * Temps total:
    $$T(n) = O(n) + O(n^2) = O(n^2)$$

  * Per optimitzar l'algorisme, cal centrar-se en millorar `f2(n)`.

---

# Regla del Més Fort (Condicional)

El temps total és el cost del pitjor cas entre les branques.


```python
f1(n)       # cost O(n)
if condició:
    f2(n)   # cost O(n^2)
else:
    f3(n)   # cost O(n^3)
```

  * Temps total (cas pitjor):
    $$T(n) = O(n) + \max(O(n^2), O(n^3)) = O(n^3)$$

---

class: center, middle

## Eficiència dels algorismes

# Anàlisi d'Algorismes Recursius

---

# Relacions de Recurrència

  * Per analitzar algorismes recursius, utilitzem **relacions de recurrència**.

  * Expressem el temps d'execució $T(n)$ en funció del temps de les crides recursives més petites.

---

# Recursivitat: Exemple 1

```python
def f(n: int) -> None:
    if n > 0:
        g()             # cost O(1)
        f(n - 1)
```

  * **Relació de recurrència:**

      * $T(0) = O(1)$
      * $T(n) = O(1) + T(n - 1) \quad$ (per $n > 0$)

  * **Resolució per substitució iterativa:**

      * $T(n) = O(1) + T(n - 1)$
      * $T(n) = O(1) + (O(1) + T(n - 2)) = 2 \cdot O(1) + T(n - 2)$
      * $T(n) = 3 \cdot O(1) + T(n - 3)$
      * ...
      * $T(n) = n \cdot O(1) + T(0)$
      * $T(n) = n \cdot O(1) + O(1) = O(n)$

---

# Recursivitat: Exemple 2

```python
def f(n: int) -> None:
    if n > 0:
        g(n)           # cost O(n)
        f(n // 2)
```

  * **Relació de recurrència:**
    - $T(n) = O(n) + T(n/2)$

  * **Resolució per substitució:**

      * $T(n) = n + T(n/2)$
      * $T(n) = n + n/2 + T(n/4)$
      * $T(n) = n + n/2 + n/4 + T(n/8)$
      * $T(n) = n + n/2 + n/4 + n/8 + \dots + T(0)$

  * Aquesta és una sèrie geomètrica que convergeix a $2n$:

    <div>
    $$\sum_{k=0}^{\log n} \frac{n}{2^k} = n \sum_{k=0}^{\log n} (\frac{1}{2})^k \le 2n$$
    </div>

  * $T(n) = O(n)$

---

# Recursivitat: Exemple 3

```python
def f(n: int) -> None:
    if n > 0:
        g(n)           # cost O(n)
        f(n // 2)
        f(n // 2)
```

  * **Relació de recurrència:**
    - $T(n) = O(n) + 2T(n/2)$

  * **Resolució per expansió (arbre de recursió):**

      * $T(n) = n + 2T(n/2)$
      * $T(n) = n + 2(n/2 + 2T(n/4)) = n + n + 4T(n/4)$
      * $T(n) = n + n + 4(n/4 + 2T(n/8)) = n + n + n + 8T(n/8)$

  * Hi ha $\log_2 n$ nivells a l'arbre.

  * A cada nivell, el cost total de `g(n)` és $n$:
    $T(n) = \underbrace{n + n + n + \dots + n}_{\log n \text{ cops}}$

  * $T(n) = O(n \log n)$


---

# Sumari

- L'anàlisi de l'eficiència dels algorismes és una tècnica per analitzar i comparar algorismes (no programes).

- Ajuda a tenir estimacions preliminars aproximades del temps d'execució (mil·lisegons, segons, minuts, dies, anys?).

- L'anàlisi del pitjor cas és de vegades massa pessimista. El cas mitjà també és interessant (no es cobreix en aquest curs).

- En molts dominis d'aplicació (per exemple, big data) la complexitat quadràtica, $O(n^2)$, no és acceptable.

- Eviteu sorpreses d'última hora fent l'anàlisi abans d'escriure el codi.