import { UserDroit } from "utils/droits";
import { buildPerimetres } from "utils/functions";

export abstract class AbstractProtection {
  protected userDroit: UserDroit;

  constructor(userDroit: UserDroit) {
    this.userDroit = userDroit;
  }

  protected buildActions(actions: string[], fonctionnalite: string) {
    return actions.reduce((prev, curr) => {
      prev[curr] = this.userDroit ? this.userDroit.has([fonctionnalite], curr) : false;
      return prev;
    }, {} as Record<string, boolean>);
  }

  isInUserPerimetre(organisationPerimetre?: string): boolean {
    if (this.userDroit.isAdmin) {
      return true;
    }
    return this.userDroit.perimetres.some((perimetre) => {
      const all = buildPerimetres(perimetre);
      if (organisationPerimetre) {
        return all.includes(organisationPerimetre);
      }
      return false;
    });
  }
}
