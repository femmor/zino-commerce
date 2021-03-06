import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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
import AdminRoute from './components/adminRoute/AdminRoute';

const App = () => {
  return (
    <Router>
      <ToastContainer />
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
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
