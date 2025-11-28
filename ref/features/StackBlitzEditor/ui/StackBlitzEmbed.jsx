/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import sdk from '@stackblitz/sdk';
import { useStackBlitzPreview } from '../model';
// Опционально: если нужно обновлять глобальное состояние VM/ошибок
// import { useStackBlitzState } from '../model/hooks/useStackBlitzState';

const REPO_SLUG = 'GraphicDigger/ude-test';
// const REPO_SLUG = 'GraphicDigger/testStackblitz';

// ID для div, который рендерит React как точку монтирования
const REACT_PLACEHOLDER_ID = 'stackblitz-react-placeholder';
// ID для div, который мы создаем программно ДЛЯ SDK
const SDK_TARGET_ID = 'stackblitz-sdk-target';


export const StackBlitzEmbed = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const vmRef = useRef(null);
  const sdkContainerCreated = useRef(false);

  const { setElement, handleError } = useStackBlitzPreview();
  const [elementInfo, setElementInfo] = useState(null);

  useEffect(() => {

    if (sdkContainerCreated.current) {
      return;
    }


    const placeholderElement = document.getElementById(REACT_PLACEHOLDER_ID);

    if (placeholderElement) {
      const sdkTargetElement = document.createElement('div');
      sdkTargetElement.id = SDK_TARGET_ID;
      sdkTargetElement.style.position = 'absolute';
      sdkTargetElement.style.top = '0';
      sdkTargetElement.style.left = '0';
      sdkTargetElement.style.width = '100%';
      sdkTargetElement.style.height = '100%';
      placeholderElement.appendChild(sdkTargetElement);
      sdkContainerCreated.current = true; // Отмечаем, что создали

      setIsLoading(true);
      setError(null);
      // setGlobalError(null);
      console.log(`[StackBlitzEmbed] SDK target div "${SDK_TARGET_ID}" создан, начинаем встраивание...`);

      const embedOptions = {
        openFile: 'src/App.tsx',
        height: '100%',
        // view: 'editor',
        // hideExplorer: true,
        hideDevTools: true,
        showSidebar: false,
        terminalHeight: 0,
      };

      sdk.embedGithubProject(SDK_TARGET_ID, REPO_SLUG, embedOptions)
      // sdk.embedProjectId(SDK_TARGET_ID, 'ude-frontend', embedOptions)
        .then(vm => {
          console.log('[StackBlitzEmbed] VM получена:', vm);
          vmRef.current = vm;
          // setVM(vm);
          // setIsReady(true);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('[StackBlitzEmbed] Ошибка встраивания:', err);
          console.log(err.message);
          setError(err.message || 'Не удалось встроить проект StackBlitz');
          setIsLoading(false);
          // setGlobalError(message);
          // setIsReady(false);
        });

    } else {
      console.error(`[StackBlitzEmbed] Не найден React placeholder div (ID: ${REACT_PLACEHOLDER_ID}) при монтировании.`);
      setError(`Не найден placeholder для встраивания (ID: ${REACT_PLACEHOLDER_ID}).`);
      setIsLoading(false);
    }

    // Функция очистки для удаления программно созданного div при размонтировании
    return () => {
      const sdkElement = document.getElementById(SDK_TARGET_ID);
      if (sdkElement && sdkElement.parentElement === placeholderElement) {
        console.log(`[StackBlitzEmbed] Очистка SDK target div "${SDK_TARGET_ID}"`);
        // Здесь можно добавить vm.destroy(), если SDK поддерживает
        sdkElement.remove();
        sdkContainerCreated.current = false; // Сбрасываем флаг
      }
    };

  }, []);


  useEffect(() => {
    const handleMessageFromIframe = (event) => {
      if (!event.data || !event.data.type) {
        console.log('no event.data or event.data.type');
        return;
      }

      console.log('event.data.type', event.data.type);

      // Временно отключим проверку origin для отладки
      // if (previewOrigin && event.origin !== previewOrigin) {
      //    console.warn(`[CodeEditor] Сообщение от недоверенного источника ${event.origin}, ожидался ${previewOrigin}`);
      // }

      const { type, payload } = event.data;

      // Стили для разных типов сообщений в консоли
      const logStyles = {
        'ELEMENT_CLICKED_INSIDE': 'background-color: #4CAF50; color: white; padding: 2px 6px; border-radius: 2px;',
        'IFRAME_READY': 'background-color: #2196F3; color: white; padding: 2px 6px; border-radius: 2px;',
        'ERROR': 'background-color: #F44336; color: white; padding: 2px 6px; border-radius: 2px;',
      };

      const logStyle = logStyles[type] || 'background-color: #9E9E9E; color: white; padding: 2px 6px; border-radius: 2px;';
      console.log(`%c[${type}]`, logStyle, payload);

      switch (type) {
      case 'ELEMENT_CLICKED_INSIDE':
        if (payload) {
          // Подробное логирование данных о выбранном элементе
          console.group('%c🎯 Элемент выбран', 'font-weight: bold; color: #4CAF50');
          console.log('ID:', payload.id || '(отсутствует)');
          console.log('Тег:', payload.tagName);
          console.log('Класс:', payload.className || '(отсутствует)');
          console.log('Текст:', payload.textContent || '(пусто)');

          if (payload.metrics) {
            console.group('Размеры и позиция:');
            const size = payload.metrics.size || {};
            const position = payload.metrics.position || {};
            console.table({
              'Ширина': `${size.width || 0}px`,
              'Высота': `${size.height || 0}px`,
              'X': `${position.left || 0}px`,
              'Y': `${position.top || 0}px`,
            });
            console.groupEnd();

            if (payload.metrics.computed) {
              console.group('Стили:');
              console.table(payload.metrics.computed);
              console.groupEnd();
            }

            if (payload.metrics.attributes) {
              console.group('Атрибуты:');
              console.table(payload.metrics.attributes);
              console.groupEnd();
            }
          }
          console.groupEnd();

          setElementInfo(payload);

          // Передаем полные данные об элементе в метод setElement
          setElement({
            id: payload.id,
            tagName: payload.tagName,
            className: payload.className,
            textContent: payload.textContent,
            metrics: payload.metrics,
          });
        }
        break;

      case 'IFRAME_READY':
        console.log('%c✅ Iframe готов к использованию', 'color: #2196F3; font-weight: bold');
        break;

      case 'ERROR':
        console.error('%c❌ Ошибка в iframe:', 'color: #F44336; font-weight: bold', payload);
        handleError && handleError(payload?.message || 'Неизвестная ошибка в iframe');
        break;

      default:
        console.log(`Получено неизвестное сообщение типа: ${type}`);
        break;
      }
    };


    window.addEventListener('message', handleMessageFromIframe);
    console.log('[CodeEditor] Слушатель postMessage добавлен.');

    return () => {
      window.removeEventListener('message', handleMessageFromIframe);
      console.log('[CodeEditor] Слушатель postMessage удален.');
    };
  }, [setElement, handleError]);


  return (
    <>
      {/* <div style={{
            width: '100%',
            height: '100%', // Или передавать как проп
            position: 'relative',
            backgroundColor: '#f8f8f8' // Фон области
        }}> */}
      <div
        id={REACT_PLACEHOLDER_ID}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      />


      {/* {isLoading && (
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    zIndex: 3 // Самый высокий
                }}>
                    Загрузка редактора StackBlitz...
                </div>
            )}
            {!isLoading && error && (
                <div style={{
                    position: 'absolute',
                    top: '10px', left: '10px', right: '10px',
                    padding: '10px',
                    color: 'red',
                    backgroundColor: 'rgba(255, 200, 200, 0.9)',
                    border: '1px solid red',
                    borderRadius: '4px',
                    zIndex: 2 // Под загрузчиком, над плейсхолдером
                }}>
                    Ошибка загрузки StackBlitz: {error}
                </div>
            )} */}

      {/* </div> */}
      <span> {elementInfo?.id} xcsdcsd</span>
    </>
  );
};
