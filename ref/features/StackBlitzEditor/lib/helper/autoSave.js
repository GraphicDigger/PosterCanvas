import { debounce } from '../../lib';

export const autoSave = (updateCode) => {
  return debounce(async (newCode) => {
    try {
      await updateCode(newCode);
      console.log('[StackBlitzEditor] Код автоматически сохранен');
    } catch (err) {
      console.error('[StackBlitzEditor] Ошибка автосохранения:', err);
    }
  }, 1000);
};
