import s from './CreateUser.module.scss';
import formS from '../Form.module.scss';
import Input from '../input/Input';
import axios from 'axios';
import { useState } from 'react';

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const formHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return false;
    setLoading(true);
    const data = await Object.fromEntries(new FormData(e.currentTarget));
    await axios
      .post('https://ticket-back-end.vercel.app/admin', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setIsRegister(true);
    setLoading(false);
  };

  const inputSubmit = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 1) {
      setIsRegister(false);
    }
  }

  return (
    <form onSubmit={formHandler} className={`${formS.form} ${s.login}`}>
      <p className={formS.title}>Angaben zur Person</p>
      <Input inputHandle={inputSubmit} name='name' classNameCont={formS.cont} placeholder='Alex' topText='User Name' />
      <Input inputHandle={inputSubmit} name='email' classNameCont={formS.cont} placeholder='email@info.com' topText='Email*' />
      <Input inputHandle={inputSubmit} name='password' classNameCont={formS.cont} placeholder='dAmNmO!nAoBiZPi?' topText='Password*' />
      <button className={formS.btn}>{loading ? 'Loading...' : 'Registrieren'}</button>
      {isRegister && <p className={s.succes}>Account erstellt ☑</p>}
    </form>
  );
};

export default CreateUser;
