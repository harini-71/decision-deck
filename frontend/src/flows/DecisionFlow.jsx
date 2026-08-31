import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import DecisionSetup from "../components/DecisionSetup";
import CriteriaPage from "../pages/CriteriaPage";

function DecisionFlow() {
  const [decision, setDecision] = useState({
    title: "",
    description: "",
    options: ["", ""],
    criteria: [],
  });

  return (
    <Routes>
      <Route
        path="/new"
        element={
          <DecisionSetup
            decision={decision}
            setDecision={setDecision}
          />
        }
      />

      <Route
        path="/criteria"
        element={
          <CriteriaPage
            decision={decision}
            setDecision={setDecision}
          />
        }
      />
    </Routes>
  );
}

export default DecisionFlow;