
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DecisionsPage() {
  const navigate = useNavigate();

  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function deleteDecision(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this decision?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/decisions/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete decision"
        );
      }

      setDecisions((currentDecisions) =>
        currentDecisions.filter(
          (decision) => decision._id !== id
        )
      );
    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not delete the decision.");
    }
  }

  useEffect(() => {
    async function fetchDecisions() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/decisions"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load decisions"
          );
        }

        setDecisions(data.decisions);
      } catch (error) {
        console.error("Failed to fetch decisions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDecisions();
  }, []);

  if (loading) {
    return (
      <section className="decisions-page">
        <p>Loading decisions...</p>
      </section>
    );
  }

  return (
    <section className="decisions-page">

      <div className="setup-header">
        <p className="eyebrow">Decisions</p>

        <h1>My Decisions</h1>

        <p>
          Review the decisions you've saved and the
          results you've reached.
        </p>
      </div>

      {decisions.length === 0 ? (
        <p>No decisions saved yet.</p>
      ) : (
        <div className="decisions-list">

          {decisions.map((decision) => (
            <div
              className="decision-card"
              key={decision._id}
            >

              <div>
                <span className="decision-status">
                  {decision.status === "completed"
                    ? "Completed"
                    : "Draft"}
                </span>

                <h2>{decision.title}</h2>

                {decision.description && (
                  <p>{decision.description}</p>
                )}

                {decision.result?.winner && (
                  <p>
                    Top choice{" "}
                    <strong>
                      {decision.result.winner}
                    </strong>
                  </p>
                )}

                <small>
                  {new Date(
                    decision.createdAt
                  ).toLocaleDateString()}
                </small>
              </div>

              <div className="decision-actions">

                <button
                  type="button"
                  className="primary-button"
                  onClick={() =>
                    navigate(
                      `/decisions/${decision._id}`
                    )
                  }
                >
                  View Decision
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    deleteDecision(decision._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default DecisionsPage;

