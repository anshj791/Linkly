import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apis } from '../api/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { authActions, fetchCurrentUser } from '../store/slice/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  const passwordChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isSuspicious = !Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post(
        apis.loginapi,
        { email, password },
        { withCredentials: true }
      );
      dispatch(authActions.login({ user: data.user, token: data.token }));
      dispatch(fetchCurrentUser());
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Invalid email or password';
      setError(msg);
    }
  };

  return (
<div className="w-full h-screen flex flex-col md:flex-row bg-black">
      {/* Logo Panel */}
        <div className="w-full h-1/2 md:w-1/2 md:h-auto flex flex-col items-center justify-center 
                bg-black md:bg-white 
                md:rounded-none md:rounded-r-[100px] overflow-hidden">

        <h2 className="text-5xl md:text-8xl font-bold tracking-wider font-outfit 
                       text-white md:text-black">
          Linkly.
        </h2>
        <p className="text-sm md:text-base font-medium uppercase 
                      text-white md:text-gray-900 mt-2">
          The link shortener
        </p>
      </div>

      {/* Form Panel */}
<div className="w-full md:w-1/2 min-h-[50%] flex items-center justify-center p-6 bg-white md:bg-black 
                rounded-t-[50px] md:rounded-t-[50px]  overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col items-center text-black md:text-white relative"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-2 absolute top-0">Let's Short</h2>
          <p className="mt-20 md:mt-[15%] text-lg md:text-xl font-medium">Welcome back</p>

          <div className="mt-6 flex flex-col gap-5 w-full items-center">
            <input
              type="email"
              placeholder="Enter Email Here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 border rounded-3xl w-[80%] border-black md:border-white bg-transparent focus:outline-none"
            />
            <input
              type="password"
              placeholder="Enter Password Here"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (!touched) setTouched(true);
              }}
              className="px-6 py-3 border rounded-3xl w-[80%] border-black md:border-white bg-transparent focus:outline-none"
            />

            {/* Password warning */}
            <AnimatePresence>
              {touched && isSuspicious && (
                <motion.div
                  className="text-sm text-yellow-600 md:text-yellow-400 w-[80%] text-left"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Password may be too weak. Are you sure it's correct?
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="text-sm text-red-500 font-medium w-[80%] text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="py-3 w-[80%] bg-black md:bg-white text-white md:text-black text-xl font-bold rounded-3xl hover:bg-gray-600 md:hover:bg-gray-400 hover:text-white transition duration-200"
            >
              Log In
            </button>

            <p className="text-sm mt-2">
              Not registered yet?
              <button
                type="button"
                onClick={() => navigate('/signin')}
                className="ml-1 font-bold underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;