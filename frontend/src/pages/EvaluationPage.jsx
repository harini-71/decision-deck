import { useNavigate } from "react-router-dom";

function EvaluationPage({ decision, setDecision }) {
  const navigate = useNavigate();

  function updateScore(optionIndex, criterionIndex, value) {
    const updatedScores = [...decision.scores];

    updatedScores[optionIndex] = {
      ...updatedScores[optionIndex],
      [criterionIndex]: Number(value),
    };

    setDecision({
      ...decision,
      scores: updatedScores,
    });
  }

  const allScoresEntered =
    decision.scores.length === decision.options.length &&
    decision.scores.every((optionScores) =>
      decision.criteria.every(
        (_, criterionIndex) =>
          optionScores[criterionIndex] !== undefined
      )
    );

  return (
    <section className="evaluation-page">

      <div className="setup-header">
        <p className="eyebrow">Step 3 of 3</p>

        <h1>Evaluate your options</h1>

        <p>
          Rate how well each option performs against
          each criterion. Use a scale from 1 to 10.
        </p>

        <p className="decision-context">
          Decision:{" "}
          <strong>
            {decision.title || "Untitled decision"}
          </strong>
        </p>
      </div>


      <div className="evaluation-list">

        {decision.options.map((option, optionIndex) => (

          <div
            className="evaluation-card"
            key={optionIndex}
          >

            <div className="evaluation-option-header">

              <span className="option-number">
                {String(optionIndex + 1).padStart(2, "0")}
              </span>

              <h2>{option}</h2>

            </div>


            <div className="evaluation-criteria">

              {decision.criteria.map(
                (criterion, criterionIndex) => (

                  <div
                    className="evaluation-row"
                    key={criterionIndex}
                  >

                    <div className="evaluation-label">

                      <span>
                        {criterion.name}
                      </span>

                     <small>
  How well does this option perform?
</small>
                    </div>


                    <div className="score-control">

                      <input
                        type="range"
                        min="1"
                        max="10"
                       value={
                       decision.scores?.[
                       optionIndex
                       ]?.[criterionIndex] ?? ""
                       }
                        onChange={(event) =>
                          updateScore(
                            optionIndex,
                            criterionIndex,
                            event.target.value
                          )
                        }
                      />

                      <strong>
                      {decision.scores?.[
                       optionIndex
                      ]?.[criterionIndex] ?? "—"}
                       </strong>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        ))}

      </div>


      <div className="setup-actions">

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            navigate("/decisions/criteria")
          }
        >
          Back
        </button>

       <button
  type="button"
  className="primary-button"
  disabled={!allScoresEntered}
  onClick={() =>
    navigate("/decisions/results")
  }
>
  See results
</button>

      </div>

    </section>
  );
}

export default EvaluationPage;