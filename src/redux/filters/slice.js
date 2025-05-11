import { createSlice, createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";
import { selectFilters } from "./selectors";

const initialState = {
  name: "",
};

const sliceFilter = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeSearch: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.toLowerCase().includes(normalizedFilter)
    );
  }
);

export const { changeSearch } = sliceFilter.actions;
export const filtersReducer = sliceFilter.reducer;
