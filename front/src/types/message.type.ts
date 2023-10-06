export type MessageResource = {
  id: string;
  titre: string;
  content: string;
  destinataires: Array<{ email: string; nom: string; prenom: string }>;
  critere: any;
  created_at: string;
};
