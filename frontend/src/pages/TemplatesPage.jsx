import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "comparison",
    tag: "COMPARE",
    title: "The Comparison",
    description:
      "When several options look good on paper, compare them side by side and find the strongest overall choice.",
    setupTitle: "Which option actually wins?",
    setupDescription:
      "Put your choices head-to-head and decide what matters most before you rank them.",
    optionLabel: "Options you're comparing",
    optionDescription:
      "Add the choices you want to compare.",
    optionPlaceholders: [
  "e.g. MacBook Air M4",
  "e.g. Dell XPS 13",
],
    criteria: [
      "Performance",
      "Quality",
      "Value",
      "Reliability",
    ],
    steps: ["Compare", "Prioritize", "Rank"],
  },

  {
    id: "tradeoff",
    tag: "TRADE-OFF",
    title: "The Trade-off",
    description:
      "When getting more of one thing means giving up something else, make the compromises visible.",
    setupTitle: "What are you willing to sacrifice?",
    setupDescription:
      "Not every option can win. Identify what matters most and decide where you're willing to compromise.",
    optionLabel: "Choices you're weighing",
    optionDescription:
      "Add the options you're deciding between.",
    optionPlaceholders: [
  "e.g. High-performance laptop",
  "e.g. Affordable laptop",
],
    criteria: [
      "Importance",
      "Cost",
      "Benefit",
      "Sacrifice",
    ],
    steps: ["Prioritize", "Balance", "Decide"],
  },

  {
    id: "purchase",
    tag: "PURCHASE",
    title: "The Purchase",
    description:
      "When you're spending money, look beyond the price tag and find the option that gives you the most value.",
    setupTitle: "What are you buying?",
    setupDescription:
      "Compare your purchases based on what you'll actually care about after the receipt is gone.",
    optionLabel: "Products you're considering",
    optionDescription:
      "Add the products you're thinking about buying.",
    optionPlaceholders: [
  "e.g. MacBook Air M4",
  "e.g. Dell XPS 13",
],
    criteria: [
      "Price",
      "Performance",
      "Features",
      "Longevity",
    ],
    steps: ["Need", "Value", "Cost", "Decide"],
  },

  {
    id: "path",
    tag: "LIFE & CAREER",
    title: "The Path",
    description:
      "When you're choosing between different directions, look beyond today and think about where each path could lead.",
    setupTitle: "Where could this path take you?",
    setupDescription:
      "Compare your options based on the opportunities, risks, and future each one creates.",
    optionLabel: "Paths you're considering",
    optionDescription:
      "Add the directions you're deciding between.",
    optionPlaceholders: [
  "e.g. Software Engineering",
  "e.g. Data Science",
],
    criteria: [
      "Growth",
      "Opportunity",
      "Stability",
      "Personal fit",
    ],
    steps: ["Goals", "Future", "Risk", "Choose"],
  },

  {
    id: "group",
    tag: "GROUP",
    title: "The Group Decision",
    description:
      "When everyone has an opinion, turn competing preferences into one decision the group can actually agree on.",
    setupTitle: "What can everyone agree on?",
    setupDescription:
      "Bring everyone's priorities together and find the option with the strongest overall support.",
    optionLabel: "Choices the group is considering",
    optionDescription:
      "Add the options your group is choosing between.",
    optionPlaceholders: [
  "e.g. Restaurant A",
  "e.g. Restaurant B",
],
    criteria: [
      "Preference",
      "Agreement",
      "Importance",
      "Impact",
    ],
    steps: ["Collect", "Compare", "Consensus"],
  },
];

function TemplatesPage() {
  const navigate = useNavigate();

  function useTemplate(template) {
    navigate("/decisions/new", {
      state: {
        template,
      },
    });
  }

  return (
    <section className="templates-page">

      <div className="templates-header">
        <p className="eyebrow">Decision frameworks</p>

        <h1>Start with a better way to decide.</h1>

        <p>
          Different decisions need different ways of thinking.
          Choose a framework and make it yours.
        </p>
      </div>

      <div className="templates-grid">

        {templates.map((template) => (
          <article
            className="template-card"
            key={template.id}
            onClick={() => useTemplate(template)}
          >

            <div className="template-top">
              <span className="template-tag">
                {template.tag}
              </span>

              <span className="template-arrow">
                →
              </span>
            </div>

            <h2>{template.title}</h2>

            <p className="template-description">
              {template.description}
            </p>

            <div className="template-steps">
  {template.steps.map((step, index) => (
    <div className="template-step" key={step}>
      <span className="step-number">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="step-name">
        {step}
      </span>
    </div>
  ))}
</div>

            <div className="template-footer">
              <span>
                {template.criteria.length} starting criteria
              </span>

              <span className="use-template">
                Use template →
              </span>
            </div>

          </article>
        ))}

      </div>

      <button
        className="build-from-scratch"
        onClick={() => navigate("/decisions/new")}
      >
        <span>Start from scratch</span>
        <span>Build your own decision →</span>
      </button>

    </section>
  );
}

export default TemplatesPage;