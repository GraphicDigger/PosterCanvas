import { buttonPropsMetadata } from './ui/Button/Button.types';
import { MuiButton } from './ui/Button';
import { MuiCard } from './ui/Card';
import { CleanButton } from './ui/CleanButton/CleanButton';


export const muiComponents = [
  {
    id: 'clearbutton',
    name: 'ClearButton',
    component: CleanButton,
    importPath: '/src/shared/uiMui/ui/CleanButton/CleanButton.tsx',
  },
  {
    id: 'card',
    name: 'Card',
    importPath: '/src/shared/uiMui/ui/Card/Card.jsx',
    component: MuiCard,
  },
  {
    id: 'zod-type-button',
    name: 'ZodButton',
    component: MuiButton,
    importPath: '/src/shared/uiMui/ui/Button/Button.tsx',
    props: buttonPropsMetadata,
  },

];
