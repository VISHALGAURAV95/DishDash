import About from "./Pages/About";
import Main from "./Pages/Main"
import MyCart from "./Components/MyCart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import { CartProvider } from "./Components/ComponentReducer";
import MyOrder from "./Pages/MyOrder";
function App() {
  

  return (
    <CartProvider>

    
    <Router>
       <div>
        <Routes>
          <Route  path="/" element={<Main/>}></Route>
          <Route path="/About" element={<About/>}></Route>
          <Route path="/Signup" element={<Signup/>}></Route>
          <Route path="/Signin" element={<Signin/>}></Route>
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/MyOrders" element={<MyOrder />} />
        </Routes>
       </div>
    </Router>
    </CartProvider>
  )
}

export default App
