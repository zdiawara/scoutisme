// import FeatherIcon from "feather-icons-react";
import * as Icon from "react-bootstrap-icons";
import { Button, Dropdown } from "react-bootstrap";
import { forwardRef, Fragment, useState } from "react";
import { ExportPersonneModal } from "pages/personnes/modal";
import { EnvoyerMailModal } from "pages/personnes/modal/EnvoyerMailModal";

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

const ACTIONS = [
  {
    label: "Exporter",
    icon: "uil-user",
    description: "Exporter les organisations en CSV",
    code: "exporter",
    Icon: Icon.Download,
  },
];

export const RechercherOrganisationActions = ({
  params,
}: {
  params: Record<string, any>;
}) => {
  const [action, setAction] = useState<string | undefined>();

  const onSelect = (code: string) => () => {
    setAction(code);
  };

  const closeModal = () => {
    setAction(undefined);
  };

  return (
    <>
      <Dropdown className="ms-2">
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className="topbar-dropdown-menu shadow-lg">
          {ACTIONS.map((item, i) => (
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
              {i + 1 !== ACTIONS.length && <Dropdown.Divider />}
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
