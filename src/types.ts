export type Axis = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Question {
  id: number;
  text: string;
  optionA: { text: string; axis: Axis };
  optionB: { text: string; axis: Axis };
  axis: string; // e.g., "E / I"
}

export interface Result {
  brand: 'HIRO' | 'GLGK' | 'SANN';
  mbti: string;
  title: string;
  description: string;
  keywords: string[];
  imageUrl: string;
  recommendedDestinations: string;
}
