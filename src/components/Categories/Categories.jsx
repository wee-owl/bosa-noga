import React from 'react';
import { Link } from 'react-router-dom';
import service from '../../hooks/service';


function Categories({onChange}) {
  const { data } = service(`${process.env.REACT_APP_API_URL}/api/categories`);

  const handleClick = (e) => {
    const list = [...e.target.closest('ul').children];
    list.forEach((item) => item.children[0].className = 'nav-link');
    e.target.className = 'nav-link active';
    onChange(e.target.id);
  };


  return (
    <ul className="catalog-categories nav justify-content-center" onClick={handleClick}>
      {
        data && data.length ? 
          ([<li className="nav-item" key={0}>
              <Link className="nav-link active" id={0} to="#">Все</Link>
            </li>])
          .concat(data.map((item) => 
            <li className="nav-item" key={item.id}>
              <Link className="nav-link" id={item.id} to="#">{item.title}</Link>
            </li>
          )
        )
        : ''
      }
    </ul>
  );
};

export default Categories;
