import { UserResource } from "types/auth.type";
import { getMenuItems } from "./menu";

export class UserDroit {
  private modules: any[];
  private fonctionnalites: Record<string, string[]>;
  private user: UserResource;
  private perimetres: string[];

  constructor(user: UserResource) {
    this.user = user;
    this.modules = this.buildMenu(user);
    this.fonctionnalites = this.buildFonctionnalites(user);
    this.perimetres = user.role.perimetres;
  }

  get menus(): any[] {
    return this.modules;
  }

  get isAdmin(): boolean {
    return this.user.role.code === "admin";
  }

  public has(keys: string[], droit: string): boolean {
    if (this.isAdmin) {
      return true;
    }
    return keys.some((key) => this.fonctionnalites[key]?.includes(droit));
  }

  private buildFonctionnalites(user: UserResource): Record<string, string[]> {
    return user.fonctionnalites.reduce((prev, curr) => {
      if (prev[curr.module.code]) {
        prev[curr.module.code].push(curr.code);
      } else {
        prev[curr.module.code] = [curr.code];
      }
      return prev;
    }, {} as Record<string, string[]>);
  }

  private buildMenu(user: UserResource): any {
    if (this.isAdmin) {
      return getMenuItems();
    }

    const allModuleParents = user.fonctionnalites
      .filter((e) => Boolean(e.module.parent))
      .map((e) => e.module.parent);

    return allModuleParents
      .filter((module, index) => {
        return (
          index === allModuleParents.findIndex((o) => module?.id === o?.id)
        );
      })
      .map((e) => e?.code || "");
  }
}
