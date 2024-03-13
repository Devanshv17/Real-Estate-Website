import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  
  return (
    <div className='container mx-auto max-w-lg'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='username' className='text-gray-700'>Username</label>
          <input
            type='text'
            placeholder='Enter your username'
            className='border rounded-lg px-3 py-2'
            id='username'
            onChange={handleChange}
          />
        </div>
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
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex items-center justify-center mt-5'>
        <p className='text-gray-700'>Have an account?</p>
        <Link to={'/sign-in'} className='ml-2 text-blue-700'>Sign in</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
