import { isMobile } from 'react-device-detect';
import { RegisterPc } from "./pc"
import { RegisterSp } from "./sp"

function Register() {
  return <>{isMobile ? <RegisterSp /> : <RegisterPc />}</>;
}

export default Register;
