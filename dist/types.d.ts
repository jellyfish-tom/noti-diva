export declare const STATUS_TYPES: {
    readonly SUCCESS: "success";
    readonly ERROR: "error";
    readonly WARNING: "warning";
    readonly NEUTRAL: "neutral";
};
export type StatusType = (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];
export interface MessageClassNames {
    floating?: string;
    fixed?: string;
    types?: Partial<Record<StatusType, string>>;
    fadeOut?: string;
    inlineWrapper?: string;
    inlineMessage?: string;
}
export declare const SUCCESS_WORDS: readonly ["Impeccable", "Superb", "Magnificent", "Exquisite", "Pristine", "Unsurpassed", "Phenomenal", "Stellar", "Extraordinary", "Spectacular", "Astonishing", "Breathtaking", "Faultless", "Immaculate", "Unblemished", "Flawless", "Tremendous", "Fabulous", "Splendid", "Glorious", "Divine", "Heavenly", "Unprecedented", "Unparalleled", "Unrivaled", "Unconquerable", "Invincible"];
export interface MessageDisplayOptions {
    floating?: boolean;
    duration?: number;
    elementId?: string;
    container?: HTMLElement;
    classNames?: MessageClassNames;
    useDefaultClassNames?: boolean;
    maxWidth?: number | string;
    ellipsis?: boolean;
}
export interface MessageTargetConfig {
    floating?: boolean;
    duration?: number;
    container?: HTMLElement;
    classNames?: MessageClassNames;
    useDefaultClassNames?: boolean;
    maxWidth?: number | string;
    ellipsis?: boolean;
}
//# sourceMappingURL=types.d.ts.map