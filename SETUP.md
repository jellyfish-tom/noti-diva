# noti-diva Setup

## Installation

```bash
npm install noti-diva ts-pattern
```

## Usage

### React Projects

```tsx
import { useMessageDisplay } from "noti-diva";
import "noti-diva/dist/styles.css";

function MyComponent() {
  const status = useMessageDisplay("my-status", { floating: false });

  return <button onClick={() => status.success("Saved!")}>Save</button>;
}
```

### Vanilla JavaScript/TypeScript

```typescript
import { messageDisplay } from "noti-diva";
import "noti-diva/dist/styles.css";

const status = messageDisplay.register("my-status", { floating: false });
status.success("Saved!");
```

## Development

### Building

```bash
# Build the library
npm run build

# Build in watch mode
npm run build:watch

# Type check
npm run type-check
```

## Publishing to npm

To publish this package:

```bash
npm publish --access public
```

Then install in any project:

```bash
npm install noti-diva
```
