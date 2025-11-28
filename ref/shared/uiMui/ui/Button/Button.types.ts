import { SxProps, Theme } from '@mui/material/styles';
import { z } from 'zod';
import { generatePropsMetadata } from '../../lib/helpers/generatePropsMetadata';

const buttonVariants = ['text', 'outlined', 'contained'] as const;
const buttonColors = ['primary', 'secondary', 'success', 'error', 'info', 'warning'] as const;
const buttonSizes = ['small', 'medium', 'large'] as const;

// Определяем значения по умолчанию
const defaultValues = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  disabled: false,
  fullWidth: false,
  children: 'Click Me',
} as const;

// Описания для свойств Button
const propDescriptions = {
  variant: 'Вариант отображения кнопки',
  color: 'Цвет кнопки',
  size: 'Размер кнопки',
  disabled: 'Отключена ли кнопка',
  fullWidth: 'Растянуть кнопку на всю ширину',
  children: 'Содержимое кнопки',
  startIcon: 'Иконка в начале кнопки',
  endIcon: 'Иконка в конце кнопки',
  onClick: 'Обработчик клика',
  className: 'CSS класс',
  sx: 'MUI System стили',
};

// Определяем схему Button
export const buttonSchema = z.object({
  variant: z.enum(buttonVariants).optional().default(defaultValues.variant),
  color: z.enum(buttonColors).optional().default(defaultValues.color),
  size: z.enum(buttonSizes).optional().default(defaultValues.size),
  disabled: z.boolean().optional().default(defaultValues.disabled),
  fullWidth: z.boolean().optional().default(defaultValues.fullWidth),
  children: z.custom<React.ReactNode>().optional().default(defaultValues.children),
  startIcon: z.custom<React.ReactNode>().optional(),
  endIcon: z.custom<React.ReactNode>().optional(),
  onClick: z.function().args(z.custom<React.MouseEvent<HTMLButtonElement>>()).returns(z.void()).optional(),
  className: z.string().optional(),
  sx: z.custom<SxProps<Theme>>().optional(),
});

export type ButtonProps = z.infer<typeof buttonSchema>;

// Генерируем метаданные из схемы
export const buttonPropsMetadata = generatePropsMetadata(buttonSchema, {
  defaultValues,
  descriptions: propDescriptions,
  enumValues: {
    variant: buttonVariants,
    color: buttonColors,
    size: buttonSizes,
  },
});
