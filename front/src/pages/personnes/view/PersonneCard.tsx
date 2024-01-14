import { View } from "components";
import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import logo from "./logo.png";

import "./PersonneCard.scss";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import { PersonneResource } from "types/personne.type";

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

export const PersonneCard: FC<PersonneCardProps> = ({ personne }) => {
  const telechargerPDF = () => {
    // you can use a function to return the target element besides using React refs
    const getTargetElement = () => document.getElementById("content-id");
    //@ts-ignore
    generatePDF(getTargetElement, options);
  };
  return (
    <Card>
      <Card.Body>
        <View.Header
          icon="mdi mdi-card-account-details-outline"
          label="Carte d'adhésion"
          description="Carte d'adhésion de la personne"
          className="mb-2"
          right={<Button onClick={telechargerPDF}>Télécharger</Button>}
        />
        <div className="carte" id="content-id">
          <div className="carte-content">
            <table className="p-0">
              <tbody style={{ color: "#61217f" }}>
                <tr>
                  <td rowSpan={2} style={{ width: "65px" }}>
                    <img
                      src={logo}
                      style={{
                        objectFit: "cover",
                      }}
                      alt="Logo"
                      width="65px"
                    />
                  </td>
                  <td colSpan={2} className="text-uppercase  fw-bold">
                    <div className="mb-1">
                      ASSOCIATION DES SCOUTS DU BURKINA FASO
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    <div className="mb-1">
                      <span
                        style={{
                          backgroundColor: "#61217f",
                          padding: "3px 15px",
                        }}
                        className="fw-bold text-uppercase text-white"
                      >
                        Carte de membre
                      </span>
                    </div>
                    <div className="fw-bold">Zakaridia DIAWARA</div>
                    <div className="fw-bold">Etudiant</div>
                  </td>
                  <td
                    rowSpan={5}
                    style={{ width: "70px", verticalAlign: "top" }}
                  >
                    <div
                      style={{
                        width: "70px",
                        height: "70px",
                      }}
                    >
                      <img
                        alt=""
                        src={personne.photo}
                        width="70px"
                        height="70px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: ".5rem",
                        textAlign: "center",
                        marginTop: "10px",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Le président du comité national
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colSpan={2}>
                    <span className="fw-bold" style={{ color: "black" }}>
                      ID
                    </span>
                    &nbsp;:&nbsp;<span style={{ color: "black" }}>ZAM-103</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <span className="fw-bold" style={{ color: "black" }}>
                      Région
                    </span>
                    &nbsp;:&nbsp;
                    <span style={{ color: "black" }}>Hauts Bassins</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <span className="fw-bold" style={{ color: "black" }}>
                      Unité
                    </span>
                    &nbsp;:&nbsp;
                    <span style={{ color: "black" }}>Guimbi ouattara</span>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <span className="fw-bold" style={{ color: "black" }}>
                      Branche
                    </span>
                    &nbsp;:&nbsp;
                    <span style={{ color: "black" }}>Louveteau</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="carte-footer">Valide du 01/01/2024 au 31/12/2024</div>
        </div>
      </Card.Body>
    </Card>
  );
};
