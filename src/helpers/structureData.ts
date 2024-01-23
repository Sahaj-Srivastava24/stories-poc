
export default function structureStories<T>(inputArray: string[]): T[] {
  if (inputArray.length !== 12) {
    throw new Error("Input array must contain exactly 12 elements.");
  }

  const resultArrays: T[] = [];
  for (let i = 0; i < 12; i += 3) {
    resultArrays.push({
      id: (i / 3),
      hash: `story-set-${(i / 3) + 1}`,
      stories: inputArray.slice(i, i + 3)
    } as T);
  }

  return resultArrays;
}

