// src/shared/uiKit/Chip/Chip.stories.jsx
import React, { useState } from 'react';
import { Chip } from './Chip';
import { Avatar } from '@/shared/uiKit/Avatar';
import { Icon } from '@/shared/uiKit/Icon';
import styled from '@emotion/styled';

export default {
  title: 'uiKit/Chip',
  component: Chip,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined'],
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    clickable: {
      control: { type: 'boolean' },
    },
    deletable: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => <Chip {...args} />;

// Базовые чипы
export const Default = Template.bind({});
Default.args = {
  label: 'Chip Filled',
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Chip Outlined',
  variant: 'outlined',
};

// Кликабельные чипы
export const Clickable = () => {
  const handleClick = () => {
    alert('Чип был нажат!');
  };

  return (
    <Container>
      <Chip label="Clickable" onClick={handleClick} />
      <Chip label="Clickable" variant="outlined" onClick={handleClick} />
    </Container>
  );
};

// Удаляемые чипы
export const Deletable = () => {
  const [chips, setChips] = useState(['Deletable', 'Another Chip', 'Third Chip']);

  const handleDelete = (index) => {
    setChips(chips.filter((_, i) => i !== index));
  };

  return (
    <Container>
      {chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </Container>
  );
};

// Кликабельные и удаляемые
export const ClickableAndDeletable = () => {
  const [chips, setChips] = useState(['Clickable Deletable', 'Another Chip']);

  const handleClick = (chip) => {
    alert(`Нажат чип: ${chip}`);
  };

  const handleDelete = (index) => {
    setChips(chips.filter((_, i) => i !== index));
  };

  return (
    <Container>
      {chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip}
          onClick={() => handleClick(chip)}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </Container>
  );
};

// Чипы с аватарами
export const WithAvatar = () => {
  return (
    <Container>
      <Chip
        avatar={<Avatar>M</Avatar>}
        label="Avatar"
      />
      <Chip
        avatar={<Avatar>N</Avatar>}
        label="Avatar"
        variant="outlined"
      />
    </Container>
  );
};

// Чипы с иконками
export const WithIcon = () => {
  const FaceIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );

  return (
    <Container>
      <Chip icon={<FaceIcon />} label="With Icon" />
      <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
    </Container>
  );
};

// Цветовые варианты
export const Colors = () => {
  const colors = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];

  return (
    <Container>
      <h3>Filled</h3>
      <ColorRow>
        {colors.map(color => (
          <Chip key={color} label={color} color={color} />
        ))}
      </ColorRow>

      <h3>Outlined</h3>
      <ColorRow>
        {colors.map(color => (
          <Chip key={color} label={color} color={color} variant="outlined" />
        ))}
      </ColorRow>
    </Container>
  );
};

// Размеры
export const Sizes = () => {
  return (
    <Container>
      <Chip label="Small" size="small" />
      <Chip label="Medium" size="medium" />
      <Chip label="Small Outlined" size="small" variant="outlined" />
      <Chip label="Medium Outlined" size="medium" variant="outlined" />
    </Container>
  );
};

// Многострочный чип
export const Multiline = () => {
  return (
    <Container>
      <Chip
        label="This is a chip that has multiple lines and should wrap properly."
        sx={{
          height: 'auto',
          '& .MuiChip-label': {
            display: 'block',
            whiteSpace: 'normal',
          },
        }}
      />
    </Container>
  );
};

// Массив чипов
export const ChipArray = () => {
  const [chips, setChips] = useState(['Angular', 'jQuery', 'Polymer', 'React', 'Vue.js']);

  const handleDelete = (chipToDelete) => {
    setChips(chips.filter(chip => chip !== chipToDelete));
  };

  return (
    <Container>
      {chips.map(chip => (
        <Chip
          key={chip}
          label={chip}
          onDelete={() => handleDelete(chip)}
        />
      ))}
    </Container>
  );
};

// Отключенные чипы
export const Disabled = () => {
  return (
    <Container>
      <Chip label="Disabled" disabled />
      <Chip label="Disabled Outlined" variant="outlined" disabled />
      <Chip label="Disabled with Delete" disabled onDelete={() => {}} />
    </Container>
  );
};

// Playground
export const Playground = Template.bind({});
Playground.args = {
  label: 'Playground Chip',
  variant: 'filled',
  color: 'primary',
  size: 'medium',
  disabled: false,
  clickable: false,
  deletable: false,
};

// Стилизованные контейнеры
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-bottom: 16px;
`;

const ColorRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
`;
