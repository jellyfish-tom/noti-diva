import type { MessageTargetConfig } from "./types";
export declare function useMessageDisplay(elementId: string, config?: MessageTargetConfig): {
    success: (message: string, overrides?: Partial<MessageTargetConfig>) => void;
    error: (message: string, overrides?: Partial<MessageTargetConfig>) => void;
    warning: (message: string, overrides?: Partial<MessageTargetConfig>) => void;
    info: (message: string, overrides?: Partial<MessageTargetConfig>) => void;
    neutral: (message: string, overrides?: Partial<MessageTargetConfig>) => void;
    clear: () => void;
};
//# sourceMappingURL=react.d.ts.map