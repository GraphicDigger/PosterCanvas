
// Функция для чтения исходного кода компонента через fetch
export const readComponentSource = async (componentPath) => {
  try {
    // Добавляем параметр ?raw для получения исходного кода
    const response = await fetch(`${componentPath}?raw`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const source = await response.text();

    return source;

  } catch (error) {
    console.error(`[readComponentSource] Ошибка при чтении файла ${componentPath}:`, error);
    console.error('Error details:', error.message);
    return null;
  }
};
