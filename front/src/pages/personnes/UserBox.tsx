import { Badge, Card } from "react-bootstrap";
import profileImg from "assets/images/users/avatar-1.jpg";

const UserBox = () => {
  return (
    <Card className="text-center text-black">
      <Card.Body>
        <img
          src={profileImg}
          className="rounded-circle avatar-xl img-thumbnail"
          alt=""
        />
        <h4 className="mb-0 mt-2">Zakaridia DIAWARA</h4>
        <Badge bg="success">Actif</Badge>
        <div className="text-start mt-3">
          <h4 className="font-13 text-secondary">
            <i className="uil-phone me-2"></i>
            Numéro tél.
          </h4>
          <p className="font-13 mb-2">07 82 31 02 93</p>
          <hr />
          <h4 className="font-13 text-secondary">
            <i className="uil-envelope me-2"></i>
            Email
          </h4>
          <p className="font-13 mb-2">zakaridia.diawara@gmail.com</p>
          {/* <h4 className="font-13">Cotisation</h4>
          <p className="text-muted font-13 mb-2">
            <Badge>OK</Badge>
          </p> */}
          {/* <p className="mb-2 font-13">
            <strong className="text-muted">Full Name :</strong>
            <span className="ms-2">Geneva D. McKnight</span>
          </p> */}
          {/* 
          <p className="mb-2 font-13">
            <strong className="text-muted">Mobile :</strong>
            <span className="ms-2">(123) 123 1234</span>
          </p>

          <p className="mb-2 font-13">
            <strong className="text-muted">Email :</strong>
            <span className="ms-2 ">user@email.domain</span>
          </p>

          <p className="mb-1 font-13">
            <strong className="text-muted">Location :</strong>
            <span className="ms-2">USA</span>
          </p> */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserBox;
