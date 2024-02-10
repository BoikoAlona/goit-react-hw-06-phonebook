import css from './ContactList.module.css';
import { useSelector } from 'react-redux';

import { selectContacts } from './../../redux/selectors';
import { selectFilter } from './../../redux/selectors';
import { useDispatch } from 'react-redux';
import { deleteContact } from './../../redux/contacts/contactsReducer';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const filteredProfiles = contacts.filter(contact => {
    const contactName = contact.name || '';
    return contactName.toLowerCase().includes(filter.trim().toLowerCase());
  });

  const handleDeleteProfile = id => {
    const action = deleteContact(id);
    dispatch(action);
  };

  return (
    <ul className={css.list}>
      {filteredProfiles.map(contact => {
        return (
          <li key={contact.id} className={css.profileItem}>
            {contact.name}: {contact.number}
            <button className={css.buttonProfile} onClick={() => handleDeleteProfile(contact.id)}>
              Delete
            </button>
          </li>
        );
      })}
  </ul>
);
};

export { ContactList };
