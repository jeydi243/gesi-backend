export type Name = { first: string; last?: string; middle?: string };

export const ListLevel: Array<string> = ['Prépa', 'Bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5', 'Bac+6'];

export const ListStatus: Array<string> = ['CANDIDAT', 'ETUDIANT', 'DIPLOMÉ', 'ABANDON', 'RENVOI'];

export const ListDocument: Array<Record<string, any>> = [
  { name: 'Bonne vie et moeurs', code: 'AX-001', required: true },
  { name: 'Aptitude Physique', code: 'AX-002', required: true },
  { name: 'Bulletin 5eme', code: 'AX-003', required: true },
  { name: 'Bulletin 6eme', code: 'AX-004', required: true },
  { name: 'Attestation de scolarité', code: 'AX-005', required: true },
  { name: 'Lettre de motivation', code: 'LX-001', required: false },
  { name: 'Relevé de cote', code: 'LX-002', required: false, concerne: '' },
];

export interface DocumentOrganisation {
  code: string;
  name: string;
  required?: boolean;
  link?: string;
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
