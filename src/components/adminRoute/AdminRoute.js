import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../store/features/authSlice';
import { MdKeyboardBackspace } from 'react-icons/md';

const AdminRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  return userEmail === 'fegomson@gmail.com' ? (
    children
  ) : (
    <section
      style={{
        height: '80vh',
      }}
    >
      <div className="container">
        <h2>Permission denied.</h2>
        <p>You are not authorized to access this page.</p>
        <br />
        <Link to="/">
          <button className="--btn --btn-danger">
            <MdKeyboardBackspace /> Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
};
export default AdminRoute;

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  return userEmail === 'fegomson@gmail.com' ? children : null;
};
