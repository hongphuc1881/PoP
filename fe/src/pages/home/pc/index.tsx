import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export const HomePc = () => {
  return (
    <div className={styles.module}>
      <h1>Hello ae</h1>
      <Link to={'/register'}>register</Link>
      <Link to={'/login'}>login</Link>
    </div>
  );
};
