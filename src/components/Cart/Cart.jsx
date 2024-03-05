import React from 'react';
import { useNavigate } from "react-router-dom";
import CartRow from './CartRow';
import CartOrder from './CartOrder';


function Cart() {
  const navigate = useNavigate();
  const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
  const [array, setArray] = React.useState(cartArray);
  const [total, setTotal] = React.useState(array.reduce((acc, item) => item.total + acc, 0));

  const handleDelete = (id) => {
    if (!id) return;
    cartArray.splice(0, cartArray.length, ...cartArray.filter(item => item.id !== id));
    localStorage.setItem('cart', JSON.stringify(cartArray));
    const updateArray = JSON.parse(localStorage.getItem('cart')) || [];
    setArray(updateArray);
    setTotal(array.reduce((acc, item) => item.total + acc, 0));
    navigate('/bosa-noga/cart');
  };


  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {array && array.length ?
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {array && array.length ? 
              array.map((item, i) => {
                return <CartRow 
                        key={i} 
                        position={i+1} 
                        item={item} 
                        onChange={handleDelete}>
                      </CartRow>
              }) 
              : ''
            }
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td>{total} руб.</td>
            </tr>
          </tbody>
        </table>
        : 'Корзина пуста'
        }
      </section>
      <CartOrder/>
    </>
  );
};

export default Cart;
