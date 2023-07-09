export interface Name {
  first: string;
  last?: string;
  middle?: string;
}

export const ListLevel: Array<string> = ['Prépa', 'Bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5', 'Bac+6'];

export const ListStatus: Array<string> = ['CANDIDAT', 'ETUDIANT', 'DIPLOMÉ', 'ABANDON', 'RENVOI'];

export interface DocumentOrganisation {
  code: string;
  link: string;
  name?: string;
  required?: boolean;
}
export enum Genre {
  M, //Male
  F, //Female
}
export const defaultOnboarding = [
  { field: 'other', state: true, description: 'Eu ea amet ea mollit aute est ea in ea duis mollit sunt.' },
  { field: 'phone', state: false, description: 'Pariatur duis dolor Lorem do aliqua laboris voluptate esse.' },
  { field: 'email', state: false, description: 'Aliquip veniam veniam ut voluptate est irure dolore tempor officia veniam dolor.' },
  { field: 'computer', state: false, description: 'Velit labore mollit nulla consectetur reprehenderit proident.' },
  { field: 'software', state: true, description: 'Id qui incididunt qui labore aute ipsum ut.' },
  { field: 'hardware', state: false, description: 'Aliqua consequat officia velit deserunt consectetur labore officia excepteur labore reprehenderit cupidatat ullamco in.' },
  { field: 'security', state: false, description: 'Do qui ipsum consequat tempor.' },
  { field: 'training', state: false, description: 'Nulla est nulla quis irure aute culpa id esse aliqua tempor minim exercitation aute pariatur.' },
  { field: 'work_space', state: false, description: 'Nulla tempor voluptate excepteur culpa dolore aliquip tempor.' },
  { field: 'office_tour', state: false, description: 'Duis quis excepteur nulla aliqua amet fugiat do dolor dolor minim exercitation minim veniam.' },
];
export enum MyStrategy {
  MY_JWT_STRATEGY = 'MY_JWT_STRATEGY',
}

export enum UserRole {
  ETUDIANT = 'ETUDIANT',
  CAISSIER = 'CAISSIER',
  PROFESSEUR = 'PROFESSEUR',
  ACADEMIQUE = 'ACADEMIQUE',
  ADMINISTRATIF = 'ADMINISTRATIF',
  ADMINISTRATEUR = 'ADMINISTRATEUR',
  SUPERADMINISTRATEUR = 'SUPERADMINISTRATEUR',
  ADMINISTRATEURBUDGET = 'ADMINISTRATEUR_BUDGET',
  RESPONSABLEBIBLIOTHEQUE = 'RESPONSABLE_BIBLIOTHEQUE',
}

const genre = ['M', 'F'];
const statut = ['En ligne', 'Deconnecté', 'Session finis'];
const type_organisation = ['Ecole', 'Classe', 'Magasin'];

export { genre, statut, type_organisation };

// MyStrategy.MY_JWT_STRATEGY
