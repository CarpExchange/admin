import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IdempotencyEntry = {
  key: string;
  payloadHash: string;
};

type IdempotencyState = {
  keys: Record<string, IdempotencyEntry>;
};

const initialState: IdempotencyState = {
  keys: {},
};

const idempotencySlice = createSlice({
  name: "idempotency",
  initialState,
  reducers: {
    setKey: (
      state,
      action: PayloadAction<{
        action: string;
        key: string;
        payloadHash: string;
      }>
    ) => {
      state.keys[action.payload.action] = {
        key: action.payload.key,
        payloadHash: action.payload.payloadHash,
      };
    },
    clearKey: (state, action: PayloadAction<string>) => {
      delete state.keys[action.payload];
    },
  },
});

export const { setKey, clearKey } = idempotencySlice.actions;
export default idempotencySlice.reducer;
