import { match } from "ts-pattern";
import { STATUS_TYPES, SUCCESS_WORDS } from "./types";
export class MessageTarget {
    constructor(display, elementId, config) {
        this.display = display;
        this.elementId = elementId;
        this.config = config;
    }
    success(message, overrides) {
        this.show(message, STATUS_TYPES.SUCCESS, overrides);
    }
    error(message, overrides) {
        this.show(message, STATUS_TYPES.ERROR, overrides);
    }
    warning(message, overrides) {
        this.show(message, STATUS_TYPES.WARNING, overrides);
    }
    info(message, overrides) {
        this.show(message, STATUS_TYPES.NEUTRAL, overrides);
    }
    neutral(message, overrides) {
        this.show(message, STATUS_TYPES.NEUTRAL, overrides);
    }
    show(message, type, overrides) {
        const config = {
            ...this.config,
            ...overrides,
            classNames: { ...this.config.classNames, ...(overrides?.classNames ?? {}) },
            useDefaultClassNames: overrides?.useDefaultClassNames ?? this.config.useDefaultClassNames,
        };
        this.display.show(message, type, {
            elementId: this.elementId,
            ...config,
        });
    }
    clear() {
        this.display.clear(this.elementId);
    }
}
export class MessageDisplay {
    constructor() {
        this.statusResetTimers = {};
        this.registeredTargets = new Map();
    }
    for(elementId, config = {}) {
        if (this.registeredTargets.has(elementId)) {
            return this.registeredTargets.get(elementId);
        }
        const defaultConfig = {
            floating: config.floating ?? true,
            duration: config.duration ?? 3000,
            container: config.container ?? (typeof document !== "undefined" ? document.body : undefined),
            classNames: config.classNames ?? {},
            useDefaultClassNames: config.useDefaultClassNames ?? true,
        };
        const target = new MessageTarget(this, elementId, defaultConfig);
        this.registeredTargets.set(elementId, target);
        return target;
    }
    show(message, type, options = {}) {
        const { floating = true, duration = 3000, elementId, container = typeof document !== "undefined" ? document.body : undefined, classNames = {}, useDefaultClassNames = true, } = options;
        if (typeof document === "undefined") {
            console.warn("MessageDisplay: document is not available. Message not displayed.");
            return;
        }
        const processedMessage = this.processMessage(message, type);
        this.logToConsole(processedMessage, type, elementId);
        if (floating) {
            this.showFloatingMessage(processedMessage, type, container, duration, classNames, useDefaultClassNames);
        }
        else {
            this.showFixedMessage(processedMessage, type, elementId || "status-message", container, duration, classNames, useDefaultClassNames);
        }
    }
    success(message, options = {}) {
        this.show(message, STATUS_TYPES.SUCCESS, options);
    }
    error(message, options = {}) {
        this.show(message, STATUS_TYPES.ERROR, options);
    }
    warning(message, options = {}) {
        this.show(message, STATUS_TYPES.WARNING, options);
    }
    info(message, options = {}) {
        this.show(message, STATUS_TYPES.NEUTRAL, options);
    }
    neutral(message, options = {}) {
        this.show(message, STATUS_TYPES.NEUTRAL, options);
    }
    processMessage(message, type) {
        return match(type)
            .with(STATUS_TYPES.SUCCESS, () => {
            const randomWord = SUCCESS_WORDS[Math.floor(Math.random() * SUCCESS_WORDS.length)];
            return `${randomWord} ${message}`;
        })
            .with(STATUS_TYPES.ERROR, () => message)
            .with(STATUS_TYPES.WARNING, () => message)
            .with(STATUS_TYPES.NEUTRAL, () => message)
            .exhaustive();
    }
    logToConsole(message, type, elementId) {
        const prefix = elementId ? `[ui-status:${type}] ${elementId}` : `[ui-status:${type}]`;
        match(type)
            .with(STATUS_TYPES.SUCCESS, () => {
            // eslint-disable-next-line no-console
            console.info(`%c${prefix}: ${message}`, "color: green; font-weight: bold;");
        })
            .with(STATUS_TYPES.ERROR, () => {
            // eslint-disable-next-line no-console
            console.info(`${prefix}: ${message}`);
        })
            .with(STATUS_TYPES.WARNING, () => {
            // eslint-disable-next-line no-console
            console.info(`${prefix}: ${message}`);
        })
            .with(STATUS_TYPES.NEUTRAL, () => {
            // eslint-disable-next-line no-console
            console.info(`%c${prefix}: ${message}`, "color: gray;");
        })
            .exhaustive();
    }
    buildClasses(defaults, useDefaultClassNames, custom, customType) {
        return [
            ...(useDefaultClassNames ? defaults : []),
            custom,
            customType,
        ]
            .filter(Boolean)
            .join(" ");
    }
    showFloatingMessage(message, type, container, duration, classNames, useDefaultClassNames) {
        const statusElement = document.createElement("div");
        const typeClass = classNames.types?.[type];
        statusElement.className = this.buildClasses([`floating-status-message`, `status-${type}`], useDefaultClassNames, classNames.floating, typeClass);
        const uniqueId = `floating-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        statusElement.id = uniqueId;
        const randomX = Math.random() * (window.innerWidth - 300);
        const randomY = Math.random() * (window.innerHeight - 100);
        const randomTilt = (Math.random() - 0.5) * 60;
        statusElement.style.left = `${randomX}px`;
        statusElement.style.top = `${randomY}px`;
        statusElement.style.setProperty("transform", `rotate(${randomTilt}deg)`, "important");
        statusElement.style.setProperty("--initial-transform", `rotate(${randomTilt}deg)`, "important");
        statusElement.dataset["tilt"] = randomTilt.toString();
        statusElement.textContent = message;
        container.appendChild(statusElement);
        setTimeout(() => {
            const tilt = parseFloat(statusElement.dataset["tilt"] || "0");
            const driftX = Math.sin((tilt * Math.PI) / 180) * 150;
            const driftY = 80;
            const animationDuration = duration;
            const steps = 60;
            const stepDuration = animationDuration / steps;
            let currentStep = 0;
            const animate = () => {
                if (currentStep >= steps) {
                    if (statusElement.parentNode) {
                        statusElement.parentNode.removeChild(statusElement);
                    }
                    return;
                }
                const progress = currentStep / steps;
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentX = driftX * easeProgress;
                const currentY = driftY * easeProgress;
                const currentOpacity = 1 - progress;
                statusElement.style.setProperty("transform", `rotate(${tilt}deg) translate(${currentX}px, ${currentY}px)`, "important");
                statusElement.style.setProperty("opacity", currentOpacity.toString(), "important");
                currentStep++;
                setTimeout(animate, stepDuration);
            };
            animate();
        }, 500);
    }
    showFixedMessage(message, type, elementId, container, duration, classNames, useDefaultClassNames) {
        let statusElement = document.getElementById(elementId);
        if (!statusElement) {
            statusElement = document.createElement("div");
            statusElement.id = elementId;
            statusElement.dataset["notiDiva"] = "fixed";
            container.appendChild(statusElement);
        }
        const typeClass = classNames.types?.[type];
        const fixedClasses = this.buildClasses([`status-message`, `status-${type}`], useDefaultClassNames, classNames.fixed, typeClass);
        statusElement.className = fixedClasses;
        statusElement.textContent = message;
        if (this.statusResetTimers[elementId]) {
            clearTimeout(this.statusResetTimers[elementId]);
            delete this.statusResetTimers[elementId];
        }
        const fadeOutClass = classNames.fadeOut ?? (useDefaultClassNames ? "fade-out" : "");
        this.statusResetTimers[elementId] = window.setTimeout(() => {
            if (fadeOutClass) {
                statusElement?.classList.add(fadeOutClass);
            }
            setTimeout(() => {
                if (statusElement?.parentNode) {
                    statusElement.parentNode.removeChild(statusElement);
                }
            }, 500);
            delete this.statusResetTimers[elementId];
        }, duration);
    }
    showInline(message, type, container, options = {}) {
        const { useHtml = false, classNames = {}, useDefaultClassNames = true } = options;
        const wrapper = document.createElement("div");
        const typeClass = classNames.types?.[type];
        wrapper.className = this.buildClasses(["data-status", `data-status-${type}`], useDefaultClassNames, classNames.inlineWrapper, typeClass);
        const messageElement = document.createElement("div");
        messageElement.className = this.buildClasses(["status-message"], useDefaultClassNames, classNames.inlineMessage, typeClass);
        if (useHtml) {
            messageElement.innerHTML = message;
        }
        else {
            messageElement.textContent = message;
        }
        wrapper.appendChild(messageElement);
        container.innerHTML = "";
        container.appendChild(wrapper);
    }
    clear(elementId) {
        if (this.statusResetTimers[elementId]) {
            clearTimeout(this.statusResetTimers[elementId]);
            delete this.statusResetTimers[elementId];
        }
        const element = document.getElementById(elementId);
        if (element) {
            element.remove();
        }
    }
}
export const messageDisplay = new MessageDisplay();
