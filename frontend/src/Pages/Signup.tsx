import { Button, Spinner } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Initial } from '../Types/reducerType';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [invailidEmailError, setInvailidEmailError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [invailidNameError, setInvailidNameError] = useState<boolean>(false);
  const [usernameError, setuserNameError] = useState<boolean>(false);
  const [invailidUsernameError, setInvailidUsernameError] =
    useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [invailidPasswordError, setInvailidPasswordError] =
    useState<boolean>(false);
  const [emailAlreadyRegisteredError, setEmailAlreadyRegisteredError] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
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

  const register = () => {
    if (!email && !password && !name && !username) {
      setEmailError(true);
      setPasswordError(true);
      setuserNameError(true);
      setNameError(true);
      return;
    }
    if (!email) {
      setEmailError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }
    if (!name) {
      setNameError(true);
      return;
    }
    if (!username) {
      setuserNameError(true);
      return;
    }
    if (isValidEmail(email)) {
      setInvailidEmailError(false);
      setEmailError(false);
    } else {
      setInvailidEmailError(true);
      setEmailError(false);
      return;
    }
    if (password.length < 6) {
      setPasswordError(false);
      setInvailidPasswordError(true);
      return;
    } else {
      setPasswordError(false);
      setInvailidPasswordError(false);
    }
    if (name.length < 4) {
      setInvailidNameError(true);
      setuserNameError(false);
      return;
    } else {
      setInvailidNameError(false);
      setuserNameError(false);
    }

    const config = {
      email,
      password,
      name,
      username,
    };
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL}/user/register`, config)
      .then((res) => {
        if (res.data.msg == 'email already registered') {
          setEmailAlreadyRegisteredError(true);
        } else {
          setTimeout(() => {
            setLoading(false);
            navigate('/login');
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response.data.msg == 'invailid email') {
          setInvailidEmailError(true);
        } else if (err.response.data.msg == 'invailid username') {
          setInvailidUsernameError(true);
        } else {
          alert('something went wrong please try again.');
        }
      });
  };
  // signup input css part here

  let input =
    ' bg-gray-100 focus:outline-1 h-10 rounded-md outline-[1px] outline-gray-700 text-sm pl-2 border-[1px] border-solid border-gray-500 w-[100%]';
  let errorCss = 'text-start text-xs text-red-700 tracking-[1px] pl-[5px]';

  return (
    <div className='w-full flex justify-center flex-col'>
      <div
        className=' sm:full md:w-[350px] m-auto p-10 flex flex-col  gap-4 mt-3 text-center'
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
          Myinsta
        </h1>
        <p className=' text-base text-#737373'>
          Sign up to see photos and videos from your friends.
        </p>
        <button className=' text-sm text-white bg-blue-600 rounded-lg h-9'>
          Log in with Facebook
        </button>
        <p className=' text-gray-400'>
          ---------------------------<span className='text-gray-900'>or</span>
          ---------------------------
        </p>
        <div className='flex flex-col gap-2'>
          <div className='w-full'>
            <input
              className={input}
              placeholder='Enter Your Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <p
              className={errorCss}
              style={{ display: emailError ? 'block' : 'none' }}>
              field is required
            </p>
            <p
              className={errorCss}
              style={{ display: invailidEmailError ? 'block' : 'none' }}>
              inter valid email address
            </p>
            <p
              className={
                'text-start text-xs text-green-600 tracking-[1px] pl-[5px]'
              }
              style={{
                display: emailAlreadyRegisteredError ? 'block' : 'none',
              }}>
              this email is already registered, please login..
            </p>
          </div>
          <div>
            <input
              className={input}
              placeholder='Full Name'
              onChange={(e) => setName(e.target.value)}
            />
            <p
              className={errorCss}
              style={{ display: nameError ? 'block' : 'none' }}>
              field is required
            </p>
            <p
              className={errorCss}
              style={{ display: invailidNameError ? 'block' : 'none' }}>
              name should be minimum 4 charecter
            </p>
          </div>
          <div>
            <input
              className={input}
              placeholder='Username'
              onChange={(e) => setUserName(e.target.value)}
            />
            <p
              className={errorCss}
              style={{ display: usernameError ? 'block' : 'none' }}>
              field is required
            </p>
            <p
              className={errorCss}
              style={{ display: invailidUsernameError ? 'block' : 'none' }}>
              username already taken
            </p>
          </div>
          <div>
            <input
              className={input}
              placeholder='Password'
              type={'password'}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p
              className={errorCss}
              style={{ display: passwordError ? 'block' : 'none' }}>
              field is required
            </p>
            <p
              className={errorCss}
              style={{ display: invailidPasswordError ? 'block' : 'none' }}>
              password should be minimus 6 charecter
            </p>
          </div>
        </div>
        <p className=' text-xs text-gray-600'>
          People who use our service may have uploaded your contact information
          to Instagram.{' '}
          <span>
            <a href='' className=' text-blue-900'>
              Learn More
            </a>
          </span>
        </p>
        <p className=' text-xs text-gray-600'>
          By signing up, you agree to our{' '}
          <span>
            <a href='' className=' text-blue-900'>
              Terms
            </a>
          </span>{' '}
          ,{' '}
          <span>
            <a href='' className=' text-blue-900'>
              Privacy Policy
            </a>
          </span>{' '}
          and{' '}
          <span>
            <a href='' className=' text-blue-900'>
              Cookie Policy
            </a>
          </span>
        </p>
        <button
          className=' text-sm text-white bg-blue-400 rounded-lg h-9 flex items-center justify-center'
          onClick={register}>
          {loading ? <Spinner /> : 'Sign up'}
        </button>
      </div>
      <div
        className='sm:w-full md:w-[350px] m-auto  flex flex-col  gap-4 text-center h-20 align-middle justify-center mt-3'
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
        }}>
        <p className=' text-sm text-#ffffff'>
          Have an account?{' '}
          <NavLink to='/login'>
            <span className='text-blue-600'>Log in</span>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
