import { ICONS } from "pages/common";
import { FC, useMemo, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useDroits } from "hooks/useDroits";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { ExportPersonneModal } from "../modal";
import { EnvoyerMailModal } from "../modal/EnvoyerMailModal";

type ListPersonneActionsProps = {
  filter: Record<string, any>;
};

export const ListPersonneActions: FC<ListPersonneActionsProps> = ({
  filter,
}) => {
  const protection = useDroits();
  const [exportModal, setExportModal] = useState<boolean>(false);
  const [mailModal, setMailModal] = useState<boolean>(false);

  const menus = useMemo(() => {
    return [
      {
        label: "Adulte",
        icon: ICONS.personne,
        description: "Créer un nouvel adulte ",
        code: "adulte",
        visible: protection.personne.adultes.creer,
      },
      {
        label: "Scout",
        icon: "uil-user-plus",
        description: "Créer un nouveau scout dans une unité",
        code: "scout",
        visible: protection.personne.scouts.creer,
      },
    ].filter((e) => e.visible);
  }, [protection.personne]);

  if (!menus.length) {
    return null;
  }

  return (
    <>
      <div className="d-flex">
        <Button
          variant="outline-primary"
          onClick={() => {
            setExportModal(true);
          }}
        >
          <i className="uil-export"></i> Exporter
        </Button>
        {protection.mail.mails.envoyer && (
          <Button
            variant="outline-primary"
            className="ms-2"
            onClick={() => {
              setMailModal(true);
            }}
          >
            <i className="uil-message"></i> Mail
          </Button>
        )}
        <Dropdown className="ms-2">
          <Dropdown.Toggle variant="primary">Creer personne</Dropdown.Toggle>
          <Dropdown.Menu className="topbar-dropdown-menu mt-2">
            {menus.map((item) => (
              <Dropdown.Item
                as={Link}
                to={`${LINKS.personnes.create}?type=${item.code}`}
                className="py-2 px-3"
                key={item.code}
              >
                <i className={`${item.icon} text-black me-2`}></i>
                <span className="text-primary fs-5 fw-semibold">
                  {item.label}
                </span>
                <div className="text-muted">{item.description}</div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {exportModal && (
        <ExportPersonneModal
          filter={filter}
          closeModal={() => setExportModal(false)}
        />
      )}
      {mailModal && (
        <EnvoyerMailModal
          filter={filter}
          closeModal={() => setMailModal(false)}
        />
      )}
    </>
  );
};
