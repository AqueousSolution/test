import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import SideBar from "../SideBar";
import Header from "../HeaderView";
import ContactCard from "./ContactCard";
import ContactsContext from "../../store/Contacts/ContactsContext";

const HomeView = () => {

const contactsContext = useContext(ContactsContext);
const { contacts , getContacts, loading, setLoading, clearNotificationError } = contactsContext;

const [contactState, setContactState] = useState([])

//const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    clearNotificationError();
    setLoading();
    getContacts();
    //eslint-disable-next-line
  }, []);

  
  useEffect(() => {
    setContactState(contacts)
  }, [contacts]);

    return ( 
        <div className="main">
            <SideBar />
            <section className='home'>
                <Header />
                {
                    loading ?
                    <div className='center'>
                        <CircularProgress color='secondary' size={27} />
                    </div>
                    :
                    contactState.map((data,index) =>(
                        <ContactCard 
                            key={index}
                            contact={data}
                            avatar={data.avatar}
                            number={index + 1}
                            name={data.name}
                        />
                    ))
                }
            </section>
        </div>
     );
}
 
export default HomeView;