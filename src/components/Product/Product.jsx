import React from 'react';
import { useNavigate } from "react-router-dom";
import service from '../../hooks/service';
import Loader from '../Loader/Loader';


function Product() {
  const [count, setCount] = React.useState(1);
  const [size, setSize] = React.useState(null);
  const path = window.location.pathname.replace(new RegExp(`.*?:(.*)`), '$1');
  const { data, isLoading } = service(`${process.env.REACT_APP_API_URL}/api/items/${path}`);
  const navigate = useNavigate();

  const handleSize = (e) => {
    const btn = e.target.closest('.text-center').nextElementSibling;
    const list = [...e.target.closest('.size-group').children];
    list.forEach((item) => item.className = 'catalog-item-size');
    e.target.className = 'catalog-item-size selected';
    setSize(e.target.textContent);
    btn.title = '';
    btn.style.cursor = 'pointer';
    btn.style.opacity = '1';
  };

  const handleCount = (e) => {
    let sum = count;
    if (size && e.target.className.includes('btn-minus')) sum > 1 ? sum -= 1 : sum;
    if (size && e.target.className.includes('btn-plus')) sum < 10 ? sum += 1 : sum;
    setCount(sum);
  };

  const goToCart = () => {
    if (!size) return;

    const storageCart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = {
      id: path,
      title: data?.title,
      size: size,
      count: count,
      price: data?.price,
      total: data?.price*count,
    };
    storageCart.push(product);

    const curCart = storageCart.reduce((acc, item) => { 
      const oldItem = acc.find(oldItem => oldItem.id === item.id && oldItem.size === item.size);
      if (oldItem) {
        oldItem.count = oldItem.count + item.count
      } else {
        acc.push(item) 
      }
      return acc;
    }, []);

    localStorage.setItem('cart', JSON.stringify(curCart));
    navigate('/bosa-noga/cart');
  };


  return (
    <section className="catalog-item">
    {isLoading ? <Loader/> 
      : <>
      <h2 className="text-center">{data?.title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={data?.images[0]} className="img-fluid" alt={data?.title}/>
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                  <td>Артикул</td>
                  <td>{data?.sku}</td>
              </tr>
              <tr>
                  <td>Производитель</td>
                  <td>{data?.manufacturer}</td>
              </tr>
              <tr>
                  <td>Цвет</td>
                  <td>{data?.color}</td>
              </tr>
              <tr>
                  <td>Материалы</td>
                  <td>{data?.material}</td>
              </tr>
              <tr>
                  <td>Сезон</td>
                  <td>{data?.season}</td>
              </tr>
              <tr>
                  <td>Повод</td>
                  <td>{data?.reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
          {data?.sizes?.every(item => item.available === false) ?
            <p>Доступные размеры отсутствуют</p> :
            <>
              <p className='size-group'>Размеры в наличии: 
              {data?.sizes?.map((item, i) => {
                return item.available ? <span key={i} className="catalog-item-size" onClick={handleSize}>{item.size}</span> : ''
              })}
              </p>
              <p>Количество: 
                <span className="btn-group btn-group-sm pl-2" onClick={handleCount}>
                  <button className="btn btn-secondary btn-minus">-</button>
                  <span className="btn btn-outline-primary">{count}</span>
                  <button className="btn btn-secondary btn-plus">+</button>
                </span>
              </p>
            </>
          }
          </div>
          {data?.sizes?.every(item => item.available === false) ? '' 
            : <button className="btn btn-danger btn-block btn-lg" title='Выберите размер' onClick={goToCart}>
                В корзину
              </button>
          }
        </div>
      </div>
      </>
    }
    </section>
  );
};

export default Product;
