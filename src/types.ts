export const STATUS_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  NEUTRAL: "neutral",
} as const;

export type StatusType = (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];

export const SUCCESS_WORDS = [
  "Impeccable",
  "Superb",
  "Magnificent",
  "Exquisite",
  "Pristine",
  "Unsurpassed",
  "Phenomenal",
  "Stellar",
  "Extraordinary",
  "Spectacular",
  "Astonishing",
  "Breathtaking",
  "Faultless",
  "Immaculate",
  "Unblemished",
  "Flawless",
  "Tremendous",
  "Fabulous",
  "Splendid",
  "Glorious",
  "Divine",
  "Heavenly",
  "Unprecedented",
  "Unparalleled",
  "Unrivaled",
  "Unconquerable",
  "Invincible",
] as const;

export interface MessageDisplayOptions {
  floating?: boolean;
  duration?: number;
  elementId?: string;
  container?: HTMLElement;
}

export interface MessageTargetConfig {
  floating?: boolean;
  duration?: number;
  container?: HTMLElement;
}
