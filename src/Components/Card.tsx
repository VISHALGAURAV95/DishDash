// Card.tsx
import React, { useState } from "react";
import { useDispatchCart } from "./ComponentReducer"; // Adjust path as needed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CardProps {
  item: {
    _id: string;
    name: string;
    image: string;
    description: string;
    options: { half: string; full: string }[];
  };
}

const Card: React.FC<CardProps> = ({ item }) => {
  const [selectedOption, setSelectedOption] = useState<"half" | "full">("half");
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatchCart();

  // Calculate total price based on selected options and quantity
  const calculateTotalPrice = (): number => {
    const price = parseFloat(item.options[0][selectedOption]) || 0;
    return price * quantity;
  };

  // Add item to cart using dispatch
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM", // Use ADD_ITEM if that is the correct type
      payload: {
        id: item._id,
        name: item.name,
        image: item.image,
        option: selectedOption,
        quantity,
        price: parseFloat(item.options[0][selectedOption]),
      },
    });
    toast.success("Item added to cart!", {
      position:"bottom-right",
      autoClose: 3000, // Duration in milliseconds
    });
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-inherit dark:border-gray-700 m-4">
      <img className="rounded-t-lg w-full h-48 object-cover" src={item.image} alt={item.name} />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-orange-600">
          {item.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
        <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start space-y-2 sm:space-y-0">
          <select
            className="m-2 p-2 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="m-2 p-2 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value as "half" | "full")}
          >
            <option value="half">half</option>
            <option value="full">full</option>
          </select>
          <div className="inline font-normal text-gray-700 dark:text-gray-400">
            Total Price:{" "}
            <span className="font-bold dark:text-green-400">₹{calculateTotalPrice()}/-</span>
            <hr />
            <br />
            <button className="mt-2 bg-orange-400 dark:text-white" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
