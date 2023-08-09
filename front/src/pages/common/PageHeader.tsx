import { FC, ReactNode } from "react";
import { Stack } from "react-bootstrap";

type HeaderProps = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
};

type HeaderLeftProps = {
  left?: ReactNode;
};

const Header: FC<HeaderProps & HeaderLeftProps> = ({
  title,
  subtitle,
  left,
  right,
}) => {
  return (
    <Stack direction="horizontal" className="my-4 align-items-center">
      <Stack direction="horizontal" className="align-items-start">
        {left}
        <div className="ms-2">
          <h2 className="m-0 text-black fw-semibold">{title}</h2>
          <div className="text-black">{subtitle}</div>
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
      left={icon ? <i className={`${icon} text-black fs-1 lh-1`} /> : undefined}
    />
  ),

  View: (props: HeaderProps & HeaderLeftProps) => <Header {...props} />,
};
