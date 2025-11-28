import { useState, useEffect } from 'react';

//Хук для управления состоянием редактирования текста
export const useTextEdit = ({
  initialContent,
  editable = false,
  autoFocus = false,
  onChange,
}) => {
  // Состояние редактирования
  const [isEditing, setIsEditing] = useState(editable && autoFocus);
  // Текущее содержимое
  const [content, setContent] = useState(initialContent);
  // Флаг для выделения текста при активации режима редактирования
  const [shouldSelectAll, setShouldSelectAll] = useState(false);

  // Синхронизация содержимого при изменении извне
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  // Обработчик для активации режима редактирования
  const handleStartEdit = () => {
    if (editable) {
      setIsEditing(true);
      setShouldSelectAll(true);
    }
  };

  // Обработчик для изменения содержимого
  const handleContentChange = (newValue) => {
    setContent(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Обработчик для завершения редактирования
  const handleFinishEdit = () => {
    setIsEditing(false);
  };

  // Обработчик для отмены изменений
  const handleCancelEdit = () => {
    setContent(initialContent);
    setIsEditing(false);
  };

  return {
    isEditing,
    content,
    shouldSelectAll,
    setShouldSelectAll,
    handleStartEdit,
    handleContentChange,
    handleFinishEdit,
    handleCancelEdit,
    setIsEditing,
  };
};
