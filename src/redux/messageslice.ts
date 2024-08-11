import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Message } from "@/schemas/Message";


export interface MessageState {
  message: Message[] | null;
}

const initialState: MessageState = {
  message: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    selectMessages: (state, action: PayloadAction<Message[]>) => {
      state.message = action.payload;
    },
    
  },
});

export const { selectMessages } = messageSlice.actions;

export const getMessages = (state: RootState) => state.message?.message;

export default messageSlice.reducer;
