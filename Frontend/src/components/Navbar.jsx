import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/slice/authSlice';
import { toast } from 'sonner';
import { Menu, X } from 'lucide-react'; // Optional: Lucide icons

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authActions.logout());
    toast.success('Logged out successfully', {
      position: 'top-center',
      autoClose: 4000,
    });
    navigate('/');
  };

  return (
    <header className="w-full bg-[#001738] text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <h1
          className="text-2xl font-bold text-orange-400 cursor-pointer"
          onClick={() => navigate('/')}
        >
          Linkly<span className="text-white">.</span>
        </h1>

        {/* Hamburger Icon (Mobile Only) */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          <button className="border border-white px-4 py-1 rounded-lg hover:bg-white hover:text-black transition">
            Get a Quote
          </button>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/signin')}
              className="bg-white text-black px-4 py-1 rounded-lg font-semibold hover:bg-gray-200"
            >
              Sign up Free
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4">
          <button className="border border-white px-4 py-1 rounded-lg hover:bg-white hover:text-black transition">
            Get a Quote
          </button>

          {isAuthenticated && user ? (
            <>
              <span className="text-white font-semibold">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/signin')}
              className="bg-white text-black px-4 py-1 rounded-lg font-semibold hover:bg-gray-200"
            >
              Sign up Free
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
