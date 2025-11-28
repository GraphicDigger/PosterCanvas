const senderScript = `
console.log('[Iframe Sender] Скрипт запущен.');

// Функция для отправки данных родителю
function sendParentMessage(type, payload) {
  // ВНИМАНИЕ: Замените '*' на origin вашей платформы ('https://localhost:3000' или домен) для безопасности!
  const targetOrigin = 'https://localhost:3000';
  console.log('[Iframe Sender] Отправка сообщения:', { type, payload, targetOrigin });
  // Убедимся, что window.parent существует
  if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type, payload }, targetOrigin);
  } else {
      console.warn('[Iframe Sender] window.parent недоступен.');
  }

}

// Обработчик клика
document.addEventListener('click', (e) => {
  const targetElement = e.target;
  // Проверяем, что кликнули не на body/html и есть какой-то идентификатор
  if (targetElement && targetElement.id && targetElement !== document.body && targetElement !== document.documentElement) {
    const rect = targetElement.getBoundingClientRect();
    const elementData = {
      id: targetElement.id,
      tagName: targetElement.tagName.toLowerCase(),
      metrics: { // Метрики относительно viewport iframe
         size: { width: rect.width, height: rect.height },
         position: { top: rect.top, left: rect.left, bottom: rect.bottom, right: rect.right }
       }
      // Можно добавить больше данных: data-атрибуты и т.д.
    };
    sendParentMessage('ELEMENT_CLICKED_INSIDE', elementData);
  }
}, true); // Используем capture фазу для перехвата

console.log('[Iframe Sender] Скрипт инициализирован и слушает события.');

        `;

export const baseCode = (openFile) => {

  return {
    'package.json': JSON.stringify({
      'name': 'react-cra-stackblitz-preview',
      'version': '0.1.0',
      'private': true,
      'dependencies': {
        '@testing-library/jest-dom': '^5.16.4',
        '@testing-library/react': '^13.3.0',
        '@testing-library/user-event': '^13.5.0',
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
        'react-router-dom': '^6.3.0',
        'react-scripts': '5.0.1',
        'web-vitals': '^2.1.4',
      },
      'scripts': {
        'start': 'react-scripts start',
        'build': 'react-scripts build',
        'test': 'react-scripts test',
        'eject': 'react-scripts eject',
      },
      'eslintConfig': {
        'extends': [
          'react-app',
          'react-app/jest',
        ],
      },
      'browserslist': {
        'production': [
          '>0.2%',
          'not dead',
          'not op_mini all',
        ],
        'development': [
          'last 1 chrome version',
          'last 1 firefox version',
          'last 1 safari version',
        ],
      },
    }, null, 2),

    'src/index.tsx': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element (#root) not found');
}
    `,

    'src/props.js': `// Auto-generated props file
export const componentProps = {
  // Props will be injected here at runtime
};
`,

    'src/App.tsx': `import React, { useEffect, useState } from 'react';
import { ${openFile} } from '../${openFile}';
import { componentProps, componentPropsObject } from './props';

// Функция для отправки данных родителю
const sendParentMessage = (type, payload) => {
  const targetOrigin = '*'; // В продакшне используйте конкретный origin
  console.log('[App] Отправка сообщения:', { type, payload });
  
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type, payload }, targetOrigin);
  } else {
    console.warn('[App] window.parent недоступен');
  }
};

// Получение вычисленных стилей элемента
const getComputedStyles = (element) => {
  if (!element) return {};
  
  try {
    const computed = window.getComputedStyle(element);
    return {
      display: computed.display,
      position: computed.position,
      width: computed.width,
      height: computed.height,
      color: computed.color,
      backgroundColor: computed.backgroundColor,
      fontSize: computed.fontSize,
      margin: computed.margin,
      padding: computed.padding
    };
  } catch (e) {
    console.error('[App] Ошибка при получении стилей:', e);
    return {};
  }
};

// Получение атрибутов элемента
const getAttributes = (element) => {
  const result = {};
  if (!element || !element.attributes) return result;
  
  try {
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      result[attr.name] = attr.value;
    }
    return result;
  } catch (e) {
    console.error('[App] Ошибка при получении атрибутов:', e);
    return result;
  }
};

// Получение информации об элементе
const getElementInfo = (element) => {
  if (!element) return null;
  
  try {
    const rect = element.getBoundingClientRect();
    return {
      id: element.id || null,
      tagName: element.tagName.toLowerCase(),
      className: element.className || '',
      textContent: element.textContent ? element.textContent.slice(0, 100) : '',
      metrics: {
        size: { 
          width: rect.width, 
          height: rect.height 
        },
        position: { 
          top: rect.top, 
          left: rect.left, 
          bottom: rect.bottom, 
          right: rect.right 
        },
        computed: getComputedStyles(element),
        attributes: getAttributes(element)
      }
    };
  } catch (e) {
    console.error('[App] Ошибка при получении информации об элементе:', e);
    return {
      error: e.message,
      tagName: element?.tagName?.toLowerCase() || 'unknown'
    };
  }
};

const App = () => {
  // Флаг загрузки компонента
  const [isLoaded, setIsLoaded] = useState(false);
  // Get the right props format for the component
  const propsToUse = componentPropsObject || componentProps;
  
  // При монтировании компонента
  useEffect(() => {
    console.log('[App] Компонент App смонтирован');
    console.log('[App] Available props:', propsToUse);
    
    // If we have componentPropsObject, we know it's from an array
    if (componentPropsObject) {
      console.log('[App] Using transformed props object');
    }
    
    // Сообщаем родителю, что iframe готов
    sendParentMessage('IFRAME_READY', { url: window.location.href });
    setIsLoaded(true);
    
    // Обработчик клика
    const handleClick = (e) => {
      const targetElement = e.target;
      
      // Показываем визуальный маркер клика
      const clickMarker = document.createElement('div');
      clickMarker.style.position = 'absolute';
      clickMarker.style.width = '10px';
      clickMarker.style.height = '10px';
      clickMarker.style.borderRadius = '50%';
      clickMarker.style.backgroundColor = 'red';
      clickMarker.style.top = \`\${e.clientY - 5}px\`;
      clickMarker.style.left = \`\${e.clientX - 5}px\`;
      clickMarker.style.zIndex = '9999';
      clickMarker.style.pointerEvents = 'none';
      document.body.appendChild(clickMarker);
      setTimeout(() => clickMarker.parentNode?.removeChild(clickMarker), 500);
      
      // Обрабатываем элемент только если это не body и не html
      if (targetElement && targetElement !== document.body && targetElement !== document.documentElement) {
        // Получаем информацию об элементе
        const elementData = getElementInfo(targetElement);
        console.log('[App] Клик по элементу:', elementData);
        
        // Подсвечиваем элемент на короткое время
        if (targetElement) {
          const originalOutline = targetElement.style.outline;
          targetElement.style.outline = '2px dashed red';
          setTimeout(() => {
            targetElement.style.outline = originalOutline;
          }, 1000);
        }
        
        // Отправляем информацию об элементе родителю
        sendParentMessage('ELEMENT_CLICKED_INSIDE', elementData);
      }
    };
    
    // Устанавливаем обработчик клика
    document.addEventListener('click', handleClick, true);
    
    // Очистка при размонтировании
    return () => {
      document.removeEventListener('click', handleClick, true);
      console.log('[App] Обработчик клика удален');
    };
  }, []);
  
  return (
    <div className="app-container">
      {isLoaded ? (
        <${openFile} {...propsToUse} />
      ) : (
        <div>Загрузка компонента...</div>
      )}
    </div>
  );
};

export default App;
`,

    'public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CRA Preview</title>
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
</body>
</html>
`,

  };
};
