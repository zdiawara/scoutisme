export type MessageResource = {
  id: string;
  objet: string;
  contenu: string;
  nombre_destinataires?: string;
  destinataires: Array<DestinataireResource>;
  critere?: any;
  created_at: string;
};

export type DestinataireResource = {
  email: string;
  nom: string;
  prenom: string;
};
