/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Surface } from '@/shared/uiKit/Surface';
import { Stack } from '@/shared/uiKit/Stack';
import { useScreens } from '@/entities/uiScreen';
import { DocumentProvider } from '@/entities/document';
import { TaskProvider } from '@/entities/task';
import { ChatProvider } from '@/entities/chat';
import { EntityContextConnector } from '@/features/entityContextConnector';
import { BlockDetailPanel } from './components/BlockDetailPanel';
import { WidgetPickerPanel } from '@/features/widgetPicker';
import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
import { Divider } from '@/shared/uiKit/Divider';
import { SlotBar, CenterSlot, LeftSlot, RightSlot } from '@/shared/uiKit/SlotBar';
import { Button } from '@/shared/uiKit/Button';
import { ArrowWithLegLeftIcon, SearchIcon } from '@/shared/assets/icons';
import { ScreenWireframeCard } from '@/entities/uiScreen';
import { useWireframe, WireframeProvider } from '../models';
import { AddWireframeBlockButton } from '@/features/uiControls/wireframeControl';
import { ViewerProvider, Viewer, ViewerWindow } from '@/shared/uiKit/Viewer';

export const WireframeCanvas = () => {
  return (
    <ViewerProvider mode="single">
      <WireframeCanvasContent />
    </ViewerProvider>
  );
};

const WireframeCanvasContent = () => {

  const theme = useTheme();

  const { allScreens } = useWireframe();

  return (
    <Surface background={theme.sys.color.surface}>
      <Stack direction='row'>
        <Viewer
          position="right"
          backdrop={false}
          groupId="wireframeBlockDetail"
        >
          <ViewerWindow step={1}>
            <BlockDetailPanel />
          </ViewerWindow>
          <ViewerWindow step={2}>
            <WidgetPickerPanel />
          </ViewerWindow>
        </Viewer>

        <StyledCanvas data-testid="wireframe-canvas">
          {allScreens.map((screen) => {
            return <ScreenWireframeCard
              key={screen.id}
              screen={screen}
              slotAddBlock={<AddWireframeBlockButton screenId={screen.id} />}
            />;
          })}

        </StyledCanvas>

      </Stack>
    </Surface>
  );
};


const StyledCanvas = styled.div`
    width: 100%;
    display: grid;
    padding: 100px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
`;

const StyledWidgetPickerTitle = styled.p`
    font-size: ${({ theme }) => theme.sys.typography.body.xsmall};
    font-weight: ${({ theme }) => theme.sys.typography.weight.bold};
    color: ${({ theme }) => theme.sys.typography.color.primary};
    line-height: 1;
`;


// /** @jsxImportSource @emotion/react */
// import React from 'react';
// import styled from '@emotion/styled';
// import { useTheme } from '@emotion/react';
// import { Surface } from '@/shared/uiKit/Surface';
// import { Stack } from '@/shared/uiKit/Stack';
// import { useScreens } from '@/entities/uiScreen';
// import { DocumentProvider } from '@/entities/document';
// import { TaskProvider } from '@/entities/task';
// import { ChatProvider } from '@/entities/chat';
// import { EntityContextConnector } from '@/features/entityContextConnector';
// import { BlockDetailPanel } from './components/BlockDetailPanel';
// import { WidgetPickerPanel } from '@/features/widgetPicker';
// import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
// import { Divider } from '@/shared/uiKit/Divider';
// import { SlotBar, CenterSlot, LeftSlot, RightSlot } from '@/shared/uiKit/SlotBar';
// import { Button } from '@/shared/uiKit/Button';
// import { ArrowWithLegLeftIcon, SearchIcon } from '@/shared/assets/icons';
// import { ScreenWireframeCard } from '@/entities/uiScreen';
// import { useWireframe, WireframeProvider } from '../models';
// import { AddWireframeBlockButton } from '@/features/uiControls/wireframeControl';
// import { ViewerProvider } from '@/shared/uiKit/Viewer';

// export const WireframeCanvas = () => {
//   return (
//     <ViewerProvider mode="single">
//       <WireframeCanvasContent />
//     </ViewerProvider>
//   )
// }

// const WireframeCanvasContent = () => {

//   const theme = useTheme();

//   const {
//     isBlockDetailMode,
//     allScreens,
//     selectedScreenWithContext,
//     isOpenBlockDetail,
//     isOpenWidgetPicker,
//     openWidgetPickerPanel,
//     closeWidgetPickerPanel,
//   } = useWireframe();

//   return (
//     <Surface background={theme.sys.color.surface}>
//       <Stack direction='row'>
//         {isBlockDetailMode &&
//           <>
//             {isOpenBlockDetail && <BlockDetailPanel />}
//             {isOpenWidgetPicker && <WidgetPickerPanel onClose={closeWidgetPickerPanel} />}
//           </>
//         }
//         <StyledCanvas data-testid="wireframe-canvas">
//           {allScreens.map((screen) => {
//             return <ScreenWireframeCard
//               key={screen.id}
//               screen={screen}
//               onOpenWidgetPicker={openWidgetPickerPanel}
//               onCloseWidgetPicker={closeWidgetPickerPanel}
//               slotAddBlock={<AddWireframeBlockButton screenId={screen.id} />}
//             />;
//           })}

//         </StyledCanvas>

//       </Stack>
//     </Surface>
//   );
// };


// const StyledCanvas = styled.div`
//     width: 100%;
//     display: grid;
//     padding: 100px;
//     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//     gap: 16px;
// `;

// const StyledWidgetPickerTitle = styled.p`
//     font-size: ${({ theme }) => theme.sys.typography.body.xsmall};
//     font-weight: ${({ theme }) => theme.sys.typography.weight.bold};
//     color: ${({ theme }) => theme.sys.typography.color.primary};
//     line-height: 1;
// `;
