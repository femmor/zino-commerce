import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import { Home, Admin, OrderHistory, Contact, Cart, NotFound } from './pages';

// Components
import { Header, Footer } from './components';

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
