// Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
interface NavbarProps {
  onSearch: (query: string) => void;
  onCartClick: () => void; // Add this prop
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onCartClick }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Signin');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="bg-gradient-to-r from-orange-950 to-black border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-orange-500">DishDashO</span>
        </Link>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-4 md:mt-0 border border-gray-100 md:border-0 rounded-lg bg-gray-900 md:bg-inherit dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-orange-500 rounded md:bg-transparent md:text-orange-500 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"
              >
                About
              </Link>
            </li>
            {localStorage.getItem('token') ? (
              <>
                <li>
                  <Link
                    to="/MyOrders"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"
                  >
                    Signout
                  </button>
                </li>
                <li >
                  <button
                    onClick={onCartClick} // Update this button to trigger cart portal
                    className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"
                  >
                    My Cart
                  </button>
                  
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/Signup"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Signin"
                    className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-orange-500 md:p-0"
                  >
                    Signin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
