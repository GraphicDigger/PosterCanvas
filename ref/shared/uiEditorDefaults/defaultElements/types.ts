import { ENTITY_KINDS } from '@/shared/constants';
import type React from 'react';

// Конфигурация шаблона элемента
export interface ElementTemplate {
  type: string;        // Уникальный ключ (например, 'std.button', 'std.div')
  label: string;       // Название для UI (например, 'Button')
  category: 'layout' | 'forms' | 'typography' | 'advanced';
  icon?: React.FC<any>; // Иконка для панели инструментов
  
  // Данные, которые будут скопированы в новый элемент
  defaults: {
    tag: string;
    name: string;
    kind: string; // typeof ENTITY_KINDS.ELEMENT;
    properties: {
      style: Record<string, string | number>;
      content?: Record<string, any>;
      [key: string]: any;
    };
    attributes?: Record<string, string>;
    children?: Array<ElementTemplate['defaults']>; 
  };
}
