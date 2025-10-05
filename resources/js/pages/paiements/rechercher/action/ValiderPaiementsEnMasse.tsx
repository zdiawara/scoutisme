import { FC, ReactNode, useEffect, useState } from "react";
import { paiementApi } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "utils/constants";
import { withMutationForm, WrapperV2Props } from "hoc/withMutationForm";
import { Button, Form, ListGroup, Modal, Stack } from "react-bootstrap";
import classNames from "classnames";
import { HookModalForm, MontantFormatText } from "components";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DateFormater } from "utils/DateUtils";

type Paiement = {
  id: string;
  numero: string;
  etat: string;
  montant: number;
  createur: string;
  created_at: string;
  checked: boolean;
};

type PersonneCotisationModalProps = {
  closeModal: () => void;
};

type ItemProps = {
  content: ReactNode;
  checked: boolean;
  onSelect: () => void;
};

const Item: FC<ItemProps> = ({ checked, onSelect, content }) => {
  return (
    <ListGroup.Item
      type="button"
      onClick={onSelect}
      className={classNames({
        "bg-light": checked,
      })}
    >
      <Stack direction="horizontal">
        <Form.Check size={5} type="checkbox" checked={checked} onChange={onSelect} className="align-self-start" />
        <div className="ms-2">{content}</div>
      </Stack>
    </ListGroup.Item>
  );
};

const FormContainer: FC<WrapperV2Props> = (props) => {
  const { watch, control, setValue } = useFormContext();

  const paiements = useFieldArray({ name: "paiements", control });

  const nbPaiements = paiements.fields.filter((_, i) => {
    const name = `paiements.${i}`;
    const paiement = watch(name);
    return paiement.checked;
  }).length;

  return (
    <>
      <HookModalForm
        {...props}
        modalBodyClassName="bg-light p-1"
        onClose={props.onExit}
        labels={{ saveLabel: "Valider" }}
        title={`Valider ${nbPaiements} paiement(s)`}
      >
        <ListGroup>
          {paiements.fields.map((field, i) => {
            const name = `paiements.${i}`;
            const paiement = watch(name);
            return (
              <Item
                key={field.id}
                onSelect={() => {
                  setValue(`${name}.checked`, paiement.checked ? false : true);
                }}
                content={
                  <>
                    <div className="fw-semibold d-flex align-items-center">
                      <span className="fw-light fs-6 d-block">N° {paiement.numero} /</span>
                      &nbsp;
                      <MontantFormatText value={paiement.montant} withDevise />
                    </div>
                    <span className="d-block">Par {paiement?.createur?.name || "-"}</span>
                    <div className="mt-1 fw-light">Le {DateFormater.toDateTextTime(paiement.created_at)}</div>
                  </>
                }
                checked={paiement.checked as boolean}
              />
            );
          })}
        </ListGroup>
      </HookModalForm>
    </>
  );
};

const ValiderPaiementsEnMasseForm = withMutationForm(FormContainer);

export const ValiderPaiementsEnMasse: FC<PersonneCotisationModalProps> = ({ closeModal }) => {
  const query = useQueryClient();

  const [paiements, setPaiements] = useState<Paiement[] | null>(null);

  useEffect(() => {
    paiementApi
      .findAll<Paiement>({ etat: "en_attente" })
      .then((r) =>
        r.data.map((paiement) => ({
          numero: paiement.numero,
          id: paiement.id,
          etat: paiement.etat,
          montant: paiement.montant,
          createur: paiement.createur,
          created_at: paiement.created_at,
          checked: true,
        }))
      )
      .then(setPaiements);
  }, []);

  const validerPaiement = async (data: { paiements: Paiement[] }) => {
    await paiementApi.validerEnMasse(data.paiements.filter((paiement) => paiement.checked).map(({ id }) => ({ id })));
    query.invalidateQueries([QUERY_KEY.cotisations]);
    query.invalidateQueries([QUERY_KEY.personnes]);
    query.invalidateQueries([QUERY_KEY.paiements]);
    closeModal();
  };

  if (!paiements) {
    return null;
  }

  if (!paiements.length) {
    return (
      <Modal show={true} onHide={closeModal} size="sm" centered animation>
        <Modal.Body className="p-4">
          <div className="text-center">
            <h4 className="mt-2 text-primary">Information</h4>
            <div className="mt-3 mb-3">Il n'y a aucun paiement à valider.</div>
            <Button variant="outline-primary" className="shadow-sm" onClick={closeModal}>
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <ValiderPaiementsEnMasseForm
      defaultValues={{ paiements }}
      onSave={validerPaiement}
      onExit={closeModal}
      title=""
      modalProps={{
        scrollable: true,
      }}
    />
  );
};
