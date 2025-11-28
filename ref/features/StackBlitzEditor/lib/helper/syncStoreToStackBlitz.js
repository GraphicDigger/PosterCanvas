import { prepareStackBlitzFiles } from './prepareStackBlitzFiles';

/**
 * Синхронизирует изменения из Redux в StackBlitz
 * @param {Object} vm - StackBlitz VM
 * @param {Object} files - Карта файлов из Redux
 * @return {Promise<void>}
 */
export const syncStoreToStackBlitz = async (vm, files) => {
  if (!vm) {
    return;
  }

  try {
    const projectFiles = prepareStackBlitzFiles(files);

    // Обновляем файлы в StackBlitz
    for (const [path, content] of Object.entries(projectFiles)) {
      try {
        // Проверяем, поддерживает ли VM методы для работы с файлами
        if (vm.editor && typeof vm.editor.setFileContents === 'function') {
          await vm.editor.setFileContents(path, content);
        } else if (typeof vm.applyFsDiff === 'function') {
          // Альтернативный метод - применяем изменения в файловой системе
          await vm.applyFsDiff({
            create: {
              [path]: content,
            },
            destroy: [],
          });
        } else {
          console.warn('[syncToStackBlitz] No suitable method found to update files in StackBlitz');
        }
      } catch (err) {
        // Обработка ошибок при обновлении/создании файлов
        console.error(`[syncToStackBlitz] Error updating file ${path}:`, err);
      }
    }

    console.log('[syncToStackBlitz] Files synchronized from Redux to StackBlitz');
  } catch (err) {
    console.error('[syncToStackBlitz] Error during synchronization:', err);
  }
};
