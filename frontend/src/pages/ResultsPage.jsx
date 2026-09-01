
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { calculateDecisionResults } from "../utils/decisionEngine";

function ResultsPage({ decision }) {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [advisorLoading, setAdvisorLoading] = useState(false);
  const [advisorInsight, setAdvisorInsight] = useState(null);
  const [advisorError, setAdvisorError] = useState("");

  const results = useMemo(
    () => calculateDecisionResults(decision),
    [decision]
  );

  const winner = results[0];

  async function getAdvisorInsight() {
    setAdvisorLoading(true);
    setAdvisorError("");
    setAdvisorInsight(null);

    try {
      const rankings = results.map((result) => ({
        option: result.option,
        score: result.percentage,
      }));

      const response = await fetch(
        "http://localhost:5000/api/advisor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            decision: {
              title: decision.title,
              description: decision.description,
              options: decision.options,
              criteria: decision.criteria,
              result: {
                winner: winner.option,
                rankings,
              },
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to get decision insight"
        );
      }

      setAdvisorInsight(data.advisor);
    } catch (error) {
      console.error("Advisor error:", error);

      setAdvisorError(
        "Couldn't generate an insight. Please try again."
      );
    } finally {
      setAdvisorLoading(false);
    }
  }

  async function saveDecision() {
    setSaving(true);
    setSaveMessage("");

    try {
      const evaluations = decision.options.map(
        (option, optionIndex) => ({
          option,
          scores: decision.criteria.map(
            (criterion, criterionIndex) => ({
              criterion: criterion.name,
              score:
                decision.scores?.[optionIndex]?.[
                  criterionIndex
                ] ?? 0,
            })
          ),
        })
      );

      const rankings = results.map((result) => ({
        option: result.option,
        score: result.percentage,
      }));

      const response = await fetch(
        "http://localhost:5000/api/decisions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: decision.title,
            description: decision.description,
            options: decision.options,
            criteria: decision.criteria,
            evaluations,
            result: {
              winner: winner.option,
              rankings,
            },
            status: "completed",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save decision"
        );
      }

      setSaveMessage("Decision saved successfully.");

      setTimeout(() => {
        navigate("/decisions");
      }, 800);
    } catch (error) {
      console.error("Save error:", error);

      setSaveMessage(
        "Could not save the decision. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="results-page">

      <div className="setup-header">

        <p className="eyebrow">
          Decision complete
        </p>

        <h1>Your results</h1>

        <p>
          Here's how your options ranked based on
          the priorities you chose.
        </p>

        <p className="decision-context">
          Decision:{" "}
          <strong>{decision.title}</strong>
        </p>

      </div>


      {/* Winner */}

      <div className="winner-section">

        <span className="winner-label">
          Top choice
        </span>

        <h2>{winner.option}</h2>

        <div className="winner-score">
          {winner.percentage}
          <span>/ 100</span>
        </div>

      </div>


      {/* Rankings */}

      <div className="results-list">

        {results.map((result, index) => (

          <div
            className="result-row"
            key={result.option}
          >

            <div className="result-rank">
              {index + 1}
            </div>

            <div className="result-option">

              <strong>
                {result.option}
              </strong>

              <div className="result-bar">

                <div
                  className="result-bar-fill"
                  style={{
                    width: `${result.percentage}%`,
                  }}
                />

              </div>

            </div>

            <div className="result-score">
              {result.percentage}
            </div>

          </div>

        ))}

      </div>


      {/* Decision Advisor */}

      <div className="advisor-section">

        <div className="advisor-header">

          <span className="advisor-label">
            Decision Advisor
          </span>

          <h2>
            Want a second perspective?
          </h2>

          <p>
            Get a quick analysis of how strong
            your decision really is.
          </p>

        </div>


        {!advisorInsight && (

          <button
            type="button"
            className="primary-button"
            onClick={getAdvisorInsight}
            disabled={advisorLoading}
          >
            {advisorLoading
              ? "Analyzing..."
              : "Get Decision Insight →"}
          </button>

        )}


        {advisorError && (

          <p className="save-message">
            {advisorError}
          </p>

        )}


        {advisorInsight && (

          <div className="advisor-result">

            <div className="advisor-result-top">

              <span className="advisor-label">
                {advisorInsight.confidence} decision
              </span>

              <strong>
                {advisorInsight.winner}
              </strong>

            </div>

            <p>
              {advisorInsight.insight}
            </p>

          </div>

        )}

      </div>


      {/* Save message */}

      {saveMessage && (

        <p className="save-message">
          {saveMessage}
        </p>

      )}


      {/* Actions */}

      <div className="setup-actions">

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            navigate("/decisions/evaluate")
          }
        >
          Review scores
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={saveDecision}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save decision"}
        </button>

      </div>

    </section>
  );
}

export default ResultsPage;

