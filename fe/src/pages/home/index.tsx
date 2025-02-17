import { isMobile } from 'react-device-detect';
import { useLoginState } from '../../providers/LoginStateProvider';
import { HomePc } from './pc';
import { HomeSp } from './sp';

function Home() {
  const { isLogin } = useLoginState();

  console.log(isLogin);

  return <>{isMobile ? <HomeSp /> : <HomePc />}</>;
}

export default Home;
