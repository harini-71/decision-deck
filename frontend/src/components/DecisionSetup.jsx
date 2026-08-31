
import { useNavigate } from "react-router-dom";

function DecisionSetup({ decision, setDecision }) {
  const navigate = useNavigate();

  function updateOption(index, value) {
    const updatedOptions = [...decision.options];

    updatedOptions[index] = value;

    setDecision({
      ...decision,
      options: updatedOptions,
    });
  }

  function addOption() {
    setDecision({
      ...decision,
      options: [...decision.options, ""],
    });
  }

  function removeOption(index) {
    if (decision.options.length <= 2) {
      return;
    }

    const updatedOptions = decision.options.filter(
      (_, optionIndex) => optionIndex !== index
    );

    setDecision({
      ...decision,
      options: updatedOptions,
    });
  }

  return (
    <section className="decision-setup">
      <div className="setup-header">
        <p className="eyebrow">New decision</p>

        <h1>What are you deciding?</h1>

        <p>
          Start by giving your decision a clear name and
          describing the options you're considering.
        </p>
      </div>

      <div className="setup-form">

        {/* Decision name */}

        <div className="form-field">
          <label htmlFor="decision-title">
            Decision name
          </label>

          <input
            id="decision-title"
            type="text"
            placeholder="e.g. Which laptop should I buy?"
            value={decision.title}
            onChange={(event) =>
              setDecision({
                ...decision,
                title: event.target.value,
              })
            }
          />
        </div>

        {/* Description */}

        <div className="form-field">
          <label htmlFor="decision-description">
            Description
          </label>

          <textarea
            id="decision-description"
            placeholder="Briefly describe what you're trying to decide..."
            value={decision.description}
            onChange={(event) =>
              setDecision({
                ...decision,
                description: event.target.value,
              })
            }
            rows="5"
          />
        </div>

        {/* Options */}

        <div className="options-section">
          <div className="options-heading">
            <div>
              <label>Options</label>

              <p>
                Add at least two options you're considering.
              </p>
            </div>
          </div>

          <div className="options-list">
            {decision.options.map((option, index) => (
              <div
                className="option-row"
                key={index}
              >
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(event) =>
                    updateOption(
                      index,
                      event.target.value
                    )
                  }
                />

                {decision.options.length > 2 && (
                  <button
                    type="button"
                    className="remove-option"
                    onClick={() =>
                      removeOption(index)
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="add-option"
            onClick={addOption}
          >
            + Add another option
          </button>
        </div>

        {/* Actions */}

        <div className="setup-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/decisions")}
          >
            Cancel
          </button>

          <button
            type="button"
            className="primary-button"
            disabled={
              !decision.title.trim() ||
              decision.options.some(
                (option) => !option.trim()
              )
            }
            onClick={() =>
              navigate("/decisions/criteria")
            }
          >
            Continue
          </button>

        </div>

      </div>
    </section>
  );
}

export default DecisionSetup;
