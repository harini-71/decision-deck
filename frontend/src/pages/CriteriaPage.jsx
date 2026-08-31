import { useNavigate } from "react-router-dom";

function CriteriaPage({ decision, setDecision }) {
  const navigate = useNavigate();

  function updateCriterion(index, field, value) {
    const updatedCriteria = [...decision.criteria];

    updatedCriteria[index] = {
      ...updatedCriteria[index],
      [field]: value,
    };

    setDecision({
      ...decision,
      criteria: updatedCriteria,
    });
  }

  function addCriterion() {
    const newCriterion = {
      name: "",
      description: "",
      weight: 5,
    };

    setDecision({
      ...decision,
      criteria: [...decision.criteria, newCriterion],
    });
  }

  function removeCriterion(index) {
    const updatedCriteria = decision.criteria.filter(
      (_, criterionIndex) => criterionIndex !== index
    );

    setDecision({
      ...decision,
      criteria: updatedCriteria,
    });
  }

  const canContinue =
    decision.criteria.length >= 2 &&
    decision.criteria.every(
      (criterion) => criterion.name.trim()
    );

  return (
    <section className="criteria-page">

      <div className="setup-header">
        <p className="eyebrow">Step 2 of 3</p>

        <h1>What matters to you?</h1>

        <p>
          Add the factors that will help you compare your
          options. Give each one an importance score from
          1 to 10.
        </p>

        <p className="decision-context">
          Comparing:{" "}
          <strong>
            {decision.title || "Untitled decision"}
          </strong>
        </p>
      </div>


      {/* Criteria */}

      <div className="criteria-list">

        {decision.criteria.map((criterion, index) => (
          <div
            className="criteria-item"
            key={index}
          >

            <div className="criterion-header">

              <div className="criterion-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <button
                type="button"
                className="remove-criterion"
                onClick={() => removeCriterion(index)}
              >
                Remove
              </button>

            </div>


            {/* Criterion name */}

            <div className="form-field">

              <label>
                Criterion
              </label>

              <input
                type="text"
                placeholder="e.g. Battery life"
                value={criterion.name}
                onChange={(event) =>
                  updateCriterion(
                    index,
                    "name",
                    event.target.value
                  )
                }
              />

            </div>


            {/* Criterion description */}

            <div className="form-field">

              <label>
                Description
                <span className="optional">
                  Optional
                </span>
              </label>

              <input
                type="text"
                placeholder="e.g. How long the device lasts on a charge"
                value={criterion.description}
                onChange={(event) =>
                  updateCriterion(
                    index,
                    "description",
                    event.target.value
                  )
                }
              />

            </div>


            {/* Importance */}

            <div className="weight-control">

              <div className="weight-label">

                <span>
                  Importance
                </span>

                <strong>
                  {criterion.weight} / 10
                </strong>

              </div>

              <input
                type="range"
                min="1"
                max="10"
                value={criterion.weight}
                onChange={(event) =>
                  updateCriterion(
                    index,
                    "weight",
                    Number(event.target.value)
                  )
                }
              />

              <div className="range-labels">
                <span>Less important</span>
                <span>Very important</span>
              </div>

            </div>

          </div>
        ))}

      </div>


      {/* Empty state */}

      {decision.criteria.length === 0 && (
        <div className="criteria-empty">

          <p>
            You haven't added any criteria yet.
          </p>

          <span>
            Think about what should influence your decision.
          </span>

        </div>
      )}


      {/* Add criterion */}

      <button
        type="button"
        className="add-option"
        onClick={addCriterion}
      >
        + Add criterion
      </button>


      {/* Actions */}

      <div className="setup-actions">

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/decisions/new")}
        >
          Back
        </button>

        <button
          type="button"
          className="primary-button"
          disabled={!canContinue}
        >
          Continue
        </button>

      </div>

    </section>
  );
}

export default CriteriaPage;