import React from 'react';
import { Icon } from './Icon';
import { ThemeProvider } from '../../../app/providers';
import * as icons from '../../../shared/assets/icons';

// Автоматически собираем все иконки в массив

const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/Icon',
  component: Icon,
  decorators: [ThemeWrapper],
  argTypes: {
    size: {
      description: 'Size of the icon',
      control: {
        type: 'select',
        options: ['S', 'M', 'L'],
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Создаем story для каждой иконки
export const IconGallery = () => {
  const allIcons = Object.entries(icons).map(([name, Icon]) => ({ name, Icon }));
  return (
    <div style={{
      display: 'grid',
      width: '100%',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '16px',
      padding: '24px',
      alignItems: 'start',
      justifyItems: 'start',
      backgroundColor: '#fff',
    }}>
      {allIcons.map(({ name, Icon }) => (
        <div key={name} style={{
          width: '100%',
          textAlign: 'center',
          padding: '12px',
          border: '1px solid #eee',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          minHeight: '80px',
        }}>
          <Icon size="M" />
          <div style={{
            fontSize: '12px',
            wordBreak: 'break-word',
            width: '100%',
            lineHeight: '1.2',
          }}>{name}</div>
        </div>
      ))}
    </div>
  );
};
