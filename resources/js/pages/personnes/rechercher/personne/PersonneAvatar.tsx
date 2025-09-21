import { FC } from "react";

type PersonneAvatarProps = {
  photo?: string;
  label: string;
};
export const PersonneAvatar: FC<PersonneAvatarProps> = ({ photo, label }) => {
  return (
    <>
      <div className="avatar-sm me-1">
        {photo ? (
          <img
            src={photo}
            alt=""
            className="rounded-circle"
            style={{
              width: "100%",
              height: "100%",
              minWidth: "50px",
              textAlign: "center",
              objectFit: "cover",
              color: "transparent",
              textIndent: "10000px",
            }}
          />
        ) : (
          <span className="avatar-title bg-secondary-lighten text-secondary fs-4 rounded-circle">{label}</span>
        )}
      </div>
    </>
  );
};
