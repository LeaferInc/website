import { User } from '../user/user';

export enum Difficulty {
  EASY = "facile",
  MEDIUM = "moyen",
  HARD = "difficile",
}

export enum Time {
  HOUR = "heure",
  DAY = "jour",
  WEEK = "semaine",
  MONTH = "mois",
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
  picture: string;
}