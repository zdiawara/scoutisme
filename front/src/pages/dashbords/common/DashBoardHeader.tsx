import { FC } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

type DashBoardHeaderProps = {
  titre: string;
  items: Array<{ nom: string; code: string; icon: string }>;
};

export const DashBoardHeader: FC<DashBoardHeaderProps> = ({ titre, items }) => {
  return (
    <div className="align-items-center d-sm-flex justify-content-sm-between mb-1">
      <h4 className="header-title mb-0">{titre}</h4>
      <Nav as="ul" variant="pills" className="bg-nav-pills p-1 rounded">
        {items.map((item) => (
          <Nav.Item key={item.code} as="li">
            <Nav.Link as={Link} className="py-1" to="#" eventKey={item.code}>
              <i className={item.icon} /> {item.nom}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

const DEFAULT_HEADERS = [
  {
    code: "liste",
    icon: "uil-table",
    nom: "Liste",
  },
  {
    code: "graphique",
    icon: "uil-analytics",
    nom: "Graphique",
  },
];

export const DashBoardDefaultHeader: FC<{ titre: string }> = ({ titre }) => {
  return <DashBoardHeader titre={titre} items={DEFAULT_HEADERS} />;
};
