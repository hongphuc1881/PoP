import { isMobile } from 'react-device-detect';
import { AdminPc } from "./pc"
import { AdminSp } from "./sp"

function Admin() {
  return <>{isMobile ? <AdminSp /> : <AdminPc />}</>;
}

export default Admin;
