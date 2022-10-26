# Description

  Gesi est une application de gestion d'une université (Institut supérieure). \
  Les fonctionalités sont (Tenant compte du role de l'utilisateur):
## Installation

```bash
$ npm install
```

## Lancer l'application

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

  ### Filière
  - [x] Create
  - [x] Update
  - [x] Supprimer(Soft delete)
  - [ ] Affecter un gestionnaire(manager), son adjoint
  - [ ] Changer le gestionnaire(manager)
  - [ ] Affecter une ou plusieurs resources.
  ### Students
  - [x] Create
  - [x] Update
  - [x] Soft delete
  - [ ] Invite to event(as Presenter, as Participant)
  ### Employees
  - [x] Create
  - [x] Update
  - [x] Soft delete
  - [ ] Give responsabilities
  ### Teachers
  - [x] Créer
  - [x] Mettre à jour
  - [x] Supprimer (Soft Delete)
  - [ ] Affecter un cours
  - [ ] Retirer un cours
  - [ ] Affecter la gestion d'une filière
  ### Course
  - [x] Create course
  - [x] Update un course (ex: Author, pondération)
  - [ ] Delete un cours (ex: Author)
  - [ ] Session:
    - [ ] Créer une session d'un cours avec (Id de l'auteur du cours)
    - [ ] Decaler une session
    - [ ] Supprimer une session
    - [ ] Modifier l'intitulé
  ### Evènements
  - [ ] Créer un évènement (Colloct, Live Event, TEDxTalk ...)
  - [ ] Affecter des participants (Soit une filière entiere soit un niveau, soit un ou plusieur etudiants)
  - [ ] Retirer une groupe ou en ajouter
  - [ ] Supprimer un évènement
  ### Ressources
  - [ ] Ajouter une ressource(Materiel, PC, Imprimantes, )


## Support

Gesi est un projet open source sous license MIT. [read more here](https://gesi.app/support).

## Rester connecté

- Author - [Jeydi](https://twitter.com/jeydi243)
- Website - [https://gesi.app](https://gesi.app/)
- Twitter - [@gesi](https://twitter.com/gesi)

## License

Gesi is [MIT licensed](LICENSE).
