import React, { useState } from 'react';
import { TextField, StartSlot, EndSlot } from '..';

import { Field } from '../../fieldWrapper';
import { Label } from '../../label';
import { PlusIcon } from '../../../../assets/icons';
import { ButtonTool } from '../../../ButtonTool';


export default {
  title: 'uiKit/TextField',
  component: TextField,
  argTypes: {
    size: {
      description: 'Size of the text field',
    },
    fill: {
      description: 'Fill of the text field',
    },
    tokenFrame: {
      description: 'Token frame of the text field',
    },
    tokenDot: {
      description: 'Token dot of the text field',
    },
    // Добавляем новые параметры для числовой валидации
    numeric: {
      control: 'boolean',
      description: 'Enable numeric validation',
    },
    allowDecimals: {
      control: 'boolean',
      description: 'Allow decimal numbers',
    },
    allowNegative: {
      control: 'boolean',
      description: 'Allow negative numbers',
    },
    allowUnits: {
      control: 'boolean',
      description: 'Allow measurement units (px, em, %, etc.)',
    },
    units: {
      control: 'object',
      description: 'Array of allowed units',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum length',
    },
  },
};

const Template = (args) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (value) => {
    setText(value);
  };

  return (
    <div style={{ width: '250px', position: 'relative' }}>
      <TextField
        {...args}
        value={text}
        onChange={(value) => handleTextChange(value)}
        error={error}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder',
};

// только числа
export const OnlyNumbers = Template.bind({});
OnlyNumbers.args = {
  numeric: true,
  placeholder: '10',
};

// только числа с единицами измерения
export const OnlyNumbersWithUnits = Template.bind({});
OnlyNumbersWithUnits.args = {
  numeric: true,
  allowUnits: true,
  units: ['px', 'em', 'rem', 'vh', 'vw', 'pt', 'pc', 'in', 'cm', 'mm', 'ex', 'ch', 'vmin', 'vmax'],
  placeholder: '10px (px, em, rem, vh, vw ... )',
};

// Только положительные целые числа
export const OnlyPositiveIntegers = Template.bind({});
OnlyPositiveIntegers.args = {
  numeric: true,
  allowNegative: false,
  allowDecimals: false,
  allowUnits: false,
  placeholder: '10',
};

// Проценты от 0 до 100
export const Percentages = Template.bind({});
Percentages.args = {
  numeric: true,
  allowDecimals: false,
  allowUnits: true,
  units: ['%'],
  placeholder: '100%',
};

export const WithLabel = () => {
  return (
    <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-end' }}>

      <div style={{ display: 'flex', minWidth: '250px' }}>
        <Field>
          <Label>
            Label
          </Label>
          <TextField placeholder='Used in editor' width={200} />
        </Field>
      </div>

      <Field direction='column'>
        <Label>
          Label
        </Label>
        <TextField placeholder='Default' />
      </Field>

    </div >
  );
};

export const WithSlots = () => {
  return (
    <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-end' }}>

      <TextField placeholder='With children'>
        <StartSlot>
          <PlusIcon />
        </StartSlot>
        <EndSlot>
          <ButtonTool>
            <PlusIcon />
          </ButtonTool>
        </EndSlot>
      </TextField>
    </div >
  );
};

export const bufferOnBlur = () => {

  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (value) => {
    setText(value);
  };

  return (
    <div style={{ width: '250px', position: 'relative' }}>
      <TextField
        value={text}
        onChange={(value) => handleTextChange(value)}
        error={error}
        bufferOnBlur
        placeholder='Buffer on blur'
      />
      <p>Text: {text}</p>
    </div>
  );
};

