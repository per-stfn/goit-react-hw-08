import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addContactThunk,
  deleteContactThunk,
  fetchContacts,
  updateContactThunk,
} from "./operations";
import { logout } from "../auth/operations";

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    isError: null,
  },
};

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.isLoading = false;
        state.contacts.isError = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(updateContactThunk.fulfilled, (state, action) => {
        const index = state.contacts.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contacts.items[index] = action.payload;
        }
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          deleteContactThunk.pending,
          addContactThunk.pending
        ),
        (state) => {
          state.contacts.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContactThunk.rejected,
          addContactThunk.rejected
        ),
        (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.isError = action.payload || "Something went wrong";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          deleteContactThunk.fulfilled,
          addContactThunk.fulfilled
        ),
        (state) => {
          state.contacts.isLoading = false;
          state.contacts.isError = null;
        }
      );
  },
});

export const contactsReducer = slice.reducer;
