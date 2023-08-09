import { FC, ReactNode } from "react";
import { Button, Card, Form, InputGroup, Row } from "react-bootstrap";

type PageFilterProps = {
  children?: ReactNode;
};

const Container: FC<PageFilterProps> = ({ children }) => {
  return (
    <Card>
      <Card.Body>
        <Row>{children}</Row>
      </Card.Body>
    </Card>
  );
};

const Search = () => {
  return (
    <div className="app-search">
      <InputGroup>
        <Form.Control className="text-black" placeholder="Nom, prénom..." />
        <span className="mdi mdi-magnify search-icon"></span>
        <Button variant="dark">Rechercher</Button>
      </InputGroup>
    </div>
  );
};

export const PageFilter = {
  Container,
  Search,
};
