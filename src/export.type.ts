export interface Name { first: string; last?: string; middle?: string };

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
export enum UserRole {
  ACADEMIQUE = 'ACADEMIQUE',
  ADMINISTRATIF = 'ADMINISTRATIF',
  ADMINISTRATEURBUDGET = 'ADMINISTRATEURBUDGET',
  CAISSIER = 'CAISSIER',
  ETUDIANT = 'ETUDIANT',
  PROFESSEUR = 'PROFESSEUR',
  RESPONSABLEBIBLIOTHEQUE = 'RESPONSABLEBIBLIOTHEQUE',
  ADMINISTRATEUR = 'ADMINISTRATEUR',
  SUPERADMINISTRATEUR = 'SUPERADMINISTRATEUR',
}
