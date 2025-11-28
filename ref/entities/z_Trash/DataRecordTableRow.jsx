/** @jsxImportSource @emotion/react */
import React from 'react';
import { TableRow, TableCell } from '../../../shared/uiKit/Table';
import { Text } from '../../../shared/uiKit/Text';
import { useDataRecordStates } from '../model';

export const DataRecordTableRow = ({
  data,
  displayFields,
  onClick,
  minWidth,
  ...props
}) => {
  const {
    handleHover,
    handleSelect,
    isHovered,
    isSelected,
  } = useDataRecordStates(data.id);

  const handleClick = () => {
    handleSelect(data.id);
    if (onClick) {
      onClick();
    }
  };

  return (
    <TableRow
      divider={false}
      size='small'
      selected={isSelected}
      hovered={isHovered}
      onMouseEnter={() => handleHover(data.id)}
      onMouseLeave={() => handleHover(null)}
      onClick={handleClick}
    >
      {displayFields.map((field) => (
        <TableCell key={field.id} minWidth={minWidth}>
          <Text>{data[field.name]}</Text>
        </TableCell>
      ))}
    </TableRow>
  );
};
