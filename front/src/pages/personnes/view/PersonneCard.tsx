import { View } from "components";
import { FC } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import logo from "./logo.png";
import tamponEquipeNationale from "../../../assets/images/signatures/tampon_equipe_nationale.png";
import signatureTresorerie from "../../../assets/images/signatures/signature-tresorerie.png";

import "./PersonneCard.scss";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import { PersonneResource } from "types/personne.type";
import { useQuery } from "@tanstack/react-query";
import { personneApi } from "api";

type PersonneCardProps = {
  personne: PersonneResource;
};

const options = {
  // default is `save`
  method: "",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.HIGH,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.SMALL,
    // default is 'A4'
    //format: "letter",
    // default is 'portrait'
    //orientation: "landscape",
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/png",
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true,
    },
  },
};

const Item: FC<{ label: string; value?: string }> = (props) => (
  <>
    <span className="carte-ligne--label">{props.label}</span>
    &nbsp;:&nbsp;
    <span className="carte-ligne--value">{props.value}</span>
  </>
);

export const PersonneCard: FC<PersonneCardProps> = ({ personne }) => {
  const { data: carte, isLoading } = useQuery({
    queryKey: ["carte_membre", personne.id],
    queryFn: () => {
      return personneApi.carteMembre(personne.id);
    },
    cacheTime: 0,
  });

  const telechargerPDF = () => {
    // you can use a function to return the target element besides using React refs
    const getTargetElement = () => document.getElementById("content-id");
    //@ts-ignore
    generatePDF(getTargetElement, options);
  };

  const renderContent = () => {
    if (isLoading) {
      return <span>Chargement ...</span>;
    }

    if (!carte) {
      return <span>Pas de données</span>;
    }

    if (carte.message) {
      return (
        <Alert variant="danger" className="mb-0">
          {carte.message}
        </Alert>
      );
    }

    return (
      <div className="carte" id="content-id">
        <div className="carte-content">
          <table className="p-0">
            <tbody>
              <tr>
                <td className="carte-logo" rowSpan={2}>
                  <img src={logo} alt="Logo" />
                </td>
                <td colSpan={2} className="carte-association">
                  <div className="mb-1">{carte.data.meta.association}</div>
                </td>
              </tr>
              <tr>
                <td className="carte-personne">
                  <div className="carte-membre">
                    <span className="carte-membre--titre">Carte de membre</span>
                  </div>
                  <div>{carte.data.personne.nom}</div>
                  <div>{carte.data.personne.fonction}</div>
                </td>
                <td rowSpan={5} className="carte-media">
                  <div className="carte-photo">
                    <img alt="indentité" src={personne.photo} />
                  </div>
                  <div
                    className="carte-signataire"
                    style={{ position: "relative" }}
                  >
                    <span>{carte.data.meta.signataire.libelle}</span>
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
              {carte.data.lignes.map((ligne) => (
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
            value={`Du ${carte.data.validite.debut} au ${carte.data.validite.fin}`}
          />
        </div>
      </div>
    );
  };

  return (
    <Card>
      <View.Header
        icon="mdi mdi-card-account-details-outline"
        label="Carte d'adhésion"
        description="Carte d'adhésion de la personne"
        right={
          Boolean(carte?.data) && (
            <Button onClick={telechargerPDF}>Télécharger</Button>
          )
        }
      />
      <Card.Body>{renderContent()}</Card.Body>
    </Card>
  );
};
