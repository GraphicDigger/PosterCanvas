
//Обрабатывает метаданные из JSDoc комментариев
export const processMetadata = (prop) => {
  if (!prop) {return prop;}

  // Копируем свойство, чтобы не менять исходный объект
  const result = { ...prop };

  // Извлекаем метаданные из тегов
  if (result.tags) {
    // Обрабатываем тип
    if (result.tags.type && !result.type) {
      result.type = { name: result.tags.type };
    }

    // Обрабатываем typeDetails
    if (result.tags.typeDetails && result.type) {
      result.type.raw = result.tags.typeDetails;
    }

    // Обрабатываем значение по умолчанию
    if ((result.tags.default || result.tags.defaultValue) && !result.defaultValue) {
      result.defaultValue = {
        value: result.tags.default || result.tags.defaultValue,
      };
    }

    // Обрабатываем required
    if (result.tags.required && result.tags.required.toLowerCase() === 'true') {
      result.required = true;
    }
  }

  return result;
};
