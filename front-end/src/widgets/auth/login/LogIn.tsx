import s from './LogIn.module.scss';
import formS from '../Form.module.scss';
import Input from '../input/Input';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setUser } from '../../../store/slices/userSlices/userSlice';
import useStorage from '../../../hooks/useStorage';
import { RoutesName, StorageName } from '../../../app/routing/Routing';
import { useNavigate } from 'react-router';

const LogIn = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(state => state.userSlice);
  const navigate = useNavigate();
  const { setValue } = useStorage(StorageName.UserData, selector);

  const formHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    await axios
      .post('https://ticket-back-end.vercel.app/login', data)
      .then(async function (response) {
        if (response) {
          await dispatch(setUser(data));
          setValue(data);
          navigate(RoutesName.root, { replace: true });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form onSubmit={formHandler} className={`${formS.form} ${s.login}`}>
      <p className={formS.title}>Angaben zur Person</p>
      <Input name='email' classNameCont={formS.cont} placeholder='email@info.com' topText='Email*' />
      <Input type='password' name='password' classNameCont={formS.cont} placeholder='dAmNmO!nAoBiZPi?' topText='Password*' />
      <button className={formS.btn}>Login</button>
    </form>
  );
};

export default LogIn;