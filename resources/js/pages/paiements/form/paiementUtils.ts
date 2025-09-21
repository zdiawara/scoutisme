import * as yup from "yup";

export const paiementSchema = yup.object({
  montant: yup
    .string()
    .required()
    .test({
      test(value, ctx) {
        const montant = parseInt(value, 10);

        if (!montant || montant <= 0) {
          return ctx.createError({ message: "Le montant doit être supérieur à zéro." });
        }

        if (montant > ctx.parent.resteAPayer) {
          return ctx.createError({ message: "Le montant renseigné doit être inférieur au reste à payer" });
        }
        return true;
      },
    })
    .nullable(),
});
