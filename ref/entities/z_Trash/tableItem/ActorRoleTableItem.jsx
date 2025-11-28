import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useActorRoleStates } from '../../../model';
import { TableRow, TableCell } from '../../../../../shared/uiKit/TableNew';

export const ActorRoleTableItem = forwardRef(({
  onClick,
  actorRole,
  position,
  actorType,
}, ref) => {

  const {
    isFocused,
    isSelected,
    handleHover,
    handleFocus,
    handleSelect,
  } = useActorRoleStates(actorRole.id);

  const handleClick = (rowId) => {
    handleSelect(actorRole.id);
    if (onClick) {
      onClick();
    }
  };

  return (
    <TableRow
      ref={ref}
      key={actorRole.id}
      rowId={actorRole.id}
      data={{ role: actorRole, position, actorType }}
      onClick={handleClick}
    >
      <TableCell
        cellId={`${actorRole.id}-role`}
        rowId={actorRole.id}
        columnKey="role"
      >
        {actorRole.name}
      </TableCell>
      <TableCell
        cellId={`${actorRole.id}-actorType`}
        rowId={actorRole.id}
        columnKey="actorType"
      >
        {actorType}
      </TableCell>
      <TableCell
        cellId={`${actorRole.id}-position`}
        rowId={actorRole.id}
        columnKey="position"
      >
        {position?.name}
      </TableCell>
    </TableRow>
  );
});

