import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

type AccountLayoutProps = {
  bottomLinks?: React.ReactNode;
  children?: React.ReactNode;
};

const AccountLayout = ({ bottomLinks, children }: AccountLayoutProps) => {
  return (
    <>
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5} xxl={4}>
              <Card>
                {/* logo */}
                <Card.Header className="pt-3 pb-3 text-center bg-primary">
                  <div className="text-white fs-3">ASBF</div>
                </Card.Header>
                <Card.Body className="p-4">{children}</Card.Body>
              </Card>

              {bottomLinks}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AccountLayout;
