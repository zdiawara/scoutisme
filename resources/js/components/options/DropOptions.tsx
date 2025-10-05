import { FC, forwardRef, Fragment } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";
import * as Icon from "react-bootstrap-icons";

type DropOptionProps = {
  actions: Array<{
    label: string;
    description: string;
    code: string;
    Icon: any;
    disabled?: boolean;
  }>;
  onSelect: (action: string) => void;
  variant?: ButtonVariant;
  menu?: boolean;
};

const CustomToggle = forwardRef(({ onClick, variant = "default", menu = true }: any, ref) => (
  <Button
    // @ts-ignore
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    variant={variant}
  >
    {menu ? (
      <Icon.ThreeDotsVertical />
    ) : (
      <>
        <span className="d-none d-sm-inline me-1">Actions</span>
        <Icon.ChevronDown />
      </>
    )}
  </Button>
));

export const DropOption: FC<DropOptionProps> = ({ actions, onSelect, variant = "default", menu }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant={variant} menu={menu} as={CustomToggle} />
      <Dropdown.Menu align="end" className="topbar-dropdown-menu border shadow-lg">
        {actions.map((item, i) => (
          <Fragment key={item.code}>
            <Dropdown.Item as="button" className="px-3" onClick={() => onSelect(item.code)} disabled={item.disabled}>
              <item.Icon size="1.1rem" className="me-1" />
              <span className="fw-semibold">{item.label}</span>
              <div className="fw-light text-muted">{item.description}</div>
            </Dropdown.Item>
            {i + 1 !== actions.length && <Dropdown.Divider />}
          </Fragment>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
