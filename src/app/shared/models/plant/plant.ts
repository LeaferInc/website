import { User } from '../user/user';

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum Time {
  HOUR,
  DAY,
  WEEK,
  MONTH,
}

export class Plant {
  id: number;
  enabled: boolean;
  createdAt: Date;
  name: string;
  height: number;
  difficulty: Difficulty;
  wateringFrequencySpringToSummerNumber: number;
  wateringFrequencyAutumnToWinterNumber: number;
  wateringFrequencySpringToSummer: Time;
  wateringFrequencyAutumnToWinter: Time;
  exposure: string;
  humidity: string;
  potting: string;
  toxicity: boolean;
  owner: User;
}