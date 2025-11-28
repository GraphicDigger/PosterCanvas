import { processMetadata } from '../utils';

//Обрабатывает JSDoc комментарии для извлечения метаданных
export const processJSDocComments = (docgenInfo) => {
  if (!docgenInfo) {return null;}

  // Копируем объект, чтобы не менять исходный
  const processedInfo = { ...docgenInfo };

  // Обрабатываем свойства компонента
  if (processedInfo.props) {
    Object.keys(processedInfo.props).forEach(propName => {
      processedInfo.props[propName] = processMetadata(processedInfo.props[propName]);
    });
  }

  return processedInfo;
};
