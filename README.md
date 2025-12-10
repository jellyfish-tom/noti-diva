# noti-diva

Framework-agnostic message display library with floating and fixed message support. Works seamlessly in vanilla JavaScript/TypeScript, React, Vue, and any other framework.

## Features

🎯 **Framework-agnostic** - Works with any framework or vanilla JS
🎨 **Flexible display modes** - Floating or fixed messages
🔧 **Type-safe** - Full TypeScript support
⚡ **Simple API** - Clean, intuitive methods
🎭 **React hooks** - Optional React integration
🎪 **Animated** - Beautiful floating animations
📦 **Zero dependencies** - Only requires `ts-pattern` as peer dependency

## Installation

```bash
npm install noti-diva ts-pattern
```

## Basic Usage

### Vanilla JavaScript/TypeScript

```typescript
import { messageDisplay } from "noti-diva";
import "noti-diva/dist/styles.css";

// Create a target once
const editorStatus = messageDisplay.for("editor-status", {
  floating: false,
  duration: 3000,
});

// Use simple methods
editorStatus.success("Saved successfully!");
editorStatus.error("Failed to save");
editorStatus.warning("Please check your input");
editorStatus.info("Processing...");
```

### Direct Methods

```typescript
import { messageDisplay } from "noti-diva";

// Quick messages without registration
messageDisplay.success("Success!", { elementId: "status", floating: true });
messageDisplay.error("Error occurred", { elementId: "status" });
```

### React

```tsx
import { useMessageDisplay } from "noti-diva";
import "noti-diva/dist/styles.css";

function MyComponent() {
  const status = useMessageDisplay("editor-status", { floating: false });

  const handleSave = () => {
    status.success("Saved!");
  };

  return <button onClick={handleSave}>Save</button>;
}
```

The hook returns an object with methods: `success`, `error`, `warning`, `info`, `neutral`, and `clear`.

## API

### `messageDisplay.for(elementId, config?)`

Create (or retrieve) a message target with configuration. Returns the same target if already registered.

```typescript
const status = messageDisplay.for("my-status", {
  floating: false, // Default: true
  duration: 3000, // Default: 3000ms
  container: document.body, // Default: document.body
});
```

### `MessageTarget` Methods

- `success(message, overrides?)` - Show success message
- `error(message, overrides?)` - Show error message
- `warning(message, overrides?)` - Show warning message
- `info(message, overrides?)` - Show info message
- `neutral(message, overrides?)` - Show neutral message
- `clear()` - Clear the message

All methods accept an optional `overrides` parameter to temporarily override the target's configuration for that specific call.

### Direct Methods

- `messageDisplay.success(message, options?)`
- `messageDisplay.error(message, options?)`
- `messageDisplay.warning(message, options?)`
- `messageDisplay.info(message, options?)`
- `messageDisplay.neutral(message, options?)`
- `messageDisplay.show(message, type, options?)`
- `messageDisplay.showInline(message, type, container, options?)` - Display inline message in a container

## Configuration

### MessageTargetConfig

```typescript
interface MessageTargetConfig {
  floating?: boolean; // Use floating animation (default: true)
  duration?: number; // Message duration in ms (default: 3000)
  container?: HTMLElement; // Container element (default: document.body)
  classNames?: MessageClassNames; // Optional custom class names
  useDefaultClassNames?: boolean; // Keep built-in class names (default: true)
  maxWidth?: number | string; // Max width for messages (default: 420)
  ellipsis?: boolean; // Use text ellipsis (default: false)
}
```

`MessageClassNames` lets you override classes per element/type:

```typescript
interface MessageClassNames {
  floating?: string;
  fixed?: string;
  types?: Partial<Record<StatusType, string>>;
  fadeOut?: string;
  inlineWrapper?: string;
  inlineMessage?: string;
}
```

### MessageDisplayOptions

```typescript
interface MessageDisplayOptions {
  floating?: boolean;
  duration?: number;
  elementId?: string;
  container?: HTMLElement;
  classNames?: MessageClassNames;
  useDefaultClassNames?: boolean;
  maxWidth?: number | string; // Max width for messages (default: 420)
  ellipsis?: boolean; // Use text ellipsis (default: false)
}
```

### Customizing styles with `classNames`

You can attach your own class names (and optionally drop the built-in ones) for full styling control:

```typescript
const status = messageDisplay.for("my-status", {
  floating: false,
  classNames: {
    fixed: "my-status",
    floating: "my-floating-status",
    types: { success: "my-success", error: "my-error" },
    fadeOut: "my-fade",
  },
  maxWidth: 500, // px or string (e.g., "32rem")
  ellipsis: true, // opt-in ellipsis; default wraps text
  useDefaultClassNames: false, // omit default classes if you only want yours
});
```

Then style those classes in your app:

```css
.my-status { /* your styles */ }
.my-floating-status { /* your styles */ }
.my-success { /* success styles */ }
.my-error { /* error styles */ }
```

## Styling

Import the CSS file to get default styles:

```typescript
import "noti-diva/dist/styles.css";
```

You can customize the styles by overriding the CSS classes:

- `.status-message` - Fixed messages
- `.floating-status-message` - Floating messages
- `.status-success`, `.status-error`, `.status-warning`, `.status-info`, `.status-neutral` - Type styles

## Examples

### Vanilla JavaScript Project

```typescript
import { messageDisplay } from "noti-diva";

const editorStatus = messageDisplay.for("editor-status", {
  floating: false,
});

editorStatus.success("Saved successfully!");
```

### React Application

```tsx
import { useMessageDisplay } from "noti-diva";

function FormComponent() {
  const formStatus = useMessageDisplay("form-status", { floating: true });

  const handleSubmit = async () => {
    try {
      await submitForm();
      formStatus.success("Form submitted!");
    } catch (error) {
      formStatus.error("Submission failed");
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## License

ISC
