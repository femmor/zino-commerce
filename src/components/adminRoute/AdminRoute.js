import { useSelector } from 'react-redux';
import { selectEmail } from '../../store/features/authSlice';

const AdminRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  return userEmail === 'test@gmail.com' ? children : null;
};
export default AdminRoute;
