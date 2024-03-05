import React from 'react';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import service from '../../hooks/service';


function TopSales() {
  const { data, isLoading } = service(`${process.env.REACT_APP_API_URL}/api/top-sales`);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {isLoading ? <Loader/>
        : data && data.length
        ? data.map((item) => <Card key={item.id} item={item}></Card>)
        : ''
        }
      </div>
    </section>
  );
};

export default TopSales;
