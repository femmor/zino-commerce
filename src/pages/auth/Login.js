import { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../../assets/login.png';
import styles from './Auth.module.scss';
import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = e => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success('User logged in successfully.');
        navigate('/');
      })
      .catch(error => {
        setIsLoading(false);
        toast.error('Error: ' + error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width={400} />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Login
              </button>
              <div>
                <Link to="/reset-password">Forgot password?</Link>
              </div>
              <p>-- or --</p>
            </form>

            <button className="--btn --btn-danger --btn-block" type="submit">
              <FaGoogle
                color="#fff"
                style={{
                  marginRight: '5px',
                }}
              />
              Login with Google
            </button>
            <span className={styles.register}>
              Don't have an account?
              <Link
                to="/register"
                style={{
                  marginLeft: '5px',
                }}
              >
                Register
              </Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};
export default Login;
