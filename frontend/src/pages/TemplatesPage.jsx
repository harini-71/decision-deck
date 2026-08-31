
import { useNavigate } from "react-router-dom";

function TemplatesPage() {
  const navigate = useNavigate();

  const templates = [
    {
      id: "laptop",
      icon: "💻",
      title: "Which laptop should I buy?",
      description:
        "Compare laptops based on performance, battery life, price, and other factors.",
      options: [
        "MacBook Air",
        "ASUS Zenbook",
        "Lenovo Yoga",
      ],
      criteria: [
        "Performance",
        "Battery Life",
        "Price",
      ],
    },

    {
      id: "phone",
      icon: "📱",
      title: "Which phone should I buy?",
      description:
        "Compare smartphones based on camera, performance, battery life, and price.",
      options: [
        "iPhone",
        "Samsung Galaxy",
        "Google Pixel",
      ],
      criteria: [
        "Camera",
        "Performance",
        "Battery Life",
        "Price",
      ],
    },

    {
      id: "course",
      icon: "🎓",
      title: "Which course should I choose?",
      description:
        "Compare courses based on interest, difficulty, career value, and flexibility.",
      options: [
        "Course A",
        "Course B",
        "Course C",
      ],
      criteria: [
        "Interest",
        "Career Value",
        "Difficulty",
        "Flexibility",
      ],
    },

    {
      id: "travel",
      icon: "✈️",
      title: "Where should I travel?",
      description:
        "Compare destinations based on cost, activities, travel time, and overall experience.",
      options: [
        "Destination A",
        "Destination B",
        "Destination C",
      ],
      criteria: [
        "Cost",
        "Activities",
        "Travel Time",
        "Experience",
      ],
    },
  ];

  function useTemplate(template) {
    navigate("/decisions/new", {
      state: {
        template,
      },
    });
  }

  return (
    <section className="templates-page">

      <div className="setup-header">
        <p className="eyebrow">Templates</p>

        <h1>Decision Templates</h1>

        <p>
          Start a decision using a ready-made structure.
        </p>
      </div>

      <div className="templates-grid">

        {templates.map((template) => (
          <div
            className="template-card"
            key={template.id}
          >

            <div className="template-icon">
              {template.icon}
            </div>

            <h2>{template.title}</h2>

            <p>{template.description}</p>

            <div className="template-info">

              <span>
                {template.options.length} options
              </span>

              <span>
                {template.criteria.length} criteria
              </span>

            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() => useTemplate(template)}
            >
              Use Template
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}

export default TemplatesPage;
