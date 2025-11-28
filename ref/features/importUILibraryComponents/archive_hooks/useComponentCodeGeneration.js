import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useComponentMutation } from '../../../entities/uiComponent';
import { analyzeComponentStructure, buildComponentHierarchy, generateJSX } from '../lib';
import { useProps } from '../../../entities/prop';
import { useComponentStates } from '../../../entities/uiComponent';


// Хук для генерации кода компонента на основе его структуры
export const useComponentCodeGeneration = () => {
  // const [componentCode, setComponentCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { allProps } = useProps();
  const { updateComponent } = useComponentMutation();
  const { selectedComponents } = useComponentStates();

  const generateComponentCode = useCallback((component) => {
    if (!component) {return;}

    setLoading(true);
    setError(null);

    try {
      // 1. Анализируем структуру компонента
      const componentStructure = analyzeComponentStructure(component, component.propIds);
      // console.log('componentStructure: ', componentStructure);

      // 2. Строим иерархию компонента (если есть вложенные элементы)
      const hierarchy = buildComponentHierarchy(component);

      // 3. Генерируем JSX код компонента
      const jsxCode = generateJSX(hierarchy);

      // setComponentCode(jsxCode);

      // updateComponent({
      //   id: component.id,
      //   code: jsxCode
      // });

      return jsxCode;

    } catch (err) {
      console.error('Ошибка при генерации кода компонента:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [allProps, selectedComponents, updateComponent]);


  // Парсит код компонента обратно в модель
  // Может использоваться для обновления компонента после редактирования кода
  const parseComponentCode = useCallback((code, componentId) => {
    // Здесь будет логика для парсинга кода обратно в модель компонента
    // Можно использовать Babel или другие парсеры JSX
    console.log('Парсинг кода компонента', code, componentId);
    // Заглушка для демонстрации
    return true;
  }, []);

  return {
    loading,
    error,
    generateComponentCode,
    parseComponentCode,
  };
};
