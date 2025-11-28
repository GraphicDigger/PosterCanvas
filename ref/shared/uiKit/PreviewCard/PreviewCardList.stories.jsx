import React from 'react';
import { PreviewCardList } from './PreviewCardList';
import { PreviewCard } from './PreviewCard';
import { Empty } from '../../../shared/uiKit/Empty';
import { ResizableWrapper } from '../ResizableWrapper';
import { Surface } from '../Surface';
import { ThemeProvider, useTheme } from '../../../app/providers';

export default {
  title: 'uiKit/PreviewCardList',
  component: PreviewCardList,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    minCardWidth: {
      control: 'number',
      description: 'Минимальная ширина карточки в пикселях (работает только если не указано columns)',
      defaultValue: 280,
    },
    columns: {
      control: 'number',
      description: 'Фиксированное количество колонок (имеет приоритет над minCardWidth)',
      defaultValue: undefined,
    },
    gap: {
      control: 'number',
      description: 'Расстояние между элементами',
      defaultValue: 16,
    },
    marginTop: {
      control: 'boolean',
      description: 'Добавить отступ сверху',
      defaultValue: false,
    },
  },
};


const Template = (args) => {

  const { theme } = useTheme();

  return (
    <ResizableWrapper>
      <Surface border={false}>
        <PreviewCardList {...args}>
          <PreviewCard title="Карточка 1">
            <Empty />
          </PreviewCard>
          <PreviewCard title="Карточка 2">
            <Empty />
          </PreviewCard>
          <PreviewCard title="Карточка 3">
            <Empty />
          </PreviewCard>
          <PreviewCard title="Карточка 4">
            <Empty />
          </PreviewCard>
          <PreviewCard title="Карточка 5">
            <Empty />
          </PreviewCard>
        </PreviewCardList>
      </Surface>
    </ResizableWrapper>
  );
};

// Оборачиваем Template в ThemeProvider
const TemplateWithTheme = (args) => (
  <ThemeProvider>
    <Template {...args} />
  </ThemeProvider>
);

// adaptive
export const Adaptive = TemplateWithTheme.bind({});
Adaptive.args = {
};

// fixed columns
export const FixedColumns = TemplateWithTheme.bind({});
FixedColumns.args = {
  columns: 1,
  gap: 16,
};
