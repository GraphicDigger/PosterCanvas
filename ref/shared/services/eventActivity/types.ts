// Activity structure / Структура активности
import type { Event } from '../../types/event.types';
import { type ReactNode, type ComponentType } from 'react';
// Примечание: IconProps можно импортировать из '@/shared/uiKit/Icon/types'
// для более строгой типизации после миграции иконок на TypeScript

export interface ActivitySource {
    // entityKind: string;
    // entityId: string;
    [key: string]: any;
}

export interface EventActivityProviderProps {
    children: ReactNode;
}

export interface Activity {
    id: string;
    kind: string;
    eventId: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    source: ActivitySource;
}

// Icon component type / Тип компонента иконки
// Гибкий тип для совместимости с существующими иконками (jsx файлы без строгой типизации)
// В идеале должен быть ComponentType<IconProps>, но для совместимости с jsx файлами используем any
export type IconComponent = ComponentType<any>;

// Activity action / Действие активности
export interface ActivityAction {
    label: string; // Лейбл действия / Action label
    icon: IconComponent; // Иконка действия / Action icon (React component)
    actionKey: string; // Ключ действия / Action key
}

// Configuration for activity logging / Конфигурация логирования активности
export interface ActivityConfig {
    createActivity?: boolean; // Создавать ли Activity для этого типа события / Whether to create Activity for this event type
    enabled?: boolean; // Включено ли логирование этого типа события / Whether logging is enabled for this event type
    actions?: ActivityAction[]; // Действия для этого типа события / Actions for this event type
    text?: string; // Текст активности / Activity text
}


// Mapper function type / Тип функции маппера
export type ActivityMapper = (event: Event) => Activity | null;

// Callback for processing activity logs / Callback для обработки логов активности
// Теперь возвращает только Activity / Now returns only Activity
export type ActivityLogCallback = (activity: Activity | null) => void;
