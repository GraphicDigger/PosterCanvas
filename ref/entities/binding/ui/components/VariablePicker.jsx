import React, { useMemo, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { ENTITY_KINDS, VARIABLE_TYPES } from '@/shared/constants';
import { VariableDataIcon } from '@/shared/assets/icons';
import { Text } from '@/shared/uiKit/Text';
import { List, ListItem, ListItemButton, ListItemText, ListItemEndSlot, ListItemStartSlot } from '@/shared/uiKit/List';
import { Badge } from '@/shared/uiKit/Badge';
import { WindowHead, WindowBody, WindowPopover, WindowTrigger, Window } from '@/shared/uiKit/Window';
import { ActionWrapper, RightAction } from '@/shared/uiKit/ActionWrapper';
import { ButtonToolToggle } from '@/shared/uiKit/ButtonTool';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { PropsIcon, TokenIcon, MinusIcon, VariableIcon, VarPresetIcon } from '@/shared/assets/icons';
import { TokenListItem, TokenBindingButton } from '../../../varToken';
import { PropListItem, useProps } from '../../../varProp';
import { useToken } from '../../../varToken';
import { DataModelFieldPicker } from '../../../dataModelField';
import { useDesignMode } from '../../../mode/editorMode';
import { PICKER_TABS, useVariablePicker } from '../../model';
import { DataVariableListItem } from '../../../varVariableData';


export const VariablePicker = ({
  propertyValue,
  onBind,
  onUnbind,

  width = 'fill',
  onClick,
  window,
  children,
}) => {

  const [pickerType, setPickerType] = useState(PICKER_TABS.TOKENS);

  const { allTokens } = useToken();
  const { selectedComponentProps } = useProps();
  const { isComponentCanvasInDesignMode } = useDesignMode();
  const {
    variables,
    isProp,
    isToken,
    isDataModelField,
    isDataVariable,
  } = useVariablePicker(propertyValue);


  const trigger = useMemo(() => {
    if (isProp) {
      return (
        <ActionWrapper>
          <ListItem>
            <ListItemButton>
              <ListItemText>
                {propertyValue.propName}
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <RightAction onClick={onUnbind}>
            <MinusIcon />
          </RightAction>
        </ActionWrapper>
      );
    }
    if (isToken) {
      return (
        <ActionWrapper>
          <TokenBindingButton token={propertyValue} />
          <RightAction onClick={onUnbind}>
            <MinusIcon />
          </RightAction>
        </ActionWrapper>
      );
    }
    if (isDataModelField) {
      return (
        <ListItem>
          <ListItemButton>
            <ListItemStartSlot>
              <VariableDataIcon />
            </ListItemStartSlot>
            <ListItemText>
              {propertyValue.modelName}
            </ListItemText>
            <ListItemEndSlot spacing={4}>
              <Text color='disabled'>
                {propertyValue.fieldName}
              </Text>
            </ListItemEndSlot>
          </ListItemButton>
        </ListItem>
      );
    }
    if (isDataVariable) {
      return (
        <ListItem>
          <ListItemButton>
            <ListItemText>
              {propertyValue.name}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      );
    }
    return (
      <Badge
        style='dotBind'
        position="top-right"
        showOnHover
      >
        {children}
      </Badge>
    );
  }, [isProp, isToken, isDataModelField, propertyValue, onUnbind, children]);

  const variableList = useMemo(() => {
    if (pickerType === PICKER_TABS.PROPS) {
      return (
        <>
          {selectedComponentProps.map((prop) => {
            return (
              <>
                {prop.type === VARIABLE_TYPES.DATA ? (
                  <DataModelFieldPicker
                    modelId={prop.defaultValue.modelId}
                    onClick={(dataVariable) => onBind(dataVariable)}
                  >
                    <PropListItem prop={prop} />
                  </DataModelFieldPicker>
                ) : (
                  <PropListItem
                    key={prop.id}
                    prop={prop}
                    onClick={() => onBind(prop)}
                  />
                )}
              </>
            );
          })}
        </>
      );
    }

    if (pickerType === PICKER_TABS.TOKENS) {
      return (
        <>
          {allTokens.map((token) => (
            <TokenListItem
              key={token.id}
              id={token.id}
              name={token.name}
              value={token.mode?.value}
              onClick={() => onBind(token)}
            />
          ))}
        </>
      );
    }

    if (pickerType === PICKER_TABS.DATA_VARIABLES) {
      return (
        <>
          {variables.length > 0 ?
            variables.map((variable) => (
              <>
                {variable.type === VARIABLE_TYPES.DATA ? (
                  <DataModelFieldPicker
                    modelId={variable.value.id}
                    onClick={(dataVariable) => onBind(dataVariable)}
                  >
                    <DataVariableListItem variable={variable} />
                  </DataModelFieldPicker>
                ) : (
                  <DataVariableListItem
                    key={variable.id}
                    variable={variable}
                    onClick={() => onBind(variable)}
                  />
                )}
              </>
            ))
            : <>No variables found</>
          }
        </>
      );
    }

    if (pickerType === PICKER_TABS.GLOBAL_VARIABLES) {
      return (
        <> Global Variables </>
      );
    }

    if (pickerType === PICKER_TABS.PRESETS) {
      return (
        <> Preset </>
      );
    }
    return null;

  }, [
    pickerType,
    selectedComponentProps,
    allTokens,
    variables,
    onBind,
  ]);

  return (
    <Wrapper width={width}>
      <WindowPopover
        placement='left-start'
        offset={window?.offset || 16}
        flip={true}
        shift={true}
        closeOnSelect={false}
      >
        <WindowTrigger>
          {trigger}
        </WindowTrigger>
        <Window>
          <WindowHead paddingLeft={4}>
            <ButtonToolToggle
              style='tertiary'
              value={pickerType}
              onChange={setPickerType}
            >
              <ButtonTool value={PICKER_TABS.TOKENS}>
                <TokenIcon />
              </ButtonTool>
              {isComponentCanvasInDesignMode && (
                <ButtonTool value={PICKER_TABS.PROPS}>
                  <PropsIcon />
                </ButtonTool>
              )}
              {/* <ButtonTool value={PICKER_TABS.PRESETS}>
                                <VarPresetIcon />
                            </ButtonTool> */}
              <ButtonTool value={PICKER_TABS.DATA_VARIABLES}>
                <VariableIcon />
              </ButtonTool>
            </ButtonToolToggle>
          </WindowHead>
          <WindowBody>
            <List>
              {variableList}
            </List>
          </WindowBody>
        </Window>
      </WindowPopover >
    </Wrapper>
  );
};

const Wrapper = styled.div`
    position: relative;
    width: ${({ width }) => {
    if (typeof width === 'number') { return `${width}px`; }
    if (width === 'fill') { return '100%'; }
    if (width === 'fit') { return 'max-content'; }
    return width;
  }};
`;
