import { DatePicker, SelectGenre, TextInput } from "components";
import { FC } from "react";
import { fonctionApi, personneApi } from "api";
import { OrganisationResource } from "types/organisation.type";
import { QUERY_KEY } from "utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { FonctionResource, TypePersonne } from "types/personne.type";
import { toast } from "react-toastify";
import { buildMessageError, NotificationError, NotificationSuccess } from "utils/notification";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { selectHelper } from "utils/functions";
import { DateFormater } from "utils/DateUtils";
import { SubmitButton } from "components/buttons";

export const schema = yup.object({
  nom: yup.string().required().nullable(),
  prenom: yup.string().required().nullable(),
  genre: yup.object().required().nullable(),
  date_debut: yup.date().required().nullable(),
});

type Props = {
  closeModal: () => void;
  organisation: OrganisationResource;
};

const creerScout = async (personneInput: Record<string, any>, organisationId: string, fonctionId: string) => {
  const body = {
    nom: personneInput.nom,
    prenom: personneInput.prenom,
    genre_id: selectHelper.getValue(personneInput.genre),
    type: TypePersonne.scout,
    attribution: {
      organisation_id: organisationId,
      fonction_id: fonctionId,
      date_debut: DateFormater.toISO(personneInput.date_debut),
    },
  };
  return await personneApi.create(body);
};
/**
 * Créer un scout dans une unité
 * @param param0
 * @returns
 */
export const CreerScout: FC<Props> = ({ closeModal, organisation }) => {
  const query = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date_debut: new Date(),
    },
  });
  const fonctionScoutQuery = useQuery({
    queryKey: [QUERY_KEY.fonctions, "scout"],
    queryFn: async () => {
      const data = await fonctionApi.findAll<FonctionResource>({
        code: "scout",
      });
      return data.data[0] || undefined;
    },
  });
  const { mutate, isLoading } = useMutation<any>({
    mutationFn: (data: any) => creerScout(data, organisation.id, fonctionScoutQuery.data?.id!),
    onSuccess: () => {
      toast("Scout créé avec succès !", NotificationSuccess);
      query.invalidateQueries([QUERY_KEY.personnes]);
      query.invalidateQueries([QUERY_KEY.scouts, organisation.id]);
      closeModal();
    },
    onError: (e: any) => {
      toast(buildMessageError(e), NotificationError);
    },
  });

  if (fonctionScoutQuery.isLoading) {
    return null;
  }

  if (!fonctionScoutQuery.data) {
    toast.error("Impossible de trouver la fonction scout", NotificationError);
    closeModal();
    return null;
  }

  return (
    <>
      <Modal centered show={true}>
        <Modal.Header>
          <Modal.Title className="fw-semibold">Ajouter un scout</Modal.Title>
        </Modal.Header>
        <FormProvider {...methods}>
          <Modal.Body className="bg-gray-100">
            <Row className="g-2">
              <Col xs={6}>
                <TextInput label="Nom" name="nom" isRequired />
              </Col>
              <Col xs={6}>
                <TextInput label="Prenom" name="prenom" isRequired />
              </Col>
              <Col xs={12}>
                <SelectGenre name="genre" label="Genre" placeholder="" isRequired />
              </Col>
              <Col xs={12}>
                <DatePicker name="date_debut" label="Date debut" useHookForm required />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="me-auto" variant="outline-primary" onClick={() => closeModal()} disabled={isLoading}>
              Annuler
            </Button>
            <SubmitButton
              isLoading={isLoading}
              onClick={methods.handleSubmit((data: any) => mutate(data), console.error)}
            >
              Enregistrer
            </SubmitButton>
          </Modal.Footer>
        </FormProvider>
      </Modal>
    </>
  );
};
