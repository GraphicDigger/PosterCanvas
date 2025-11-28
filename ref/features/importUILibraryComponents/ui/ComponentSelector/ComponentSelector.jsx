/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Text } from '../../../../shared/uiKit/Text';
import { Checkbox } from '../../../../shared/uiKit/Checkbox';
import { useUILibraryComponents } from '../../../../shared/uiMui';
import { useSelectorComponents } from '../../model';


export const ComponentSelector = () => {
  const {
    selectedComponentsIds,
    handleComponentSelected,
  } = useSelectorComponents();

  const { muiComponents } = useUILibraryComponents();

  return (
    <div css={styles.componentsGrid}>
      {muiComponents.map(component => {
        const Component = component.component;
        return (
          <div
            key={component.id}
            css={[
              styles.componentCard,
              selectedComponentsIds.includes(component.id) && styles.selected,
            ]}
            onClick={() => handleComponentSelected(component.id)}
          >
            <div css={styles.checkboxContainer}>
              <Checkbox
                checked={selectedComponentsIds.includes(component.id)}
                onChange={() => handleComponentSelected(component.id)}
              />
            </div>
            <div css={styles.componentPreview}>
              <Component />
            </div>
            <Text css={styles.componentName}>
              {component.name}
            </Text>
          </div>
        );
      })}
    </div>
  );
};


const styles = {
  componentCard: css`
    padding: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    border: 1px solid #e0e0e0;
    &:hover {
      border-color: #1976d2;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `,
  selected: css`
    border-color: #1976d2;
    background-color: rgba(25, 118, 210, 0.05);
  `,
  componentPreview: css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 4px;
  `,
  componentName: css`
    font-weight: 500;
    text-align: center;
  `,
  checkboxContainer: css`
    position: absolute;
    top: 8px;
    right: 8px;
  `,
  componentsGrid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  `,
};
