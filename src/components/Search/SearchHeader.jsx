import React from 'react';


function SearchHeader({state}) {
  return (
    <form data-id="search-form" 
      className={state 
        ? 'header-controls-search-form form-inline' 
        : 'header-controls-search-form form-inline invisible'}
      >
      <input className="form-control" placeholder="Поиск"/>
    </form>
  );
};

export default SearchHeader;
