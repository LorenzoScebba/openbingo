import { AsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uniq } from "lodash";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, never>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export interface IAppState {
  size: number;
  textareaContent: string;
  seed: number;
  highlightedItems: number[];
}

const initialState: IAppState = {
  size: 3,
  textareaContent: localStorage.getItem("textareaContent") || "",
  seed: Number(localStorage.getItem("seed") || 0),
  highlightedItems: JSON.parse(
    localStorage.getItem("highlightedItems") || "[]",
  ),
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
    setTextareaContent: (state, action: PayloadAction<string>) => {
      state.textareaContent = action.payload;
      localStorage.setItem("textareaContent", action.payload);
    },
    randomizeSeed: (state) => {
      const seed = Math.floor(Math.random() * 1000);
      state.seed = seed;
      state.highlightedItems = [];
      localStorage.setItem("seed", seed.toString());
    },
    addHighlightedItem: (state, action: PayloadAction<number>) => {
      state.highlightedItems = uniq([
        ...state.highlightedItems,
        action.payload,
      ]);
    },
    removeHighlightedItem: (state, action: PayloadAction<number>) => {
      state.highlightedItems = state.highlightedItems.filter(
        (item) => item !== action.payload,
      );
    },
    clearHighlightedItems: (state) => {
      state.highlightedItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher<FulfilledAction>(
      () => true,
      (state) => {
        localStorage.setItem(
          "highlightedItems",
          JSON.stringify(state.highlightedItems),
        );
      },
    );
  },
});

export const {
  setSize,
  setTextareaContent,
  randomizeSeed,
  clearHighlightedItems,
  removeHighlightedItem,
  addHighlightedItem,
} = appSlice.actions;
