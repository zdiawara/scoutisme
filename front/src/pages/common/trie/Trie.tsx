// import FeatherIcon from "feather-icons-react";
import * as Icon from "react-bootstrap-icons";
import { Button, Dropdown } from "react-bootstrap";
import { FC, forwardRef, Fragment } from "react";
import { useSearch } from "hooks/useSearch";

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

type Props = {
  actions: Array<{
    label: string;
    code: string;
  }>;
};

export const Trier: FC<Props> = ({ actions }) => {
  const { setSort, searchParams } = useSearch();

  const onSelect = (code: string) => () => {
    setSort(code);
  };

  return (
    <>
      <Dropdown className="ms-2">
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className="topbar-dropdown-menu shadow-lg">
          {actions.map((item, i) => (
            <Fragment key={item.code}>
              <Dropdown.Item
                as="button"
                className={
                  "px-3" +
                  (item.code === searchParams.get("sort") ? " active" : "")
                }
                onClick={onSelect(item.code)}
              >
                {item.label}
              </Dropdown.Item>
              {i + 1 !== actions.length && <Dropdown.Divider />}
            </Fragment>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
