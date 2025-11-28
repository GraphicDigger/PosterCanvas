/** @jsxImportSource @emotion/react */
import React, { memo, forwardRef } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { mainColors, lineColors } from '../../styles';
import { Avatar } from '../Avatar';
import { PlusIcon } from '../../assets/icons';
import { getSquareStyles, getCircleStyles } from './Pin.style';
import { MessageInput } from '../MessageInput';
// Pin Message

export const Pin = memo( forwardRef(({
  variant = 'new',
  user,
  onClick,
  isSelected,
  textComment,
  onChangeTextComment,
  onSubmit,
  x = 0,
  y = 0,
}, ref) => {
  const theme = useTheme();
  const blue = theme.ref.palette.primary60;
  const grey = theme.sys.color.outline.highest;

  const getPinPosition = () => {
    return {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(0, -100%)',
    };
  };

  return (
    <PinWrapper style={getPinPosition()} onClick={e => e.stopPropagation()}>
      <StyledPin>
        <StyledCircle variant={isSelected ? 'selected' : variant} onClick={onClick} blue={blue} grey={grey}>
          <StyledPinContentPosition>
            <PinContent variant={isSelected ? 'selected' : variant} user={user} />
          </StyledPinContentPosition>
          <StyledSquare variant={isSelected ? 'selected' : variant} blue={blue} grey={grey} />
        </StyledCircle>
      </StyledPin>
      {variant === 'new' && (
        <StyledMessageInput>
          <MessageInput
            value={textComment}
            onChange={onChangeTextComment}
            onSubmit={onSubmit}
          />
        </StyledMessageInput>
      )}
    </PinWrapper>
  );
}));

const PinContent = memo(({ variant, user }) => {
  if (variant === 'cursor') {return null;}

  return (
    <>
      {variant === 'new'
        ? <PlusIcon color='#fff' />
        : <Avatar
          size="small"
          bgColor={variant === 'new' ? 'transparent' : undefined}
          src={variant !== 'new' ? user?.avatar : undefined}
        />
      }
    </>
  );
});

const PinWrapper = styled.div`
   display: flex;
   gap: 10px;
   z-index: 1000;
   pointer-events: auto;
`;

const StyledPin = styled.div`
    position: relative;
    z-index: 10000;
`;

const StyledPinContentPosition = styled.div`
    position: absolute;
    z-index: 3;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, 50%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

const StyledCircle = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    width: ${props => props.variant === 'cursor' ? '20px' : '30px'};
    height: ${props => props.variant === 'cursor' ? '20px' : '30px'};
    ${props => getCircleStyles(props)}
`;

const StyledSquare = styled.div`
    position: absolute;
    z-index: 2;
    width: ${props => props.variant === 'cursor' ? '10px' : '15px'};
    height: ${props => props.variant === 'cursor' ? '10px' : '15px'};
    ${props => getSquareStyles(props)}
`;

const StyledMessageInput = styled.div`
    min-width: 200px;
`;

Pin.propTypes = {
  variant: PropTypes.oneOf(['cursor', 'new', 'added', 'selected']),
  user: PropTypes.object,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  // Новые пропсы для позиционирования
  x: PropTypes.number,
  y: PropTypes.number,
  absolute: PropTypes.bool,
};
