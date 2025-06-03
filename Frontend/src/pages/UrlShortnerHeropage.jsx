import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apis } from '../api/api';
import UrlForm from '../components/UrlForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/slice/authSlice';
import Navbar from '../components/Navbar';

export default function UrlShortenerLanding() {
  const [activeTab, setActiveTab] = useState('short');
  const [url, setUrl] = useState('');
  const [newurl, setNewUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();




  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  




  return (
    <div className="min-h-screen bg-[#001738] text-white flex flex-col items-center font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center max-w-3xl mt-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Build stronger digital connections</h2>
        <p className="text-gray-300 text-lg">
          Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right
          information.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setActiveTab('short')}
            className={`px-4 py-2 flex items-center gap-2 rounded-lg border ${
              activeTab === 'short' ? 'bg-white text-black' : 'border-white'
            }`}
          >
            🔗 Short link
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-4 py-2 flex items-center gap-2 rounded-lg border ${
              activeTab === 'qr' ? 'bg-white text-black' : 'border-white'
            }`}
          >
            📱 QR Code
          </button>
        </div>
      </section>

      <div className="mt-[70px] w-full">
        <UrlForm />
      </div>

      {activeTab === 'qr' && (
        <div className="w-[90%] max-w-xl bg-white text-black rounded-2xl shadow-xl px-10 py-8 mt-10 text-center">
          <p className="text-lg font-medium">QR Code Generator coming soon...</p>
        </div>
      )}
    </div>
  );
}
