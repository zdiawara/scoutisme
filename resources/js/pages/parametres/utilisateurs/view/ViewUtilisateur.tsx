import { useQuery } from "@tanstack/react-query";
import { userApi } from "api/index";
import { View } from "components/view";
import { Header } from "layout/Header";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UserResource } from "types/auth.type";
import { QUERY_KEY } from "utils/constants";
import { DateFormater } from "utils/DateUtils";

const ViewUtilisateur = () => {
  const { id: utilisateurId } = useParams();

  const { data: utilisateur, isLoading } = useQuery({
    queryKey: [QUERY_KEY.utilisateurs, utilisateurId],
    networkMode: "offlineFirst",
    queryFn: () => {
      return userApi.findById<UserResource>(utilisateurId!);
    },
  });

  if (isLoading || !utilisateur) {
    return <span>chargement ...</span>;
  }

  return (
    <>
      <Header title="Consulter" />

      <ListGroup className="mb-2 mt-4">
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={12}>
              <View.Item label="Nom">{utilisateur.name}</View.Item>
            </Col>
            <Col xs={12}>
              <View.Item label="Email">{utilisateur.email}</View.Item>
            </Col>
            <Col xs={12}>
              <View.Item label="Date creation">{DateFormater.toDateText(utilisateur.created_at)}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup className="mb-2">
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={12}>
              <View.Item label="Fonction">{utilisateur.personne?.fonction?.nom}</View.Item>
            </Col>
            <Col xs={12}>
              <View.Item label="Perimetre">{utilisateur.personne?.organisation?.nature.nom}</View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup className="mb-2">
        <ListGroup.Item>
          <Row className="g-3">
            <Col xs={12}>
              <View.Item label="Roles">
                <ul>{utilisateur.roles && utilisateur.roles.map((role) => <li key={role.id}>{role.nom}</li>)}</ul>
              </View.Item>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default ViewUtilisateur;
