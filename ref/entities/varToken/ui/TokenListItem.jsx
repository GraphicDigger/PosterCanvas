import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton } from '../../../shared/uiKit/List';
import { Preview } from '../../../shared/uiKit/Preview';
import { Text } from '../../../shared/uiKit/Text';
import { Stack } from '../../../shared/uiKit/Stack';
import { useToken } from '../model';
import { useTokenValues } from '../../varTokenValue/model';

export const TokenListItem = ({
  id,
  name,
  value,
  onChange,
  onClick,
}) => {

  const { handleSelect, isSelected } = useToken();
  const { tokenValueByTokenId } = useTokenValues();

  const color = tokenValueByTokenId(id)?.value;

  const handleClick = () => {
    handleSelect(id);
    if (onClick) {onClick();}
  };

  return (
    <ListItem>
      <ListItemButton
        isSelected={isSelected}
        onClick={handleClick}
      >
        <Stack direction='row' alignItems='center' gap={2}>
          <Preview backgroundColor={color} size='small' />
          <Text
            editable={true}
            onChange={onChange}
          >
            {name}
          </Text>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

TokenListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  isToken: PropTypes.bool,
};

