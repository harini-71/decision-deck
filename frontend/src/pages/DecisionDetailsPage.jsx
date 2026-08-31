import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DecisionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDecision() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/decisions/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load decision"
          );
        }

        setDecision(data.decision);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Could not load this decision.");
      } finally {
        setLoading(false);
      }
    }

    fetchDecision();
  }, [id]);

  if (loading) {
    return <p>Loading decision...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!decision) {
    return <p>Decision not found.</p>;
  }

  return (
    <section className="decision-details-page">

      <div className="setup-header">
        <p className="eyebrow">Decision details</p>

        <h1>{decision.title}</h1>

        {decision.description && (
          <p>{decision.description}</p>
        )}
      </div>

      {/* Winner */}

      {decision.result?.winner && (
        <div className="winner-section">
          <span className="winner-label">
            Top choice
          </span>

          <h2>{decision.result.winner}</h2>
        </div>
      )}

      {/* Rankings */}

      {decision.result?.rankings && (
        <div className="details-section">

          <h2>Rankings</h2>

          <div className="results-list">

            {decision.result.rankings.map(
              (ranking, index) => (
                <div
                  className="result-row"
                  key={ranking._id || ranking.option}
                >
                  <div className="result-rank">
                    {index + 1}
                  </div>

                  <div className="result-option">
                    <strong>
                      {ranking.option}
                    </strong>
                  </div>

                  <div className="result-score">
                    {ranking.score}
                  </div>
                </div>
              )
            )}

          </div>

        </div>
      )}

      {/* Criteria */}

      <div className="details-section">

        <h2>Criteria</h2>

        <div className="criteria-list">

          {decision.criteria.map((criterion) => (
            <div
              className="criteria-item"
              key={criterion._id || criterion.name}
            >
              <strong>{criterion.name}</strong>

              <span>
                Importance: {criterion.weight}/10
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* Evaluations */}

      <div className="details-section">

        <h2>Scores</h2>

        {decision.evaluations.map((evaluation) => (
          <div
            className="evaluation-card"
            key={evaluation._id || evaluation.option}
          >
            <h3>{evaluation.option}</h3>

            {evaluation.scores.map((score) => (
              <div
                className="evaluation-row"
                key={score._id || score.criterion}
              >
                <span>{score.criterion}</span>

                <strong>
                  {score.score}/10
                </strong>
              </div>
            ))}
          </div>
        ))}

      </div>

      <div className="setup-actions">

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/decisions")}
        >
          Back to My Decisions
        </button>

      </div>

    </section>
  );
}

export default DecisionDetailsPage;