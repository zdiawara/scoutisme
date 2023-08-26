import { FC, ReactNode } from "react";
import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  title: string;
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
    <Stack direction="horizontal" className={`align-items-center ${className}`}>
      <Stack direction="horizontal" className="align-items-start">
        {left}
        <div className="ms-2">
          <div className="m-0 h2 fw-normal text-primary">{title}</div>
          <div className="text-primary">{subtitle}</div>
        </div>
      </Stack>
      <div className="ms-auto">{right}</div>
    </Stack>
  );
};

export const PageHeader = {
  List: ({ icon, ...props }: HeaderProps & { icon?: string }) => (
    <Header
      {...props}
      left={
        icon ? <i className={`${icon} text-primary fs-1 lh-1`} /> : undefined
      }
    />
  ),

  View: ({ left, ...props }: HeaderProps & HeaderLeftProps) => {
    const navigation = useNavigate();
    return (
      <Header
        {...props}
        left={
          <>
            <Button
              variant="light"
              size="sm"
              className="mt-1"
              onClick={() => navigation(-1)}
            >
              <i className="uil-arrow-left fs-5 me-2"></i>
              Retour
            </Button>
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
