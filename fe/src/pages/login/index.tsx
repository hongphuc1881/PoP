import { isMobile } from 'react-device-detect';
import { LoginPc } from "./pc"
import { LoginSp } from "./sp"

function Login() {
  return <>{isMobile ? <LoginSp /> : <LoginPc />}</>;
}

export default Login;
