import { useEffect } from 'react';

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    // Поддержка как одного рефа, так и массива рефов
    const refs = Array.isArray(ref) ? ref : [ref];

    // Проверяем, что все рефы существуют
    if (!refs.every(r => r)) {return;}

    const handleClickOutside = (event) => {
      // учитываем порталы и Shadow DOM
      const path = event.composedPath ? event.composedPath() : [];

      // Проверяем каждый реф в массиве
      for (const refItem of refs) {
        if (!refItem.current) {continue;}

        // Основная проверка через contains
        if (refItem.current.contains(event.target)) {
          return;
        }

        // Дополнительная проверка через composedPath
        if (path.includes(refItem.current)) {
          return;
        }
      }

      // Если клик не попал ни в один из рефов, вызываем handler
      handler(event);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};
