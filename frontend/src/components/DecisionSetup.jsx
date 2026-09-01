import { useNavigate, useLocation } from "react-router-dom";

function DecisionSetup({ decision, setDecision }) {
  const navigate = useNavigate();
  const location = useLocation();

  const template = location.state?.template;

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

      {/* HEADER */}

      <div className="setup-header">

        <p className="eyebrow">
          {template?.tag || "New decision"}
        </p>

        <h1>
          {template?.setupTitle || "What are you deciding?"}
        </h1>

        <p>
          {template?.setupDescription ||
            "Start by giving your decision a clear name and describing the options you're considering."}
        </p>

      </div>


      <div className="setup-form">

        {/* DECISION NAME */}

        <div className="form-field">

          <label htmlFor="decision-title">
            {template?.id === "purchase"
              ? "What are you buying?"
              : template?.id === "path"
              ? "What decision are you facing?"
              : "Decision name"}
          </label>

          <input
            id="decision-title"
            type="text"
            placeholder={
              template?.id === "purchase"
                ? "e.g. Which laptop should I buy?"
                : template?.id === "path"
                ? "e.g. Which career path should I choose?"
                : "e.g. Which laptop should I buy?"
            }
            value={decision.title}
            onChange={(event) =>
              setDecision({
                ...decision,
                title: event.target.value,
              })
            }
          />

        </div>


        {/* DESCRIPTION */}

        <div className="form-field">

          <label htmlFor="decision-description">
            Tell us a little more
          </label>

          <textarea
            id="decision-description"
            placeholder={
              template?.id === "purchase"
                ? "What are you looking for and what matters most?"
                : template?.id === "path"
                ? "What are you hoping to achieve with this decision?"
                : "Briefly describe what you're trying to decide..."
            }
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


        {/* OPTIONS */}

        <div className="options-section">

          <div className="options-heading">

            <div>

              <label>
                {template?.optionLabel || "Options"}
              </label>

              <p>
                {template?.optionDescription ||
                  "Add at least two options you're considering."}
              </p>

            </div>

          </div>


          <div className="options-list">

            {decision.options.map((option, index) => (

              <div
                className="option-row"
                key={index}
              >

                <span className="option-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <input
                  type="text"
                 placeholder={
  template?.optionPlaceholders?.[index] ||
  `Option ${index + 1}`
}
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


        {/* FRAMEWORK PREVIEW */}

        {template && (
          <div className="template-preview">

            <div className="preview-heading">

              <span className="preview-label">
                YOUR FRAMEWORK
              </span>

              <strong>
                {template.title}
              </strong>

            </div>


            <div className="preview-steps">

              {template.steps.map((step, index) => (

                <div
                  className="preview-step"
                  key={step}
                >

                  <span className="preview-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="preview-name">
                    {step}
                  </span>

                  {index < template.steps.length - 1 && (
                    <span className="preview-arrow">
                      →
                    </span>
                  )}

                </div>

              ))}

            </div>

          </div>
        )}


        {/* ACTIONS */}

        <div className="setup-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/templates")}
          >
            Back
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
              navigate("/decisions/criteria", {
                state: {
                  template,
                },
              })
            }
          >
            Continue →
          </button>

        </div>

      </div>

    </section>
  );
}

export default DecisionSetup;