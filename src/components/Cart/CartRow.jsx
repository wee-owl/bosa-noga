import React from 'react';
import { Link } from 'react-router-dom';


function CartRow({item, position, onChange}) {
  const handleDelete = (e) => {
    onChange(e.target.closest('tr').id);
  };


  return (
    <tr className='product-row' id={item.id}>
      <td scope="row">{position}</td>
      <td>
        <Link to={`/bosa-noga/catalog/:${item.id}`}>{item.title}</Link>
      </td>
      <td>{item.size}</td>
      <td>{item.count}</td>
      <td>{item.price} руб.</td>
      <td>{item.total} руб.</td>
      <td>
        <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Удалить</button>
      </td>
    </tr>
  )
};

export default CartRow;
