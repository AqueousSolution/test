import React, { useContext,useState } from 'react';
// import { CircularProgress } from '@mui/material';
import ContactsContext from "../../store/Contacts/ContactsContext";
import ContactForm from '../components/ContactForm';
import { Modal } from '@mui/material';

const ContactCard = ({contact,avatar,number,name}) => {

    const contactsContext = useContext(ContactsContext);
    const { setCurrent, clearCurrent } = contactsContext;

    const ModalContent = React.forwardRef((props, ref) => <div {...props} ref={ref}><ContactForm closeContactModal={closeContactModal}/> </div>)

    const [editContactModal, setEditContactModal] = useState(false);

    const closeContactModal = () => {
        setEditContactModal(false)
        clearCurrent()
        console.log('closed')
    }

    const openContactModal = () => {
        setEditContactModal(true)
    }

    const viewContactDetails = () =>{
        setCurrent(contact)
        openContactModal()
    }

    return ( 
        <>
            <Modal
            open={editContactModal}
            onClose={closeContactModal}
            aria-labelledby="add-contact"
            aria-describedby="creates-a-new-contact"
            style={{backgroundColor: 'rgba(0, 60, 88, 0.2)'}}
            >
               <ModalContent />
            </Modal>
        <div className='content'>
            <div className="content-avatar">
                <img src={avatar} alt="avatar" />
            </div>
            <div className="content-info">
                <p className="content-info__description">Contact {number}</p>
                <p className="content-info__title"> {name}</p>
            </div>
            <div className="content-comment">
                <p className="content-comment__number" onClick={viewContactDetails}>View More</p>
            </div>
        </div>
        </>
     );
}
 
export default ContactCard;