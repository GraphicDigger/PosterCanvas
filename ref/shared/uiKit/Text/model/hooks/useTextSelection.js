import { useEffect } from 'react';

//Хук для управления выделением текста в поле ввода
export const useTextSelection = ({
  inputRef,
  isEditing,
  shouldSelectAll,
  setShouldSelectAll,
}) => {
  // Эффект для выделения всего текста при входе в режим редактирования
  useEffect(() => {
    if (isEditing && shouldSelectAll && inputRef.current) {
      // Задержка для обеспечения фокусировки и рендеринга
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.select();
          setShouldSelectAll(false);
        }
      }, 0);
    }
  }, [isEditing, shouldSelectAll, inputRef, setShouldSelectAll]);
};
