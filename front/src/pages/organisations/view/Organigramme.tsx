import { FC, Fragment } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import classNames from "classnames";
import { OrganisationParent } from "types/organisation.type";

type OrganigrammeProps = {
  parents?: OrganisationParent[];
};

export const Organigramme: FC<OrganigrammeProps> = ({ parents }) => {
  return (
    <>
      <Card className="text-black">
        <Card.Header className="fw-semibold border-0">Organigramme</Card.Header>
        <Card.Body className="p-1">
          <ListGroup className="text-center">
            {parents?.map((parent, i) => {
              const isLast = i + 1 === parents?.length;
              return (
                <Fragment key={parent.id}>
                  <ListGroup.Item
                    className={classNames("fs-7 p-1", {
                      "border-0": !isLast,
                      "shadow-lg": isLast,
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
                      <i className="uil-angle-down fs-3"></i>
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
