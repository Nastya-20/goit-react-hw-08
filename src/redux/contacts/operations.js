import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from 'react-hot-toast';


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
      toast.error(error.response?.data?.message || error.message); 
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const res = await axios.post('/contacts', newContact);
      toast.success('Contact added successfully!'); 
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message); 
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      toast.success('Contact deleted successfully!'); 
      return contactId; 
    } catch (error) {
      toast.error(error.response?.data?.message || error.message); 
      return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
  }
);
