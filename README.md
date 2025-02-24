<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Cette API est conçue pour gérer des bots Discord en utilisant le framework NestJS et Fastify. 

## Sommaire

- [Normes des Commits et Pull Requests](#normes-pour-les-commits-et-les-pull-requests)
- [Installation](#installation)
- [Configuration et Démarrage](#configuration-et-démarrage)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Ressources](#ressources)
- [API Endpoints](#api-endpoints)
  - [Guild Endpoints](#guild-endpoints)
  - [Campus Endpoints](#campus-endpoints)
  - [Channel Endpoints](#channel-endpoints)
  - [Promotion Endpoints](#promotion-endpoints)
  - [Roles Endpoints](#roles-endpoints)
  - [Messages Endpoints](#messages-endpoints)
  - [Answers Endpoints](#answers-endpoints)
  - [Comments Endpoints](#comments-endpoints)


# Normes pour les commits et les pull requests ✍️

Afin de maintenir une cohérence et une clarté dans notre travail collaboratif, nous avons mis en place des normes pour les messages de commit et les pull requests.

## Utilisation de GitFlow

Le projet suit le workflow GitFlow pour la gestion des branches. Voici les principales branches à utiliser :

- `main` : Branche de production, contient le code stable
- `develop` : Branche principale de développement
- `feature/*` : Branches pour les nouvelles fonctionnalités
- `hotfix/*` : Branches pour les corrections urgentes
- `release/*` : Branches pour la préparation des versions

Règles importantes :
- Toute nouvelle fonctionnalité doit partir de `develop` et créer une branche `feature/nom-de-la-feature`
- Les corrections urgentes partent de `main` avec une branche `hotfix/nom-du-fix`
- Les branches `feature` sont fusionnées dans `develop`
- Les `hotfix` sont fusionnés dans `main` ET `develop`

## Messages de commit

Les messages de commit doivent suivre ce format :

    type(portée): titre du commit

### Explication :

**_type_** : Le type de modification, par exemple "fix" ou "feat".

**_portée_** : Le dossier concerné (un commit par fichier modifié, supprimé ou ajouté). La portée à indiquer sera l'identifiant de la tâche associée au ticket, par exemple noter 86c21fxeg pour la tâche suivante: \
![Exemple de tâche](./src/assets/task-scope-example.png)

**_titre du commit_**: Une description concise du changement apporté. En l'occurence  (en anglais)

### Exemple :

```
  feat(controller): add problem endpoints
```

## Body du commit (corps détaillé)

**_Ajouter un body_** : Si le titre du commit n'est pas assez explicite sur la localisation de la modification, le nom du fichier doit être précisé dans le body.

### Exemple :

```
In file "problem.controller.ts" 
```

Cela permet de donner plus d'informations sur les raisons du changement, son impact ou les fichiers modifiés.

## Longueur des commits

**_Bonne pratique_** : Respecter une longueur maximale d'environ 50 caractères pour les titres des commits. Cela permet d'avoir des messages concis, faciles à lire et à comprendre.

## Commits atomiques

**_Commits atomiques_** : Chaque commit doit être atomique, c'est-à-dire qu'il doit se concentrer sur une seule fonctionnalité ou un seul changement.
Cela veut dire un commit par fichier modifié, supprimé ou ajouté au minimum.

Cela garantit une meilleure traçabilité et simplifie la gestion des erreurs.

## Noms des pull requests

**_Nom en anglais_** : Les titres des pull requests doivent être rédigés en anglais pour garantir une compréhension globale de l'équipe.

## Labels sur les pull requests

**_Ajout de labels_** : Chaque pull request doit inclure un ou plusieurs labels pour faciliter la gestion des PRs.

Les labels indiquent le type de changement.

Par exemple :

![Hotfix](https://img.shields.io/badge/Hotfix-ff0000?style=flat)
![Feature](https://img.shields.io/badge/Feature-blue?style=flat)

## Noms de fichiers

**_Nom des fichiers en français_** : Les noms des fichiers dans le projet doivent être en français pour garder une cohérence avec la langue principale du projet.

Utiliser le **kebab-case** : Les noms de fichiers doivent être écrits en kebab-case, c'est-à-dire tout en minuscules, avec des mots séparés par des tirets.

**_Exemple_** :

    gestion-utilisateurs.js
    verifier-email.md

## Suivi des changements dans les pull requests

**_Demandes de changements détaillées par les reviewers_** : Si un reviewer exige des modifications sur une pull request, il doit clairement spécifier dans un commentaire les changements à effectuer.

Le reviewer doit fournir une explication détaillée pour s'assurer que le contributeur comprend bien les modifications demandées. Cela favorise la transparence et permet à tous les membres de l'équipe de suivre l'évolution de la pull request.

## Processus d'approbation et de fusion des pull requests

**_Approbation partagée_** : Une pull request doit être validée par au moins un membre du groupe émetteur de la PR en question.

**_Nombre minimum de reviewers_** : Pour qu'une pull request soit fusionnée, elle doit être approuvée par un minimum de trois reviewers, y compris des membres externes au groupe émetteur, afin de garantir une évaluation complète et de qualité.

**_Validation du Tech Lead_** : Parmi les reviewers, le Tech Lead du groupe émetteur de la pull request doit obligatoirement faire partie des approbateurs. L'approbation finale du Tech Lead est nécessaire pour qu'un membre du groupe puisse procéder à la fusion. Il revient au Tech Lead de donner l'aval définitif, assurant que la pull request est prête à être intégrée dans la base de code principale.

**_Responsabilité lors de la fusion_** : Le tech lead qui approuve le merge d'une pull request est responsable de la fusion de celle-ci. En acceptant de fusionner la pull request, il accepte également de prendre la responsabilité en cas de problèmes futurs liés à cette pull request.

**_Interdiction pour l'émetteur de fusionner sa pull request_** : L'émetteur de la pull request n'est pas autorisé à fusionner sa propre pull request. Cela permet de garantir une validation externe par les autres membres du groupe ou par des reviewers indépendants, pour renforcer la qualité et la fiabilité des modifications apportées.

**_Annulation des approbations de pull requests lorsque de nouveaux commits sont poussés_** : La règle "Dismiss stale pull request approvals when new commits are pushed" doit être activée. Cela signifie que si des commits supplémentaires sont ajoutés à une pull request déjà approuvée, les approbations précédentes seront automatiquement révoquées. Cette règle garantit que les modifications récentes sont également examinées par les reviewers, assurant ainsi que l'évaluation de la pull request reste valide et à jour.

## Installation

```bash
$ npm install
```

## Configuration et Démarrage

```bash
# développement
$ npm run start

# mode watch
$ npm run start:dev

# mode production
$ npm run start:prod
```

## Tests

```bash
# tests unitaires
$ npm run test

# tests e2e
$ npm run test:e2e

# couverture de tests
$ npm run test:cov
```

## Contributeurs

- [aReynier](https://github.com/aReynier)
- [AyoubLaroussi](https://github.com/ayoub-laroussi)
- [Boris betremieux](https://github.com/BborisB )
- [Martial Floquet](https://github.com/martial59110)
- [EnguerranSGG](https://github.com/EnguerranSGG)
- [Gabriel Luthun](https://github.com/gabrielluthun)
- [Julien Beauchant](https://github.com/julienbeauchant)
- [Messa](https://github.com/MessaKami)
- [YohanF1245](https://github.com/YohanF1245)
- [Justin Didelot](https://github.com/Srekaens)
- [Abdel](https://github.com/UnknOownU)

## API Endpoints

### Guild Endpoints

#### Create a Guild
- **POST** `/guild`
```json
{
  "uuid": "123456789012345678",
  "name": "My Discord Server",
  "memberCount": 100,
  "configuration": {
    "welcomeChannel": "123456789",
    "prefix": "!",
    "language": "fr"
  }
}
```

#### Get All Guilds
- **GET** `/guild`

#### Get One Guild
- **GET** `/guild/:uuid`
Example: `/guild/123456789012345678`

#### Update a Guild
- **PUT** `/guild/:uuid`
```json
{
  "uuid": "123456789012345678",
  "name": "Updated Server Name",
  "memberCount": 150,
  "configuration": {
    "welcomeChannel": "987654321",
    "prefix": "?",
    "language": "en"
  }
}
```

#### Delete a Guild
- **DELETE** `/guild/:uuid`
Example: `/guild/123456789012345678`

### Campus Endpoints

#### Create a Campus
- **POST** `/campus`
```json
{
  "name": "Valenciennes"
}
```

#### Get All Campuses
- **GET** `/campus`

#### Get One Campus
- **GET** `/campus/:uuid`
Example: `/campus/550e8400-e29b-41d4-a716-446655440000`

#### Update a Campus
- **PUT** `/campus/:uuid`
```json
{
  "name": "Lille"
}
```

#### Delete a Campus
- **DELETE** `/campus/:uuid`
Example: `/campus/550e8400-e29b-41d4-a716-446655440000`

### Guilds-Templates Endpoints

#### Create a Guild Template
- **POST** `/guilds-templates`
```json
{
  "uuid": "123456789012345678",
  "name": "Server Template",
}
```

#### Get All Guild Templates
- **GET** `/guilds-templates`

#### Get One Guild Template
- **GET** `/guilds-templates/:uuid`
Example: `/guilds-templates/123456789012345678`

#### Update a Guild Template
- **PUT** `/guilds-templates/:uuid`
```json
{
  "name": "Updated Template Name",
}
```

#### Delete a Guild Template
- **DELETE** `/guilds-templates/:uuid`
Example: `/guilds-templates/123456789012345678`

### Channel Endpoints

#### Create a Channel
- **POST** `/channels`
```json
{
  "name": "general",
  "type": "text",
  "channelPosition": 1
}
```

#### Get All Channels
- **GET** `/channels`

#### Get One Channel
- **GET** `/channels/:uuid`
Example: `/channels/123456789012345678`

#### Update a Channel
- **PUT** `/channels/:uuid`
```json
{
  "name": "announcements",
  "type": "text",
  "channelPosition": 2
}
```

#### Delete a Channel
- **DELETE** `/channels/:uuid`
Example: `/channels/123456789012345678`

### Promotion Endpoints

#### Create a Promotion
- **POST** `/promotions`
```json
{
  "name": "Dev Web 2024",
  "startDate": "2024-01-01T00:00:00.000Z",
  "endDate": "2024-12-31T23:59:59.999Z"
}
```

#### Get All Promotions
- **GET** `/promotions`

#### Get One Promotion
- **GET** `/promotions/:uuid`
Example: `/promotions/550e8400-e29b-41d4-a716-446655440000`

#### Update a Promotion
- **PUT** `/promotions/:uuid`
```json
{
  "name": "Dev Web 2024 - Updated",
  "startDate": "2024-02-01T00:00:00.000Z",
  "endDate": "2024-12-31T23:59:59.999Z"
}
```

#### Delete a Promotion
- **DELETE** `/promotions/:uuid`
Example: `/promotions/550e8400-e29b-41d4-a716-446655440000`

Note: 
- All timestamps (`createdAt`, `updatedAt`) are managed automatically
- For Guild endpoints, the `uuid` must be a valid Discord server ID (17-20 digits)
- For Campus endpoints, the `uuid` is automatically generated

### Roles Endpoints

#### Create a Role
- **POST** `/roles`
```json
{
  "uuid": "123456789012345678",
  "name": "Administrateur",
  "color": "#FF0000",
  "permissions": ["MANAGE_CHANNELS", "MANAGE_ROLES"],
  "position": 1,
  "uuid_guild": "987654321098765432"
}
```

#### Get All Roles
- **GET** `/roles`

#### Get One Role
- **GET** `/roles/:uuid`
Example: `/roles/123456789012345678`

#### Update a Role
- **PUT** `/roles/:uuid`
```json
{
  "name": "Super Admin",
  "color": "#0000FF",
  "permissions": ["ADMINISTRATOR"],
  "position": 2
}
```

#### Delete a Role
- **DELETE** `/roles/:uuid`
Example: `/roles/123456789012345678`


### Identification Requests Endpoints

#### Create identification request

- **POST** `/identification-requests`
```json
{
  "uuid_member": "57bb2c9b-a472-408d-9b90-4a834da929d0",
  "firstname": "Hidetaka",
  "lastname": "Miyazaki",
  "email": "hidetaka.miyazaki@from-software.com"
}
```

#### Get All identification requests 
- **GET** `/identification-requests`

#### Get One identification request
- **GET** `/identification-requests/:uuid`  
Example: `/identification-requests/57bb2c9b-a472-408d-9b90-4a834da929d0`

#### Update identification request
- **PUT** `/identification-requests/:uuid`
```json
{
  "uuid_member": "57bb2c9b-a472-408d-9b90-4a834da929d0",
  "firstname": "Hidetaka",
  "lastname": "Miyazaki",
  "email": "hidetaka.miyazaki@from-software.jp"
}
```

#### Delete identification request
- **DELETE** `/identification-requests/:uuid`  
Example: `/identification-requests/57bb2c9b-a472-408d-9b90-4a834da929d0`

### Members Informations Endpoints

#### Create member informations

- **POST** `/members-informations`
```json
{
  "uuid-member": "123456789012345678",
  "firstname": "Hidetaka",
  "lastname": "Miyazaki",
  "email": "hidetaka.miyazaki@from-software.com"
}
```

#### Get All members informations 
- **GET** `/members-informations`

#### Get One member informations
- **GET** `/members-informations/:uuid`
Example: `/members-informations/57bb2c9b-a472-408d-9b90-4a834da929d0`


#### Update member informations
- **PUT** `/members-informations/:uuid`
```json
{
  "uuid-member": "123456789012345678",
  "firstname": "Hidetaka",
  "lastname": "Miyazaki",
  "email": "hidetaka.miyazaki@from-software.jp"
}
```

#### Delete member informations

- **DELETE** `/members-informations/:uuid`
Example: `/members-informations/57bb2c9b-a472-408d-9b90-4a834da929d0`

### Categories Endpoints

#### Create category

- **POST** `/categories`
```json
{
  "uuid": "123456789012345678",
  "uuid_guild": "987654321098765432",
  "name": "General",
  "position": 1
}
```

#### Get All categories 
- **GET** `/categories`

#### Get One category
- **GET** `/categories/:uuid`  
Example: `/categories/57bb2c9b-a472-408d-9b90-4a834da929d0`

#### Update category
- **PUT** `/categories/:uuid`
```json
{
  "uuid": "123456789012345678",
  "uuid_guild": "987654321098765432",
  "name": "Updated Category",
  "position": 2
}
```

#### Delete category
- **DELETE** `/categories/:uuid`  
Example: `/categories/57bb2c9b-a472-408d-9b90-4a834da929d0`

Note: 
- All timestamps (`createdAt`, `updatedAt`) are managed automatically
- For Guild endpoints, the `uuid` must be a valid Discord server ID (17-20 digits)
- For Campus endpoints, the `uuid` is automatically generated

### Answers Endpoints

#### Create an Answer
- **POST** `/answers`
```json
{
  "content": "Paris",
  "isMultipleAnswer": false,
  "questionUuid": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Get All Answers
- **GET** `/answers`

#### Get One Answer
- **GET** `/answers/:uuid`
Example: `/answers/123e4567-e89b-12d3-a456-426614174000`

#### Update an Answer
- **PUT** `/answers/:uuid`
```json
{
  "content": "Updated answer",
  "isMultipleAnswer": true
}
```

#### Delete an Answer
- **DELETE** `/answers/:uuid`
Example: `/answers/123e4567-e89b-12d3-a456-426614174000`

### Comments Endpoints

#### Create a Comment
- **POST** `/comments`
```json
{
  "content": "Très bon travail sur ce projet !",
  "comment_status": "active",
  "uuid_member": "123e4567-e89b-12d3-a456-426614174000",
  "resource_uuid": "123e4567-e89b-12d3-a456-426614174000",
  "user_uuid": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Get All Comments
- **GET** `/comments`

#### Get One Comment
- **GET** `/comments/:uuid`
Example: `/comments/123e4567-e89b-12d3-a456-426614174000`

#### Update a Comment
- **PATCH** `/comments/:uuid`
```json
{
  "content": "Contenu mis à jour",
  "comment_status": "inactive"
}
```

#### Delete a Comment
- **DELETE** `/comments/:uuid`
Example: `/comments/123e4567-e89b-12d3-a456-426614174000`


