import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import {
  Home,
  Admin,
  OrderHistory,
  Contact,
  Cart,
  NotFound,
  Login,
  Register,
  ResetPassword,
} from './pages';

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
