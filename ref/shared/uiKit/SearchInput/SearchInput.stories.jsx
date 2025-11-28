import React, { useState } from 'react';
import { SearchInput } from './SearchInput';

export default {
  title: 'uiKit/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
};

export const Default = () => {
  const [value, setValue] = useState('');

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      onSubmit={(value) => console.log('Submitted:', value)}
    />
  );
};

export const WithCustomSize = () => {
  const [value, setValue] = useState('');

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      size="medium"
      width={300}
    />
  );
};

export const Disabled = () => {
  const [value, setValue] = useState('Custom placeholder');

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      disabled
    />
  );
};

