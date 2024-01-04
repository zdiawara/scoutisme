import { PaiementResource } from "types/personne.type";

export class Paiement {
  public constructor(private readonly paiement: PaiementResource) {}

  public isRejeted(): boolean {
    return this.paiement.etat === "rejet";
  }

  get montant(): number {
    return this.paiement.montant;
  }

  public static computeMontantPaye(paiements?: PaiementResource[]) {
    return (
      paiements
        ?.map((a) => new Paiement(a))
        ?.filter((p) => !p.isRejeted())
        ?.reduce((prev, curr) => {
          return curr.montant + prev;
        }, 0) || 0
    );
  }
}
