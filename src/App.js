import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Shop, Contact, CartShop } from "./Pages";
import { Header, Footer, Menu, CartItem } from "./components";

function App() {
  return (
    <Router>
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/CartShop" element={<CartShop />} />
      </Routes>
      <CartItem/>
      <Footer />
    </Router>
  );
}

export default App;
