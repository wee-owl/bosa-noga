import React from 'react';
import SearchCatalog from '../Search/SearchCatalog';
import Categories from '../Categories/Categories';
import service from '../../hooks/service';
import Loader from '../Loader/Loader';
import Card from '../Card/Card';


function Catalog() {
  const [id, setId] = React.useState(0);
  const [click, setClick] = React.useState(false);
  const { data, isLoading } = id === 0 && !click 
    ? service(`${process.env.REACT_APP_API_URL}/api/items`) 
    : id === 0 && click 
    ? service(`${process.env.REACT_APP_API_URL}/api/items?offset=6`) 
    : id !== 0 && !click 
    ? service(`${process.env.REACT_APP_API_URL}/api/items?categoryId=${id}`) 
    : service(`${process.env.REACT_APP_API_URL}/api/items?categoryId=${id}&offset=6`);

  const handleCategories = (data) => {
    if (!data || data === 0) setId(0);
    setId(data);
  };

  const handleClick = (e) => {
    return e.target ? setClick(true) : setClick(false);
  };


  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {window.location.pathname.includes('catalog') ? <SearchCatalog/> : ''}
      <Categories onChange={handleCategories}/>
      <div className="row">
        {isLoading ? <Loader/>
          : data && data.length
          ? data.map((item) => <Card key={item.id} item={item}></Card>)
          : ''
        }
      </div>
      <div className="text-center">
        {data.length > 5 
          ? <button 
              className="btn btn-outline-primary" 
              onClick={handleClick}>
              Загрузить ещё
            </button>
          : ''
        }
      </div>
    </section>
  );
};

export default Catalog;
