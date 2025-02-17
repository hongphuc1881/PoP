import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { SideBarList } from './variables';
export const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.account}>Tài khoản của tôi</div>
      <ul className={styles.list}>
        {SideBarList.map((item) => (
          <li key={item.label} className={styles.item}>
            <Link to={item.url}> {item.label}</Link>
          </li>
        ))}
      </ul>
      <Link to={'/profile/purchase'} className={styles.order}>
        Đơn mua
      </Link>
    </div>
  );
};
