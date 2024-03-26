export function rankMultiplier(competition) {
  const multiplierMap = {
    Talent: 1.5,
    'Prelim Interview': 1.5,
    Playsuit: 2,
    'Casual Attire': 2,
    'Evening Gown': 3,
  };

  const multiplierValue = multiplierMap[competition] || 1; // default 1

  return multiplierValue;
}
