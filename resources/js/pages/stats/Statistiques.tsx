import { Header } from "layout/Header";
import StatPourEquipeNationale from "./StatPourEquipeNationale";
import { useDroits } from "hooks/useDroits";
import { Alert, Container } from "react-bootstrap";
import StatPourUnite from "./StatPourUnite";

const StatEquipeNationale = () => {
  const droits = useDroits();

  const renderContent = () => {
    if (droits.organisation.conseil_national.consulter || droits.organisation.equipe_nationale.consulter) {
      return <StatPourEquipeNationale />;
    } else if (droits.organisation.unite.consulter) {
      return <StatPourUnite />;
    } else {
      return <Alert className="mt-4">Statistiques en construction pour votre organisation.</Alert>;
    }
  };
  return (
    <>
      <Header title="Statistiques" />
      <Container className="mt-4">{renderContent()}</Container>
    </>
  );
};

export default StatEquipeNationale;
