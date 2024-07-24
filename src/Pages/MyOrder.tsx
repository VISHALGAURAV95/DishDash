import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

// Define the type for your order items
type OrderItem = {
  image: string;
  name: string | null; // Allow name to be null
  quantity: number;
  option: string; // Assuming option is a string (e.g., 'half', 'full')
  Order_date: string;
  price: number;
};



export default function MyOrder() {
  const [orderData, setOrderData] = useState<OrderItem[][]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('email');
    console.log('Fetching orders for:', userEmail);

    try {
      const response = await fetch("https://dishdash-backend-v9is.onrender.com/api/myOrderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });

      const data = await response.json();
      console.log('Order data:', data);

      if (data && data.orderData && data.orderData.order_data) {
        setOrderData(data.orderData.order_data);
      } else {
        console.error('Unexpected response structure:', data);
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearch = (query: string) => {
    // Example search logic
    console.log('Searching for:', query);
  }

  return (
    <div className='bg-gradient-to-r from-orange-950 to-black text-orange-500'>
      <Navbar onCartClick={handleCartToggle} onSearch={handleSearch}  />

      <div className=" container mx-auto p-4">
        <div className="flex flex-wrap -mx-4">
          {orderData.length > 0 ? orderData.slice(0).reverse().map((orderBatch, index) => {
            // Skip rendering if the batch is empty
            const validOrderBatch = orderBatch.filter(order => order.name !== null);

            // Create a new array starting from index 1
            const ordersToRender = validOrderBatch.slice(1);

            // Skip rendering if there are no orders to render
            if (ordersToRender.length === 0) return null;

            return (
              <div key={index} className="w-full mb-8">
                <div className="text-lg font-bold mt-2 mb-4">
                  <strong>Date:</strong> {validOrderBatch[0]?.Order_date && new Date(validOrderBatch[0].Order_date).toDateString()}
                </div>
                <div className="flex flex-wrap -mx-2">
                  {ordersToRender.map((arrayData, idx) => (
                    <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                      <div className="bg-inherit shadow-md rounded-lg overflow-hidden">
                        <img src={arrayData.image} alt={arrayData.name || 'No Image'} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h5 className="text-xl font-semibold mb-2">{arrayData.name || 'No Name'}</h5>
                          <div className="flex justify-between text-sm text-gray-700 mb-2">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full">{arrayData.quantity} pcs</span>
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full">Size: {arrayData.option}</span>
                          </div>
                          <div className="text-green-600 font-bold text-lg">
                            ₹{arrayData.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }) : (
            <p className="text-center w-full text-xl mt-6">No orders found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
