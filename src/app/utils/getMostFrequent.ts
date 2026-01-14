const getMostFrequent = (arr: string[]): string | null => {
  if (arr.length === 0) return null;

  const map: Record<string, number> = {};
  let maxCount = 0;

  let mostFrequent: string = arr[0] || "";

  for (const item of arr) {
    map[item] = (map[item] || 0) + 1;
    if (map[item] > maxCount) {
      maxCount = map[item];
      mostFrequent = item;
    }
  }

  return mostFrequent;
};

export default getMostFrequent;
