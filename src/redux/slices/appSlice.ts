import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAppState {
  size: number;
  textareaContent: string;
  seed: number;
}

const initialState: IAppState = {
  size: 3,
  textareaContent: localStorage.getItem("textareaContent") || "",
  seed: 0,
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
      state.seed = Math.floor(Math.random() * 1000);
    },
  },
});

export const { setSize, setTextareaContent, randomizeSeed } = appSlice.actions;
