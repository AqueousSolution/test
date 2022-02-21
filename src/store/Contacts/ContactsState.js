import axios from 'axios';
import React, { useReducer } from 'react';
import
  {
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    GET_CONTACTS,
    CLEAR_CURRENT,
    SET_CURRENT,
    CONTACT_ERROR,
    CLEAR_NOTIFICATION,
    SET_LOADING
  } from '../types';
import  API_BASE  from '../apiBaseURL';
import ContactsContext from './ContactsContext';
import ContactsReducer from './ContactsReducer';

const ContactsState = props => {
  const initialState = {
    contacts: [],
    contactCreated:false,
    contactUpdated:false,
    contactDeleted:false,
    current: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(ContactsReducer, initialState);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  //Get the list of all Contacts currently in DB
  const getContacts = async () => {
    try {
      const res = await axios.get(`${API_BASE}contacts`);
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err });
    }
  };

  //Add a Contact to the DB
  const addContact = async contact => {
    try {
      await axios.post(`${API_BASE}contacts`, contact, config);
      dispatch({ type: ADD_CONTACT, payload: contact });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response });
    }
  };
  //Delete a Contact from the DB
  const deleteContact = async id => {
    try {
      await axios.delete(`${API_BASE}contacts/${id}`, id, config);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err });
    }
  };

  //Update details belonging to a Contact
  const updateContact = async contact => {
    try {
      await axios.put(`${API_BASE}contacts/${contact.id}`, contact, config);
      dispatch({ type: UPDATE_CONTACT, payload: contact });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err });
    }
  };

  //Set Current Contact to be edited
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //Clear Current Contact after edit
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
//Clears error message
  const clearNotificationError = () =>{
    dispatch({ type: CLEAR_NOTIFICATION });
  }

  //Sets an event to be loading
  const setLoading = () =>{
    dispatch({ type: SET_LOADING });
  }

  return (
    <ContactsContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        error: state.error,
        loading: state.loading,
        contactCreated: state.contactCreated,
        contactUpdated: state.contactUpdated,
        contactDeleted: state.contactDeleted,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        clearNotificationError,
        setLoading
      }}
    >
      {props.children}
    </ContactsContext.Provider>
  );
};

export default ContactsState;
