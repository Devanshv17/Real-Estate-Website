import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  
  return (
    <div className='container mx-auto max-w-lg'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-gray-700'>Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            className='border rounded-lg px-3 py-2'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='password' className='text-gray-700'>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            className='border rounded-lg px-3 py-2'
            id='password'
            onChange={handleChange}
          />
        </div>
        <button
          disabled={loading}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg uppercase hover:bg-blue-600 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex items-center justify-center mt-5'>
        <p className='text-gray-700'>Don't have an account?</p>
        <Link to={'/sign-up'} className='ml-2 text-blue-700'>Sign up</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
