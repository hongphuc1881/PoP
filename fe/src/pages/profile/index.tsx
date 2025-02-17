import { isMobile } from 'react-device-detect';
import { ProfilePc } from "./pc"
import { ProfileSp } from "./sp"

function Profile() {
  return <>{isMobile ? <ProfileSp /> : <ProfilePc />}</>;
}

export default Profile;
