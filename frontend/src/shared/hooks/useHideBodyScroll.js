import { useEffect } from 'react';

const useHideBodyScroll = (isVisible) => {
  useEffect(() => {
    if (isVisible) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'scroll';
  }, [isVisible]);
};

export default useHideBodyScroll;
