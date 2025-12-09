import type { MessageClassNames, MessageDisplayOptions, MessageTargetConfig, StatusType } from "./types";
export declare class MessageTarget {
    private display;
    private elementId;
    private config;
    constructor(display: MessageDisplay, elementId: string, config: Required<MessageTargetConfig>);
    success(message: string, overrides?: Partial<MessageTargetConfig>): void;
    error(message: string, overrides?: Partial<MessageTargetConfig>): void;
    warning(message: string, overrides?: Partial<MessageTargetConfig>): void;
    info(message: string, overrides?: Partial<MessageTargetConfig>): void;
    neutral(message: string, overrides?: Partial<MessageTargetConfig>): void;
    private show;
    clear(): void;
}
export declare class MessageDisplay {
    private statusResetTimers;
    private registeredTargets;
    for(elementId: string, config?: MessageTargetConfig): MessageTarget;
    show(message: string, type: StatusType, options?: MessageDisplayOptions): void;
    success(message: string, options?: MessageDisplayOptions): void;
    error(message: string, options?: MessageDisplayOptions): void;
    warning(message: string, options?: MessageDisplayOptions): void;
    info(message: string, options?: MessageDisplayOptions): void;
    neutral(message: string, options?: MessageDisplayOptions): void;
    private processMessage;
    private logToConsole;
    private buildClasses;
    private showFloatingMessage;
    private showFixedMessage;
    showInline(message: string, type: StatusType, container: HTMLElement, options?: {
        useHtml?: boolean;
        classNames?: MessageClassNames;
        useDefaultClassNames?: boolean;
    }): void;
    clear(elementId: string): void;
}
export declare const messageDisplay: MessageDisplay;
//# sourceMappingURL=message-display.d.ts.map