import { createSlice, createSelector } from '@reduxjs/toolkit';
import { selectContacts } from '../contacts/selectors';


export const selectFilter = (state) => state.filters.filter; 

// Memoized selector for filtering contacts
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter], 
  (contacts, filter) => {
    const lowerCaseFilter = filter.toLowerCase(); 
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter) || 
      contact.number.includes(lowerCaseFilter)
    );
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filter: '',
  },
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { changeFilter } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;