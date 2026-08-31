import "./App.css";
import Navbar from "./components/Navbar";
import CriteriaPage from "./pages/CriteriaPage";
import DecisionFlow from "./flows/DecisionFlow";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import NewDecisionPage from "./pages/NewDecisionPage";
import DecisionsPage from "./pages/DecisionsPage";
import TemplatesPage from "./pages/TemplatesPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          
          <Route path="/decisions" element={<DecisionsPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route
           path="/decisions/*"
           element={<DecisionFlow />}
           />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;