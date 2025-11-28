import { SxProps, Theme } from '@mui/material/styles';

/**
 * Интерфейс пропсов для кнопки
 * @metadata
 * component: Button
 * category: UI
 */
export interface IButtonProps {
  /**
   * Вариант отображения кнопки
   * @metadata
   * type: enum
   * defaultValue: contained
   */
  variant?: 'text' | 'outlined' | 'contained';

  /**
   * Цвет кнопки
   * @metadata
   * type: enum
   * default: primary
   */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

  /**
   * Размер кнопки
   * @metadata
   * type: enum
   * default: medium
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Отключена ли кнопка
   * @metadata
   * type: boolean
   * default: false
   */
  disabled?: boolean;

  /**
   * Растянуть кнопку на всю ширину
   * @metadata
   * type: boolean
   * default: false
   */
  fullWidth?: boolean;

  /**
   * Содержимое кнопки
   * @metadata
   * type: node
   * default: Click Me
   */
  children?: React.ReactNode;

  /**
   * Иконка в начале кнопки
   * @metadata
   * type: node
   * required: false
   */
  startIcon?: React.ReactNode;

  /**
   * Иконка в конце кнопки
   * @metadata
   * type: node
   * required: false
   */
  endIcon?: React.ReactNode;

  /**
   * Обработчик клика
   * @metadata
   * type: function
   * signature: (event: React.MouseEvent<HTMLButtonElement>) => void
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * CSS класс
   * @metadata
   * type: string
   */
  className?: string;

  /**
   * MUI System стили
   * @metadata
   * type: object
   * typeDetails: SxProps<Theme>
   */
  sx?: SxProps<Theme>;
}
