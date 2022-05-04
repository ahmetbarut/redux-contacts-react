import { createSlice } from '@reduxjs/toolkit'
import {FakeData} from '../FakeData'

export const contacts = createSlice({
    name: 'contacts',
    initialState: {
        contacts: FakeData,
    },
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
        },
        editContact: (state, action) => {
            state.contacts = state.contacts.map(contact => {
                if (contact.id === action.payload.id) {
                    contact.name = action.payload.name;
                    contact.phone = action.payload.phone;
                    contact.image = action.payload.image;
                }
                return contact;
            }
            );
        }
    },
})

// Action creators are generated for each case reducer function
export const { addContact, removeContact, editContact } = contacts.actions

export default contacts.reducer