import { UserDroit } from "utils/droits";
import { AbstractProtection } from "./AbstractProtection";
import { PersonneResource } from "types/personne.type";

type PaiementAction = "creer" | "consulter" | "valider" | "rejeter" | "telecharger_recu";

const PAIEMENTS_ACTIONS: PaiementAction[] = ["creer", "consulter", "valider", "rejeter", "telecharger_recu"];

export class CotisationProtection extends AbstractProtection {
  private static PAIEMENTS = "paiements";

  private _paiements: Record<string, boolean>;

  constructor(userDroit: UserDroit) {
    super(userDroit);
    this._paiements = this.buildActions(PAIEMENTS_ACTIONS, CotisationProtection.PAIEMENTS);
  }

  can(action: PaiementAction, personne?: PersonneResource): boolean {
    if (this.userDroit.isAdmin) {
      return true;
    }
    if (!personne) {
      return this._paiements[action];
    }
    if (!personne.organisation) {
      return true;
    }

    return this.isInUserPerimetre(personne.organisation?.nature?.code) && this._paiements[action];
  }

  get acces(): boolean {
    return Boolean(Object.keys(this._paiements).length);
  }
}
