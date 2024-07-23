import React from 'react';

function Footer() {
  return (
    <footer className="bg-inherit text-gray-400 shadow relative inset-x-0 bottom-0">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="block text-sm text-center mb-2 sm:mb-0">
          © 2024 DishDashO™. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap justify-center mt-2 sm:mt-0">
          <li className="mb-2 sm:mb-0">
            <a href="#" className="text-gray-400 hover:text-orange-500 mx-2 sm:mx-4">About</a>
          </li>
          <li className="mb-2 sm:mb-0">
            <a href="#" className="text-gray-400 hover:text-orange-500 mx-2 sm:mx-4">Privacy Policy</a>
          </li>
          <li className="mb-2 sm:mb-0">
            <a href="#" className="text-gray-400 hover:text-orange-500 mx-2 sm:mx-4">Licensing</a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-orange-500 mx-2 sm:mx-4">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
