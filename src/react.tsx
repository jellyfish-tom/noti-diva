import { useCallback, useMemo } from "react";

import { messageDisplay } from "./message-display";

import type { MessageTargetConfig } from "./types";

export function useMessageDisplay(elementId: string, config: MessageTargetConfig = {}) {
  const target = useMemo(() => messageDisplay.register(elementId, config), [elementId, config]);

  return {
    success: useCallback(
      (message: string, overrides?: Partial<MessageTargetConfig>) => {
        target.success(message, overrides);
      },
      [target]
    ),
    error: useCallback(
      (message: string, overrides?: Partial<MessageTargetConfig>) => {
        target.error(message, overrides);
      },
      [target]
    ),
    warning: useCallback(
      (message: string, overrides?: Partial<MessageTargetConfig>) => {
        target.warning(message, overrides);
      },
      [target]
    ),
    info: useCallback(
      (message: string, overrides?: Partial<MessageTargetConfig>) => {
        target.info(message, overrides);
      },
      [target]
    ),
    neutral: useCallback(
      (message: string, overrides?: Partial<MessageTargetConfig>) => {
        target.neutral(message, overrides);
      },
      [target]
    ),
    clear: useCallback(() => {
      target.clear();
    }, [target]),
  };
}
