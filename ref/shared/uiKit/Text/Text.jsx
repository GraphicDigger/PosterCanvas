/** @jsxImportSource @emotion/react */
import React, { useEffect, forwardRef, useRef, useMemo, memo } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { colors } from '../../styles';
import { InputUnstyled, TextAreaUnstyled } from '../FieldsUnstyled';
import { useField } from '../Fields';
import { textColorsMode } from '../../styles';
import { useTextEdit, useTextSelection, useTextInteractions } from './model/hooks';
import { font } from '../../styles';


export const Text = memo(forwardRef(({
  editable = false,
  singleClickEdit = false,
  multiline = false,
  placeholder,

  size = 'small',

  weight = 'normal',
  lineHeight,
  align = 'left',
  color = 'primary',

  width,
  children, //initial content
  onChange,
  onBlur,
  onKeyDown,
  autoFocus = false,
  className,
}, ref) => {

  const theme = useTheme();
  const inputRef = useRef(ref);

  const fontStyle = useMemo(() => {
    switch (size) {
    case 'small':
      return theme.sys.typography.body.xsmall;
    case 'medium':
      return theme.sys.typography.body.small;
    case 'large':
      return theme.sys.typography.body.medium;
    default:
      return theme.sys.typography.body.xsmall;
    }
  }, [size]);

  const textColor = useMemo(() => {
    switch (color) {
    case 'primary':
      return theme.sys.typography.color.primary;
    case 'secondary':
      return theme.sys.typography.color.secondary;
    case 'disabled':
      return theme.sys.typography.color.disabled;
    default:
      return color;
    }
  }, [color, theme]);

  const fontWeight = useMemo(() => {
    switch (weight) {
    case 'normal':
      return theme.sys.typography.weight.medium;
    case 'medium':
      return theme.sys.typography.weight.semibold;
    case 'bold':
      return theme.sys.typography.weight.bold;
    default:
      return theme.sys.typography.weight.medium;
    }
  }, [weight]);

  // Используем хук для управления состоянием редактирования
  const {
    isEditing,
    content,
    shouldSelectAll,
    setShouldSelectAll,
    handleStartEdit,
    handleContentChange,
    handleFinishEdit,
    handleCancelEdit,
  } = useTextEdit({
    initialContent: children,
    editable,
    autoFocus,
    onChange,
  });

  // Используем хук для управления выделением текста
  useTextSelection({
    inputRef,
    isEditing,
    shouldSelectAll,
    setShouldSelectAll,
  });

  // Используем хук для обработки взаимодействий
  const {
    handleDoubleClick,
    handleClick,
    editTitle,
  } = useTextInteractions({
    editable,
    singleClickEdit,
    handleStartEdit,
  });

  // Используем хук useField для обработки ввода
  const {
    handleChange: fieldHandleChange,
    handleBlur: fieldHandleBlur,
    handleKeyDown: fieldHandleKeyDown,
    adjustHeight,
  } = useField({
    inputRef,
    value: content,
    type: multiline ? 'textarea' : 'text',
    onChange: handleContentChange,
    onBlur: (e) => {
      handleFinishEdit();
      if (onBlur) {
        onBlur(e);
      }
    },
    onEnter: () => {
      // завершает редактирование: Enter для однострочного и Ctrl+Enter для многострочного
      if (!multiline) {
        handleFinishEdit();
      }
    },
    onEscape: () => {
      handleCancelEdit();
    },
    onKeyDown,
    autoFocus,
    autoAdjustHeight: multiline,
    submitOnEnter: !multiline,
    submitOnCtrlEnter: multiline,
    preventNewLine: !multiline,
  });

  // Обертка для handleChange, чтобы получить значение из события
  const handleChange = (e) => {
    fieldHandleChange(e.target.value);
  };

  // Эффект для автоматической подстройки высоты при монтировании для многострочного режима
  useEffect(() => {
    if (multiline && isEditing && inputRef.current) {
      adjustHeight();
    }
  }, [multiline, isEditing, adjustHeight]);

  return (
    <TextContainer
      fontStyle={fontStyle}
      weight={fontWeight}
      lineHeight={lineHeight}
      className={className}
      width={width}
    >
      {isEditing ? (
        multiline ? (
          <TextAreaUnstyled
            className='text-area'
            ref={inputRef}
            value={content}
            onChange={handleChange}
            onBlur={fieldHandleBlur}
            onKeyDown={fieldHandleKeyDown}
            autoFocus={true}
            placeholder={placeholder}
          />
        ) : (
          <InputUnstyled
            type="text"
            value={content}
            onChange={handleChange}
            onBlur={fieldHandleBlur}
            onKeyDown={fieldHandleKeyDown}
            autoFocus={true}
            ref={inputRef}
            placeholder={placeholder}
          />
        )
      ) : (
        <StyledText
          editable={editable}
          multiline={multiline}
          singleClickEdit={singleClickEdit}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          title={editTitle}
          textColor={textColor}
          align={align}
        >
          {content || placeholder}
        </StyledText>
      )}
    </TextContainer>
  );
}));

const TextContainer = styled.div`
    ${({ fontStyle }) => fontStyle}
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    ${({ weight }) => weight && css`font-weight: ${weight};`}
    min-width: 0;
    width: ${({ width }) => {
    if (!width) { return '100%'; }
    return typeof width === 'number' ? `${width}px` : width;
  }};
`;
const StyledText = styled.p`
    text-align: ${({ align }) => align};
    color: ${({ textColor }) => textColor};
    margin: 0;
    padding: 0;
    min-height: ${({ multiline }) => multiline ? '1.5em' : 'auto'};
    cursor: ${({ editable }) => editable ? 'pointer' : 'default'};
    word-wrap: break-word;

    ${({ multiline }) => multiline ? css`
        white-space: pre-wrap;
        overflow: visible;
        text-overflow: clip;
        word-break: break-word;
    ` : css`
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `}

    ${({ editable }) => editable && css`
        &:hover {
            cursor: pointer;
        }
    `}
`;

Text.propTypes = {
  children: PropTypes.node,
  editable: PropTypes.bool,
  singleClickEdit: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  align: PropTypes.string,
};
