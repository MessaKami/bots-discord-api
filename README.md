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

- [Support](#support)
- [Contact](#contact)

# Normes pour les commits et les pull requests ✍️

Afin de maintenir une cohérence et une clarté dans notre travail collaboratif, nous avons mis en place des normes pour les messages de commit et les pull requests.

## Messages de commit

Les messages de commit doivent suivre ce format :

    type(portée): titre du commit

### Explication :

**_type_** : Le type de modification, par exemple "fix" ou "feat".

**_portée_** : Le dossier concerné (un commit par fichier modifié, supprimé ou ajouté).

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

## Déploiement

Lorsque vous êtes prêt à déployer votre application NestJS en production, il y a plusieurs étapes clés à suivre pour garantir un fonctionnement optimal. Consultez la [documentation de déploiement](https://docs.nestjs.com/deployment) pour plus d'informations.

Si vous recherchez une plateforme cloud pour déployer votre application NestJS, découvrez [Mau](https://mau.nestjs.com), notre plateforme officielle de déploiement d'applications NestJS sur AWS. Mau rend le déploiement simple et rapide, en quelques étapes simples :

```bash
$ npm install -g mau
$ mau deploy
```

Avec Mau, vous pouvez déployer votre application en quelques clics, vous permettant de vous concentrer sur le développement plutôt que sur la gestion de l'infrastructure.

## Ressources

Voici quelques ressources utiles pour travailler avec NestJS :

- Visitez la [Documentation NestJS](https://docs.nestjs.com) pour en savoir plus sur le framework.
- Pour vos questions et le support, rejoignez notre [canal Discord](https://discord.gg/G7Qnnhy).
- Pour approfondir vos connaissances, découvrez nos [formations](https://courses.nestjs.com/) vidéo officielles.
- Déployez votre application sur AWS avec [NestJS Mau](https://mau.nestjs.com) en quelques clics.
- Visualisez votre application et interagissez en temps réel avec [NestJS Devtools](https://devtools.nestjs.com).
- Besoin d'aide sur votre projet ? Consultez notre [support entreprise](https://enterprise.nestjs.com).
- Pour rester informé, suivez-nous sur [X](https://x.com/nestframework) et [LinkedIn](https://linkedin.com/company/nestjs).
- Recherchez un emploi ou proposez des offres sur notre [Job board](https://jobs.nestjs.com).

## Support

NestJS est un projet open source sous licence MIT. Il peut se développer grâce aux sponsors et au soutien de ses incroyables contributeurs. Si vous souhaitez les rejoindre, [en savoir plus ici](https://docs.nestjs.com/support).

## Contact

- Auteur - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Site web - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)


