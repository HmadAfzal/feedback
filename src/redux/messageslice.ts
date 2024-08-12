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
    addMessage: (state, action: PayloadAction<Message>) => {
      if (state.message) {
        state.message = [...state.message, action.payload];
      } else {
        state.message = [action.payload];
      }
    },
    deleteMessage:(state, action: PayloadAction<string>)=>{
      state.message = state.message?.filter((message) => message._id !== action.payload) || null;
    }
  },
});

export const { selectMessages, addMessage, deleteMessage } = messageSlice.actions;

export const getMessages = (state: RootState) => state.message?.message;

export default messageSlice.reducer;
