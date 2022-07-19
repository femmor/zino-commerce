import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/features/authSlice';

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? children : null;
};

const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return !isLoggedIn ? children : null;
};

export { ShowOnLogin, ShowOnLogout };
