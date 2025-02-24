import { View } from "components";
import { Columns, ICONS, StaticTable } from "pages/common";
import { FC, useMemo } from "react";
import { OrganisationResource } from "types/organisation.type";
import { attributionApi } from "api";
import { QUERY_KEY } from "utils/constants";
import { AttributionResource } from "types/personne.type";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { LINKS } from "utils";
import { OrganisationScoutActions } from "../common";
import { AttributionActions } from "pages/attributions/common";
import { useDroits } from "hooks/useDroits";
import { DateFormater } from "utils/DateUtils";
import { Button, Form, InputGroup, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

type OrganisationScoutsProps = {
  organisation: OrganisationResource;
};

const searchByCriteres = (
  term: string,
  attributions: AttributionResource[]
) => {
  return attributions.filter(({ personne: { nom, prenom } }) =>
    `${nom} ${prenom}`.match(new RegExp(term, "gi"))
  );
};

export const OrganisationScouts: FC<OrganisationScoutsProps> = ({
  organisation,
}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.scouts, organisation.id],
    networkMode: "offlineFirst",
    queryFn: () =>
      attributionApi
        .findAll<AttributionResource>({
          organisationId: organisation.id,
          fonctionCode: "scout",
        })
        .then((r) => r.data),
  });

  const protection = useDroits();

  const columns = useMemo(() => {
    const cols: Columns<AttributionResource>[] = [
      {
        name: "personne",
        label: "Nom",
        Cell: ({ personne }) => (
          <Link to={LINKS.personnes.view(personne.id)}>
            <span className="text-primary fw-semibold">
              {personne.prenom} {personne.nom}
            </span>
            <div className="text-muted">{personne.code}</div>
          </Link>
        ),
      },
      {
        name: "date_debut",
        label: "Date début",
        Cell: ({ date_debut }) =>
          DateFormater.toDate(date_debut) || <View.Empty />,
      },

      {
        name: "date_fin",
        label: "Date fin",
        Cell: ({ date_fin }) => DateFormater.toDate(date_fin) || <View.Empty />,
      },
    ];

    if (protection.personne.scouts.creer) {
      cols.push({
        name: "actions",
        label: "Actions",
        headClassName: "text-end",
        Cell: (attribution) => (
          <div className="text-end">
            <AttributionActions attribution={attribution} />
          </div>
        ),
      });
    }
    return cols;
  }, [protection.personne.scouts.creer]);

  const { data } = query;

  return (
    <>
      {/* <StaticTable<AttributionResource>
      header={{
        icon: ICONS.personne,
        label: "Scouts",
        description: "Les scouts de l'unité",
      }}
      data={data}
      search={{
        onSearch: searchByCriteres,
        placeholder: "",
      }}
      columns={columns}
      isLoading={query.isLoading}
      error={query.error}
      actions={<OrganisationScoutActions organisation={organisation} />}
    /> */}
      <ListGroup className="mb-3">
        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          {/* <div>
                <Icon.InfoCircle size="1.1rem" className="me-1" />
                <span className="fs-5">Organe de direction</span>
              </div> */}
          {/* <InputGroup className="me-1">
            <Form.Control
              className="text-black"
              placeholder="Rechercher"
              size="sm"
            />
            <Button variant="outline-primary" size="sm">
              <Icon.XLg />
            </Button>
          </InputGroup> */}
          <Form.Control
            className="text-black me-2"
            placeholder="Rechercher"
            // size="sm"
          />
          <div className="ms-auto d-flex">
            {/* <Button size="sm" variant="outline-primary me-1">
              <Icon.Search />
            </Button> */}
            <Button className="me-1" variant="outline-primary">
              <Icon.PlusLg />
            </Button>
            <Button variant="primary">
              <Icon.ThreeDotsVertical />
            </Button>
          </div>
        </ListGroup.Item>
        {query.data?.map((item) => (
          <ListGroup.Item
            // as="li"
            className="d-flex justify-content-between align-items-start"
            key={item.fonction.id}
          >
            <div className="me-auto">
              <div className="fw-semibold mb-1">
                {item.personne?.prenom} {item.personne?.nom}
              </div>
              {item.personne ? (
                <div className="fw-light">{item.personne.code}</div>
              ) : (
                <div className="text-muted">
                  <Button variant="outline-secondary" size="sm">
                    <Icon.PlusLg className="me-1" />
                    adulte
                  </Button>
                </div>
              )}
            </div>
            <div className="text-muted">
              <Button size="sm" variant="text">
                <Icon.ThreeDotsVertical />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
