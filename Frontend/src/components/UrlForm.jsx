import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apis } from '../api/api';
import { ClipboardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [newurl, setNewUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [customSlug, setCustomSlug] = useState('');

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => setUrl(e.target.value);

  const handleFormSubmit = async () => {
    if (!isAuthenticated) {
      toast.error('Please login first!', { position: 'top-center' });
      navigate('/login');
      return;
    }

    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    if (customMode && !customSlug.trim()) {
      toast.error('Please enter a custom slug');
      return;
    }

    setLoading(true);
    setCopied(false);

    try {
      const payload = { url };
      if (customMode) payload.slug = customSlug.trim();

      const { data } = await axios.post(apis.shorturlApi, payload, {
        withCredentials: true,
      });

      setNewUrl(data.shortUrl || data);
    } catch (error) {
      if (error.response?.status === 401) navigate('/login');
      else toast.error(error.response?.data?.message || 'Something went wrong');
    }

    setLoading(false);
  };

  const handleCopy = () => {
    if (newurl) {
      navigator.clipboard.writeText(newurl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className='w-[80%]  max-w-3xl bg-white rounded-[44px] shadow-2xl px-6 sm:px-10 py-8 mx-auto flex flex-col relative'>
      <h1 className='text-center text-2xl sm:text-3xl uppercase font-bold text-blue-950 mt-5 mb-6'>
        URL Shortener
      </h1>

      <button
        onClick={() => setCustomMode((prev) => !prev)}
        className=' px-3 py-1 absolute  sm:py-2 flex md:mb-6 sm:px-4 text-white bg-blue-950 text-sm rounded-full top-4 right-4 hover:bg-blue-800 transition-all'
      >
        {customMode ? 'Cancel Custom' : 'Custom URL'}
      </button>

      <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-4'>
        <label className='text-black font-medium w-full sm:w-auto' htmlFor='url'>
          Enter URL:
        </label>
        <input
          id='url'
          placeholder='https://www.example.com'
          onChange={handleChange}
          value={url}
          type='url'
          className='flex-1 border rounded px-3 py-2 border-blue-600 outline-none'
        />
      </div>

      {customMode && (
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-4'>
          <label className='text-black font-medium w-full sm:w-auto' htmlFor='slug'>
            Custom Slug:
          </label>
          <input
            id='slug'
            placeholder='my-custom-slug'
            onChange={(e) => setCustomSlug(e.target.value)}
            value={customSlug}
            type='text'
            className='flex-1 border text-black rounded px-3 py-2 border-purple-600 outline-none'
          />
        </div>
      )}

      <button
        onClick={handleFormSubmit}
        disabled={loading}
        className={`w-full sm:w-auto self-center px-8 py-3 rounded-3xl font-bold text-white transition-all duration-300 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-blue-800'
        }`}
      >
        {loading ? 'Processing...' : 'Submit'}
      </button>

      {newurl && (
        <div
          className={`mt-6 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 transition-all ${
            copied
              ? 'border-2 border-green-500 text-green-500 bg-green-50'
              : 'border border-gray-300 bg-gray-100'
          }`}
        >
          <p className='text-sm sm:text-md font-semibold text-black truncate max-w-full'>{newurl}</p>
          <ClipboardIcon
            onClick={handleCopy}
            className='h-6 w-6 text-blue-800 cursor-pointer hover:scale-110 transition-transform duration-200'
            title='Copy to clipboard'
          />
        </div>
      )}

      {copied && (
        <div className='mt-4 text-green-600 flex items-center gap-2 transition-opacity duration-300'>
          <CheckCircleIcon className='h-5 w-5' />
          <span>Copied to clipboard!</span>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
