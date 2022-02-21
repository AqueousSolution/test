import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  GET_CONTACTS,
  CLEAR_CURRENT,
  SET_CURRENT,
  CONTACT_ERROR,
  CLEAR_NOTIFICATION,
  SET_LOADING,
} from "../types";

const ContactsReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
        contactCreated: false,
        contactUpdated: false,
        contactDeleted: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        loading: false,
        contactCreated: true,
        contactUpdated: false,
        contactDeleted: false
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        current: action.payload,
        contacts: [
          ...state.contacts.map((contact) =>
            contact.id === action.payload.id ? action.payload : contact
          ),
        ],
        contactUpdated: true,
        contactCreated: false,
        contactDeleted: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
        contactDeleted: true,
        contactCreated: false,
        contactUpdated: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        contactCreated: false,
        contactUpdated: false,
        contactDeleted: false
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        contactCreated: false,
        contactUpdated: false,
        contactDeleted: false
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default ContactsReducer;
