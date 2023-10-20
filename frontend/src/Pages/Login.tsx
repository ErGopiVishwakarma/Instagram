import { Button, Spinner } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH } from '../Redux/actionType';
import { Initial } from '../Types/reducerType';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [invailidEmailError, setInvailidEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [invailidPasswordError, setInvailidPasswordError] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkAuth = useSelector((store: Initial) => store.auth);

  useEffect(() => {
    if (checkAuth) {
      navigate('/');
    }
  }, []);

  function isValidEmail(email: string): Boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
  const login = () => {
    if (!email && !password) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }
    if (!email) {
      setEmailError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!isValidEmail(email)) {
      setEmailError(false);
      setInvailidEmailError(true);
      return;
    } else {
      setEmailError(false);
      setInvailidEmailError(false);
    }
    if (password.length < 6) {
      setPasswordError(false);
      setInvailidPasswordError(true);
      return;
    } else {
      setPasswordError(false);
      setInvailidPasswordError(false);
    }
    const config = {
      email,
      password,
    };
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL}/user/login`, config)
      .then((res) => {
        console.log(res);
        let time = new Date();
        let instaAuth = {
          token: res.data.token,
          auth: true,
          id: res.data.user._id,
          expireIn: Date.now() + 7 * 24 * 60 * 60 * 1000,
        };
        localStorage.setItem(
          'xx12insta@123auth1t3ork0en',
          JSON.stringify(instaAuth),
        );
        dispatch({ type: AUTH, payload: true });
        setTimeout(() => {
          setLoading(false);
          navigate('/');
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        setLoading(false);
      });
  };
  // login input css string part here
  let input =
    'bg-gray-100 focus:outline-1 h-10 rounded-md outline-[1px] outline-gray-700 text-sm pl-2 border-[1px] border-solid border-gray-500 w-full';

  return (
    <div className='w-full flex justify-center flex-col'>
      <div
        className='sm:w-full md:w-[350px] m-auto p-10 flex flex-col  gap-4 mt-3 text-center'
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        }}>
        <h1
          className=' text-4xl'
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}>
          Instagram
        </h1>
        <p className=' text-base text-#737373'>
          Lon in to see photos and videos from your friends.
        </p>
        <div className='flex flex-col gap-2 pt-3 w-full'>
          <div className='w-[100%]'>
            <input
              className={input}
              placeholder='Enter Your Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <p
              className='text-start text-xs text-red-700 tracking-[1px] pl-[5px]'
              style={{ display: emailError ? 'block' : 'none' }}>
              email is required
            </p>
            <p
              className='text-start text-xs text-red-700 tracking-[1px] pl-[5px]'
              style={{ display: invailidEmailError ? 'block' : 'none' }}>
              enter valid email address
            </p>
          </div>
          <div className='w=[100%]'>
            <input
              className={input}
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <p
              className='text-start text-xs text-red-700 tracking-[1px] pl-[5px]'
              style={{ display: passwordError ? 'block' : 'none' }}>
              password is required
            </p>
            <p
              className='text-start text-xs text-red-700 tracking-[1px] pl-[5px]'
              style={{ display: invailidPasswordError ? 'block' : 'none' }}>
              password should be 6 charecter
            </p>
          </div>
        </div>
        <button
          className=' text-sm text-white bg-blue-400 rounded-lg h-9 flex items-center justify-center'
          onClick={login}>
          {loading ? <Spinner /> : 'Log in'}
        </button>
        <p className=' text-gray-400'>
          ---------------------------<span className='text-gray-900'>or</span>
          ---------------------------
        </p>
        <p className='text-sm'>Log in with Facebook</p>
        <p className='text-xs text-blue-600'>forgot Password</p>
      </div>

      <div
        className='sm:w-full md:w-[350px] m-auto  flex flex-col  gap-4 text-center h-20 align-middle justify-center mt-3'
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        }}>
        <p className=' text-sm text-#ffffff'>
          Don't have an account? <NavLink to='/signup'><span className='text-blue-600'>Sign up</span></NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
