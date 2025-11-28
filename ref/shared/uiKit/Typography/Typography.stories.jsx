import { Typography } from './Typography';

export default {
  title: 'Shared/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'body.xxsmall',
        'body.xsmall',
        'body.small',
        'body.medium',
        'heading.small',
        'heading.medium',
      ],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'disabled', 'link', 'success', 'warning', 'error'],
    },
    weight: {
      control: 'select',
      options: ['medium', 'semibold', 'bold'],
    },
    component: {
      control: 'select',
      options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'],
    },
    size: {
      control: 'text',
    },
    lineHeight: {
      control: 'text',
    },
  },
};

// Базовая история
export const Default = {
  args: {
    children: 'Builder Custom Size',
    variant: 'body.xsmall',
    color: 'primary',
  },
};

// Все варианты размеров
export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="body.xxsmall">Body XX Small</Typography>
      <Typography variant="body.xsmall">Body X Small</Typography>
      <Typography variant="body.small">Body Small</Typography>
      <Typography variant="body.medium">Body Medium</Typography>
      <Typography variant="body.large">Body Large</Typography>
      <Typography variant="heading.xsmall">Heading xSmall</Typography>
      <Typography variant="heading.small">Heading Small</Typography>
      <Typography variant="heading.medium">Heading Medium</Typography>
    </div>
  ),
};

// Все цвета
export const AllColors = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography color="primary">Primary - Основной цвет текста</Typography>
      <Typography color="secondary">Secondary - Вторичный цвет текста</Typography>
      <Typography color="disabled">Disabled - Отключенный текст</Typography>
      <Typography color="link">Link - Цвет ссылки</Typography>
      <Typography color="success">Success - Успешное действие</Typography>
      <Typography color="warning">Warning - Предупреждение</Typography>
      <Typography color="error">Error - Ошибка</Typography>
    </div>
  ),
};

// Различные веса шрифта
export const FontWeights = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography weight="medium">Medium Weight - Средний вес</Typography>
      <Typography weight="semibold">Semibold Weight - Полужирный</Typography>
      <Typography weight="bold">Bold Weight - Жирный</Typography>
      <Typography weight={400}>Custom Weight 400 - Кастомный вес</Typography>
      <Typography weight={700}>Custom Weight 700 - Кастомный вес</Typography>
    </div>
  ),
};

// Кастомные размеры
export const CustomSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography size="16px">Кастомный размер 16px</Typography>
      <Typography size={18}>Кастомный размер 18px (число)</Typography>
      <Typography size="1.2rem">Кастомный размер 1.2rem</Typography>
      <Typography lineHeight="120%">Кастомная высота строки 120%</Typography>
      <Typography lineHeight={150}>Кастомная высота строки 150%</Typography>
    </div>
  ),
};

// Комбинированные настройки
export const Combined = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography
        variant="heading.medium"
        color="primary"
        weight="bold"
        component="h1"
      >
                Заголовок страницы
      </Typography>

      <Typography
        variant="body.medium"
        color="secondary"
        size="16px"
        lineHeight="150%"
        component="p"
      >
                Это параграф с кастомными настройками размера и высоты строки.
                Текст будет более читаемым благодаря увеличенной высоте строки.
      </Typography>

      <Typography
        variant="body.small"
        color="link"
        weight="medium"
        component="a"
        href="#"
      >
                Ссылка с кастомными настройками
      </Typography>

      <Typography
        color="error"
        size="14px"
        weight="semibold"
      >
                Сообщение об ошибке
      </Typography>
    </div>
  ),
};

// Как заголовки
export const AsHeadings = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="heading.medium" component="h1" weight="bold">
                H1 - Главный заголовок
      </Typography>
      <Typography variant="heading.small" component="h2" weight="semibold">
                H2 - Второстепенный заголовок
      </Typography>
      <Typography variant="body.medium" component="h3" weight="medium">
                H3 - Заголовок третьего уровня
      </Typography>
      <Typography variant="body.small" component="h4">
                H4 - Заголовок четвертого уровня
      </Typography>
    </div>
  ),
};
