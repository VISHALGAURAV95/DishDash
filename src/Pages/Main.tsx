// Main.tsx
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Carousel from '../Components/Carousel';
import CartPortal from '../Components/CardPortal'; // Import CartPortal
import Card from '../Components/Card';
interface FoodOption {
  half: string;
  full: string;
}

interface FoodItem {
  _id: string; // Change to string
  CategoryName: string;
  name: string;
  image: string;
  options: FoodOption[];
  description: string;
}

interface FoodCategory {
  CategoryName: string;
}

function Main() {
  const [food_items, setFoodItems] = useState<FoodItem[]>([]);
  const [food_category, setFoodCategory] = useState<FoodCategory[]>([]);
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const load_data = async () => {
    let response = await fetch('https://dishdash-backend-v9is.onrender.com/api/food_items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let data = await response.json();
    console.log(data[0]);
    setFoodItems(data[0]); // Assuming your backend sends { food_items: [...], food_category: [...] }
    setFoodCategory(data[1]);
    setFilteredItems(data[0]);
  };

  useEffect(() => {
    load_data();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = food_items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };
  
       
  return (
    <div className="bg-gradient-to-r from-orange-950 to-black text-orange-500 min-h-screen">
      <Navbar onSearch={handleSearch} onCartClick={handleCartToggle} /> {/* Pass the handler to Navbar */}
      <Carousel />
      {localStorage.getItem('token') ?
      <div className="flex flex-wrap justify-center items-center space-x-8 mt-8">
        {food_category.map((category) => (
          <div key={category.CategoryName} className="w-full px-4 mb-8">
            <h2 className="text-2xl font-bold mb-4">{category.CategoryName}</h2>
            <hr />
            <div className="flex flex-wrap justify-center space-x-4">
              {filteredItems
                .filter((item) => item.CategoryName === category.CategoryName)
                .map((item) => (
                  <Card key={item._id} item={item} />
                ))}
            </div>
          </div>
        ))}
      </div>
       :""}
      <Footer />

      <CartPortal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default Main;
