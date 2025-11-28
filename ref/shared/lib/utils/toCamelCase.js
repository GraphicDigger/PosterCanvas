/**
 * Преобразует строку (с пробелами, дефисами, в PascalCase или snake_case) в camelCase.
 * Примеры:
 * "Multistyle Text" -> "multistyleText"
 * "MultistyleText" -> "multistyleText"
 * "Multistyle-Text" -> "multistyleText"
 * "multistyle-text" -> "multistyleText"
 * "multistyle_text" -> "multistyleText"
 * "Text" -> "text"
 * "JSON" -> "json" // Преобразует акронимы в lowercase
 *
 * @param {string} str Входная строка.
 * @returns {string} Строка в формате camelCase.
 */
export const toCamelCase = (str) => {
  if (!str) {
    return '';
  }

  // Удаляем все знаки препинания и специальные символы, оставляем только буквы, цифры, пробелы, дефисы и подчеркивания
  const cleanedStr = str.replace(/[^\w\s-]/g, ' ');

  // Заменяем дефисы и подчеркивания на пробелы, чтобы разделить на слова
  const spacedStr = cleanedStr.replace(/[-_]+/g, ' ');

  // Удаляем начальные/конечные пробелы и разбиваем по пробелам или переходам на camelCase (e.g., PascalCase -> Pascal Case)
  // Обрабатываем переходы от строчных к заглавным буквам и от заглавных к строчным
  const words = spacedStr
    .replace(/([a-z])([A-Z])/g, '$1 $2') // multistyleText -> multistyle Text
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // XMLParser -> XML Parser
    .trim()
    .toLowerCase() // Приводим все к нижнему регистру перед разбивкой
    .split(/\s+/)
    .filter(word => word.length > 0); // Убираем пустые строки

  if (words.length === 0 || words[0] === '') {
    return '';
  }

  // Преобразуем слова: первое слово как есть (уже lowercase), остальные - capitalize
  return words
    .map((word, index) => {
      if (index === 0) {
        return word; // Первое слово уже в lowercase
      }
      // Остальные слова: первая буква заглавная, остальные строчные
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(''); // Соединяем без пробелов
};

// Можно добавить сюда другие утилиты для работы со строками в будущем
