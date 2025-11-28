// src/shared/uiKit/Chip/Chip.types.ts
export interface ChipProps {
    /** Текст чипа */
    label?: string;

    /** Вариант отображения */
    variant?: 'filled' | 'outlined';

    /** Цвет чипа */
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

    /** Размер чипа */
    size?: 'small' | 'medium';

    /** Аватар для отображения в чипе */
    avatar?: React.ReactNode;

    /** Иконка для отображения в чипе */
    icon?: React.ReactNode;

    /** Кастомная иконка удаления */
    deleteIcon?: React.ReactNode;

    /** Обработчик клика */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

    /** Обработчик удаления */
    onDelete?: (event: React.MouseEvent<HTMLDivElement>) => void;

    /** Отключенное состояние */
    disabled?: boolean;

    /** Кликабельный чип */
    clickable?: boolean;

    /** Удаляемый чип */
    deletable?: boolean;

    /** Дочерние элементы */
    children?: React.ReactNode;

    /** CSS класс */
    className?: string;

    /** Дополнительные пропсы */
    [key: string]: any;
}

export interface ChipRef {
    /** Ссылка на DOM элемент */
    current: HTMLDivElement | null;
}
