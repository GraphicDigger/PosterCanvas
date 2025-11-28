import React, { useState } from 'react';
import { TokenAlias } from './TokenAlias';
import { ThemeProvider, GlobalTokenProvider, useGlobalToken } from '../../../app/providers';
import { Preview } from '../Preview/Preview';
import { ListItemText } from '../List/ListItemText';
import { ListItemButton } from '../List/ListItemButton';
import { ListItemStartSlot } from '../List/ListItemStartSlot';
import { List } from '../List/List';
import { WindowPopover, WindowTrigger, Window, WindowHead, WindowBody } from '../Window';
import { ListItem } from '../List/ListItem';


const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/TokenAlias',
  component: TokenAlias,
  decorators: [ThemeWrapper],
};

const Template = (args) => {
  return (
    <>
      <TokenAlias {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {

};

export const TokenTable = () => {
  return (
    <GlobalTokenProvider>
      <TokenTableContent />
    </GlobalTokenProvider>
  );
};

// Создайте отдельный компонент для содержимого
const TokenTableContent = () => {
  const { variables } = useGlobalToken();
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [selectedColorName, setSelectedColorName] = useState('#ffffff');

  const handleColorSelect = (color, nameColor) => {
    setSelectedColor(color);
    setSelectedColorName(nameColor);
  };

  return (
    <WindowPopover>
      <WindowTrigger>
        <TokenAlias color={selectedColor} text={selectedColorName} dataValue={selectedColor} />
      </WindowTrigger>
      <Window position='left' offset={{ top: 100, left: -276 }}>
        <WindowHead>
        </WindowHead>
        <WindowBody>
          <List>
            {Object.entries(variables.colors).map(([name, color]) => (
              <ListItem key={name}>
                <ListItemButton onClick={() => { handleColorSelect(color, name); }}>
                  <ListItemStartSlot>
                    <Preview color={color} />
                  </ListItemStartSlot>
                  <ListItemText>
                    {color}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </WindowBody>
      </Window>
    </WindowPopover>
  );
};

