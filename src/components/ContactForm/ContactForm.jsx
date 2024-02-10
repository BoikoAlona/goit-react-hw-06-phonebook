import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

import { useState } from 'react';

import { addContact } from './../../redux/contacts/contactsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from './../../redux/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.elements.number.value;

    const formData = {
      name,
      number,
    };

      const hasDuplicates = contacts.some(contact => {
        const contactName = contact.name || '';
        return contactName.toLowerCase() === formData.name.toLowerCase();
      });
      
      if (hasDuplicates) {
        alert(`${formData.name} is already in contacts`);
        return;
    };
    
      const newFriend = { ...formData, id: nanoid().toString() };

    const action = addContact(newFriend);
    console.log(newFriend);
      dispatch(action);
    };

  return (
    <form onSubmit={handleSubmit}>
      <label className={css.formLabel}>
        Name:
        <input
          className={css.formInput}
          id="inputName"
          name="name"
          type="text"
          value={ name }
          onChange={handleChange}
          required
        />
      </label>
      <label className={css.formLabel}>
        Number:
        <input
          className={css.formInput}
          id="inputNumber"
          name="number"
          type="tel"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
