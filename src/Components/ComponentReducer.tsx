// ComponentReducer.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define item type
interface CartItem {
  id: string;
  name: string;
  image: string;
  option: string;
  quantity: number;
  price: number;
}

// Define action types
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: String } }
  | { type: "ADD_TO_CART"; payload: CartItem } // Include ADD_TO_CART if used
  | { type: "DROP"; payload: [] }; // Include ADD_TO_CART if used

// Define context types
type CartState = CartItem[];

interface CartProviderProps {
  children: ReactNode;
}

// Contexts for cart state and dispatch
const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | undefined>(undefined);

// Reducer function to manage cart state
const reducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
    case "ADD_TO_CART":
      // Handle ADD_ITEM and ADD_TO_CART similarly
      const existingItem = state.find(
        (item) => item.id === action.payload.id && item.option === action.payload.option
      );
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id && item.option === action.payload.option
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        return [...state, action.payload];
      }
    case "REMOVE_ITEM":
      return state.filter(
        (item) => !(item.id === action.payload.id )
      );
      case "DROP":
         return action.payload;
    default:
      throw new Error(`Unknown action type: ${(action as any).type}`);
  }
};

// Cart provider component to wrap your app
export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to use cart state and dispatch
export const useCart = (): CartState => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const useDispatchCart = (): React.Dispatch<CartAction> => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useDispatchCart must be used within a CartProvider");
  }
  return context;
};
