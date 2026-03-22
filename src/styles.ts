const CSS = `
/* Mobile: ocupa todo el ancho, centrado abajo */
.sky-container {
  position: fixed;
  bottom: 1rem;
  left: 0.75rem;
  right: 0.75rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: stretch;
  pointer-events: none;
}

/* Tablet y desktop: esquina superior derecha, ancho fijo */
@media (min-width: 480px) {
  .sky-container {
    top: 1rem;
    bottom: auto;
    left: auto;
    right: 1rem;
    width: 360px;
    align-items: flex-end;
  }
}

@keyframes sky-slide-up {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes sky-slide-right {
  from {
    opacity: 0;
    transform: translateX(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.sky-toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
  animation: sky-slide-up 0.3s ease;
  pointer-events: all;
}

@media (min-width: 480px) {
  .sky-toast {
    animation: sky-slide-right 0.3s ease;
  }
}

.sky-toast-success {
  background-color: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.5);
  color: #15803d;
}

.sky-toast-error {
  background-color: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.5);
  color: #b91c1c;
}

.sky-toast-info {
  background-color: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.5);
  color: #1d4ed8;
}

.sky-toast-warning {
  background-color: rgba(234, 179, 8, 0.1);
  border-color: rgba(234, 179, 8, 0.5);
  color: #a16207;
}

.sky-toast-message {
  font-size: 0.875rem;
  font-weight: 600;
  flex: 1;
}

.sky-toast-close {
  margin-left: 1rem;
  padding: 0.25rem;
  border-radius: 9999px;
  border: none;
  background: transparent;
  cursor: pointer;
  line-height: 0;
  color: inherit;
  transition: background-color 0.15s;
}

.sky-toast-close:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

@media (prefers-reduced-motion: reduce) {
  .sky-toast {
    animation: none;
  }
}
`;


let injected = false;

export function injectStyles(): void {
  if (injected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.setAttribute('data-sky-notifications', '');
  style.textContent = CSS;
  document.head.appendChild(style);
  injected = true;
}
