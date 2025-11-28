import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { TextField } from './TextField';

// Рекурсивно ищет TextField компоненты в дереве React элементов
const findTextFields = (children) => {
  const textFields = [];

  const traverse = (child) => {
    if (!React.isValidElement(child)) {return;}

    // Проверяем если компонент это TextField
    if (child.type === TextField) {
      textFields.push(child);
      return;
    }

    // Рекурсивно проверяем детей
    if (child.props.children) {
      React.Children.forEach(child.props.children, traverse);
    }
  };

  React.Children.forEach(children, traverse);
  return textFields;
};

// Рекурсивно клонирует элементы, добавляя position к TextField компонентам
const cloneWithPosition = (child, textFieldPositions) => {
  if (!React.isValidElement(child)) {return child;}

  // Если это TextField, применяем позицию
  if (child.type === TextField) {
    const position = textFieldPositions.get(child);
    return React.cloneElement(child, {
      ...child.props,
      position,
    });
  }

  // Рекурсивно обрабатываем детей
  if (child.props.children) {
    const clonedChildren = React.Children.map(child.props.children, (childNode) =>
      cloneWithPosition(childNode, textFieldPositions),
    );

    return React.cloneElement(child, {
      ...child.props,
      children: clonedChildren,
    });
  }

  return child;
};

export const SegmentedField = ({ children, orientation = 'horizontal', ...props }) => {
  // Находим все TextField компоненты
  const textFields = findTextFields(children);

  // Создаем карту позиций для TextField компонентов
  const textFieldPositions = new Map();
  textFields.forEach((textField, index) => {
    let position;
    if (textFields.length === 1) {
      position = undefined; // Одиночный элемент не нуждается в позиции
    } else if (index === 0) {
      position = 'first';
    } else if (index === textFields.length - 1) {
      position = 'last';
    } else {
      position = 'middle';
    }
    textFieldPositions.set(textField, position);
  });

  // Клонируем всех детей, применяя позиции к TextField компонентам
  const clonedChildren = React.Children.map(children, (child) =>
    cloneWithPosition(child, textFieldPositions),
  );

  // Если только один TextField найден, возвращаем детей как есть
  if (textFields.length <= 1) {
    return <>{clonedChildren}</>;
  }

  // Применяем orientation ко всем TextField компонентам
  const finalChildren = React.Children.map(clonedChildren, (child) => {
    if (React.isValidElement(child) && child.type === TextField) {
      return React.cloneElement(child, {
        ...child.props,
        orientation,
        ...props,
      });
    }

    // Рекурсивно применяем orientation к вложенным TextField
    const applyOrientationRecursively = (element) => {
      if (!React.isValidElement(element)) {return element;}

      if (element.type === TextField) {
        return React.cloneElement(element, {
          ...element.props,
          orientation,
          ...props,
        });
      }

      if (element.props.children) {
        const updatedChildren = React.Children.map(element.props.children, applyOrientationRecursively);
        return React.cloneElement(element, {
          ...element.props,
          children: updatedChildren,
        });
      }

      return element;
    };

    return applyOrientationRecursively(child);
  });

  return (
    <SegmentedContainer orientation={orientation}>
      {finalChildren}
    </SegmentedContainer>
  );
};

SegmentedField.propTypes = {
  children: PropTypes.node.isRequired,
};

const SegmentedContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 1px;
    flex-direction: ${({ orientation }) => orientation === 'horizontal' ? 'row' : 'column'};
`;
