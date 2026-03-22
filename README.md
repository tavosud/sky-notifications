# sky-notifications

Lightweight, zero-dependency toast notification library for React. No CSS frameworks required — styles are injected automatically.

![preview](https://raw.githubusercontent.com/tavosud/sky-notifications/master/assets/preview.jpg)

## Technologies

| | |
|---|---|
| **React** ≥ 18 | Hooks-based API (`useNotification`) |
| **TypeScript** | Full type definitions included — works in JS and TS projects |
| **tsup** | Dual ESM + CJS build output |
| **Plain CSS** | Styles injected once into `<head>` at runtime, no stylesheet imports needed |

## Features

- 4 notification types: `success`, `error`, `info`, `warning`
- Auto-dismiss with configurable duration (default 3 s)
- Manual dismiss via close button — cancels the auto-dismiss timer
- **100% responsive** — full-width bottom bar on mobile, fixed top-right panel on tablet/desktop
- Slide-in animation (from bottom on mobile, from right on desktop)
- Respects `prefers-reduced-motion` — animations disabled for users who prefer it
- `backdrop-filter` blur glass effect
- No memory leaks — all timers are cancelled on unmount
- SSR safe — style injection skipped when `document` is unavailable
- Zero runtime dependencies (React is a peer dependency)
- Compatible with Vite, Next.js, Remix, Astro, CRA, and any other bundler

## Installation

```bash
npm install @tavosud/sky-notifications
```

## Setup

### JavaScript (JSX)

```jsx
// main.jsx
import { NotificationProvider } from '@tavosud/sky-notifications';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);
```

### TypeScript (TSX)

```tsx
// main.tsx
import { NotificationProvider } from '@tavosud/sky-notifications';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);
```

## Usage

### JavaScript (JSX)

```jsx
import { useNotification } from '@tavosud/sky-notifications';

function MyComponent() {
  const { addNotification } = useNotification();

  return (
    <>
      <button onClick={() => addNotification('Saved!', 'success')}>Success</button>
      <button onClick={() => addNotification('Something went wrong', 'error')}>Error</button>
      <button onClick={() => addNotification('Update available', 'info')}>Info</button>
      <button onClick={() => addNotification('Check your connection', 'warning', 5000)}>Warning</button>
    </>
  );
}
```

### TypeScript (TSX)

```tsx
import { useNotification, NotificationType } from '@tavosud/sky-notifications';

function MyComponent() {
  const { addNotification } = useNotification();

  const notify = (message: string, type: NotificationType) => {
    addNotification(message, type);
  };

  return (
    <>
      <button onClick={() => notify('Saved!', 'success')}>Success</button>
      <button onClick={() => notify('Something went wrong', 'error')}>Error</button>
      <button onClick={() => notify('Update available', 'info')}>Info</button>
      <button onClick={() => addNotification('Check your connection', 'warning', 5000)}>Warning</button>
    </>
  );
}
```

## API

### `<NotificationProvider>`

Context provider that must wrap the part of the tree where notifications are used. Renders the toast container automatically.

### `useNotification()`

Returns:

| Method | Signature | Description |
|--------|-----------|-------------|
| `addNotification` | `(message: string, type: NotificationType, duration?: number) => void` | Show a toast. Default duration is 3000 ms |
| `removeNotification` | `(id: string) => void` | Dismiss a specific toast by id |

### `NotificationType`

```ts
type NotificationType = 'success' | 'error' | 'info' | 'warning';
```

## Responsive behavior

| Breakpoint | Position | Width | Animation |
|---|---|---|---|
| `< 480px` | Bottom, full width | 100% (with `0.75rem` side margin) | Slides up |
| `≥ 480px` | Top-right corner | 360px fixed | Slides in from right |

## License

MIT
