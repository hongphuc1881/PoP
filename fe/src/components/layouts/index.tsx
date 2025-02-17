import { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';
import FooterPc from './PcLayout/PcFooter';
import HeaderPc from './PcLayout/PcHeader';
import HeaderSimplePc from './PcLayout/PcHeaderSimple';
import FooterSp from './SpLayout/SpFooter';
import HeaderSp from './SpLayout/SpHeader';
import HeaderSimpleSp from './SpLayout/SpHeaderSimple';
import styles from './styles.module.css';
interface Props {
  children: ReactNode;
}
export default function MainLayout({ children }: Props) {
  const routesToCheck = ['/login', '/register'];

  const isLoginRoute = routesToCheck.includes(location.pathname);
  return (
    <div className={styles.layout}>
      {isMobile ? (
        <>
          {isLoginRoute ? <HeaderSimpleSp /> : <HeaderSp />}
          <main className={styles.mainSp}> {children}</main>
          <FooterSp />
        </>
      ) : (
        <>
          {isLoginRoute ? <HeaderSimplePc /> : <HeaderPc />}
          <main className={styles.mainPc}> {children}</main>
          <FooterPc />
        </>
      )}
    </div>
  );
}
