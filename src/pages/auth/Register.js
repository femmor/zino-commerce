import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link } from 'react-router-dom';
import registerImg from '../../assets/register.png';
import styles from './Auth.module.scss';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = e => {
    e.preventDefault();

    if (password !== cPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success('User created successfully.');
        navigate('/login');
      })
      .catch(error => {
        toast.error('Error: ' + error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
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
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={e => setCPassword(e.target.value)}
              />
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
    </>
  );
};
export default Register;
