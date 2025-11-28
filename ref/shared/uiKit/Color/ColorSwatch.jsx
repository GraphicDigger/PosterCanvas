import styled from '@emotion/styled';
import { TextField, StartSlot, EndSlot } from '../Fields';
import { ListItem, ListItemButton, ListItemStartSlot, ListItemText, ListItemEndSlot } from '../List';
import { ColorPreview } from '../ColorPreview';
import { RGBColor } from './RGBColor';
import { HSBColor } from './HSBColor';
import { HEXColor } from './HEXColor';

export const ColorSwatch = ({
  children,
  name,
  value,
  onChange,
  rightSlot,
  ...restProps
}) => {

  return (
    <ListItem>
      <ListItemButton>
        <ListItemStartSlot>
          {children ? children : <ColorPreview color={value} />}
        </ListItemStartSlot>
        <ListItemText>
          {name ? name : value}
        </ListItemText>
        <ListItemEndSlot spacing={4}>
          {rightSlot}
        </ListItemEndSlot>
      </ListItemButton>
    </ListItem>
  );
};
