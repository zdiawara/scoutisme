import { FC } from "react";
import { Button, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { MessageResource } from "types/message.type";
import { DateFormater } from "utils/DateUtils";

type Props = {
  mails?: MessageResource[];
};

export const ListMail: FC<Props> = ({ mails }) => {
  if (!mails?.length) {
    return (
      <ListGroup.Item className="text-center text-muted">
        Aucun mail trouvé
      </ListGroup.Item>
    );
  }

  return (
    <>
      {mails.map((mail) => {
        const link = LINKS.messages.view(mail.id);
        return (
          <ListGroup.Item
            key={mail.id}
            className="d-flex justify-content-between align-items-start"
          >
            <div className="align-self-center">
              <Link to={link} className="fw-semibold fs-5 text-black">
                {mail.objet}
              </Link>

              <div className="fw-light mt-1">
                Envoyé le {DateFormater.toDateText(mail.created_at)}
              </div>
            </div>

            <Button
              //@ts-ignore
              as={Link}
              to={link}
              variant="default"
            >
              <Icon.Eye />
            </Button>
          </ListGroup.Item>
        );
      })}
    </>
  );
};
