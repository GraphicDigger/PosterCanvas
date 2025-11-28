import React from 'react';
import { ButtonIconGroup } from './ButtonIconGroup';
import { ThemeProvider } from '../../../app/providers';


export default {
  title: 'uiKit/ButtonIconGroup',
  component: ButtonIconGroup,
  argTypes: {
    variant: { description: 'Variant of the button icon group' },
    color: { description: 'Color of the button icon group' },
    size: { description: 'Size of the button icon group' },
    background: { description: 'Background of the button icon group' },
  },
};

export const buttonIconGroup = () => {
  const icons = ['plus_xs', 'plus_xs', 'plus_xs'];
  return (
    <ButtonIconGroup
      icons={icons}
      variant="blank"
      color="default"
      size="small"
      background={true}
      onClick={(iconName) => console.log(`Clicked on ${iconName}`)}
    />
  );
};

