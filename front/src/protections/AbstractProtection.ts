import { UserDroit } from "utils/droits";

export abstract class AbstractProtection {
  protected userDroit: UserDroit;

  constructor(userDroit: UserDroit) {
    this.userDroit = userDroit;
  }

  protected buildActions(actions: string[], fonctionnalite: string) {
    return actions.reduce((prev, curr) => {
      prev[curr] = this.userDroit.has([fonctionnalite], curr);
      return prev;
    }, {} as Record<string, boolean>);
  }
}
