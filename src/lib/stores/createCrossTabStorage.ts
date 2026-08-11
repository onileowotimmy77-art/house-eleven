import type { StateStorage } from "zustand/middleware";

interface CrossTabStorage {
  storage: StateStorage;
  subscribe: (onChange: () => void) => () => void;
}

export function createCrossTabStorage(
  name: string
): CrossTabStorage {
  const listeners = new Set<() => void>();

  let channel:
    | BroadcastChannel
    | null = null;

  if (
    typeof window !== "undefined" &&
    "BroadcastChannel" in window
  ) {
    channel = new BroadcastChannel(
      `house-eleven:${name}`
    );

    channel.addEventListener(
      "message",
      (event) => {
        if (
          event.data ===
          "state-updated"
        ) {
          listeners.forEach(
            (listener) =>
              listener()
          );
        }
      }
    );
  }

  const storage: StateStorage = {
    getItem: (key) => {
      if (
        typeof window ===
        "undefined"
      ) {
        return null;
      }

      return window.localStorage.getItem(
        key
      );
    },

    setItem: (
      key,
      value
    ) => {
      if (
        typeof window ===
        "undefined"
      ) {
        return;
      }

      window.localStorage.setItem(
        key,
        value
      );

      channel?.postMessage(
        "state-updated"
      );
    },

    removeItem: (key) => {
      if (
        typeof window ===
        "undefined"
      ) {
        return;
      }

      window.localStorage.removeItem(
        key
      );

      channel?.postMessage(
        "state-updated"
      );
    },
  };

  return {
    storage,

    subscribe: (onChange) => {
      listeners.add(onChange);

      return () => {
        listeners.delete(
          onChange
        );
      };
    },
  };
}