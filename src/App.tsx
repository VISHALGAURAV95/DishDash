import About from "./Pages/About";
import Main from "./Pages/Main"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  

  return (
    <Router>
       <div>
        <Routes>
          <Route  path="/" element={<Main/>}></Route>
          <Route path="/About" element={<About/>}></Route>
        </Routes>
       </div>
    </Router>
  )
}

export default App
