# Chip Component

Компонент Chip представляет компактные элементы, которые отображают ввод, атрибут или действие.

## Возможности

- ✅ Два варианта отображения: `filled` и `outlined`
- ✅ Поддержка цветовых схем: `default`, `primary`, `secondary`, `error`, `info`, `success`, `warning`
- ✅ Два размера: `small` и `medium`
- ✅ Поддержка аватаров и иконок
- ✅ Кликабельные чипы с обработчиком `onClick`
- ✅ Удаляемые чипы с обработчиком `onDelete`
- ✅ Отключенное состояние
- ✅ Полная поддержка клавиатуры (Tab, Enter, Escape, Backspace, Delete)
- ✅ Accessibility (ARIA атрибуты)
- ✅ TypeScript поддержка

## Использование

### Базовое использование

```jsx
import { Chip } from '@/shared/uiKit/Chip';

// Простой чип
<Chip label="Простой чип" />

// Чип с контуром
<Chip label="Чип с контуром" variant="outlined" />
```

### Кликабельные чипы

```jsx
<Chip 
    label="Кликабельный чип" 
    onClick={() => console.log('Нажат!')} 
/>

// Или с флагом clickable
<Chip 
    label="Кликабельный чип" 
    clickable 
    onClick={() => console.log('Нажат!')} 
/>
```

### Удаляемые чипы

```jsx
const [chips, setChips] = useState(['Чип 1', 'Чип 2']);

<Chip 
    label="Удаляемый чип" 
    onDelete={() => setChips(chips.filter(chip => chip !== 'Чип 1'))} 
/>

// Или с флагом deletable
<Chip 
    label="Удаляемый чип" 
    deletable 
    onDelete={() => console.log('Удален!')} 
/>
```

### Чипы с аватарами

```jsx
import { Avatar } from '@/shared/uiKit/Avatar';

<Chip 
    avatar={<Avatar>M</Avatar>} 
    label="С аватаром" 
/>
```

### Чипы с иконками

```jsx
const MyIcon = () => <svg>...</svg>;

<Chip 
    icon={<MyIcon />} 
    label="С иконкой" 
/>
```

### Цветовые варианты

```jsx
<Chip label="Primary" color="primary" />
<Chip label="Success" color="success" />
<Chip label="Error" color="error" />
<Chip label="Warning" color="warning" />
```

### Размеры

```jsx
<Chip label="Маленький" size="small" />
<Chip label="Средний" size="medium" />
```

### Отключенные чипы

```jsx
<Chip label="Отключенный" disabled />
<Chip label="Отключенный с удалением" disabled onDelete={() => {}} />
```

## API

### Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `label` | `string` | - | Текст чипа |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Вариант отображения |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning'` | `'default'` | Цвет чипа |
| `size` | `'small' \| 'medium'` | `'medium'` | Размер чипа |
| `avatar` | `ReactNode` | - | Аватар для отображения |
| `icon` | `ReactNode` | - | Иконка для отображения |
| `deleteIcon` | `ReactNode` | - | Кастомная иконка удаления |
| `onClick` | `(event: MouseEvent) => void` | - | Обработчик клика |
| `onDelete` | `(event: MouseEvent) => void` | - | Обработчик удаления |
| `disabled` | `boolean` | `false` | Отключенное состояние |
| `clickable` | `boolean` | `false` | Кликабельный чип |
| `deletable` | `boolean` | `false` | Удаляемый чип |
| `children` | `ReactNode` | - | Дочерние элементы |
| `className` | `string` | - | CSS класс |

## Accessibility

Компонент полностью поддерживает accessibility:

- Автоматически устанавливает `role="button"` для кликабельных и удаляемых чипов
- Поддерживает навигацию с клавиатуры (Tab)
- Обрабатывает клавиши Backspace/Delete для удаления
- Обрабатывает клавишу Escape для снятия фокуса
- Поддерживает ARIA атрибуты

## Клавиатурные сокращения

- **Tab** - навигация между чипами
- **Enter** - активация кликабельного чипа
- **Backspace/Delete** - удаление удаляемого чипа
- **Escape** - снятие фокуса с чипа

## Примеры использования

### Массив чипов с удалением

```jsx
const ChipArray = () => {
    const [chips, setChips] = useState(['Angular', 'React', 'Vue.js']);

    const handleDelete = (chipToDelete) => {
        setChips(chips.filter(chip => chip !== chipToDelete));
    };

    return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {chips.map(chip => (
                <Chip
                    key={chip}
                    label={chip}
                    onDelete={() => handleDelete(chip)}
                />
            ))}
        </div>
    );
};
```

### Фильтры с чипами

```jsx
const FilterChips = () => {
    const [activeFilters, setActiveFilters] = useState([]);
    const filters = ['JavaScript', 'TypeScript', 'React', 'Vue.js'];

    const toggleFilter = (filter) => {
        setActiveFilters(prev => 
            prev.includes(filter) 
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filters.map(filter => (
                <Chip
                    key={filter}
                    label={filter}
                    color={activeFilters.includes(filter) ? 'primary' : 'default'}
                    onClick={() => toggleFilter(filter)}
                    clickable
                />
            ))}
        </div>
    );
};
```
