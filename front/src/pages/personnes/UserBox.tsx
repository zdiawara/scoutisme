import { Card } from "react-bootstrap";
import profileImg from "assets/images/users/avatar-1.jpg";

const UserBox = () => {
  return (
    <Card className="text-black shadow-sm">
      <Card.Body>
        <div className="text-center">
          <img
            src={profileImg}
            className="rounded-circle avatar-xl img-thumbnail"
            alt=""
          />
          {/* <h4 className="mb-0 mt-2">Zakaridia DIAWARA</h4>
          <Badge bg="success">Actif</Badge> */}
        </div>
        {/*         <div className="text-start mt-3">
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
        </div> */}
      </Card.Body>
    </Card>
  );
};

export default UserBox;
