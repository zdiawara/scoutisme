import { FC } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { OrganisationParent } from "types/organisation.type";
import { ICONS } from "pages/common";
import { Link } from "react-router-dom";

type OrganigrammeProps = {
  parents?: OrganisationParent[];
  organisation: {
    nom: string;
    nature: string;
  };
};

export const Organigramme: FC<OrganigrammeProps> = ({
  parents,
  organisation,
}) => {
  return (
    <Card className="text-black">
      <Card.Body className="p-1">
        <div className="text-center my-3">
          <div className="avatar-xl mx-auto">
            <span className="avatar-title bg-secondary-lighten font-20 rounded-circle">
              <i className={`${ICONS.organisation} fs-1 text-secondary`}></i>
            </span>
          </div>
          <div className="fs-4 fw-semibold mt-2">{organisation.nom}</div>
          <Badge className="bg-secondary fs-6 mt-1">
            {organisation.nature}
          </Badge>
        </div>

        <ListGroup defaultActiveKey="#link1">
          <ListGroup.Item
            className="border-0 rounded active"
            action
            as={Link}
            to="OK"
          >
            <i className="uil uil-bookmark me-1"></i>&nbsp;Détails
          </ListGroup.Item>
          <ListGroup.Item className="border-0" action>
            <i className={`${ICONS.personne} me-1`}></i>
            &nbsp;Organe de direction
          </ListGroup.Item>
          <ListGroup.Item className="border-0" action>
            <i className={`${ICONS.fonction} me-1`}></i>&nbsp;Scoutes
          </ListGroup.Item>
        </ListGroup>

        {/*         <ListGroup className="text-center">
          {parents?.map((parent, i) => {
            const isLast = i + 1 === parents?.length;
            return (
              <Fragment key={parent.id}>
                <ListGroup.Item
                  className={classNames("fs-7 p-1", {
                    "border-0": !isLast,
                    "shadow-lg bg-light": isLast,
                  })}
                  action={!isLast}
                  as={isLast ? "div" : Link}
                  //@ts-ignore
                  to={LINKS.organisations.view(parent.id)}
                >
                  <span className="text-secondary">{parent.nature.nom} :</span>
                  &nbsp;<span className="text-black">{parent.nom}</span>
                </ListGroup.Item>
                {!isLast && (
                  <ListGroup.Item className="border-0 p-0">
                    <i className="uil-angle-down fs-4"></i>
                  </ListGroup.Item>
                )}
              </Fragment>
            );
          })}
        </ListGroup> */}
      </Card.Body>
    </Card>
  );
};
