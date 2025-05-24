import { FC } from "react";
import { Alert, Button, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { View } from "components";
import { PersonneResource } from "types/personne.type";
import { personneApi } from "api";
import { useQuery } from "@tanstack/react-query";
import { Carte } from "./Carte";
import generatePDF, { Margin, Resolution } from "react-to-pdf";

type Props = {
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

export const PersonneCarte: FC<Props> = ({ personne }) => {
  const { data: carte, isLoading } = useQuery({
    queryKey: ["carte_membre", personne.id],
    queryFn: () => personneApi.carteMembre(personne.id),
  });

  const telechargerCarte = () => {
    // you can use a function to return the target element besides using React refs
    const getTargetElement = () => document.getElementById("content-id");
    //@ts-ignore
    generatePDF(getTargetElement, options);
  };

  if (isLoading) {
    return <span>Chargement ...</span>;
  }

  if (!carte) {
    return <span>Pas de données</span>;
  }

  if (carte.message) {
    return (
      <Alert variant="danger" className="mb-0 border-0">
        <Alert.Heading>
          <Icon.InfoCircle className="me-1" /> Information
        </Alert.Heading>
        <p>{carte.message}</p>
      </Alert>
    );
  }

  return (
    <>
      <ListGroup className="mb-3">
        <View.Toolbar
          right={
            <Button variant="secondary" onClick={telechargerCarte}>
              <Icon.Download />
            </Button>
          }
        />
        <ListGroup.Item>
          <Carte carte={carte.data} photo={personne.photo} />
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};
