import { embedProject } from '@stackblitz/sdk';
import { getDependencies } from './getDependencies';

export const getVM = async ({
  files,
  codes,
  container,
  setError,
  setIsReady,
}) => {
  try {
    console.log('[getVM] ——— START GET VM ——— ');

    if (!files) {
      console.error('[getVM] No files available');
      setError('Нет файлов для загрузки в StackBlitz');
      return null;
    }

    if (!files || Object.keys(files).length === 0) {
      console.error('[getVM] No project files prepared');
      setError('Не удалось подготовить файлы для StackBlitz');
      return null;
    }

    console.log('[getVM] Files prepared:', files);

    try {
      const vm = await embedProject(container, {
        title: 'Component Editor',
        description: 'Code editor and preview for component',
        template: 'create-react-app',
        files: files,
        settings: {
          builderType: 'webpack',
          devToolsHeight: 0,
          showSidebar: false,
          showDevTools: false,
        },
        dependencies: {
          'react': '^18.2.0',
          'react-dom': '^18.2.0',
          ...getDependencies(codes),
        },
      });
      console.log('[getVM] VM created:', vm);
      setIsReady(true);
      return vm;

    } catch (embedError) {
      console.error('[getVM] Error embedding project:', embedError);
      let errorMessage = embedError.message || 'Неизвестная ошибка при встраивании StackBlitz';
      console.log('[getVM] Error message:', errorMessage);

      if (embedError.stack) {
        console.error('[getVM] Error stack:', embedError.stack);
      }

      if (errorMessage.includes('cross-origin') || errorMessage.includes('CORS')) {
        errorMessage = 'Ошибка кросс-доменной политики. Убедитесь, что страница загружена по HTTPS.';
      }

      setError(errorMessage);
      return null;
    }
  } catch (err) {
    const errorMessage = err.message || 'Ошибка при инициализации StackBlitz';
    console.error('[getVM] Global error:', err);
    setError(errorMessage);
    return null;
  }
};
