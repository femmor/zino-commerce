import { Link } from 'react-router-dom';
import loginImg from '../../assets/login.png';
import styles from './Auth.module.scss';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="login" width={400} />
      </div>
      <div className={styles.form}>
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
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
    </section>
  );
};
export default Login;
