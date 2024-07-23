// CartPortal.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import MyCart from './MyCart'; // Adjust the import path as needed

interface CartPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPortal: React.FC<CartPortalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
        >
          &times;
        </button>
        <MyCart />
      </div>
    </div>,
    document.getElementById('cart-portal')!
  );
};

export default CartPortal;
