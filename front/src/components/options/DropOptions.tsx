import { FC, forwardRef, Fragment } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { ButtonVariant } from "react-bootstrap/esm/types";

type DropOptionProps = {
  actions: Array<{
    label: string;
    description: string;
    code: string;
    Icon: any;
  }>;
  onSelect: (action: string) => void;
  variant?: ButtonVariant;
};

const CustomToggle = forwardRef(
  ({ onClick, variant = "default" }: any, ref) => (
    <Button
      // @ts-ignore
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      // size="sm"
      // variant="default"
      variant={variant}
    >
      <ThreeDotsVertical />
    </Button>
  )
);

export const DropOption: FC<DropOptionProps> = ({
  actions,
  onSelect,
  variant = "default",
}) => {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant={variant} as={CustomToggle} />
        <Dropdown.Menu className="topbar-dropdown-menu border shadow-lg">
          {actions.map((item, i) => (
            <Fragment key={item.code}>
              <Dropdown.Item
                as="button"
                className="px-3"
                onClick={() => onSelect(item.code)}
              >
                <item.Icon size="1.1rem" className="me-1" />
                <span className="fw-semibold">{item.label}</span>
                <div className="fw-light text-muted">{item.description}</div>
              </Dropdown.Item>
              {i + 1 !== actions.length && <Dropdown.Divider />}
            </Fragment>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
