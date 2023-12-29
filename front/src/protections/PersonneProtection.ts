import { PersonneResource } from "types/personne.type";
import { UserDroit } from "utils/droits";
import { AbstractProtection } from "./AbstractProtection";

type ScoutAction = "creer" | "consulter" | "affecter";
type AdulteAction = "creer" | "consulter" | "affecter";

const SCOUT_ACTIONS: ScoutAction[] = ["creer", "consulter", "affecter"];
const ADULTE_ACTIONS: AdulteAction[] = ["creer", "consulter", "affecter"];

export class PersonneProtection extends AbstractProtection {
  private static SCOUTS = "scouts";
  private static ADULTES = "adultes";

  private _scouts: Record<string, boolean>;
  private _adultes: Record<string, boolean>;

  constructor(userDroit: UserDroit) {
    super(userDroit);
    this._scouts = this.buildActions(SCOUT_ACTIONS, PersonneProtection.SCOUTS);
    this._adultes = this.buildActions(
      ADULTE_ACTIONS,
      PersonneProtection.ADULTES
    );
  }

  modifier(personne?: PersonneResource): boolean {
    if (!personne) {
      return false;
    }
    switch (personne.type) {
      case "scout":
        return this.scouts.creer;
      case "adulte":
        return this.adultes.creer;
      default:
        return false;
    }
  }

  affecter(personne?: PersonneResource): boolean {
    if (!personne) {
      return false;
    }
    switch (personne.type) {
      case "scout":
        return this.scouts.affecter;
      case "adulte":
        return this.adultes.affecter;
      default:
        return false;
    }
  }

  get scouts(): Record<ScoutAction, boolean> {
    return this._scouts;
  }

  get adultes(): Record<AdulteAction, boolean> {
    return this._adultes;
  }
}
