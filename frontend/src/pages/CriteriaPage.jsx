function CriteriaPage({ decision, setDecision }) {
  return (
    <section className="criteria-page">
      <div className="setup-header">
        <p className="eyebrow">Step 2 of 3</p>

        <h1>What matters to you?</h1>

        <p>
          Add the factors that will help you compare your
          options. You can adjust their importance later.
        </p>
        <p className="decision-context">
        Comparing: <strong>{decision.title || "Untitled decision"}</strong>
        </p>
      </div>

      <div className="criteria-list">
        <div className="criteria-item">
          <div>
            <h3>Performance</h3>
            <p>How well the option performs.</p>
          </div>

          <div className="weight-control">
            <span>Importance</span>
            <strong>8</strong>
          </div>
        </div>

        <div className="criteria-item">
          <div>
            <h3>Price</h3>
            <p>How affordable the option is.</p>
          </div>

          <div className="weight-control">
            <span>Importance</span>
            <strong>7</strong>
          </div>
        </div>
      </div>

      <button className="add-option">
        + Add criterion
      </button>

      <div className="setup-actions">
        <button className="secondary-button">
          Back
        </button>

        <button className="primary-button">
          Continue
        </button>
      </div>
    </section>
  );
}

export default CriteriaPage;