import React from 'react';
import { useCart ,useDispatchCart } from './ComponentReducer'; // Adjust path as needed

// Define CartItem type
interface CartItem {
  id: string;
  name: string;
  option: string;
  quantity: number;
  price: number;
}

function MyCart() {
  const cartItems = useCart();
  const dispatch = useDispatchCart(); 

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleRemoveItem = (id: string) => {
    // New function to handle item removal
    dispatch({ type: 'REMOVE_ITEM', payload: {id} }); // Dispatch action to remove item
  };
            
  const handleCheckOut=async()=>{
    let userEmail=localStorage.getItem("email")
    console.log(userEmail);
    const response=await fetch("http://localhost:5000/api/orderData",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: cartItems,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    })
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" , payload:[]})
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div>
          <table className="w-full border-collapse bg-gray-100 dark:bg-gray-700 rounded-md shadow">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-600">
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Item</th>
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Option</th>
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Quantity</th>
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Price</th>
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Total</th>
                <th className="py-2 px-4 text-left text-gray-900 dark:text-gray-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="border-b dark:border-gray-600">
                  <td className="py-2 px-4 text-gray-800 dark:text-orange-500">{item.name}</td>
                  <td className="py-2 px-4 text-gray-600 dark:text-gray-300">{item.option}</td>
                  <td className="py-2 px-4 text-gray-600 dark:text-gray-300">{item.quantity}</td>
                  <td className="py-2 px-4 text-gray-600 dark:text-gray-300">₹{item.price.toFixed(2)}</td>
                  <td className="py-2 px-4 text-gray-900 dark:text-green-400">₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td className="py-2 px-4"> {/* New column for Remove button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Total Amount: ₹{calculateTotalAmount()}</h3>
          </div>
          <div>
          <button className='btn bg-orange mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
        </div>
      )}
    </div>
  );
}

export default MyCart;
