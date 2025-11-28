/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { CheckIcon, CrossIcon, FileIcon } from '../../assets/icons';
import { useFileUpload } from './model/hooks';
import { Preview } from '../Preview';
import { Stack } from '../Stack';


export const FileUpload = ({
  multiple = false,
  onChange,
  onUpload = null,
  uploadUrl = '/local',
  maxFileSize = 5 * 1024 * 1024,
}) => {
  const theme = useTheme();

  const {
    files,
    isUploading,
    uploadedFiles,
    error,
    handleFileChange,
    handleRemoveFile,
    hasFiles,
  } = useFileUpload({
    multiple,
    onChange,
    onUpload,
    uploadUrl,
    maxFileSize,
  });

  const icon = isUploading
    ? null
    : files.length === 0
      ? <FileIcon color={theme.comp.fileUpload.primary.default.icon} />
      : <CheckIcon color={theme.comp.fileUpload.success.default.icon} />;

  const label = isUploading
    ? 'Loading...'
    : files.length === 0
      ? 'Upload File'
      : multiple
        ? `${files.length} file(s)`
        : files[0].name;

  const removeIcon = (fileIndex) => {
    return (
      <StyledRemoveIcon onClick={() => !isUploading && handleRemoveFile(fileIndex)}>
        <CrossIcon />
      </StyledRemoveIcon>
    );
  };

  const FileUrl = ({ children, uploadedFile }) => {
    return (
      <StyledFileUrl
        href={uploadedFile.url}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        rel="noopener noreferrer"
      >
        {children}
      </StyledFileUrl>
    );
  };
  const previews = (() => {
    if (uploadedFiles.length > 0 && !multiple) {
      return (
        <StyledPreview>
          <FileUrl uploadedFile={uploadedFiles[0]}>
            <Preview imageUrl={uploadedFiles[0].url} size="medium" />
          </FileUrl>
          {removeIcon(0)}
        </StyledPreview>
      );
    }

    if (multiple && files.length > 0) {
      return (
        <Stack direction="row" align="flex-start" justify="flex-start">
          {files.map((file, index) => {
            const uploadedFile = uploadedFiles[index];
            return (
              <StyledPreview key={index}>
                {uploadedFile && (
                  <>
                    <FileUrl uploadedFile={uploadedFile}>
                      <Preview imageUrl={uploadedFile.url} size="medium" />
                    </FileUrl>
                    {removeIcon(index)}
                  </>
                )}
              </StyledPreview>
            );
          })}
        </Stack>
      );
    }
    return null;
  })();

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      console.log('Files uploaded:', uploadedFiles);
    }
  }, [uploadedFiles]);

  return (
    <StyledContainer>
      <label>
        <StyledFileInput
          type="file"
          multiple={multiple}
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <StyledUploadButton
          hasFiles={hasFiles}
          disabled={isUploading}
        >
          {icon}
          {label}
        </StyledUploadButton>
      </label>
      {error && <StyledError>{error}</StyledError>}
      {previews}
    </StyledContainer>
  );
};

FileUpload.propTypes = {
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onUpload: PropTypes.func,
  uploadUrl: PropTypes.string,
  maxFileSize: PropTypes.number,
};

const StyledContainer = styled.div`
    width: 100%;
`;

const StyledFileInput = styled.input`
    display: none;
`;

const StyledPreview = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledError = styled.div`
    color: ${({ theme }) => theme.name === 'dark' ? '#ff6b6b' : '#d32f2f'};
    font-size: 12px;
    margin-top: 4px;
`;

const StyledFileUrl = styled.a`
    width: max-content;
    padding: 16px;
`;

const StyledRemoveIcon = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    cursor: pointer;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledUploadButton = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    background-color: ${({ theme, hasFiles, disabled }) => {
    if (disabled) {return theme.comp.fileUpload.primary.default.background;}
    return hasFiles
      ? theme.comp.fileUpload.success.default.background
      : theme.comp.fileUpload.primary.default.background;
  }};
    color: ${({ colors, hasFiles, disabled, theme }) => {
    if (disabled) {return theme.comp.fileUpload.primary.default.text;}
    return hasFiles
      ? theme.comp.fileUpload.success.default.text
      : theme.comp.fileUpload.primary.default.text;
  }};
    height: 32px;
    border-radius: ${({ theme }) => theme.ref.borderRadius.medium};
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    transition: background-color 0.2s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    
    &:hover {
        background-color: ${({ theme, hasFiles, disabled }) => {
    if (disabled) {return theme.comp.fileUpload.primary.default.background;}
    return hasFiles
      ? theme.comp.fileUpload.success.hover.background
      : theme.comp.fileUpload.primary.hover.background;
  }};
    }
`;
