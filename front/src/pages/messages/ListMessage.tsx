import { FC } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Columns, ICONS, ListResult, PageHeader } from "pages/common";
import { RequestParam } from "types/request.type";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { messageApi } from "api";
import { LINKS } from "utils";
import { MessageResource } from "types/message.type";

const ListMessage: FC = () => {
  /*   const { filter, setFilter } = useContext(FilterContext);
  const { search } = filter as OrganisationFilter; */

  const { data: organisations, isLoading } = useQuery({
    queryKey: [QUERY_KEY.messages, {}],
    keepPreviousData: true,
    networkMode: "offlineFirst",
    queryFn: ({ queryKey }) => {
      const params = { ...(queryKey[1] as RequestParam) };
      params.etat = params.etat === "tous" ? null : params.etat;
      return messageApi.findAll<MessageResource>(params);
    },
  });

  const columns: Columns<MessageResource>[] = [
    {
      name: "objet",
      label: "Objet",
      Cell: (message) => {
        return (
          <Link
            className="text-primary fw-semibold"
            to={LINKS.messages.view(message.id)}
          >
            {message.titre}
          </Link>
        );
      },
    },
    {
      name: "critere",
      label: "Cible",
      Cell: ({ critere }) => {
        return <>{critere.mode}</>;
      },
    },
    {
      name: "destinataires",
      label: "Nombre de destinataires",
      Cell: ({ destinataires }) => {
        return <>{destinataires.length} destinataire(s)</>;
      },
    },
    {
      name: "date",
      label: "Date envoie",
      Cell: ({ created_at }) => {
        return <>{created_at}</>;
      },
    },

    {
      name: "actions",
      label: "Actions",
      headClassName: "text-end",
      Cell: (fonction) => {
        return (
          <div className="text-end">
            <Button className="action-icon" variant="link">
              <i className="uil-eye fs-4 text-primary"></i>
            </Button>
            <Button variant="link" className="action-icon">
              <i className="mdi mdi-delete fs-4 text-danger"></i>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader.List
        title="Messages"
        subtitle="Consulter et gérer vos messages"
        icon={ICONS.message}
        className="my-4"
        right={
          <Link to={LINKS.messages.create} className="btn btn-primary">
            Envoyer un mail
          </Link>
        }
      />

      <ListResult.Container isLoading={isLoading}>
        <ListResult.Table<MessageResource>
          columns={columns}
          data={organisations?.data || []}
        />
      </ListResult.Container>
    </>
  );
};

export default ListMessage;
