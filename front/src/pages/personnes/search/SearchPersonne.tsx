// import FeatherIcon from "feather-icons-react";
import { useQuery } from "@tanstack/react-query";
import { personneApi } from "api";
import { TooltipHelper } from "components";
import * as Icon from "react-bootstrap-icons";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Pagination,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { PersonneResource } from "types/personne.type";
import { LINKS } from "utils";
import { NATURE, QUERY_KEY } from "utils/constants";
import { ListResult } from "pages/common";
import { PersonneActions } from "../common/PersonneActions";

const PersonneOrganisation = ({ organisation }: PersonneResource) => {
  if (organisation) {
    const natures = [NATURE.unite, NATURE.groupe];
    return (
      <>
        <span>{organisation.nom}</span>&nbsp;/&nbsp;
        <span className="text-muted">{organisation?.nature?.nom}</span>
        {natures.includes(organisation?.nature?.code) && (
          <TooltipHelper
            description={
              <>
                {organisation?.parents?.reverse()?.map((e) => (
                  <div key={e.id}>{e.nom}</div>
                ))}
              </>
            }
          />
        )}
      </>
    );
  }
  return <span>-</span>;
};

const PersonneAvatar = ({ id, nom, prenom, code, photo }: PersonneResource) => {
  return (
    <Link to={LINKS.personnes.view(id)} className="table-user d-flex">
      <div className="avatar-sm me-2">
        {photo ? (
          <img
            src={photo}
            alt=""
            className="rounded-circle"
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
          <span className="avatar-title bg-secondary-lighten text-secondary fs-4 rounded-circle">
            {prenom[0]}
            {nom[0]}
          </span>
        )}
      </div>
      <Stack>
        <span className="text-black">
          {prenom} {nom}
        </span>
        <span className="text-muted text-capitalize">{code}</span>
      </Stack>
    </Link>
  );
};

const PersonneFonction = ({ fonction, organisation }: PersonneResource) => {
  if (!fonction) {
    return <span>-</span>;
  }
  if (fonction.code === "scout") {
    return (
      <span className="fw-light text-muted">
        scout / {organisation?.type?.membre}
      </span>
    );
  }
  return <span className="fw-light text-muted">{fonction?.nom}</span>;
};

const SearchPersonne = () => {
  // const filterContext = useContext(FilterContext);
  //   const filter = filterContext.filter as PersonneFilter;

  //   const { userDroit } = useAuth();

  const { data: personnes } = useQuery({
    queryKey: [QUERY_KEY.personnes],
    networkMode: "offlineFirst",
    queryFn: () => {
      return personneApi.findAll<PersonneResource>({ size: 10, page: 1 });
      // buildRequestParams(queryKey[1] as RequestParam)
    },
  });

  return (
    <>
      <Stack direction="horizontal" className="mt-4">
        <h3 className="mb-0 d-flex align-items-center text-black">
          <Icon.PeopleFill size="2rem" className="me-2" />
          Personnes
        </h3>

        <Stack direction="horizontal" className="ms-auto">
          {/* <Button variant="primary" className="me-2 d-noene d-inline-sm">
            <Icon.PlusLg /> Ajouter
          </Button> */}
          <Button variant="outline-secondary" className="me-1">
            <Icon.Search />
          </Button>
          {/* <Button variant="outline-secondary" className="me-1">
            <Icon.Filter />
          </Button> */}
          <Button variant="primary">
            <span className="d-none">Options</span>
            <Icon.ThreeDotsVertical />
          </Button>
        </Stack>
      </Stack>

      {/* <Stack direction="horizontal" className="py-3">
        <div className="w-100">
          <InputGroup>
            <Button variant="secondary">
              <Icon.Search />
            </Button>
            <Form.Control
              className="text-black"
              placeholder="nom, prénom, numéro ..."
            />
          </InputGroup>
        </div>
        <Button variant="secondary" className="ms-2">
          <span>Filtrer</span>
        </Button>
      </Stack> */}

      <ListGroup className="mt-4 shadow-sm">
        {personnes?.data?.map((personne) => (
          <ListGroup.Item
            className="d-flex justify-content-between align-items-start px-2 px-sm-4"
            key={personne.id}
          >
            <div className="avatar-sm me-1">
              {personne.photo ? (
                <img
                  src={personne.photo}
                  alt=""
                  className="rounded-circle"
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
                <span className="avatar-title bg-secondary-lighten text-secondary fs-4 rounded-circle">
                  {personne.prenom[0]}
                  {personne.nom[0]}
                </span>
              )}
            </div>
            <div className="ms-2 me-auto">
              <Link
                to={LINKS.personnes.view(personne.id)}
                className="fw-semibold fs-5 text-black"
              >
                {personne?.prenom} {personne?.nom}
              </Link>
              <div className="fw-light mb-1">{personne.code}</div>

              <PersonneFonction {...personne} />
            </div>
            <PersonneActions personne={personne} />
          </ListGroup.Item>
        ))}
      </ListGroup>

      <ListResult.Paginate
        pageCount={100}
        pageActive={2}
        total={20000}
        onPageChange={(page) => {
          // filterContext.setFilter((old) => ({ ...old, page: page + 1 }));
        }}
      />
    </>
  );
};

export default SearchPersonne;
