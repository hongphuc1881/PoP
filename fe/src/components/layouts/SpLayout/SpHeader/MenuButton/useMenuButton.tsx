import { useState } from 'react';

export default function useMenuButton() {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const onToggleMenu = () => {
    if (isShowMenu) {
      document.body.style.overflowY = 'auto';
    } else {
      document.body.style.overflowY = 'hidden';
    }
    setIsShowMenu(!isShowMenu);
  };

  return { isShowMenu, onToggleMenu };
}
