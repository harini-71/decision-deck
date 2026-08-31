
import "./App.css";
import Navbar from "./components/Navbar";
import DecisionFlow from "./flows/DecisionFlow";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import DecisionsPage from "./pages/DecisionsPage";
import TemplatesPage from "./pages/TemplatesPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="page-content">
        <Routes>

          {/* Dashboard */}
          <Route
            path="/"
            element={<DashboardPage />}
          />

          {/* Everything related to decisions */}
          <Route
            path="/decisions/*"
            element={<DecisionFlow />}
          />

          {/* Templates */}
          <Route
            path="/templates"
            element={<TemplatesPage />}
          />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

