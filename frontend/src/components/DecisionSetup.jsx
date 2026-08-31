import { useState } from "react";

function DecisionSetup() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <section className="decision-setup">
      <div className="setup-header">
        <p className="eyebrow">New decision</p>

        <h1>What are you deciding?</h1>

        <p>
          Start by giving your decision a clear name and a short
          description.
        </p>
      </div>

      <div className="setup-form">
        <div className="form-field">
          <label htmlFor="decision-title">
            Decision name
          </label>

          <input
            id="decision-title"
            type="text"
            placeholder="e.g. Which laptop should I buy?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="decision-description">
            Description
          </label>

          <textarea
            id="decision-description"
            placeholder="Briefly describe what you're trying to decide..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="5"
          />
        </div>

        <div className="setup-actions">
          <button className="secondary-button">
            Cancel
          </button>

          <button
            className="primary-button"
            disabled={!title.trim()}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}

export default DecisionSetup;