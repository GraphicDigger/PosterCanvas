/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useFocusEntity } from '../../../../entities/uiFocus';
import { useInstanceStates } from '../../../../entities/uiInstance';
import { useElementStates } from '../../../../entities/uiElement';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { Artboard } from './artboard';
import { useBoundVariableValue } from '../../../../entities/binding';

export const UIWrapper = ({
  children,
  ui,
  className,
}) => {

  const containerRef = useRef(null);
  const { setFocused } = useFocusEntity();
  const { handleSelect: handleSelectInstance } = useInstanceStates();

  const instance = ui?.kind === ENTITY_KINDS.INSTANCE ? ui : null;
  const component = ui?.kind === ENTITY_KINDS.COMPONENT ? ui : null;

  // Получаем handleSelectElement для родительского элемента
  const parentElementId = instance?.ownership?.id;
  const { handleSelect: handleSelectElement } = useElementStates(parentElementId);

  const handleClick = useCallback((e) => {
    e.stopPropagation();

    if (instance) {
      // Если инстанс находится внутри элемента, выбираем родительский элемент
      if (instance.ownership?.type === ENTITY_KINDS.ELEMENT) {
        handleSelectElement(parentElementId);
        setFocused({ id: parentElementId, kind: ENTITY_KINDS.ELEMENT });
      } else {
        handleSelectInstance(instance.id);
        setFocused({
          id: instance.id,
          kind: ENTITY_KINDS.INSTANCE,
        });
      }
    }
  }, [instance, setFocused, handleSelectInstance, handleSelectElement, parentElementId]);


  if (component) {
    return (
      <StyledContainer className={className}>
        <Artboard>
          <React.Fragment>
            {children}
          </React.Fragment>
        </Artboard>
      </StyledContainer>
    );
  }

  if (instance) {
    // Получаем стили для инстанса (если у него есть properties)
    const { styles: instanceStyles } = instance.properties ? useBoundVariableValue(instance.id) : { styles: {} };

    return (
      <StyledInstanceProxy
        ref={containerRef}
        onClick={handleClick}
        className={className}
        style={instanceStyles}
        data-instance-id={instance?.id}
        data-instance-name={instance?.name}
        data-ui-id={instance?.id}
      >
        {children}
      </StyledInstanceProxy>
    );
  }

};

const StyledInstanceProxy = styled.div`
  position: relative;
  display: contents;
  ${({ style }) => style && css`${style}`};
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  width: 500px;
  height: 500px;
  background-color: #FFFFFF;
`;


UIWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  component: PropTypes.object,
  instance: PropTypes.object,
  isComponentMode: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  backgroundColor: PropTypes.string,
  showGrid: PropTypes.bool,
  onSizeChange: PropTypes.func,
  className: PropTypes.string,
};
