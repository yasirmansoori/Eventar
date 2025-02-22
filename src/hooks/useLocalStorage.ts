import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

const clearPersistedState = () => {
  localStorage.removeItem("eventar-selected-colors");
  localStorage.removeItem("eventar-selected-resource");
  localStorage.removeItem("eventar-current-view");
  localStorage.removeItem("eventar-agenda-view");
};

export { clearPersistedState };
