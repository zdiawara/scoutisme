import { UserResource } from "./auth.type";
import { PersonneResource } from "./personne.type";

export type LogActivityResource = {
  id: string;
  log_name: string;
  description: string;
  event: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
  causer?: UserResource;
  subject?: PersonneResource;
};
