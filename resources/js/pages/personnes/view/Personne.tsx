import { ChangeEvent, FC, ReactNode, useMemo } from "react";
import { Col, ListGroup, Nav, Row, Stack } from "react-bootstrap";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { personneApi } from "api";
import { PersonneResource } from "types/personne.type";
import { View } from "components";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LINKS } from "utils";
import { useDroits } from "hooks/useDroits";
import * as Icon from "react-bootstrap-icons";
import { PersonneProfil } from "../consultation/profil";
import { PersonneCarte } from "../consultation/carte";
import { EtatCotisation, PersonneCotisation } from "../consultation/cotisation";
import { PersonneFonctions } from "../consultation/fonction/PersonneFonctions";
import { Header } from "layout/Header";
import { ConsulterPersonneActions } from "../consultation/action";

type PersonneProps = {
  personneId: string;
  header?: (personne: PersonneResource, page?: string) => ReactNode;
  title: string;
};

const ImageUploader: FC<{ personneId: string }> = ({ personneId }) => {
  const queryClient = useQueryClient();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      await personneApi.modifierPhoto(personneId, formData);
      queryClient.invalidateQueries([QUERY_KEY.personnes, personneId]);
    }
  };

  return (
    <form>
      <input className="d-none" type="file" id="upload-image" accept="image/*" onChange={handleFileChange} />
      <label className="text-muted fs-6 text-center d-block mt-1" style={{ cursor: "pointer" }} htmlFor="upload-image">
        modifier photo
      </label>
    </form>
  );
};

export const Personne: FC<PersonneProps> = ({ personneId, title }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("p") || "fiche";
  const protection = useDroits();
  const navigation = useNavigate();
  const location = useLocation();

  const { data: personne, isLoading } = useQuery({
    queryKey: [QUERY_KEY.personnes, personneId],
    queryFn: ({ queryKey }) => personneApi.findById<PersonneResource>(queryKey[1] as string),
  });

  const menus = useMemo(() => {
    return [
      {
        label: "Profil",
        code: "fiche",
        Icon: Icon.PersonLinesFill,
        visible: true,
      },
      {
        label: "Carte",
        code: "carte",
        icon: "mdi mdi-card-account-details-outline",
        visible: protection.personne.affecter(personne),
        Icon: Icon.PersonVcard,
      },
      {
        label: "Fonctions",
        code: "fonctions",
        Icon: Icon.Briefcase,
        visible: true,
      },
      {
        label: "Cotisations",
        code: "cotisations",
        Icon: Icon.Bank2,
        visible: protection.cotisation.acces,
      },
    ].filter((e) => e.visible);
  }, [protection, personne]);

  const onSelectPage = (pageSelected: string) => () => {
    navigation(`${location.pathname}?p=${pageSelected}`, {
      replace: true,
    });
  };

  const renderContent = () => {
    if (!personne) {
      return null;
    }
    switch (page) {
      case "carte":
        return <PersonneCarte personne={personne} />;
      case "fonctions":
        return <PersonneFonctions personne={personne} />;
      case "cotisations":
        return <PersonneCotisation personne={personne} />;
      default:
        return <PersonneProfil personne={personne} />;
    }
  };

  if (isLoading || !personne) {
    return <span>chargement ...</span>;
  }

  const menu = (
    <Nav variant="pills" style={{ overflow: "auto" }} className="flex-nowrap py-2">
      {menus.map((item) => (
        <Nav.Item key={item.code}>
          <Nav.Link
            active={item.code === page}
            onClick={onSelectPage(item.code)}
            href="#"
            className="d-flex align-items-center"
          >
            <item.Icon size="1.2rem" className="me-1" />
            {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );

  return (
    <>
      <Header title={title} right={<ConsulterPersonneActions personne={personne} />} />

      <Stack direction="horizontal" className="mt-4">
        <div className="avatar-lg">
          {personne.photo ? (
            <img
              src={personne.photo}
              className="avatar-lg rounded img-thumbnail"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                minWidth: "96px",
                textAlign: "center",
                objectFit: "cover",
                color: "transparent",
                textIndent: "10000px",
              }}
            />
          ) : (
            <span className="avatar-title rounded bg-secondary-lighten text-secondary font-20 ">Photo</span>
          )}
          {/* <div className="fs-6 text-center text-muted">modifier photo</div> */}
          <ImageUploader personneId={personne.id} />
        </div>
        <div className="ms-2">
          <span className="fs-3">
            {personne.nom} {personne.prenom}
          </span>
          <div className="fw-light mt-1">{personne.fonction?.nom}</div>
        </div>
      </Stack>

      <ListGroup className="mb-2 mt-4">
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              <View.Item label="Numero">{personne.code}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Cotisation">
                <EtatCotisation etat={personne.etatCotisation} />
              </View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={6}>
              <View.Item label="Fonction">{personne.fonction?.nom}</View.Item>
            </Col>
            <Col xs={6}>
              <View.Item label="Organisation">
                {personne?.organisation && (
                  <Link
                    to={LINKS.organisations.view(personne.organisation.id)}
                    className="text-decoration-underline text-black"
                  >
                    <Icon.Link size="1.2rem" className="me-1" />
                    {personne.organisation.nom}
                  </Link>
                )}
              </View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <Row className="g-2">
        <Col xs={12} sm={12}>
          {menu}
        </Col>
        <Col xs={12} sm={12}>
          {renderContent()}
        </Col>
      </Row>
    </>
  );
};
