import type { IdempotencyEntry } from "@/lib/store/slices/idempotency-slice";

export const IDEMPOTENCY_HEADER = "Idempotency-Key";

export const createIdempotencyKey = (): string => {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

const fallbackHash = (value: string): string => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
};

export const hashSnapshot = async (snapshot: unknown): Promise<string> => {
  const serialized = JSON.stringify(snapshot);

  if (typeof globalThis.crypto?.subtle?.digest === "function") {
    const data = new TextEncoder().encode(serialized);
    const digest = await globalThis.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  return fallbackHash(serialized);
};

export const resolveIdempotencyEntry = async (
  existingEntry: IdempotencyEntry | undefined,
  snapshot: unknown
): Promise<{ key: string; payloadHash: string; isReused: boolean }> => {
  const payloadHash = await hashSnapshot(snapshot);

  if (existingEntry?.key && existingEntry.payloadHash === payloadHash) {
    return {
      key: existingEntry.key,
      payloadHash,
      isReused: true,
    };
  }

  return {
    key: createIdempotencyKey(),
    payloadHash,
    isReused: false,
  };
};
