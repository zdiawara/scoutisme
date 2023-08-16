import { Card } from "react-bootstrap";
import { FC, ReactNode } from "react";

type PersonneBoxProps = {
  title?: ReactNode;
  children?: ReactNode;
  source: string | undefined;
};

export const PersonneBox: FC<PersonneBoxProps> = ({
  source,
  title,
  children,
}) => {
  return (
    <Card className="text-black shadow-sm">
      <Card.Body>
        <div className="text-center">
          <div className="avatar-xl mx-auto">
            {source ? (
              <img
                src={source}
                className="rounded-circle avatar-xl img-thumbnail"
                alt=""
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
              <span className="avatar-title bg-secondary-lighten text-secondary font-20 rounded-circle">
                Photo
              </span>
            )}
          </div>
          {title}
        </div>
        <div>{children}</div>
      </Card.Body>
    </Card>
  );
};
