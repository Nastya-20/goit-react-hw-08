import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken) {
      setAuthHeader(persistedToken); 
    } else {
      return thunkAPI.rejectWithValue('No token found');
    }

    try {
      const res = await axios.get('/contacts');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (newContact, thunkAPI) => {
        try {
            const res = await axios.post("/contacts", newContact);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
     }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const res = await axios.delete(`/contacts/${contactId}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
     }
);