export declare const STATUS_TYPES: {
    readonly SUCCESS: "success";
    readonly ERROR: "error";
    readonly WARNING: "warning";
    readonly NEUTRAL: "neutral";
};
export type StatusType = (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];
export declare const SUCCESS_WORDS: readonly ["Impeccable", "Superb", "Magnificent", "Exquisite", "Pristine", "Unsurpassed", "Phenomenal", "Stellar", "Extraordinary", "Spectacular", "Astonishing", "Breathtaking", "Faultless", "Immaculate", "Unblemished", "Flawless", "Tremendous", "Fabulous", "Splendid", "Glorious", "Divine", "Heavenly", "Unprecedented", "Unparalleled", "Unrivaled", "Unconquerable", "Invincible"];
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
//# sourceMappingURL=types.d.ts.map