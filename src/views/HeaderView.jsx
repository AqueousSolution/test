import React, { useContext,useState } from 'react';
import Modal from '@mui/material/Modal';
import ContactsContext from "../store/Contacts/ContactsContext";
import ContactForm from "../views/components/ContactForm";

const Header = () => {

    const contactsContext = useContext(ContactsContext);
    const { contacts  } = contactsContext;

    const ModalContent = React.forwardRef((props, ref) => <div {...props} ref={ref}><ContactForm closeContactModal={closeContactModal}/> </div>)

    const [addContactModal, setAddContactModal] = useState(false);

    const closeContactModal = () => {
        setAddContactModal(false)
    }

    const openContactModal = () => {
        setAddContactModal(true)
    }

    return ( 
        <>
            <Modal
            open={addContactModal}
            onClose={closeContactModal}
            aria-labelledby="add-contact"
            aria-describedby="creates-a-new-contact"
            style={{backgroundColor: 'rgba(0, 60, 88, 0.2)'}}
            >
               <ModalContent />
            </Modal>
            <header className="header">
                    <div className="header-left">
                    <p> {contacts && contacts.length} Contacts </p>
                    </div>
                    <div className="header-right">
                        <button onClick={openContactModal}>+ Add contact</button>
                    </div>
            </header>
        </>
     );
}
 
export default Header;