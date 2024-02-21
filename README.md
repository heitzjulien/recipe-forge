# recipe-forge

Dans le cadre d'un projet scolaire, j'ai construit Recipe Forge, une application web qui vous permet de créer, partager et découvrir des recettes de cuisine.

## Technologies utilisées

- Express
- Node.js
- Astros
- Preact
- Scss
- Docker

## Prérequis

- Node.js
- Docker
- Yarn

## Configuration

Pour configurer l'application, vous devez créer des fichiers .env dans les dossiers frontend/ et backend/. Ces fichiers contiendront les variables d'environnement nécessaires au fonctionnement de l'application.

### Frontend

Créez un fichier .env dans le dossier frontend/ avec le contenu suivant :

```bash
PUBLIC_API_URL=http://localhost:3000/api
```

### Backend

Créez un fichier .env dans le dossier backend/ avec le contenu suivant :

```bash
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=recipe_forge
DB_PORT=5432
```

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante à la racine du projet :

```bash
    make install
```

## Lancement des containers

Pour lancer le projet avec Docker, exécutez la commande suivante à la racine du projet :

```bash
    make up
```

## Lancement en local

Pour lancer le projet sur votre machine, exécutez la commande suivante à la racine du projet :

```bash
    make dev
```
