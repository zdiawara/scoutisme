import { FC } from "react";
import logo from "./logo.png";
import tamponEquipeNationale from "../../../../assets/images/signatures/tampon_equipe_nationale.png";
import signatureTresorerie from "../../../../assets/images/signatures/signature-tresorerie.png";

import "./Carte.scss";
import { PersonneCarte, PersonneCarteRecto, PersonneCarteVerso } from "types/personne.type";

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

type CarteRectoProps = {
  carte: PersonneCarteRecto;
  photo?: string;
};

export const CarteRecto: FC<CarteRectoProps> = ({ carte, photo }) => {
  return (
    <div className="carte me-2 overflosw-scroll" id="content-recto">
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
                <div className="carte-signataire" style={{ position: "relative" }}>
                  <span>{carte.meta.signataire.libelle}</span>
                  <img
                    src={tamponEquipeNationale}
                    alt=""
                    style={{
                      width: "85px",
                      position: "absolute",
                      top: 0,
                      right: 0,
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
        <Item label="Validite" value={`Du ${carte.validite.debut} au ${carte.validite.fin}`} />
      </div>
    </div>
  );
};

type CarteVersoProps = {
  carte: PersonneCarteVerso;
};
export const CarteVerso: FC<CarteVersoProps> = ({ carte }) => {
  return (
    <div className="carte verso overflosw-scroll mt-2" id="content-verso">
      <div className="carte-content">
        <table className="p-0">
          <tbody>
            <tr>
              <td className="carte-logo d-flex align-self-start">
                <img src={logo} alt="Logo" />
              </td>
              <td className="pt-2 verso">
                <div>{carte.nom}</div>
                <div>
                  {carte.adrese.label} : {carte.adrese.value}
                </div>
                <div>
                  {carte.telephone.label} : {carte.telephone.value}
                </div>
                <div>
                  <span style={{ fontSize: "9px" }}>
                    {carte.recepisse.label} n° {carte.recepisse.numero} du&nbsp;
                    {carte.recepisse.date}
                  </span>
                </div>
                <div style={{ width: "200px", border: "2px solid", borderBottom: 0, padding: "3px", fontSize: "9px" }}>
                  <p className="text-center m-0">Personne à contacter en cas de besoins </p>
                  <div style={{ color: "black" }}>Nom : {carte.personne_a_contacter.nom}</div>
                  <div style={{ color: "black" }}>Tél : {carte.personne_a_contacter.telephone}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="verso-footer px-1">
        SCOUTS
        <div>Prêt pour la vie</div>
      </div>
    </div>
  );
};

export const Carte: FC<Props> = ({ carte, photo }) => {
  return (
    <div id="content-full">
      <CarteRecto carte={carte.recto} photo={photo} />
      <CarteVerso carte={carte.verso} />
    </div>
  );
};
