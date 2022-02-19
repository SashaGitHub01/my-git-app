import React from "react";
import SearchForm from '../../SearchForm/SearchForm';

const UsersForm = ({ setQuery }) => {
   const name = 'usersSearch';

   const onSubmit = (values) => {
      setQuery(values[name]);
   }

   const initialValues = {
      [name]: '',
   }

   return (
      <SearchForm initialValues={initialValues} onSubmit={onSubmit} name={name} />
   )
}

export default UsersForm;