import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    onRegister(password, email);
  };

  return (
    <section className='register section'>
      <div className='popup__container'>
        <form className='popup__form' onSubmit={handleSubmit}>
          <h2 className='popup__title popup__title_type_elem'>Регистрация</h2>
          <label className='popup__form-field'>
            <input id='email' required name='email' type='email' value={data.email} onChange={handleChange} placeholder='Email' className='popup__input popup__input_type_elem' />
          </label>
          <label className='popup__form-field'>
            <input id='password' required name='password' type='password' value={data.password} onChange={handleChange} placeholder='Пароль' className='popup__input popup__input_type_elem' />
          </label>
          <button type='submit' className='popup__btn-save popup__btn-save_type_elem'>Зарегистрироваться</button>
        </form>
        <Link to='./sign-in' className='popup__link'>Уже зарегистрированы? Войти</Link>
      </div>
    </section>
  );
};

export default Register;
