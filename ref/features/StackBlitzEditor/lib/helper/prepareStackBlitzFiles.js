import { ID_TO_PATH_MAP } from '../../model';
import { CODE_EXTENSIONS, CODE_TYPES } from '../../../../entities/code';

// Готовит файлы из нашей структуры данных для загрузки в StackBlitz
export const prepareStackBlitzFiles = async (files) => {
  if (!files) {
    console.error('[prepareStackBlitzFiles] Файлы не определены');
    return {};
  }

  const stackBlitzFiles = {}; // path: content
  const codesWithFilePaths = []; // object with filePath

  try {
    if (Array.isArray(files)) {
      files.forEach((file) => {
        const id = file.id;
        let filePath;

        // Определяем путь файла
        if (ID_TO_PATH_MAP[id]) {
          filePath = ID_TO_PATH_MAP[id];
        } else if (file.type) {
          filePath = getPathByCodeType(file);
        }

        if (filePath && file.content) {
          // Сохраняем файл для StackBlitz
          stackBlitzFiles[filePath] = file.content;

          // Создаем обновленный объект кода с путем
          codesWithFilePaths.push({
            ...file,
            filePath,
          });
        } else {
          console.warn(`[prepareStackBlitzFiles] Пропущен файл ${id} (${file.name || 'без имени'})`);
        }
      });
    }

    return {
      files: stackBlitzFiles,
      allCodesWithFilePaths: codesWithFilePaths,
    };
  } catch (error) {
    console.error('[prepareStackBlitzFiles] Ошибка при подготовке файлов:', error);
    return {
      files: {},
      allCodesWithFilePaths: [],
    };
  }
};

// Функция для генерации пути в StackBlitz на основе типа кода
const getPathByCodeType = (file) => {
  const { id, type, name, lang } = file;

  // Определяем расширение файла на основе языка или типа
  let extension = '';
  if (lang) {
    switch (lang.toLowerCase()) {
    case 'javascript':
    case 'js':
      extension = 'js';
      break;
    case 'jsx':
      extension = 'jsx';
      break;
    case 'typescript':
    case 'ts':
      extension = 'ts';
      break;
    case 'tsx':
      extension = 'tsx';
      break;
    case 'css':
      extension = 'css';
      break;
    case 'html':
      extension = 'html';
      break;
    case 'json':
      extension = 'json';
      break;
    case 'markdown':
    case 'md':
      extension = 'md';
      break;
    default:
      extension = 'txt';
    }
  } else {
    extension = 'js'; // По умолчанию JS
  }

  // Генерируем путь на основе типа кода
  switch (type) {
  case CODE_TYPES.SCREEN:
    return `src/screens/${name.replace(/\s+/g, '')}.${extension}`;
  case CODE_TYPES.COMPONENT:
    return `src/components/${name.replace(/\s+/g, '')}.${extension}`;
  case CODE_TYPES.COMPONENT_STYLE:
    return `src/components/${name.replace(/\s+/g, '')}.css`;
  case CODE_TYPES.CUSTOM:
    return `src/customCode/${name.replace(/\s+/g, '')}.${extension}`;
  case CODE_TYPES.CODEBASE:
    // Для кодбазы используем имя файла как путь, если он не содержит пробелов
    if (name && !name.includes(' ')) {
      return name;
    }
    return `src/${name.replace(/\s+/g, '')}.${extension}`;
  default:
    return `src/other/${id}.${extension}`;
  }
};
