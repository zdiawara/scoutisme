import { FC } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { Header, PageHeader } from "pages/common";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { personneApi } from "api";
import { PersonneResource } from "types/personne.type";
import { PersonneBox } from "./view/PersonneBox";
import { View } from "components";
import { Link } from "react-router-dom";
import { LINKS } from "utils";

const ViewPersonne: FC = () => {
  const { id } = useParams();
  const { data: personne, isLoading } = useQuery({
    queryKey: [QUERY_KEY.organisations, id],
    queryFn: ({ queryKey }) => {
      return personneApi.findById<PersonneResource>(queryKey[1] as string);
    },
  });

  const actions = () => {
    if (!personne) {
      return null;
    }
    return (
      <div className="ms-auto d-flex">
        <Link
          className="rounded-corner btn btn-danger"
          to={LINKS.personnes.edit(personne.id)}
        >
          <i className="uil-edit-alt"></i> Modifier
        </Link>

        {/* <Dropdown className="ms-2">
          <Dropdown.Toggle variant="outline-secondary">Actions</Dropdown.Toggle>
          <Dropdown.Menu className="topbar-dropdown-menu mt-2">
            <Dropdown.Header>Options sur le scout</Dropdown.Header>
            <div>
              {[
                {
                  label: "Affecter",
                  icon: "uil-link",
                  description: "Affecter le scout à une organisation",
                },
                {
                  label: "Carte adhésion",
                  icon: "uil-down-arrow",
                  description: "Telecharger la carte d'adhésion",
                },
              ].map((item, i) => {
                return (
                  <Dropdown.Item as="button" key={i + "-profile-menu"}>
                    <i className={`${item.icon} text-black me-2`}></i>
                    <span className="text-black fw-semibold">{item.label}</span>
                    <div className="text-secondary">{item.description}</div>
                  </Dropdown.Item>
                );
              })}
              <Dropdown.Divider />
              <Dropdown.Item as="button">
                <i className={`uil-padlock text-black me-2`}></i>
                <span className="text-black fw-semibold">Désactiver</span>
                <div className="text-secondary">Rendre inactif le scout</div>
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown> */}
      </div>
    );
  };

  if (isLoading || !personne) {
    return <span>chargement ...</span>;
  }

  return (
    <>
      <PageHeader.View
        title={`${personne.nom} ${personne.prenom}`}
        subtitle={`Code : ${personne.code}`}
        right={actions()}
      />

      <Row>
        <Col xl={3} lg={3}>
          <PersonneBox
            source={personne.photo}
            title={
              <>
                <div className="mb-2 mt-2 fs-4">
                  {personne.nom} {personne.prenom}
                </div>
                <Badge
                  className={`${
                    personne.type === "scout" ? "bg-info" : "bg-secondary"
                  } fs-5`}
                >
                  {personne.type}
                </Badge>
              </>
            }
          >
            <div className="text-start mt-4">
              <h4 className="font-13 text-black">
                <i className="uil-phone me-2" />
                Numéro de tél.
              </h4>
              <View.Item>{personne.telephone}</View.Item>
              <hr />
              <h4 className="font-13 text-black">
                <i className="uil-envelope me-2"></i>
                Email
              </h4>
              <View.Item>{personne.email}</View.Item>
            </div>
          </PersonneBox>
        </Col>
        <Col xl={9} lg={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <View.Header
                {...Header.infoGenerale}
                description="Information générale de la personne"
                className="mb-0"
              />

              <Card className="shadow-sm">
                <Card.Body>
                  <Row className="g-3">
                    <Col sm={4}>
                      <View.Item label="Code">{personne.code}</View.Item>
                    </Col>
                    <Col sm={4}>
                      <View.Item label="Nom">{personne.nom}</View.Item>
                    </Col>
                    <Col sm={4}>
                      <View.Item label="Prénom">{personne.prenom}</View.Item>
                    </Col>
                    <Col sm={4}>
                      <View.Item label="Etat">
                        <View.Etat value={personne.etat} />
                      </View.Item>
                    </Col>

                    <Col sm={4}>
                      <View.Item label="Date naissance">
                        {personne.date_naissance}
                      </View.Item>
                    </Col>

                    <Col sm={4}>
                      <View.Item label="Lieu naissance">
                        {personne.lieu_naissance}
                      </View.Item>
                    </Col>

                    {personne.type === "adulte" && (
                      <>
                        <Col sm={4}>
                          <View.Item label="Profession">
                            {personne.profession}
                          </View.Item>
                        </Col>

                        <Col sm={4}>
                          <View.Item label="Niveau formation">
                            {personne.niveau_formation?.nom}
                          </View.Item>
                        </Col>
                      </>
                    )}
                  </Row>
                </Card.Body>
              </Card>

              <View.Header
                {...Header.contact}
                description="Email, numéro tél. de la personne"
                className="mt-4"
              />

              <Card className="shadow-sm">
                <Card.Body>
                  <Row className="g-3">
                    <Col sm={4}>
                      <View.Item label="Email">{personne.email}</View.Item>
                    </Col>
                    <Col sm={8}>
                      <View.Item label="Téléphone">
                        {personne.telephone}
                      </View.Item>
                    </Col>
                    <Col sm={4}>
                      <View.Item label="Personne à contacter">
                        {personne.personne_a_contacter?.nom}
                      </View.Item>
                    </Col>
                    <Col sm={4}>
                      <View.Item label="Rélation">
                        {personne.personne_a_contacter?.relation}
                      </View.Item>
                    </Col>
                    <Col sm={4}>
                      <View.Item label="Téléphone">
                        {personne.personne_a_contacter?.telephone}
                      </View.Item>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <View.Header
                {...Header.adresse}
                className="mt-4"
                description="Adresse postale de la personne"
              />

              <Card className="shadow-sm mb-0">
                <Card.Body>
                  <Row className="g-3">
                    <Col sm={4}>
                      <View.Item label="Ville">{personne.ville?.nom}</View.Item>
                    </Col>
                    <Col sm={8}>
                      <View.Item label="Adresse">{personne?.adresse}</View.Item>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewPersonne;
