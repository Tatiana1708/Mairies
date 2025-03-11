export interface Employee {
id: string;
matricule: string;
nom: string;
dateNaissance: string;
lieuNaissance: string;
sexe: string;
situationMatrimoniale: string;
diplome: string;
contrat: string;
statutProfessionnel: string;
grade: string;
corpsMetier: string;
competences: string;
informationsSupplementaires: string;
positions: string;
departement: Department;

}

export interface Equipment {
  id: string;
  code:string;
  name: string;
  type: string;
  department: Department;
  status: 'available' | 'in-use' | 'maintenance';
  assignedTo?: string;
  nombre: string;
  dateInstallation: string;
  etatBien: 'neuf'| 'vieux';
}

export interface Procedure {
  id: string;
  title: string;
  department: string;
  steps: string[];
  lastUpdated: string;
}

export type Department = 
  | "Service des affaires générales"
  |  "Service économique et financier"
  | "Service technique de l’aménagement et du développement urbain"
  | "Service hygiène, salubrité"
  | "Service social et culturel";