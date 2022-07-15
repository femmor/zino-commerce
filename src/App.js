import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import OrderHistory from './pages/orderHistory/OrderHistory';
import Contact from './pages/contact/Contact';
import Cart from './pages/cart/Cart';
import NotFound from './pages/not-found/NotFound';

// Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
