import { UserResource } from "types/auth.type";
import { MENU } from "./menu";

export class UserDroit {
  private modules: string[];
  private fonctionnalites: Record<string, string[]>;
  private user: UserResource;
  public perimetres: string[];

  constructor(user: UserResource) {
    this.user = user;
    this.modules = this.buildModules(user);
    this.fonctionnalites = this.buildFonctionnalites(user);
    this.perimetres = user.roles.length ? user.roles[0].perimetres : [];
  }

  get menus(): string[] {
    return this.modules;
  }

  get isAdmin(): boolean {
    return this.user.roles?.some((e) => e.code === "admin");
  }

  public hasMenu(codeMenu: string): boolean {
    if (this.isAdmin) {
      return true;
    }
    return this.menus.includes(codeMenu);
  }

  public hasOnlyPerimetre(perimetre: string) {
    return this.perimetres.length === 1 && this.perimetres.includes(perimetre);
  }

  public hasOnlyPerimetreUnite() {
    return this.hasOnlyPerimetre("unite");
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

  private buildModules(user: UserResource): any {
    let modules: string[] = [];
    if (this.isAdmin) {
      modules = MENU.map((e) => e.code);
    } else {
      modules = user.fonctionnalites
        .filter((e) => Boolean(e.module.parent))
        .map((e) => e.module.parent)
        .filter((e) => Boolean(e?.code))
        .map((e) => e?.code || "");
    }

    return modules.filter((module, index) => {
      return index === modules.findIndex((o) => module === o);
    });
  }
}
