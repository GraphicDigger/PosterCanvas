/** @jsxImportSource @emotion/react */
import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { PlusIcon, FileIcon, ArrowWithLegUpIcon } from '../../assets/icons';
import { borderRadius } from '../../styles';
import { Divider } from '../Divider/Divider';
import { ButtonTool, ButtonToolGroup } from '../ButtonTool';
import { Stack } from '../Stack';
import { useField, FIELD_TYPES } from '../Fields';
import { TextAreaUnstyled } from '../FieldsUnstyled';
import { Button } from '../Button';


export const MessageInput = memo(({
  value,
  placeholder = 'Add a comment',
  maxHeight = 100,
  minHeight = 16,
  disabled,
  autoFocus,
  buttonsVisible = false,
  onChange,
  onSubmit,
  onPaste,
  onPlusClick,
  onFileClick,
  children,
}) => {
  const theme = useTheme();
  const messageRef = useRef(null);
  const textareaRef = useRef(null);

  const {
    isFocused,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handlePaste,
    handleDrop,
    handleChange,
  } = useField({
    value,
    type: FIELD_TYPES.TEXTAREA,
    maxHeight,
    minHeight,
    onChange,
    onSubmit,
    onEnter: onSubmit,
    onPaste,
    inputRef: textareaRef,
    containerRef: messageRef,
  });

  const showButtons = (!disabled && (buttonsVisible || value));

  return (
    <StyledMessage
      ref={messageRef}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      theme={theme}

    >
      <TextAreaUnstyled
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        disabled={disabled}
        autoFocus={autoFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}

        $maxHeight={maxHeight}
        $minHeight={minHeight}
        $disabled={disabled}
        $isFocused={isFocused}
      />
      {showButtons && (
        <StyledButtonsPanel>
          <Divider top left />
          {children ? children : (
            <Stack direction='row' justify='space-between'>
              <ButtonToolGroup>
                <ButtonTool>
                  <FileIcon />
                </ButtonTool>
                <ButtonTool onClick={onSubmit}>
                  <ArrowWithLegUpIcon />
                </ButtonTool>
              </ButtonToolGroup>
            </Stack>
          )}
        </StyledButtonsPanel>
      )}
    </StyledMessage>
  );
});

export const StyledMessage = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 8px;
    width: 100%;
    background-color: ${({ theme }) => theme.comp.messageInput.background};
    border-radius: ${({ theme }) => theme.ref.borderRadius.medium};
    font-size: ${({ theme }) => theme.sys.typography.body.small.fontSize};
`;

export const StyledButtonsPanel = styled.div`
    display: flex;
    position: relative;
    padding-top: 8px;
`;

MessageInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxHeight: PropTypes.number,
  minHeight: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  buttonsVisible: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onPlusClick: PropTypes.func,
  onFileClick: PropTypes.func,
  onPaste: PropTypes.func,
};
