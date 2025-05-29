// import FeatherIcon from "feather-icons-react";
import * as Icon from "react-bootstrap-icons";
import { Button, Dropdown } from "react-bootstrap";
import { forwardRef, Fragment } from "react";
import { useSearchParams } from "react-router-dom";

const CustomToggle = forwardRef(({ onClick }: any, ref) => (
  <Button
    // @ts-ignore
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    variant="outline-secondary"
  >
    <Icon.SortAlphaDown size="1.3rem" />
    <span className="ms-1 d-none d-sm-inline">Trier</span>
  </Button>
));

const ACTIONS = [
  {
    label: "Nom  de famille croissant",
    code: "nom,asc",
  },
  {
    label: "Nom de famille décroissant",
    code: "nom,desc",
  },
  {
    label: "Prénom croissant",
    code: "prenom,asc",
  },
  {
    label: "Prénom décroissant",
    code: "prenom,desc",
  },
];

export const TrierPersonne = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelect = (code: string) => () => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        params.set("sort", code);
        return params;
      },
      { replace: true }
    );
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
                className={"px-3" + (item.code === searchParams.get("sort") ? " active" : "")}
                onClick={onSelect(item.code)}
              >
                {item.label}
              </Dropdown.Item>
              {i + 1 !== ACTIONS.length && <Dropdown.Divider />}
            </Fragment>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
