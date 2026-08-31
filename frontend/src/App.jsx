import "./App.css";
import Navbar from "./components/Navbar";
import DecisionSetup from "./components/DecisionSetup";

function App() {
  return (
    <>
      <Navbar />

      <main className="page-content">
        <DecisionSetup />
      </main>
    </>
  );
}

export default App;