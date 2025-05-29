import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attributionApi } from "api";
import { DatePicker, SelectPersonne } from "components";
import { SubmitButton } from "components/buttons";
import { attributionConverter } from "pages/attributions/form";
import { FC } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { QUERY_KEY } from "utils/constants";
import {
  buildMessageError,
  NotificationError,
  NotificationSuccess,
} from "utils/notification";

import * as yup from "yup";

export const schema = yup.object({
  personne: yup.object().required().nullable(),
  date_debut: yup.date().required().nullable(),
});

type Props = {
  closeModal: () => void;
  prevStep: () => void;
  organisationId: string;
  fonctionId: string;
};

const ajouterMembre = async (
  data: Record<string, any>,
  organisationId: string,
  fonctionId: string
) => {
  const body = {
    ...attributionConverter.toBody(data),
    organisation_id: organisationId,
    fonction_id: fonctionId,
  };
  return await attributionApi.create(body);
};

export const NomminerPersonneExistante: FC<Props> = ({
  closeModal,
  prevStep,
  organisationId,
  fonctionId,
}) => {
  const query = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date_debut: new Date(),
    },
  });

  const { mutate, isLoading } = useMutation<any>({
    mutationFn: (data: any) => ajouterMembre(data, organisationId, fonctionId),
    onSuccess: () => {
      toast("Personne nomminée avec succès !", NotificationSuccess);
      query.invalidateQueries([QUERY_KEY.direction, organisationId]);
      query.invalidateQueries([QUERY_KEY.personnes]);
      closeModal();
    },
    onError: (e: any) => {
      toast(buildMessageError(e), NotificationError);
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Modal.Body className="bg-gray-100">
          <Row className="g-2">
            <Col xs={12}>
              <SelectPersonne
                label="Personne"
                name="personne"
                isRequired
                requestParams={{
                  type: "adulte",
                }}
                placeholder=""
              />
            </Col>
            <Col xs={12}>
              <DatePicker
                name="date_debut"
                label="Date debut"
                useHookForm
                required
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="me-auto"
            variant="outline-primary"
            onClick={() => prevStep()}
            disabled={isLoading}
          >
            Précédent
          </Button>
          <SubmitButton
            isLoading={isLoading}
            onClick={methods.handleSubmit(onSubmit, console.error)}
          >
            Enregistrer
          </SubmitButton>
        </Modal.Footer>
      </FormProvider>
    </>
  );
};
