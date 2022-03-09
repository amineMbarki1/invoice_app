import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { useContext, useEffect } from 'react';

import Button from '../../shared/components/Button';
import authService from '../services/authService';
import AuthContext from '../../shared/context/authContext';
import './LoginForm.css';

const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);

  const controller = new AbortController();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const userData = await authService.login(data, controller.signal);
      auth.login({
        name: userData.data.user.name,
        userId: userData.data.user._id,
        token: userData.data.token,
      });
      setLoading(false);
    } catch (error) {
      console.dir(error);
      setError('email', { type: 'not found', message: error.response?.data?.message || 'Network error' });
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  if (auth.isLoggedIn && !loading) return <Redirect to="/invoices" />;

  return (
    <Fragment>
      <div className="card flex user-form-container">
        <p>Sign in to your account</p>
        <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="user-form__group">
            <label className="user-form__label">Email</label>

            <br />
            <input
              className="user-form__input"
              type="email"
              {...register('email', { required: 'Please enter your first Email.' })}
            />
            {errors.email && <label className="user-form__error">{errors.email.message}</label>}
          </div>
          <div className="user-form__group">
            <label className="user-form__label">Password</label>
            <br />
            <input
              className="user-form__input"
              type="password"
              {...register('password', { required: 'Please enter your password.' })}
            />
            {errors.password && <label className="user-form__error">{errors.password.message}</label>}
          </div>
          <div>
            <Button btnAction="login">{loading ? 'Loading ...' : 'Login'}</Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginForm;
