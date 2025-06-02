
export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export interface Step {
  id: string;
  instruction: string;
  timerMinutes?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  servings: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: Step[];
  author: string;
  collaborators: string[];
  lastModified: string;
  cookTime: number;
  rating: number;
  isPublic: boolean;
}
