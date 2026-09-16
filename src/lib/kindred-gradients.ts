
export const KINDRED_GRADIENTS = {
  "sky-violet": "linear-gradient(135deg, #3FA5E8, #8C5FD4)",
  "violet-sky": "linear-gradient(135deg, #8C5FD4, #3FA5E8)",
  "teal-sky": "linear-gradient(135deg, #35B39B, #3FA5E8)",
} as const;

export type KindredGradient = keyof typeof KINDRED_GRADIENTS;
