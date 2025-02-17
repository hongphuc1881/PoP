import { Link } from 'react-router-dom';
import Logo from './assets/Logo@3x.png';
import styles from './styles.module.css';

export default function HeaderSimplePc() {
  return (
    <header className={styles.module}>
      <div className={styles.wrapper}>
        <Link to={'/'}>
          <img src={Logo} alt="Pstore" width={130} />
        </Link>
      </div>
    </header>
  );
}
