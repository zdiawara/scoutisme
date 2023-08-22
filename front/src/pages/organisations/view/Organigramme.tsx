import { FC, Fragment } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import classNames from "classnames";
import { OrganisationParent } from "types/organisation.type";
import { ICONS } from "pages/common";

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
    <>
      <Card className="text-black">
        <Card.Body className="p-1">
          <div className="text-center mt-2">
            <div className="avatar-xl mx-auto">
              <span className="avatar-title bg-warning-lighten font-20 rounded-circle">
                <i className={`${ICONS.organisation} fs-1 text-black`}></i>
              </span>
            </div>
            <div className="fs-4 fw-semibold my-2">{organisation.nom}</div>
            <Badge className="bg-info">{organisation.nature}</Badge>
          </div>

          <hr />

          <ListGroup className="text-center">
            {parents?.map((parent, i) => {
              const isLast = i + 1 === parents?.length;
              return (
                <Fragment key={parent.id}>
                  <ListGroup.Item
                    className={classNames("fs-7 p-1", {
                      "border-0": !isLast,
                      "shadow-lg bg-secondary-lighten": isLast,
                    })}
                    action={!isLast}
                    as={isLast ? "div" : Link}
                    //@ts-ignore
                    to={LINKS.organisations.view(parent.id)}
                  >
                    <span className="text-secondary">
                      {parent.nature.nom} :
                    </span>
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
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};
