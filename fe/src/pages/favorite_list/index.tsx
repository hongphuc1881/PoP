import { isMobile } from 'react-device-detect';
import { FavoriteListPc } from "./pc"
import { FavoriteListSp } from "./sp"

function FavoriteList() {
  return <>{isMobile ? <FavoriteListSp /> : <FavoriteListPc />}</>;
}

export default FavoriteList;
