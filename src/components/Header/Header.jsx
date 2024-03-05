import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import headerLogo from '../../assets/img/header-logo.png';
import SearchHeader from '../Search/SearchHeader';


function Header() {
  const [cartCount, setCartCount] = React.useState(0);
  const [search, setSearch] = React.useState(false);
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/bosa-noga/cart');
  };

  const handleSearch = (e) => {
    if (e.target && !search) setSearch(true);
    if (e.target && search) setSearch(false);
  };

  useEffect(() => {
    let storage = JSON.parse(window.localStorage.getItem('cart')) || [];
    setCartCount(storage.length);
  });


  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/bosa-noga">
              <img src={headerLogo} alt="Bosa Noga"/>
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bosa-noga" end>Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bosa-noga/catalog">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bosa-noga/about">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bosa-noga/contacts">Контакты</NavLink>
                </li>
              </ul>
              <div className="header-controls-wrapper">
                <div className="header-controls-pics">
                  <div data-id="search-expander" 
                    className="header-controls-pic header-controls-search" 
                    onClick={handleSearch}></div>
                  <NavLink to='/bosa-noga/cart'>
                    <div className="header-controls-pic header-controls-cart" onClick={goToCart}>
                      {cartCount > 0 ? 
                        <div className="header-controls-cart-full">{cartCount}</div> 
                        : ''
                      }
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </NavLink>
                </div>
                <SearchHeader state={search}/>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
