import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Overview</p>

          <h1>Your decisions</h1>

          <p className="dashboard-description">
            Make thoughtful decisions, one step at a time.
          </p>
        </div>

       <button
       className="primary-button"
       onClick={() => navigate("/decisions/new")}
       >  
       + New Decision
       </button>
       </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total decisions</span>
          <strong>8</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">In progress</span>
          <strong>3</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Completed</span>
          <strong>5</strong>
        </div>
      </div>

      <div className="recent-section">
        <div className="section-heading">
          <div>
            <h2>Recent decisions</h2>
            <p>Your latest decision-making sessions.</p>
          </div>
        </div>

        <div className="decision-list">
          <div className="decision-card">
            <div>
              <h3>Which laptop should I buy?</h3>
              <p>Technology · 5 criteria</p>
            </div>

            <span className="status completed">
              Completed
            </span>
          </div>

          <div className="decision-card">
            <div>
              <h3>Which elective should I choose?</h3>
              <p>Education · 4 criteria</p>
            </div>

            <span className="status progress">
              In progress
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;