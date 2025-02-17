import { Link } from 'react-router-dom';
import Logo from './assets/Logo@3x.png';
import styles from './styles.module.css';
export default function HeaderSimpleSp() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to={'/'}>
          <img src={Logo} alt="Pstore" width={100} className={styles.logo} />
        </Link>
      </div>
    </header>
  );
}
