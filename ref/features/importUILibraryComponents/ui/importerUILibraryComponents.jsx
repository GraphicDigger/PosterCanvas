/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../../../app/providers';
import { PlusIcon } from '../../../shared/assets/icons';
import { Dialog, DialogTrigger, DialogWindow, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../../../shared/uiKit/Dialog';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { Button } from '../../../shared/uiKit/Button';
import { SlotBar, LeftSlot, CenterSlot } from '../../../shared/uiKit/SlotBar';
import { ArrowWithLegLeftIcon } from '../../../shared/assets/icons';

import { LibrarySelector } from './LibrarySelector';
import { ComponentSelector } from './ComponentSelector';
import { useImporterSteps } from '../model';
import { useImportComponents, useSelectorComponents } from '../model';
import { useDesignMode } from '../../../entities/mode/editorMode';

export const ImporterUILibraryComponents = () => {

  const { currentStep, handleBack } = useImporterSteps();
  const { selectedComponentsIds } = useSelectorComponents();
  const { handleImportComponents } = useImportComponents();
  const { setComponentCanvasInDesignMode } = useDesignMode();

  const handleImport = () => {
    handleImportComponents();
  };

  const handleSetComponentCanvasInDesignMode = () => {
    setComponentCanvasInDesignMode();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonTool onClick={handleSetComponentCanvasInDesignMode}>
          <PlusIcon />
        </ButtonTool>
      </DialogTrigger>
      <ThemeProvider forceDark>
        <DialogWindow width={600}>
          <DialogHeader>
            <SlotBar>
              <LeftSlot padding={0}>
                {currentStep === 'librarySelection'
                  ? <DialogTitle>UI Libraries</DialogTitle>
                  : <Button startIcon={<ArrowWithLegLeftIcon />} variant="blank" color="default" onClick={handleBack}>UI Libraries</Button>}
              </LeftSlot>
              <CenterSlot>
                <DialogTitle>
                  {currentStep === 'librarySelection'
                    ? 'Select UI Library'
                    : 'Select Components'}
                </DialogTitle>
              </CenterSlot>
            </SlotBar>
          </DialogHeader>
          <DialogBody>
            {currentStep === 'librarySelection' && (
              <LibrarySelector />
            )}

            {currentStep === 'componentSelection' && (
              <ComponentSelector />
            )}
          </DialogBody>
          <DialogFooter>

            {currentStep === 'componentSelection' && (
              <Button
                color="primary"
                onClick={handleImport}
                disabled={!selectedComponentsIds || selectedComponentsIds.length === 0}
              >
                Import Components
              </Button>
            )}
          </DialogFooter>
        </DialogWindow>
      </ThemeProvider>
    </Dialog>
  );
};

