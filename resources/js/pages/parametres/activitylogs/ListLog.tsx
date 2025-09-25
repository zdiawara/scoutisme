import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LINKS } from "utils/links";
import * as Icon from "react-bootstrap-icons";
import { LogActivityResource } from "types/log-activity.type";
import { DateFormater } from "utils/DateUtils";

type Props = {
  logs?: LogActivityResource[];
};

export const ListLog: FC<Props> = ({ logs }) => {
  if (!logs?.length) {
    return <ListGroup.Item className="text-center text-muted">Aucune activités trouvées</ListGroup.Item>;
  }

  return (
    <>
      {logs.map((log) => (
        <ListGroup.Item
          as={Link}
          to={`${LINKS.parametres.logs}/${log.id}`}
          key={log.id}
          className="d-flex justify-content-between align-items-start px-2 px-sm-4"
        >
          <div className="align-self-center">
            <Link to={`${LINKS.parametres.logs}/${log.id}`} className="fw-semibold text-black">
              {log.description}
            </Link>
            <span className="fs-6 fw-light d-block">Par {log.causer?.name}</span>
            <div className="fs-6 text-muted fw-light">Le {DateFormater.toDateTextTime(log.created_at)}</div>
          </div>
          <Icon.ArrowRight className="align-self-center" />
        </ListGroup.Item>
      ))}
    </>
  );
};
