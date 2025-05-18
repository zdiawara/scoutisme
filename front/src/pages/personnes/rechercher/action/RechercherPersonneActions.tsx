// import FeatherIcon from "feather-icons-react";
import * as Icon from "react-bootstrap-icons";
import { Button, Stack } from "react-bootstrap";

export const RechercherPersonneActions = () => {
  return (
    <>
      <Stack direction="horizontal">
        <Button variant="outline-secondary" className="ms-1">
          <Icon.Filter />
        </Button>
        <Button variant="secondary" className="ms-1">
          <Icon.ThreeDotsVertical />
        </Button>
      </Stack>
    </>
  );
};
