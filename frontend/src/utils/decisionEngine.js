export function calculateDecisionResults(decision) {
  const { options, criteria, scores } = decision;

  const totalWeight = criteria.reduce(
    (total, criterion) => total + criterion.weight,
    0
  );

  const maxPossibleScore = totalWeight * 10;

  const results = options.map(
    (option, optionIndex) => {
      const optionScores = scores[optionIndex];

      const weightedScore = criteria.reduce(
        (total, criterion, criterionIndex) => {
          const score =
            optionScores[criterionIndex];

          return (
            total +
            score * criterion.weight
          );
        },
        0
      );

      const percentage =
        (weightedScore / maxPossibleScore) * 100;

      return {
        option,
        weightedScore,
        percentage: Number(
          percentage.toFixed(1)
        ),
      };
    }
  );

  results.sort(
    (a, b) => b.percentage - a.percentage
  );

  return results;
}