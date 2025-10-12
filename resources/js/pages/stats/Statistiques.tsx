import { Header } from "layout/Header";
import StatPourEquipeNationale from "./StatPourEquipeNationale";
import { useDroits } from "hooks/useDroits";
import { Alert } from "react-bootstrap";
import StatPourUnite from "./StatPourUnite";
import { useAuth } from "hooks/useAuth";

const StatEquipeNationale = () => {
  const droits = useDroits();
  const { user } = useAuth();

  const renderContent = () => {
    if (droits.organisation.conseil_national.consulter || droits.organisation.equipe_nationale.consulter) {
      return <StatPourEquipeNationale />;
    } else if (droits.organisation.unite.consulter) {
      const uniteId = user?.personne?.organisation?.id;
      return <StatPourUnite uniteId={uniteId!} />;
    } else {
      return <Alert className="mt-4">Statistiques en construction pour votre organisation.</Alert>;
    }
  };
  return (
    <>
      <Header title="Statistiques" />
      {renderContent()}
    </>
  );
};

export default StatEquipeNationale;
