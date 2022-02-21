import '../styling/index.scss'
import HomeView from './HomeView'
import ContactsState from '../store/Contacts/ContactsState';

function RootView() {
  return (
    <>
     <ContactsState>
        <HomeView />
     </ContactsState>
    </>
  );
}

export default RootView;
