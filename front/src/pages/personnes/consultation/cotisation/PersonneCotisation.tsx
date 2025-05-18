import { useQuery } from "@tanstack/react-query";
import { getYear } from "date-fns";
import { personneApi } from "api";
import { FC, useState } from "react";
import { PersonneResource } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { SelectItem } from "types/form.type";
import { Cotisation } from "./Cotisation";
import { ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { ListPaiement } from "./paiements";
import { AsyncSelectSimple } from "components";
import { PayerCotisationAction } from "./payer/PayerCotisationAction";

type Props = {
  personne: PersonneResource;
};

const fetchYears = () => {
  const year = getYear(new Date());
  return Promise.resolve(
    new Array(5)
      .fill(1)
      .map((_, i) => year - i)
      .map((item) => ({
        value: `${item}`,
        label: `${item}`,
      }))
  );
};

export const PersonneCotisation: FC<Props> = ({ personne }) => {
  const [annee, setAnnee] = useState<SelectItem>(() => {
    const year = getYear(new Date()).toString();
    return {
      label: year,
      value: year,
    };
  });

  const { isLoading, data: cotisation } = useQuery({
    queryKey: [QUERY_KEY.cotisations, annee.value, personne.id],
    networkMode: "offlineFirst",
    queryFn: () => {
      return personneApi.findCotisation(personne.id, annee.value);
    },
    select: ({ data }) => data,
  });

  return (
    <>
      <ListGroup>
        <ListGroup.Item className="d-flex align-items-center bg-gray-100">
          <div className="ms-auto d-block d-flex">
            <AsyncSelectSimple
              name="year"
              value={annee}
              onChange={setAnnee}
              fetchOptions={fetchYears}
            />
            {cotisation && (
              <PayerCotisationAction annee={annee.value} personne={personne} />
            )}
          </div>
        </ListGroup.Item>

        {isLoading ? (
          <ListGroup.Item className="text-muted">chargement ...</ListGroup.Item>
        ) : cotisation ? (
          <ListGroup.Item>
            <Cotisation cotisation={cotisation} />
          </ListGroup.Item>
        ) : (
          <ListGroup.Item className="text-muted">
            Aucune ligne de cotisation pour l'année {annee.label}
          </ListGroup.Item>
        )}
      </ListGroup>
      {!isLoading && (
        <ListGroup className="mt-2 mb-3">
          <ListGroup.Item className="d-flex align-items-center bg-gray-100 py-2">
            <span>
              <Icon.ListCheck size="1.1rem" className="me-1" />
              <span className="fs-5">Paiements effectués</span>
            </span>
          </ListGroup.Item>

          <ListPaiement paiements={cotisation?.paiements} personne={personne} />
        </ListGroup>
      )}
    </>
  );
};
