import React from "react";

import SearchForm from "../../SearchForm/SearchForm";


const ReposForm = ({ setQuery, query }) => {
   const name = 'reposSearch';

   const initialValues = {
      [name]: query,
   }

   const onSubmit = (values) => {
      setQuery(values[name]);
   }

   return (
      <SearchForm
         onSubmit={onSubmit}
         initialValues={initialValues}
         name={name}
      />
   )
}

export default ReposForm;