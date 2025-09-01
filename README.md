# ToolkitJS

Une bibliothèque JavaScript utilitaire légère offrant des fonctions helper pour la manipulation de données.

## 📦 Installation

### Via NPM
```bash
npm install toolkitjs
```

### Via Yarn
```bash
yarn add toolkitjs
```

## 🚀 Utilisation

```javascript
import toolkit from 'toolkitjs';

// Ou avec CommonJS
// const toolkit = require('toolkitjs').default;
```

## 📖 API

### `isEmpty(arg)`

Vérifie si une valeur est vide.

**Paramètre:**
- `arg` (*) - La valeur à vérifier

**Retourne:**
- `true` si la valeur est vide
- `false` si la valeur n'est pas vide
- `undefined` si aucun paramètre n'est fourni

**Types supportés:**
- Array
- String
- Map
- Set
- Object

**Exemples:**
```javascript
toolkit.isEmpty([]);          // true
toolkit.isEmpty('');          // true
toolkit.isEmpty({});          // true
toolkit.isEmpty(new Map());   // true
toolkit.isEmpty(new Set());   // true

toolkit.isEmpty([1, 2, 3]);   // false
toolkit.isEmpty('hello');     // false
toolkit.isEmpty({ a: 1 });    // false
```

### `isOfType`

Collection de méthodes pour vérifier le type d'une valeur.

#### Méthodes disponibles:

##### `isOfType.null(arg)`
Vérifie si la valeur est `null`.

##### `isOfType.undefined(arg)`
Vérifie si la valeur est `undefined`.

##### `isOfType.nil(arg)`
Vérifie si la valeur est `null` ou `undefined`.

##### `isOfType.string(arg)`
Vérifie si la valeur est une chaîne de caractères.

##### `isOfType.number(arg)`
Vérifie si la valeur est un nombre (exclut NaN et Infinity).

##### `isOfType.boolean(arg)`
Vérifie si la valeur est un booléen.

##### `isOfType.array(arg)`
Vérifie si la valeur est un tableau.

##### `isOfType.object(arg)`
Vérifie si la valeur est un objet (exclut null, arrays, etc.).

##### `isOfType.set(arg)`
Vérifie si la valeur est un Set.

##### `isOfType.map(arg)`
Vérifie si la valeur est un Map.

##### `isOfType.date(arg)`
Vérifie si la valeur est une Date.

##### `isOfType.type(arg, Constructor)`
Vérifie si la valeur est une instance du constructeur fourni.

**Exemples:**
```javascript
toolkit.isOfType.null(null);                    // true
toolkit.isOfType.undefined(undefined);          // true
toolkit.isOfType.nil(null);                     // true
toolkit.isOfType.nil(undefined);                // true
toolkit.isOfType.string('hello');               // true
toolkit.isOfType.number(42);                    // true
toolkit.isOfType.boolean(true);                 // true
toolkit.isOfType.array([1, 2, 3]);             // true
toolkit.isOfType.object({ a: 1 });             // true
toolkit.isOfType.set(new Set());               // true
toolkit.isOfType.map(new Map());               // true
toolkit.isOfType.date(new Date());             // true
toolkit.isOfType.type(new Date(), Date);       // true
```

### `mergeIntoObject(array)`

Fusionne un tableau d'objets en un seul objet.

**Paramètre:**
- `array` (Array) - Un tableau d'objets à fusionner

**Retourne:**
- Un objet unique résultant de la fusion
- Un message d'erreur si le paramètre n'est pas valide

**Exemples:**
```javascript
// Fusion avec clés différentes
toolkit.mergeIntoObject([
  { first: { id: 0, value: 1 }},
  { second: { id: 1, value: 2 }}
]);
// Retourne:
// {
//   first: { id: 0, value: 1 },
//   second: { id: 1, value: 2 }
// }

// Fusion avec clés identiques (la dernière valeur l'emporte)
toolkit.mergeIntoObject([
  { id: 0, value: 1 },
  { id: 0, value: 2, ref: 10 }
]);
// Retourne:
// {
//   id: 0,
//   value: 2,
//   ref: 10
// }
```

### `removeDuplicate(array)`

Supprime les doublons d'un tableau.

**Paramètre:**
- `array` (Array) - Le tableau dont on veut supprimer les doublons

**Retourne:**
- Un nouveau tableau sans doublons
- Un message d'erreur si le paramètre n'est pas valide

**Exemples:**
```javascript
toolkit.removeDuplicate([1, 2, 3, 3, 1, 2]);
// Retourne: [1, 2, 3]

toolkit.removeDuplicate(['a', 'b', 'd', 'a']);
// Retourne: ['a', 'b', 'd']
```

## 🧪 Tests

Pour exécuter les tests :

```bash
npm test
```

Pour exécuter les tests en mode watch :

```bash
npm run test
```

## 📊 Couverture de code

Le projet maintient une couverture de code de 100% avec Jest.

## 📝 Licence

ISC

## 👤 Auteur

Patrick Kaninda - fenikz31@gmail.com

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📦 Repository

[https://github.com/Fenikz31/toolkit](https://github.com/Fenikz31/toolkit)