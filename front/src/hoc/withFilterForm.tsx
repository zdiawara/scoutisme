import { FC } from "react";
import { Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

type HocCompomentProps = {
  applyFiler: (data: any) => void;
  defaultValues?: Record<string, any>;
  show: boolean;
  close: () => void;
};

export type FilterWrapperProps = {};

export function withFilterForm(Wrapper: FC<FilterWrapperProps>) {
  const HocCompoment: FC<HocCompomentProps> = ({
    applyFiler,
    defaultValues,
    show,
    close,
  }) => {
    const methods = useForm({ defaultValues });

    const onSubmit = (data: any) => {
      console.log("oj");
      applyFiler(data);
    };

    return (
      <Offcanvas show={show} onHide={close} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Recherche avancée</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="bg-light">
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Row className="g-3">
                <Wrapper />
                <Col xs={12} className="text-end">
                  <Button className="me-2" variant="outline-danger">
                    Ré-initialiser
                  </Button>
                  <Button onClick={methods.handleSubmit(onSubmit)}>
                    Appliquer
                  </Button>
                </Col>
              </Row>
            </Form>
          </FormProvider>
        </Offcanvas.Body>
      </Offcanvas>
    );
  };

  return HocCompoment;
}
