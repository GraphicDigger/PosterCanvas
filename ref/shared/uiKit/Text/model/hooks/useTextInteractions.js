

//Хук для управления взаимодействиями с текстовым компонентом

export const useTextInteractions = ({
  editable,
  singleClickEdit,
  handleStartEdit,
}) => {
  // Обработчик двойного клика для активации режима редактирования
  const handleDoubleClick = !singleClickEdit ? handleStartEdit : undefined;

  // Обработчик одиночного клика для режима одиночного клика
  const handleClick = (e) => {
    // Активируем редактирование только если включен режим одиночного клика
    if (editable && singleClickEdit) {
      handleStartEdit();
      e.preventDefault(); // Предотвращаем дальнейшую обработку события
    }
  };

  // Подсказка для пользователя в зависимости от режима редактирования
  const editTitle = editable ? (singleClickEdit ? 'Click to edit' : 'Double-click to edit') : undefined;

  return {
    handleDoubleClick,
    handleClick,
    editTitle,
  };
};
