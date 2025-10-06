import { transfertApi } from "api/transfert";
import { LoaderSpinner } from "components/loader";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { LINKS } from "utils/links";
import { notifier } from "utils/notification";

const ConfirmerTransfert = () => {
  const { id: transfertId } = useParams();
  const [searchParams] = useSearchParams();
  const signature = searchParams.get("signature") || "";

  const [loading, setLoading] = useState<boolean>(true);
  const [erreur, setErreur] = useState<string | null>(null);

  const navigation = useNavigate();

  useEffect(() => {
    setLoading(true);
    transfertApi
      .confirmer(transfertId!, signature)
      .then(() => {
        notifier.succes("Le transfert a été accepté");
      })
      .catch((e) => {
        setErreur(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [signature, transfertId]);

  if (loading) {
    return <LoaderSpinner />;
  }

  if (erreur) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Erreur survenue lors de la validation !</Alert.Heading>
        <p className="mb-0">{erreur}</p>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              navigation(LINKS.home);
            }}
            variant="danger"
          >
            Quitter
          </Button>
        </div>
      </Alert>
    );
  }

  return <Navigate to={LINKS.home} />;
};

export default ConfirmerTransfert;
