import { UserDroit } from "utils/droits";
import { AbstractProtection } from "./AbstractProtection";

type PaiementAction =
  | "creer"
  | "consulter"
  | "valider"
  | "rejeter"
  | "telecharger_recu";

const PAIEMENTS_ACTIONS: PaiementAction[] = [
  "creer",
  "consulter",
  "valider",
  "rejeter",
  "telecharger_recu",
];

export class CotisationProtection extends AbstractProtection {
  private static PAIEMENTS = "paiements";

  private _paiements: Record<string, boolean>;

  constructor(userDroit: UserDroit) {
    super(userDroit);
    this._paiements = this.buildActions(
      PAIEMENTS_ACTIONS,
      CotisationProtection.PAIEMENTS
    );
  }

  get paiements(): Record<PaiementAction, boolean> {
    return this._paiements;
  }

  get acces(): boolean {
    return Boolean(Object.keys(this._paiements).length);
  }
}
