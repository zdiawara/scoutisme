import { Header } from "layout/Header";
import StatPourEquipeNationale from "./StatPourEquipeNationale";
import { useDroits } from "hooks/useDroits";
import { Alert, Container } from "react-bootstrap";

const StatEquipeNationale = () => {
  const droits = useDroits();

  const renderContent = () => {
    if (droits.organisation.conseil_national.consulter || droits.organisation.equipe_nationale.consulter) {
      return <StatPourEquipeNationale />;
    } else {
      return <Alert className="mt-4">Statistiques en construction pour votre organisation.</Alert>;
    }
  };
  return (
    <>
      <Header title="Statistiques" />
      <Container>{renderContent()}</Container>
    </>
  );
};

export default StatEquipeNationale;
