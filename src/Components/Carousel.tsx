import React, { useState, useEffect } from 'react';

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      img: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Delicious Salads"
    },
    {
      img: "https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=600",
      caption: "Tasty Burgers"
    },
    {
      img: "https://images.pexels.com/photos/18803177/pexels-photo-18803177/free-photo-of-plate-with-greasy-momos-dumplings.jpeg?auto=compress&cs=tinysrgb&w=600",
      caption: "Savory Dumplings"
    },
    {
      img: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=600",
      caption: "Fresh Pasta"
    },
    {
      img: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600",
      caption: "Delicious Desserts"
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          {items.map((item, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{
                zIndex: index === activeIndex ? 1 : 0,
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="flex flex-col items-start justify-center h-full p-10 bg-black bg-opacity-50 text-white">
                <h1 className="text-4xl font-bold mb-4">Claim Best Offer on Fast Food & Restaurants</h1>
                <p className="text-xl mb-4">Our job is to fill your tummy with delicious food with fast and free delivery</p>
                <div className="flex space-x-4">
                  <button className="bg-red-500 text-white px-4 py-2 rounded">More than Faster</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-gray-900 bg-opacity-50 text-white rounded-full shadow-lg focus:outline-none"
          onClick={handlePrev}
        >
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-gray-900 bg-opacity-50 text-white rounded-full shadow-lg focus:outline-none"
          onClick={handleNext}
        >
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
