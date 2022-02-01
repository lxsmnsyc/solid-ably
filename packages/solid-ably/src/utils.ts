import { createComputed, createSignal } from 'solid-js';

interface ErrorRef<T> {
  value: T;
}

export type ErrorHandler = <T>(value: T) => void;

export function useErrorHandler(): ErrorHandler {
  const [error, setError] = createSignal<ErrorRef<unknown>>();

  createComputed(() => {
    const ref = error();
    if (ref) {
      throw ref.value;
    }
  });

  return (value) => {
    setError(() => ({
      value,
    }));
  };
}
