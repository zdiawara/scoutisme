import { FC, ReactNode } from "react";
import { Button, Stack } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  right?: ReactNode;
};

export const Header: FC<HeaderProps> = ({ title, right, showBack = true }) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack direction="horizontal" className="mt-4">
        {showBack && (
          <Button
            variant="default"
            className="me-1 bg-white"
            onClick={() => {
              navigate(-1);
            }}
          >
            <Icon.ArrowLeft />
          </Button>
        )}
        {title && (
          <h3 className="mb-0 d-flex align-items-center text-black">{title}</h3>
        )}

        <Stack className="ms-auto" direction="horizontal">
          {/* <Button variant="default" className="d-block bg-white">
          <Icon.BellFill />
        </Button> */}
          {right}
        </Stack>
      </Stack>
    </>
  );
};
