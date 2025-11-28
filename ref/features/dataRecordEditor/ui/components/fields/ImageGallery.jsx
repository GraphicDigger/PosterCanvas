import React, { useState } from 'react';
import { Field, Label, TextField } from '../../../../../shared/uiKit/Fields';
import { useRecordEditor } from '../../../model';
import { useDataModelFieldStates } from '../../../../../entities/dataModelField';
import { FileUpload } from '../../../../../shared/uiKit/FileUpload';
import { Stack } from '../../../../../shared/uiKit/Stack';
import { Preview } from '../../../../../shared/uiKit/Preview';


export const ImageGallery = ({ modelField, record }) => {

  const { updateField, draft } = useRecordEditor();
  const { handleSelectField } = useDataModelFieldStates();
  const modelFieldId = modelField.id;

  const handleChange = (newValue) => {
    updateField(record.id, modelFieldId, newValue);
  };

  const handleSelect = () => {
    handleSelectField(modelFieldId);
  };

  const currentValue = draft?.changes?.[modelFieldId] !== undefined
    ? draft.changes[modelFieldId]
    : record?.[modelFieldId] ?? '';


  return (
    <Field direction='column' onClick={handleSelect}>
      <Label>{modelField.label}</Label>
      <TextField
        size='small'
        value={currentValue}
        onChange={handleChange}
      />
    </Field>
  );
};


export const ImageGallerySettings = ({ record, modelField }) => {

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
    <Stack align='flex-start'>
      <FileUpload
        multiple
        onChange={handleChange}
        onUpload={handleUpload}
      />
      <Stack direction='row' align='flex-start' gap={5} padding={5}>
        {record[modelField.id]?.map(image => (
          <Preview
            imageUrl={image}
            size='xlarge'
          />
        ))}
      </Stack>
    </Stack>
  );
};

