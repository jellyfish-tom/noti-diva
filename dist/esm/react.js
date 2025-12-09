import { useCallback, useMemo } from "react";
import { messageDisplay } from "./message-display";
export function useMessageDisplay(elementId, config = {}) {
    const target = useMemo(() => messageDisplay.for(elementId, config), [elementId, config]);
    return {
        success: useCallback((message, overrides) => {
            target.success(message, overrides);
        }, [target]),
        error: useCallback((message, overrides) => {
            target.error(message, overrides);
        }, [target]),
        warning: useCallback((message, overrides) => {
            target.warning(message, overrides);
        }, [target]),
        info: useCallback((message, overrides) => {
            target.info(message, overrides);
        }, [target]),
        neutral: useCallback((message, overrides) => {
            target.neutral(message, overrides);
        }, [target]),
        clear: useCallback(() => {
            target.clear();
        }, [target]),
    };
}
