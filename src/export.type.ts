export type Name = { first: string; last?: string; middle?: string };

export const ListLevel: Array<string> = ['Prépa', 'Bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5', 'Bac+6'];

export const ListState: Array<string> = ['Candidat', 'Etudiant', 'Diplomé', 'Abandon', 'Renvoi'];

export enum Genre {
  M, //Male
  F, //Female
}
export enum UserRole {
  ACADEMIQUE = 'Academique',
  ADMINISTRATIF = 'Administratif',
  ADMINISTRATEURBUDGET = 'AdministrateurBudget',
  CAISSIER = 'Caissier',
  ETUDIANT = 'Etudiant',
  PROFESSEUR = 'Professeur',
  RESPONSABLEBIBLIOTHEQUE = 'ResponsableBibliotheque',
  ADMINISTRATEUR = 'Administrateur',
  SUPERADMINISTRATEUR = 'SuperAdministrateur',
}
