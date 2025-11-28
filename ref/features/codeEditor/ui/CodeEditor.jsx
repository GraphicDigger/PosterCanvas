/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { mainColors, colors } from '../../../shared/styles';
import { Surface } from '../../../shared/uiKit/Surface';
import { useCodeEditor } from '../model';
import { CodeSidebar } from '../../sidebarCode';
import { Stack } from '../../../shared/uiKit/Stack';
import { CodeEditorTabs } from './tabs';
import { CodeArea } from './codeArea';
import stackblitz from '@stackblitz/sdk';
import { baseCode } from '../model/constants/basecode';


export const CodeEditor = () => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    activeCode,
    activeTab,
    updateActiveCode,
  } = useCodeEditor();

  const editorRef = useRef(null);
  const vmRef = useRef(null);

  const componentName = activeTab?.name || 'Component';

  const initStackBlitzEditor = () => {
    if (!editorRef.current || !activeCode) {return;}

    stackblitz.embedProject(editorRef.current, {
      title: `${componentName} Editor`,
      description: 'Edit your component',
      template: 'create-react-app',
      files: {
        ...baseCode(activeCode?.name),
        [`${activeCode?.name}.tsx`]: `${activeCode?.content}`,
      },
      settings: {
        compile: { clearConsole: false },
      },
    },
    {
      openFile: `${activeCode?.name}.tsx`,
      height: 500,
      // view: 'editor',
      // hideExplorer: true,
      hideDevTools: true,
      showSidebar: false,
    },
    ).then(vm => {
      // Сохраняем ссылку на VM для возможных взаимодействий
      vmRef.current = vm;
      console.log('[CodeEditor] vm', vmRef.current);

      // Настраиваем обработчики событий
      vm.editor.on('change', () => {
        console.log('Code changed in StackBlitz');
      });
    })
      .catch(error => {
        console.error('Ошибка при инициализации StackBlitz:', error);
      });
  };


  // Эффект для открытия редактора StackBlitz при изменении активного кода
  useEffect(() => {
    if (activeCode && editorRef.current) {
      setTimeout(() => {
        initStackBlitzEditor();
      }, 100);
    }
  }, [activeCode, activeTab?.name]);


  return (
    <Surface background={theme.sys.color.surface}>
      <StackBlitzContainer ref={editorRef} />
    </Surface>
  );
};

// Контейнер для StackBlitz
const StackBlitzContainer = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
`;
