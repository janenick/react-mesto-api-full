import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header/header-logo.svg';

function Header(props) {

  const { pathname } = useLocation();
  const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const linkPath = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

  return (
    <header className='header page__header section'>
      <img className='header__logo' alt='Логотип проекта Место' src={logo} />
      <nav className='header__nav'>
        <ul className='header__links'>
          {props.loggedIn
            ? (<>
              <li className='header__links-item'><p className='header__email'>{props.email}</p></li>
              <li className='header__links-item'><button onClick={props.onSignOut} className='header__btn'>Выйти</button></li>
            </>)
            :
            (<li className='header__links-item'><Link to={linkPath} className='header__link'>{linkText}</Link></li>)
          }
        </ul>
      </nav>
    </header>
  );
}

export default Header;