import { embedProject } from '@stackblitz/sdk';
import { getDependencies } from './getDependencies';

// Создаем проект и получаем VM
export const createVM = async ({
  containerId,
  projectId,
  files,
  setError,
  setIsReady,
}) => {
  try {
    console.log('[createVM] ——— START CREATE VM ——— ');

    const initIframeWrapperId = 'stackblitz-wrapper';
    let initIframeWrapper = document.getElementById(initIframeWrapperId);
    if (!initIframeWrapper) {
      initIframeWrapper = document.createElement('div');
      initIframeWrapper.id = initIframeWrapperId;
      initIframeWrapper.style.visibility = 'hidden';
      initIframeWrapper.style.position = 'absolute';
      initIframeWrapper.style.overflow = 'hidden';
      initIframeWrapper.style.width = '0px';
      initIframeWrapper.style.height = '0px';
      document.body.appendChild(initIframeWrapper);
    }
    const initIframeId = containerId;
    let initIframe = document.getElementById(initIframeId);
    if (!initIframe) {
      initIframe = document.createElement('iframe');
      initIframe.id = initIframeId;
      initIframe.sandbox = 'allow-scripts allow-same-origin';
      initIframeWrapper.appendChild(initIframe);
    }

    const embedOptions = {
      openFile: 'src/App.tsx',
      // hideExplorer: false,
      // hideNavigation: false,
      view: 'editor',
    };

    // const vm = await sdk.embedProjectId(initIframeId, projectId, embedOptions);

    const { embedGithubProject } = await import('@stackblitz/sdk');
    const vm = await embedGithubProject(initIframeId, 'GraphicDigger/ude-test', embedOptions);

    console.log('[createVM] VM created:', vm);

    if (!vm) {
      console.log('[createVM] VM не была инициализирована');
      throw new Error('VM не была инициализирована');
    }

    // await vm.applyFsDiff({
    //   create: {
    //     'hello.txt': 'Hello, this is a new file!',
    //     ...files
    //   },
    //   destroy: []
    // });

    setIsReady(true);
    console.log('[createVM] VM готова');

    return { vm };

  } catch (error) {
    console.error('[createVM] Error:', error);
    const errorMessage = error.message || 'Неизвестная ошибка при создании проекта';
    setError(errorMessage);
    return null;
  }
};

