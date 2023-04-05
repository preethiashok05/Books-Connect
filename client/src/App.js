import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Form from "./components/Form";
import FindBooks from "./pages/FindBooks/FindBooks";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import About from "./pages/About/About";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route  path="/donate" element={< Form />} />
      <Route path="/books/:fields/:subfields" element={<FindBooks />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
