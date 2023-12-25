import { PersonneResource } from "types/personne.type";
import { UserDroit } from "./droits";

type PaiementAction =
  | "creer"
  | "consulter"
  | "modifier"
  | "supprimer"
  | "valider"
  | "rejeter"
  | "telecharger_recu";

type FonctionAction = "consulter" | "affecter" | "supprimer";

const PAIEMENTS_ACTIONS: PaiementAction[] = [
  "creer",
  "modifier",
  "consulter",
  "supprimer",
  "valider",
  "rejeter",
  "telecharger_recu",
];

const FONCTIONS_ACTIONS: FonctionAction[] = [
  "affecter",
  "consulter",
  "supprimer",
];

export class PersonneScreen {
  private static SCOUTS = "scouts";
  private static ADULTES = "adultes";

  private userDroit: UserDroit;

  private paiementsActions: Record<PaiementAction, boolean>;
  private fonctionsActions: Record<FonctionAction, boolean>;

  constructor(userDroit: UserDroit) {
    this.userDroit = userDroit;
    this.paiementsActions = this.buildActions(PAIEMENTS_ACTIONS, "paiements");
    this.fonctionsActions = this.buildActions(FONCTIONS_ACTIONS, "fonctions");
  }

  create(): boolean {
    return [
      this.userDroit.isAdmin,
      this.createScout(),
      this.createAdulte(),
    ].some(Boolean);
  }

  modifier(personne?: PersonneResource): boolean {
    if (!personne) {
      return false;
    }
    if (this.userDroit.isAdmin) {
      return true;
    }
    switch (personne.type) {
      case "scout":
        return this.userDroit.has([PersonneScreen.SCOUTS], "modifier");
      case "adulte":
        return this.userDroit.has([PersonneScreen.ADULTES], "modifier");
      default:
        return false;
    }
  }

  createScout(): boolean {
    return this.userDroit.has([PersonneScreen.SCOUTS], "creer");
  }

  createAdulte(): boolean {
    return this.userDroit.has([PersonneScreen.ADULTES], "creer");
  }

  get paiements(): Record<PaiementAction, boolean> {
    return this.paiementsActions;
  }

  get fonctions(): Record<FonctionAction, boolean> {
    return this.fonctionsActions;
  }

  private buildActions(actions: string[], fonctionnalite: string) {
    return actions.reduce((prev, curr) => {
      prev[curr] = this.userDroit.has([fonctionnalite], curr);
      return prev;
    }, {} as Record<string, boolean>);
  }
}
