import clsx from 'clsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './assets/Logo@3x.png';
import { MenuButton } from './MenuButton';
import styles from './styles.module.css';
export default function HeaderSp() {
  const navigate = useNavigate();
  const [isShowInputSearch, setIsShowInputSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to={'/'}>
          <img src={Logo} alt="Pstore" width={100} className={styles.logo} />
        </Link>
        <div className={styles.wrapper}>
          <div
            className={clsx(
              styles.textBoxSearch,
              isShowInputSearch && styles.displayed
            )}
          >
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tìm kiếm"
              className={clsx(
                styles.inputSearch,
                isShowInputSearch && styles.displayed
              )}
            />
            <button
              onClick={() => {
                setIsShowInputSearch(!isShowInputSearch);
                if (inputValue) {
                  navigate('/search');
                }
              }}
              className={styles.searchIcon}
            ></button>
          </div>
          <MenuButton />
        </div>
      </div>
    </header>
  );
}
