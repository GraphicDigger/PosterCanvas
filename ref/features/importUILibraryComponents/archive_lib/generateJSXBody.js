import { generateStyles } from './generateJSXBodyStyles';
import { generateChildrenJSX } from './generateJSXBodyChildren';
import { generatePropAssignments } from './propAssignments';

// Генерирует тело компонента
export const generateComponentBody = (componentStructure) => {
  if (!componentStructure) {return '';}

  // Генерируем стили компонента, если нужно
  const useStyles = generateStyles(componentStructure);

  // Получаем пропсы компонента
  const propsArray = componentStructure.props || [];

  // Генерируем деструктуризацию пропсов
  const propsDestructuring = propsArray.length > 0
    ? `{ ${propsArray.map(p => p.name).join(', ')}, ...otherProps }`
    : 'props';

  const childrenJSX = generateChildrenJSX(componentStructure);

  const componentJSX = `
  const ${componentStructure.name}Wrapper = (${propsDestructuring}) => {
    ${useStyles ? 'const classes = useStyles();' : ''}
    
    return (
      <${componentStructure.name}
        ${generatePropAssignments(componentStructure.props)}
        {...otherProps}
      >
        ${childrenJSX}
      </${componentStructure.name}>
    );
  };
  `;

  return `${useStyles ? useStyles + '\n' : ''}${componentJSX}`;
};
