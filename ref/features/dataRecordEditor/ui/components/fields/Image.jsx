import React, { useState } from 'react';
import { Field, Label, TextField } from '../../../../../shared/uiKit/Fields';
import { useRecordEditor } from '../../../model';
import { useDataModelFieldStates } from '../../../../../entities/dataModelField';
import { FileUpload } from '../../../../../shared/uiKit/FileUpload';
import { Stack } from '../../../../../shared/uiKit/Stack';
import { Preview } from '../../../../../shared/uiKit/Preview';
import { useRecordById } from '../../../../../entities/dataRecord';

export const Image = ({ modelField, record }) => {

  const { updateField, getFieldValue, handleDeselectField } = useRecordEditor();

  const handleChange = (newValue) => {
    updateField(record.id, modelField.id, newValue);
  };

  return (
    <Field direction='column' onClick={handleDeselectField}>
      <Label>{modelField.label}</Label>
      <TextField
        size='small'
        value={getFieldValue(modelField.id, record)}
        onChange={handleChange}
      />
    </Field>
  );
};

export const ImageSettings = ({ record, modelField }) => {

  const [uploadedImages, setUploadedImages] = useState([]);
  const { updateField, getFieldValue, handleDeselectField } = useRecordEditor(record.id);

  // Обработчик выбора файла(ов)
  const handleChange = (newFiles) => {
    console.log('Files selected:', newFiles);
  };

  const handleUpload = (uploadedFiles) => {
    setUploadedImages(uploadedFiles);
    if (Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
      const urls = uploadedFiles.map(file => file.url);
      updateField(record.id, modelField.id, urls);
    } else if (uploadedFiles && uploadedFiles.url) {
      updateField(record.id, modelField.id, uploadedFiles.url);
    }
  };

  return (
    <Stack align='flex-start' gap={5}>
      <FileUpload
        onChange={handleChange}
        onUpload={handleUpload}
      />
      {record[modelField.id] && (
        <Preview
          imageUrl={record[modelField.id]}
          size='xlarge'
        />
      )}
    </Stack>
  );
};

