import { ref } from './_ref';
import { sysDark, sysLight } from './_sys';
import { textField } from './components/textField';
import { checkbox } from './components/checkbox';
import { switcher } from './components/switcher';
import { table } from './components/table';
import { card } from './components/card';
import { surface } from './components/surface';
import { avatar } from './components/avatar';
import { select } from './components/select';
import { textFieldMultiple } from './components/textFieldMultiple';
import { messageInput } from './components/messageInput';
import { message } from './components/message';
import { listItem } from './components/listItem';
import { fileUpload } from './components/fileUpload';
import { button } from './components/button';

export const lightTheme = {
  name: 'light',
  ref: { ...ref },
  sys: { ...sysLight },
  comp: {
    textField: { ...textField.light },
    checkbox: { ...checkbox.light },
    switcher: { ...switcher.light },
    table: { ...table.light },
    card: { ...card.light },
    surface: { ...surface.light },
    avatar: { ...avatar.light },
    select: { ...select.light },
    textFieldMultiple: { ...textFieldMultiple.light },
    messageInput: { ...messageInput.light },
    message: { ...message.light },
    listItem: { ...listItem.light },
    fileUpload: { ...fileUpload.light },
    button: { ...button.light },
  },

};

export const darkTheme = {
  name: 'dark',
  ref: { ...ref },
  sys: { ...sysDark },
  comp: {
    textField: { ...textField.dark },
    checkbox: { ...checkbox.dark },
    switcher: { ...switcher.dark },
    table: { ...table.dark },
    card: { ...card.dark },
    surface: { ...surface.dark },
    avatar: { ...avatar.dark },
    select: { ...select.dark },
    textFieldMultiple: { ...textFieldMultiple.dark },
    messageInput: { ...messageInput.dark },
    message: { ...message.dark },
    listItem: { ...listItem.dark },
    fileUpload: { ...fileUpload.dark },
    button: { ...button.dark },
  },
};
