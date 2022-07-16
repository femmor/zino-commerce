import { Link } from 'react-router-dom';
import registerImg from '../../assets/register.png';
import styles from './Auth.module.scss';
import Card from '../../components/card/Card';

const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button className="--btn --btn-primary --btn-block" type="submit">
              Register
            </button>
          </form>

          <span className={styles.register}>
            Already have an account?
            <Link
              to="/login"
              style={{
                marginLeft: '5px',
              }}
            >
              Login
            </Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="login" width={400} />
      </div>
    </section>
  );
};
export default Register;
