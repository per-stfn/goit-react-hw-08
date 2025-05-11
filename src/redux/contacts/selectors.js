export const selectContacts = (state) => state.contacts.contacts.items;
export const selectIsLoading = (state) => state.contacts.contacts.isLoading;
export const selectIsError = (state) => state.contacts.contacts.isError;
export const selectFilter = (state) => state.filters;
