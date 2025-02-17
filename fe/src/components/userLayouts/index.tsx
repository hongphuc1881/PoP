import { isMobile } from 'react-device-detect';
import { Outlet } from 'react-router-dom';
import { PcUserLayout } from './PcUserLayout';
import { SpUserLayout } from './SpUserLayout';
import styles from './styles.module.css';

export default function UserLayout() {
  return (
    <>
      <section className={styles.module}>
        {isMobile ? (
          <>
            <SpUserLayout />
          </>
        ) : (
          <>
            <PcUserLayout />
          </>
        )}
        <div className={styles.main}>
          <Outlet />
        </div>
      </section>
    </>
  );
}
