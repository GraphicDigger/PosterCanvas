/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Select } from './Select';
import { MenuItem, MenuItemCheckbox, MenuItemRadio } from '../../../Menu';

export default {
  title: 'uiKit/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'small',
    },
    variant: {
      control: 'select',
      options: ['default', 'checkbox', 'radio'],
    },
    multiple: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    width: {
      control: 'number',
      defaultValue: 240,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '30px', minWidth: '240px' }}>
        <Story />
      </div>
    ),
  ],
};

// Базовая история с одиночным выбором (default вариант)
export const DefaultSingle = () => {
  const [value, setValue] = useState('');

  return (
    <Select
      value={value}
      onChange={setValue}
      placeholder="Default select"
      size="small"
      width={240}
    >
      <MenuItem value="option1">Option 1</MenuItem>
      <MenuItem value="option2">Option 2</MenuItem>
      <MenuItem value="option3">Option 3</MenuItem>
      <MenuItem value="option4">Option 4</MenuItem>
      <MenuItem value="option5">Option 5</MenuItem>
    </Select>
  );
};

// Базовая история с одиночным выбором (default вариант)
export const DefaultValue = () => {

  return (
    <Select
      placeholder="Default select"
      defaultValue='option1'
      size="small"
      width={240}
    >
      <MenuItem value="option1">Option 1</MenuItem>
      <MenuItem value="option2">Option 2</MenuItem>
      <MenuItem value="option3">Option 3</MenuItem>
      <MenuItem value="option4">Option 4</MenuItem>
      <MenuItem value="option5">Option 5</MenuItem>
    </Select>
  );
};

// Селект с множественным выбором и чекбоксами
export const DefaultMultiple = () => {
  const [value, setValue] = useState([]);

  return (
    <Select
      value={value}
      onChange={setValue}
      placeholder="Multiple select"
      multiple={true}
      width={240}
    >
      <MenuItemCheckbox value="option1">Option 1</MenuItemCheckbox>
      <MenuItemCheckbox value="option2">Option 2</MenuItemCheckbox>
      <MenuItemCheckbox value="option3">Option 3</MenuItemCheckbox>
      <MenuItemCheckbox value="option4">Option 4</MenuItemCheckbox>
      <MenuItemCheckbox value="option5">Option 5</MenuItemCheckbox>
    </Select>
  );
};

// Одиночный выбор с радио-кнопками
export const SingleWithRadio = () => {
  const [value, setValue] = useState('');

  return (
    <Select
      value={value}
      onChange={setValue}
      placeholder="Single select with radio"
      variant="radio"
      width={240}
    >
      <MenuItemRadio value="option1" name="radioGroup">Option 1</MenuItemRadio>
      <MenuItemRadio value="option2" name="radioGroup">Option 2</MenuItemRadio>
      <MenuItemRadio value="option3" name="radioGroup">Option 3</MenuItemRadio>
      <MenuItemRadio value="option4" name="radioGroup">Option 4</MenuItemRadio>
      <MenuItemRadio value="option5" name="radioGroup">Option 5</MenuItemRadio>
    </Select>
  );
};


// Отключенный селект
export const Disabled = () => (
  <Select
    placeholder="Not available for selection"
    disabled={true}
    width={240}
  >
    <MenuItem value="option1">Option 1</MenuItem>
    <MenuItem value="option2">Option 2</MenuItem>
    <MenuItem value="option3">Option 3</MenuItem>
  </Select>
);

// Демонстрация разных размеров
export const DifferentSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <Select placeholder="Small size" size="small" width={240}>
      <MenuItem value="option1">Option 1</MenuItem>
      <MenuItem value="option2">Option 2</MenuItem>
    </Select>

    <Select placeholder="Medium size" size="medium" width={240}>
      <MenuItem value="option1">Option 1</MenuItem>
      <MenuItem value="option2">Option 2</MenuItem>
    </Select>

    <Select placeholder="Large size" size="large" width={240}>
      <MenuItem value="option1">Option 1</MenuItem>
      <MenuItem value="option2">Option 2</MenuItem>
    </Select>
  </div>
);
