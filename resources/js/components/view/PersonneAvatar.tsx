import { FC } from "react";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LINKS } from "utils";

type PersonneAvatarProps = {
  id: string;
  nom: string;
  prenom: string;
  photo?: string;
  subtitle?: string;
};
export const PersonneAvatar: FC<PersonneAvatarProps> = ({
  id,
  nom,
  prenom,
  photo,
  subtitle,
}) => {
  return (
    <Link to={LINKS.personnes.view(id)} className="table-user d-flex">
      <div className="avatar-sm me-2">
        {photo ? (
          <img
            src={photo}
            alt=""
            className="rounded-circle"
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              objectFit: "cover",
              color: "transparent",
              textIndent: "10000px",
            }}
          />
        ) : (
          <span className="avatar-title bg-secondary-lighten text-secondary fs-4 rounded-circle">
            {prenom[0]}
            {nom[0]}
          </span>
        )}
      </div>
      <Stack className="justify-content-center">
        <span className="text-primary fw-semibold">
          {prenom} {nom}
        </span>
        {subtitle && (
          <span className="text-muted text-capitalize">{subtitle}</span>
        )}
      </Stack>
    </Link>
  );
};
