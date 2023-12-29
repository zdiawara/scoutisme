import { ICONS } from "pages/common";
import { FC, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ScoutModal } from "../modal";
import { OrganisationResource } from "types/organisation.type";
import { LINKS } from "utils";
import { Link } from "react-router-dom";
import { useDroits } from "hooks/useDroits";

type ListPersonneActionsProps = {};

export const ListPersonneActions: FC<ListPersonneActionsProps> = () => {
  const [action, setAction] = useState<string | undefined>();
  const { personne } = useDroits();

  const onSelect = (code: string) => () => {
    setAction(code);
  };

  const closeModal = () => {
    setAction(undefined);
  };

  const menus = useMemo(() => {
    return [
      {
        label: "Adulte",
        icon: ICONS.personne,
        description: "Créer un nouvel adulte ",
        code: "adulte",
        visible: personne.adultes.creer,
      },
      {
        label: "Scout",
        icon: ICONS.add,
        description: "Créer un nouveau scout dans une unité",
        code: "scout",
        visible: personne.scouts.creer,
      },
    ].filter((e) => e.visible);
  }, [personne]);

  if (!menus.length) {
    return null;
  }

  return (
    <>
      <Dropdown className="ms-2">
        <Dropdown.Toggle variant="primary">Ajouter personne</Dropdown.Toggle>
        <Dropdown.Menu className="topbar-dropdown-menu mt-2">
          {menus.map((item) => (
            <Dropdown.Item
              as={Link}
              to={`${LINKS.personnes.create}?type=${item.code}`}
              className="py-2 px-3"
              onClick={onSelect(item.code)}
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
      {action === "ajouter_scout" && (
        <ScoutModal
          closeModal={closeModal}
          organisation={{} as OrganisationResource}
        />
      )}
    </>
  );
};
