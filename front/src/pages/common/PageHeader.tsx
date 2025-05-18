import { FC, ReactNode } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  className?: string;
};

type HeaderLeftProps = {
  left?: ReactNode;
};

const Header: FC<HeaderProps & HeaderLeftProps> = ({
  title,
  subtitle,
  left,
  right,
  className = "",
}) => {
  return (
    <div className={`d-flex align-items-center ${className}`}>
      <div className="d-flex align-items-start">
        {left}
        {title && (
          <div className="ms-0">
            <div className="m-0 h3 fw-normal text-primary">{title}</div>
            <div className="text-primary">{subtitle}</div>
          </div>
        )}
      </div>
      <div className="ms-auto">{right}</div>
    </div>
  );
};

export const PageHeader = {
  List: ({ icon, ...props }: HeaderProps & { icon?: string }) => (
    <Header
      {...props}
      // left={
      //   icon ? <i className={`${icon} text-primary fs-2 lh-1`} /> : undefined
      // }
    />
  ),

  View: ({
    left,
    ...props
  }: HeaderProps & HeaderLeftProps & { showBackBtn?: boolean }) => {
    const navigation = useNavigate();
    const showBackBtn =
      props.showBackBtn === undefined ? true : Boolean(props.showBackBtn);
    return (
      <Header
        {...props}
        left={
          <>
            {showBackBtn && (
              <Button
                variant="secondary"
                size="sm"
                // className="text-dark"
                onClick={() => navigation(-1)}
              >
                <Icon.ArrowLeftCircleFill className="me-1" />
                <span className="d-none d-sm-inline">Retour</span>
              </Button>
            )}
            {left}
          </>
        }
      />
    );
  },

  Default: (props: HeaderProps & HeaderLeftProps) => {
    return <Header {...props} />;
  },
};
