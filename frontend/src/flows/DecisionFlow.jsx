import { useState } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import EvaluationPage from "../pages/EvaluationPage";
import DecisionSetup from "../components/DecisionSetup";
import CriteriaPage from "../pages/CriteriaPage";
import ResultsPage from "../pages/ResultsPage";
import DecisionsPage from "../pages/DecisionsPage";
import DecisionDetailsPage from "../pages/DecisionDetailsPage";

function DecisionFlow() {
  const location = useLocation();

  const template = location.state?.template;

  const [decision, setDecision] = useState(() => ({
    title: template?.title || "",
    description: template?.description || "",
    options: ["", ""],
    criteria:
      template?.criteria?.map((criterion) => ({
        name: criterion,
        weight: 5,
      })) || [],
    scores: [],
  }));

  return (
    <Routes>

      <Route
        index
        element={<DecisionsPage />}
      />

      <Route
        path="new"
        element={
          <DecisionSetup
            decision={decision}
            setDecision={setDecision}
          />
        }
      />

      <Route
        path="criteria"
        element={
          <CriteriaPage
            decision={decision}
            setDecision={setDecision}
          />
        }
      />

      <Route
        path="evaluate"
        element={
          <EvaluationPage
            decision={decision}
            setDecision={setDecision}
          />
        }
      />

      <Route
        path="results"
        element={
          <ResultsPage
            decision={decision}
          />
        }
      />

      <Route
        path=":id"
        element={
          <DecisionDetailsPage />
        }
      />

    </Routes>
  );
}

export default DecisionFlow;