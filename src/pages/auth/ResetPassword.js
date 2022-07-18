import { Link } from 'react-router-dom';
import resetImg from '../../assets/forgot.png';
import styles from './Auth.module.scss';
import Card from '../../components/card/Card';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const resetPassword = e => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success('Password reset email sent!.');
        navigate('/login');
      })
      .catch(error => {
        setIsLoading(false);
        toast.error('Error: ' + error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="reset" width={400} />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Reset Password
              </button>
              <div></div>
              <div className={styles.links}>
                <p>
                  <Link to="/login">Login</Link>
                </p>
                <p>
                  <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};
export default ResetPassword;
