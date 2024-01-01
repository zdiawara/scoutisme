import { FC } from "react";
import { useParams } from "react-router-dom";
import { Organisation } from "./view";

const ViewOrganisation: FC = () => {
  const { id } = useParams();

  return <Organisation organisationId={id!} />;
};

export default ViewOrganisation;
