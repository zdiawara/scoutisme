import { FC, ReactNode } from "react";
import { Card, Tab } from "react-bootstrap";

type DashBoardWrapperProps = {
  defaultActiveKey: string;
  children: ReactNode;
};

export const DashBoardWrapper: FC<DashBoardWrapperProps> = ({
  defaultActiveKey,
  children,
}) => {
  return (
    <Card>
      <Card.Body>
        <Tab.Container defaultActiveKey={defaultActiveKey}>
          {children}
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export const DashBoardContent: FC<{ children: ReactNode }> = ({ children }) => {
  return <Tab.Content>{children}</Tab.Content>;
};
