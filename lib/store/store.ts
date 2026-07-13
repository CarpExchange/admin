import { configureStore } from "@reduxjs/toolkit";
import idempotencyReducer from "./slices/idempotency-slice";

const STORAGE_KEY = "kript_admin_idempotency_v1";

type PersistedIdempotency = {
  keys: Record<string, { key: string; payloadHash: string }>;
};

type StorePreloadedState = {
  idempotency: {
    keys: PersistedIdempotency["keys"];
  };
};

const loadPersistedState = (): StorePreloadedState | undefined => {
  if (typeof window === "undefined") return undefined;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as { idempotency?: PersistedIdempotency };
    if (!parsed?.idempotency?.keys || typeof parsed.idempotency.keys !== "object") {
      return undefined;
    }

    return {
      idempotency: {
        keys: parsed.idempotency.keys,
      },
    };
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    idempotency: idempotencyReducer,
  },
  preloadedState: loadPersistedState(),
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      const state = store.getState();
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ idempotency: state.idempotency })
      );
    } catch {
      // Best effort local persistence.
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
