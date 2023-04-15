import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Form from "./components/Form";
import FindBooks from "./pages/FindBooks/FindBooks";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import About from "./pages/About/About";
import EmailVerify from "./components/EmailVerify";
import RecievedInfo from "./components/RecievedInfo";
import Opinion from "./components/Opinion";

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
      <Route path="/opinion/:book_id/:r_mail" element={<Opinion/>}/>
      <Route path="/recievedinfo/:book_id/:r_mail" element={<RecievedInfo/>}/>
      <Route path="/users/:email/verify/:token" element={<EmailVerify />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
