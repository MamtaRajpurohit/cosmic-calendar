// src/utils/jsonParser.js
export const extractJSON = (content, fallback) => {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No valid JSON found');
  } catch (err) {
    console.error('JSON parse error:', err);
    return fallback;
  }
};
