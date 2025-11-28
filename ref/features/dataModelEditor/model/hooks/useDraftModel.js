import { createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { selectSelectedModel } from '../../../../entities/dataModel';
import { useDataModelMutation } from '../../../../entities/dataModel';
import {
  updateDraftModelField,
  clearModelDraft,
  selectDraftModelField,
} from '../store';
import {
  selectModelFieldsWithDraft,
  selectSelectedModelField,
  selectModelFieldsWithDraftByModelId,
} from '../store/selectors';
import { useDraftMigration } from './useDraftMigration';
import { useAddModelField } from './useDataModel';

export const useDraftModel = (modelFieldId, modelId) => {
  const dispatch = useDispatch();

  const { addFieldToDraft, addModelWithDefaultFields } = useAddModelField();
  const { saveAllDrafts, hasDraftChanges } = useDraftMigration();

  const selectedModel = useSelector(selectSelectedModel);
  const selectedModelField = useSelector(selectSelectedModelField);

  const currentModelId = modelId || selectedModel?.id;
  const draftModelField = useSelector(state => selectDraftModelFieldFn(state, modelFieldId, currentModelId));
  const modelFieldsWithDrafts = useSelector(selectModelFieldsWithDraft);
  const getModelFieldsWithDraftByModelId = useSelector(selectModelFieldsWithDraftByModelIdFn);

  const handleAddDataModel = () => {
    addModelWithDefaultFields();
  };

  const handleAddFieldToDraft = (id, type, label) => {
    if (currentModelId) {
      addFieldToDraft(currentModelId, type, label, id);
    }
  };

  const handleUpdateDraftModelField = (fieldId, updates) => {
    if (currentModelId) {
      dispatch(updateDraftModelField({
        modelId: currentModelId,
        fieldId,
        updates,
      }));
    }
  };

  const handleSaveDraftModelField = async () => {
    try {
      await saveAllDrafts();
    } catch (error) {
      console.error('Failed to save model:', error);
    }
  };

  const discardChanges = () => {
    dispatch(clearModelDraft());
  };

  return {
    addDataModel: handleAddDataModel,
    draftModelField,
    selectedModelField,
    hasDraftChanges,
    modelFieldsWithDrafts,
    getModelFieldsWithDraftByModelId,

    addFieldToDraft: handleAddFieldToDraft,
    saveDraftModelField: handleSaveDraftModelField,
    updateDraftModelField: handleUpdateDraftModelField,
    discardChanges,
  };
};

const selectDraftModelFieldFn = createSelector(
  [
    (state) => state,
    (_, fieldId) => fieldId,
    (_, __, modelId) => modelId,
  ],
  (state, fieldId, modelId) => selectDraftModelField(state, fieldId, modelId),
);

const selectModelFieldsWithDraftByModelIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectModelFieldsWithDraftByModelId(state, id),
);

