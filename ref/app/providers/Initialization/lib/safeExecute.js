// Обёртка для безопасного выполнения запроса с обработкой ошибок
export const safeExecute = async (fetchFunction, name) => {
  try {
    return await fetchFunction();
  } catch (err) {
    console.warn(`Error fetching ${name}:`, err);
    return null;
  }
};
