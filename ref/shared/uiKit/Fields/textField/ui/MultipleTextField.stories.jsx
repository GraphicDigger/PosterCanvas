import React from 'react';
import { TextFieldMultiple } from './MultipleTextField';
import { useField, FIELD_TYPES } from '../model';

export default {
  title: 'uiKit/TextFieldMultiple',
  component: TextFieldMultiple,
};

// Пример 1: Автоматически изменяемая высота
export const AutoResizingTextArea = () => {
  const [value, setValue] = React.useState('');
  const textareaRef = React.useRef(null);

  const {
    handleChange,
  } = useField({
    value,
    onChange: setValue,
    inputRef: textareaRef,
    type: FIELD_TYPES.TEXTAREA,
    autoAdjustHeight: true,
    minHeight: 16,
  });

  return (
    <div style={{ width: '200px', height: '100%' }}>
      <TextFieldMultiple
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder="Type something... (height will adjust automatically)"
      />
    </div>
  );
};

// Пример 2: Сохранение по Enter или при потере фокуса
export const BufferedTextArea = () => {
  const [savedValue, setSavedValue] = React.useState('');
  const textareaRef = React.useRef(null);

  const {
    handleChange,
    handleKeyDown,
    handleBlur,
    bufferedValue,
  } = useField({
    value: savedValue,
    onChange: setSavedValue,
    inputRef: textareaRef,
    type: FIELD_TYPES.TEXTAREA,
    bufferOnBlur: true,
    submitOnEnter: true,
  });

  return (
    <div>
      <TextFieldMultiple
        ref={textareaRef}
        value={bufferedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter or click outside to save..."
      />
      <div style={{ marginTop: '20px' }}>
                Saved value: <pre>{savedValue}</pre>
      </div>
    </div>
  );
};

// Пример 3: Комбинированный вариант
export const CombinedFeatures = () => {
  const [savedValue, setSavedValue] = React.useState('');
  const textareaRef = React.useRef(null);

  const {
    handleChange,
    handleKeyDown,
    handleBlur,
    bufferedValue,
  } = useField({
    value: savedValue,
    onChange: setSavedValue,
    inputRef: textareaRef,
    type: FIELD_TYPES.TEXTAREA,
    bufferOnBlur: true,
    submitOnEnter: true,
    autoAdjustHeight: true,
    minHeight: 50,
  });

  return (
    <div>
      <TextFieldMultiple
        ref={textareaRef}
        value={bufferedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Auto-resizing + Save on Enter/blur"
      />
      <div style={{ marginTop: '20px' }}>
                Saved value: <pre>{savedValue}</pre>
      </div>
    </div>
  );
};

AutoResizingTextArea.storyName = '1. Auto-resizing TextArea';
BufferedTextArea.storyName = '2. Save on Enter/Blur TextArea';
CombinedFeatures.storyName = '3. Combined Features';
