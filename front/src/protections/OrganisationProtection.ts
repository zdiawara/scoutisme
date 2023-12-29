import { UserDroit } from "utils/droits";
import { AbstractProtection } from "./AbstractProtection";
import { OrganisationResource } from "types/organisation.type";
import { NATURE, TYPE_ORGANISATION } from "utils/constants";

type CommonAction = "creer" | "consulter" | "direction";

const COMMON_ACTIONS: CommonAction[] = ["creer", "consulter", "direction"];

export class OrganisationProtection extends AbstractProtection {
  private static UNITE = "unite";
  private static GROUPE = "groupe";
  private static REGION = "region";
  private static EQUIPE_NATIONALE = "equipe_nationale";
  private static CONSEIL_NATIONAL = "conseil_national";

  private _unite: Record<string, boolean>;
  private _groupe: Record<string, boolean>;
  private _region: Record<string, boolean>;
  private _equipe_nationale: Record<string, boolean>;
  private _conseil_national: Record<string, boolean>;

  constructor(userDroit: UserDroit) {
    super(userDroit);

    this._unite = this.buildActions(
      COMMON_ACTIONS,
      OrganisationProtection.UNITE
    );
    this._groupe = this.buildActions(
      COMMON_ACTIONS,
      OrganisationProtection.GROUPE
    );
    this._region = this.buildActions(
      COMMON_ACTIONS,
      OrganisationProtection.REGION
    );
    this._equipe_nationale = this.buildActions(
      COMMON_ACTIONS,
      OrganisationProtection.EQUIPE_NATIONALE
    );
    this._conseil_national = this.buildActions(
      COMMON_ACTIONS,
      OrganisationProtection.CONSEIL_NATIONAL
    );
  }

  get creer(): boolean {
    return [
      this.unite,
      this.groupe,
      this.region,
      this.equipe_nationale,
      this.conseil_national,
    ].some((e) => e.creer);
  }

  direction(organisation: OrganisationResource): boolean {
    if (organisation.nature.code === NATURE.unite) {
      return this.unite.direction;
    }
    if (organisation.nature.code === NATURE.groupe) {
      return this.groupe.direction;
    }
    if (organisation.nature.code === NATURE.region) {
      return this.region.direction;
    }
    if (organisation.nature.code === NATURE.region) {
      return this.region.direction;
    }
    if (organisation.type?.code === TYPE_ORGANISATION.equipe_nationale) {
      return this.equipe_nationale.direction;
    }
    if (organisation.type?.code === TYPE_ORGANISATION.conseil_national) {
      return this.conseil_national.direction;
    }
    return false;
  }

  get unite(): Record<CommonAction, boolean> {
    return this._unite;
  }

  get groupe(): Record<CommonAction, boolean> {
    return this._groupe;
  }

  get region(): Record<CommonAction, boolean> {
    return this._region;
  }

  get equipe_nationale(): Record<CommonAction, boolean> {
    return this._equipe_nationale;
  }

  get conseil_national(): Record<CommonAction, boolean> {
    return this._conseil_national;
  }
}
