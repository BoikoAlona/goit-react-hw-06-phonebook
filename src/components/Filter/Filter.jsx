import css from './Filter.module.css';

import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from './../../redux/contacts/contactsReducer';

import { selectFilter } from './../../redux/selectors';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChangeFilter = event => {
    const value = event.target.value;
    const action = setFilter(value);
    dispatch(action);
  };

  return (
    <div>
      <p>Find contacts by name</p>
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        value={filter}
        onChange={handleChangeFilter}
      />
    </div>
  );
};

export { Filter };
