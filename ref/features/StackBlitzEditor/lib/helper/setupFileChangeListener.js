//Настройка отслеживания изменений в редакторе StackBlitz

export const setupFileChangeListener = async (
  vm,
  openFile,
  saveCallback,
  checkInterval = 1000,
) => {

  if (!vm || !vm.editor) {return null;}

  try {
    // Открываем файл
    await vm.editor.setCurrentFile(openFile);

    // Создаем интервал для проверки изменений
    let lastContent = null;
    const interval = setInterval(async () => {
      try {
        const snapshot = await vm.getFsSnapshot();
        const currentContent = snapshot[openFile];

        if (currentContent && currentContent !== lastContent) {
          lastContent = currentContent;
          saveCallback(currentContent);
        }
      } catch (err) {
        console.error('[StackBlitzEditor] Ошибка при проверке изменений файла:', err);
      }
    }, checkInterval);

    // Возвращаем функцию очистки
    return () => clearInterval(interval);
  } catch (err) {
    console.error('[StackBlitzEditor] Ошибка при настройке отслеживания изменений:', err);
    return null;
  }
};
