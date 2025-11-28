/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Table, TableHead, TableBody, TableText } from '../../../../shared/uiKit/TableNew';
import { PlusIcon } from '../../../../shared/assets/icons';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { usePresetCollections } from '../../../../entities/varPresetCollection';
import { usePresets, usePresetMutation } from '../../../../entities/varPreset';
import { useTokenAndPresetControl, AddVariableMode } from '../../../../features/TokenAndPresetControl';
import { VARIABLE_MODE_TYPE, useVariableModes } from '../../../../entities/varMode';
import { usePresetManager, PRESET_MANAGER_SIDEBAR_MODES } from '../../model';
import { EmptyCollection } from './EmptyCollection';
import { usePresetModeValueMutation } from '../../../../entities/varPresetModeValue';
import { usePresetStates } from '../../../../entities/varPreset';

export const ManagerPresetTable = () => {
  const { setMode } = usePresetManager();
  const { selectedPresetCollectionId } = usePresetCollections();
  const { collectionPresetsAndModes } = usePresets();
  const { updatePreset } = usePresetMutation();
  const { updatePresetModeValue } = usePresetModeValueMutation();
  const { handleSelect } = usePresetStates();

  const { modes, presets } = collectionPresetsAndModes;
  const defaultMode = modes.find(m => m.isDefault);

  const handleOpenPropertyList = (presetId) => {
    handleSelect(presetId);
    setMode(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST);
  };

  const handleEditPreset = (presetId, value) => {
    // console.log('🔄 handleEditPreset called:', { presetId, value });
    updatePreset({ id: presetId, updates: { name: value } });
  };

  const handleEditPresetValue = (presetId, modeId, key, value) => {
    // console.log('🔄 handleEditPresetValue called:', { presetId, modeId, key, value });
    // console.log('🔍 Looking for presetModeValue with:', { presetId, modeId });
    updatePresetModeValue(presetId, modeId, { [key]: value });
  };


  // prepare data - flatten presets with their properties
  const tableData = useMemo(() => {
    const data = [];
    presets.forEach(preset => {
      const defaultValue = defaultMode ? preset.modeValues[defaultMode.id] : null;
      const propertyKeys = defaultValue ? Object.keys(defaultValue).sort( (a, b) => a.localeCompare(b) ) : [];

      // Add preset name row
      data.push({
        id: JSON.stringify({
          type: 'preset',
          presetId: preset.id,
        }),
        type: 'preset',
        presetId: preset.id,
        name: preset.name,
        propertyKey: null,
        modeValues: preset.modeValues,
        defaultMode: defaultMode,
      });

      // Add property rows
      propertyKeys.forEach(key => {
        data.push({
          id: JSON.stringify({
            type: 'property',
            presetId: preset.id,
            propertyKey: key,
          }),
          type: 'property',
          presetId: preset.id,
          name: key,
          propertyKey: key,
          modeValues: preset.modeValues,
          defaultMode: defaultMode,
        });
      });

      // Add "Add Property" row after all properties
      data.push({
        id: JSON.stringify({
          type: 'addProperty',
          presetId: preset.id,
        }),
        type: 'addProperty',
        presetId: preset.id,
        name: 'Add Property',
        propertyKey: null,
        modeValues: null,
        defaultMode: null,
      });
    });
    return data;
  }, [presets, defaultMode]);

  // console.log('🔍 tableData', tableData)
  // console.log('🔍 modes', modes)

  // prepare columns
  const tableColumns = useMemo(() => {
    const columns = [
      {
        key: 'name',
        title: 'Name',
        minWidth: 200,
        sortable: true,
        render: (value, record) => {
          if (record.type === 'preset') {
            return (
              <TableText
                rowId={record.id}
                columnKey="name"
                cellId={`${record.id}-name`}
                editable={true}
              >
                {record.name}
              </TableText>
            );
          } else if (record.type === 'addProperty') {
            return (
              <ButtonTool onClick={() => handleOpenPropertyList(record.presetId)}>
                <PlusIcon />
              </ButtonTool>
            );
          } else {
            return (
              <TableText
                rowId={record.id}
                columnKey={`${record.propertyKey}`}
                cellId={`${record.id}-${record.propertyKey}`}
                editable={false}
              >
                {record.name}
              </TableText>
            );
          }
        },
      },
    ];

    // add columns for each mode
    modes.forEach(mode => {
      columns.push({
        key: mode.id,
        title: mode.name,
        minWidth: 200,
        sortable: true,
        render: (value, record) => {
          if (record.type === 'preset' || record.type === 'addProperty') {
            return null;
          } else {
            const currentValue = record.modeValues[mode.id];
            const value = currentValue?.[record.propertyKey] ?? record.modeValues[record.defaultMode?.id]?.[record.propertyKey];
            return (
              <TableText
                columnKey={mode.id}
                rowId={record.id}
                cellId={`${record.id}-${mode.id}`}
                editable={true}
              >
                {value ?? '-'}
              </TableText>
            );
          }
        },
      });
    });

    // last column
    columns.push({
      key: 'addMode',
      title: (
        <AddVariableMode
          type={VARIABLE_MODE_TYPE.PRESET_MODE}
          collectionId={selectedPresetCollectionId}
        />
      ),
      minWidth: 100,
      sortable: false,
      render: (value, record) => {
        if (record.type === 'preset') {
          return null;
        } else if (record.type === 'addProperty') {
          return null;
        }
        return null;
      },
    });

    return columns;
  }, [modes, defaultMode, selectedPresetCollectionId]);

  const handleCellEdit = ({ rowId, columnKey, newValue }) => {
    // console.log('🔧 handleCellEdit called:', { rowId, columnKey, newValue });

    try {
      const rowData = JSON.parse(rowId);
      // console.log('📊 Parsed rowData:', rowData);

      if (rowData.type === 'preset') {
        // console.log('📝 Editing preset name:', { presetId: rowData.presetId, newValue });
        handleEditPreset(rowData.presetId, newValue);
      } else if (rowData.type === 'property') {
        // console.log('📝 Editing property value:', { presetId: rowData.presetId, propertyKey: rowData.propertyKey, modeId: columnKey, newValue });
        handleEditPresetValue(rowData.presetId, columnKey, rowData.propertyKey, newValue);
      }
    } catch (error) {
      console.error('❌ Error parsing rowId:', error, rowId);
    }
  };

  const handleSort = (sorting) => {
    // add logic to sort data
  };

  if (!selectedPresetCollectionId) {return <EmptyCollection />;}

  return (
    <StyledContent>
      <Table
        data={tableData}
        columns={tableColumns}
        // functionality
        sortable={true}
        checkable={false}
        editable={true}
        scrollable={true}
        // event handlers
        onSort={handleSort}
        onEdit={handleCellEdit}
        // states
        loading={false}
        error={null}
        emptyMessage={
          <>
            This collection doesn't have any presets yet.
          </>
        }

      >
        <TableHead size='large' />
        <TableBody size='small' />
      </Table>
    </StyledContent>
  );
};

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 16px 0 0;
`;
