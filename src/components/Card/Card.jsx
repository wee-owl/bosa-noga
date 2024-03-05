import React from 'react';
import { NavLink } from 'react-router-dom';


function Card({item}) {
  return (
    <div className="col-4" id={item.id}>
      <div className="card catalog-item-card">
        <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title}/>
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{`${item.price}  руб.`}</p>
          <NavLink 
            to={`/bosa-noga/catalog/:${item.id}`} 
            className="btn btn-outline-primary">
            Заказать
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
