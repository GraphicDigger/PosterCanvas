/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../../../app/providers';
import { ImportIcon, ArrowWithLegLeftIcon } from '../../../shared/assets/icons';
import { Dialog, DialogTrigger, DialogWindow, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '../../../shared/uiKit/Dialog';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { Stack } from '../../../shared/uiKit/Stack';
import { SlotBar, LeftSlot, CenterSlot, RightSlot } from '../../../shared/uiKit/SlotBar';
import { Text } from '../../../shared/uiKit/Text';
import { Button } from '../../../shared/uiKit/Button';

import { CodebaseDialog } from './codebase';
import { FigmaDialog } from './figma';
import { WebScanDialog } from './webscan';
import { MainDialog } from './main';
import { CONTENT_TYPES } from '../../../widgets/projectExplorerSidebar/model';

export const ImporterDialog = () => {

  const [contentType, setContentType] = useState(CONTENT_TYPES.MAIN);
  const isMainDialog = contentType === CONTENT_TYPES.MAIN;
  const handleBack = () => {
    setContentType(CONTENT_TYPES.MAIN);
  };

  const renderContent = () => {
    switch (contentType) {
    case CONTENT_TYPES.CODEBASE:
      return <CodebaseDialog />;
    case CONTENT_TYPES.FIGMA:
      return <FigmaDialog />;
    case CONTENT_TYPES.WEB_SCAN:
      return <WebScanDialog />;
    case CONTENT_TYPES.URL:
      return <WebScanDialog />;
    case CONTENT_TYPES.MAIN:
    default: return <MainDialog setContentType={setContentType} />;
    }
  };

  const dialogTitle = () => {
    switch (contentType) {
    case CONTENT_TYPES.CODEBASE:
      return 'Importing the project codebase';
    case CONTENT_TYPES.FIGMA:
      return 'Importing design from Figma';
    case CONTENT_TYPES.WEB_SCAN:
      return 'Scan image';
    case CONTENT_TYPES.URL:
      return 'Scan page by URL';
    case CONTENT_TYPES.MAIN:
      return 'Main';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonTool >
          <ImportIcon />
        </ButtonTool>
      </DialogTrigger>
      <ThemeProvider forceDark>
        <DialogWindow width={500}>
          <DialogHeader>
            <SlotBar padding={2}>
              <LeftSlot padding={0} >
                {isMainDialog ? (
                  <Stack gap={2} padding={1}>
                    <ImportIcon />
                    <DialogTitle>
                      {CONTENT_TYPES.MAIN}
                    </DialogTitle>
                  </Stack>
                ) : (
                  <Button onClick={handleBack} variant='blank' stretch startIcon={<ArrowWithLegLeftIcon />}>
                    {CONTENT_TYPES.MAIN}
                  </Button>
                )}
              </LeftSlot>
              {!isMainDialog && (
                <CenterSlot>
                  <Text>{dialogTitle()}</Text>
                </CenterSlot>
              )}
            </SlotBar>
          </DialogHeader>
          <DialogBody>
            {renderContent()}
          </DialogBody>
          <DialogFooter>
            <Button >
                            Сontinue
            </Button>
          </DialogFooter>
        </DialogWindow>
      </ThemeProvider>
    </Dialog>
  );
};

