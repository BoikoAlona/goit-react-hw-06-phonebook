import { ContactForm } from './components/ContactForm/ContactForm';
import { Filter } from './components/Filter/Filter';
import { ContactList } from './components/ContactList/ContactList';
import { nanoid } from 'nanoid';

import {
  addContact,
  deleteContact,
  setFilter,
} from './redux/contacts/contactsReducer';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.contacts.filter);

  const addFriend = formData => {
    const hasDuplicates = contacts.some(
      profile => profile.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (hasDuplicates) {
      alert(`${formData.name} is already in contacts`);
      return;
    }

    const newFriend = { ...formData, id: nanoid().toString() };

    const action = addContact(newFriend);
    dispatch(action);
  };

  const handleChangeFilter = event => {
    const value = event.target.value;
    const action = setFilter(value);
    dispatch(action);
  };

  const handleDeleteProfile = id => {
    const action = deleteContact(id);
    dispatch(action);
  };

  const filteredProfiles = contacts.filter(profile =>
    profile.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addFriend={addFriend} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        contacts={filteredProfiles}
        handleDeleteProfile={handleDeleteProfile}
      />
    </div>
  );
};
