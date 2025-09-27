import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { genreApi, personneApi } from "api";
import { DatePicker, TextInput } from "components";
import { SubmitButton } from "components/buttons";
import { FC } from "react";
import { Button, ButtonGroup, Col, Form, Modal, Row, ToggleButton } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GenreResource, TypePersonne } from "types/personne.type";
import { QUERY_KEY } from "utils/constants";
import { DateFormater } from "utils/DateUtils";
import { buildMessageError, NotificationError, NotificationSuccess } from "utils/notification";
import * as yup from "yup";

type Props = {
  prevStep: () => void;
  closeModal: () => void;
  organisationId: string;
  fonctionId: string;
};

const schema = yup.object({
  nom: yup.string().required().nullable(),
  prenom: yup.string().required().nullable(),
  genre: yup.string().required().nullable(),
  date_debut: yup.date().required().nullable(),
  email: yup.string().email().nullable(),
});

const onCreate = async (personneInput: Record<string, any>, organisationId: string, fonctionId: string) => {
  const body = {
    nom: personneInput.nom,
    prenom: personneInput.prenom,
    genre_id: personneInput.genre,
    type: TypePersonne.adulte,
    email: personneInput.email,
    attribution: {
      organisation_id: organisationId,
      fonction_id: fonctionId,
      date_debut: DateFormater.toISO(personneInput.date_debut),
    },
  };
  return await personneApi.create(body);
};

export const NomminerNouvellePersonne: FC<Props> = ({ closeModal, prevStep, organisationId, fonctionId }) => {
  const query = useQueryClient();
  const queryGenre = useQuery({
    queryKey: [QUERY_KEY.genres],
    queryFn: async () => {
      const result = await genreApi.findAll<GenreResource>();
      return result;
    },
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date_debut: new Date(),
    },
  });

  const { mutate, isLoading } = useMutation<any>({
    mutationFn: (data: any) => onCreate(data, organisationId, fonctionId),
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

  const onError = (e: any) => {
    console.error(e);
  };

  if (queryGenre.isLoading) {
    return null;
  }

  return (
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
            <Form.Group className="position-relative">
              <Form.Label className="text-muted d-block text-uppercase fs-6">
                Genre
                <strong className="text-danger">&nbsp;*</strong>
              </Form.Label>
              <ButtonGroup>
                {queryGenre.data?.data.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={methods.watch("genre") === radio.id ? "outline-secondary" : "outline-secondary"}
                    name="genre"
                    value={radio.id}
                    checked={methods.watch("genre") === radio.id}
                    onChange={(e) => methods.setValue("genre", e.currentTarget.value)}
                  >
                    {radio.nom}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              {methods.formState?.errors?.genre?.message && (
                <Form.Control.Feedback className="d-block" type="invalid">
                  {methods.formState.errors.genre.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col xs={12}>
            <TextInput label="Email" name="email" />
          </Col>
          <Col xs={12}>
            <DatePicker name="date_debut" label="Date nommination" useHookForm required />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="me-auto" variant="outline-primary" onClick={() => prevStep()} disabled={isLoading}>
          Précédent
        </Button>
        <SubmitButton isLoading={isLoading} onClick={methods.handleSubmit(onSubmit, onError)}>
          Enregistrer
        </SubmitButton>
      </Modal.Footer>
    </FormProvider>
  );
};
