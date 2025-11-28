/** @jsxImportSource @emotion/react */
import React from 'react';
import { TableRow, TableCell } from '../../../../shared/uiKit/Table';
import { Text } from '../../../../shared/uiKit/Text';

export const PresetTableRow = ({ properties }) => {
  if (!Array.isArray(properties) || properties.length === 0) {
    return null;
  }

  const firstMode = properties[0] || {};
  const propertyNames = Object.keys(firstMode);

  return (
    <>
      {propertyNames.map(propName => (
        <TableRow divider={false} size='small' key={propName}>
          <TableCell width='200px'>
            <Text>{propName}</Text>
          </TableCell>
          {properties.map((modeValue, index) => (
            <TableCell width='200px' key={index}>
              <Text editable>
                {modeValue && modeValue[propName] ? modeValue[propName] : '-'}
              </Text>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
