import { FC } from "react";
import logo from "./logo.png";
import tamponEquipeNationale from "../../../../assets/images/signatures/tampon_equipe_nationale.png";
import signatureTresorerie from "../../../../assets/images/signatures/signature-tresorerie.png";

import "./Carte.scss";
import { PersonneCarte } from "types/personne.type";

type Props = {
  carte: PersonneCarte;
  photo?: string;
};

const Item: FC<{ label: string; value?: string }> = (props) => (
  <>
    <span className="carte-ligne--label">{props.label}</span>
    &nbsp;:&nbsp;
    <span className="carte-ligne--value">{props.value}</span>
  </>
);

export const Carte: FC<Props> = ({ carte, photo }) => {
  return (
    <div className="carte mx-auto my-2 overflosw-scroll" id="content-id">
      <div className="carte-content">
        <table className="p-0">
          <tbody>
            <tr>
              <td className="carte-logo" rowSpan={2}>
                <img src={logo} alt="Logo" />
              </td>
              <td colSpan={2} className="carte-association">
                <div className="mb-1">{carte.meta.association}</div>
              </td>
            </tr>
            <tr>
              <td className="carte-personne">
                <div className="carte-membre">
                  <span className="carte-membre--titre">Carte de membre</span>
                </div>
                <div>{carte.personne.nom}</div>
                <div>{carte.personne.fonction}</div>
              </td>
              <td rowSpan={5} className="carte-media">
                <div className="carte-photo">
                  <img alt="indentité" src={photo} />
                </div>
                <div
                  className="carte-signataire"
                  style={{ position: "relative" }}
                >
                  <span>{carte.meta.signataire.libelle}</span>
                  <img
                    src={tamponEquipeNationale}
                    alt=""
                    style={{
                      width: "85px",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 10,
                    }}
                  />
                  <img
                    src={signatureTresorerie}
                    alt=""
                    style={{
                      position: "absolute",
                      left: "-40px",
                      zIndex: 10,
                      width: "85px",
                      rotate: "-10deg",
                      top: "76%",
                    }}
                  />
                </div>
              </td>
            </tr>
            {carte.lignes.map((ligne) => (
              <tr key={ligne.nom}>
                <td colSpan={2}>
                  <Item label={ligne.nom} value={ligne.value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="carte-footer">
        <Item
          label="Validite"
          value={`Du ${carte.validite.debut} au ${carte.validite.fin}`}
        />
      </div>
    </div>
  );
};
