// import FeatherIcon from "feather-icons-react";
import * as Icon from "react-bootstrap-icons";
import { Button, Dropdown } from "react-bootstrap";
import { forwardRef, Fragment, useMemo, useState } from "react";
import { ExportPersonneModal } from "pages/personnes/modal";
import { EnvoyerMailModal } from "pages/personnes/modal/EnvoyerMailModal";
import { useDroits } from "hooks/useDroits";

const CustomToggle = forwardRef(({ onClick }: any, ref) => (
  <Button
    // @ts-ignore
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    variant="secondary"
  >
    <span className="d-none d-sm-inline me-1">Actions</span>
    <Icon.ChevronDown />
  </Button>
));

export const RechercherPersonneActions = ({
  params,
}: {
  params: Record<string, any>;
}) => {
  const [action, setAction] = useState<string | undefined>();
  const droits = useDroits();

  const onSelect = (code: string) => () => {
    setAction(code);
  };

  const closeModal = () => {
    setAction(undefined);
  };

  const menus = useMemo(() => {
    return [
      {
        label: "Ajouter",
        description: "Créer une nouvelle personne",
        code: "creer",
        Icon: Icon.PersonAdd,
        visible: droits.personne.adultes.creer || droits.personne.scouts.creer,
      },
      {
        label: "Exporter",
        description: "Exporter les personnes en CSV",
        code: "exporter",
        Icon: Icon.Download,
        visible: true,
      },
      {
        label: "Email",
        description: "Envoyer un mail aux personnes",
        code: "email",
        Icon: Icon.Send,
        visible: droits.mail.mails.envoyer,
      },
    ].filter((e) => e.visible);
  }, [droits.mail, droits.personne]);

  return (
    <>
      <Dropdown className="ms-2">
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className="topbar-dropdown-menu shadow-lg">
          {menus.map((item, i) => (
            <Fragment key={item.code}>
              <Dropdown.Item
                as="button"
                className="px-3"
                onClick={onSelect(item.code)}
              >
                <item.Icon size="1.1rem" className="me-1" />
                <span className="fw-semibold">{item.label}</span>
                <div className="fw-light text-muted">{item.description}</div>
              </Dropdown.Item>
              {i + 1 !== menus.length && <Dropdown.Divider />}
            </Fragment>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {action === "exporter" && (
        <ExportPersonneModal filter={params} closeModal={closeModal} />
      )}
      {action === "email" && (
        <EnvoyerMailModal filter={params} closeModal={closeModal} />
      )}
    </>
  );
};
