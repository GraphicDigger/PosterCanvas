import { ELEMENT_TAGS } from '@/entities/uiElement';
import { Text } from './Text';
import { Box } from './Box';
import { Button } from './Button';
import { Img } from './Img';
import { Input } from './Input';

export { TextContent } from './TextContent'; // Node.text

export const ELEMENT_RENDERERS_MAP = {
  [ELEMENT_TAGS.PARAGRAPH]: Text,
  [ELEMENT_TAGS.DIV]: Box,
  [ELEMENT_TAGS.BODY]: Box,
  [ELEMENT_TAGS.BUTTON]: Button,
  [ELEMENT_TAGS.IMAGE]: Img,
  [ELEMENT_TAGS.INPUT]: Input,
};
