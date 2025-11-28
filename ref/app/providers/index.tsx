/** @jsxImportSource @emotion/react */
import { ComponentType, FC } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { InitializationProvider } from './Initialization';
import { QueryProvider } from './QueryProvider';
import { EventBusProvider } from './EventBusProvider';
import { EventActivityProvider } from './EventActivityProvider';
import { EventNotificationProvider } from './EventNotificationProvider';
import { DocumentProvider } from '@/entities/document';
import { TaskProvider } from '@/entities/task';
import { ChatProvider } from '@/entities/chat';
import { ContextLinkProvider } from '@/entities/entityContextLink';
import { WireframeProvider } from '@/widgets/screenWireframeCanvas';
import { EntityContextConnectorProvider } from '@/features/entityContextConnector';
import { EntityManagePanelProvider } from '@/features/multiEntityManagePanel';
import { ViewerProvider } from '@/shared/uiKit/Viewer';
import { DefaultWidgetsProvider } from '@/shared/uiEditorDefaults/widgets';
import { UserProvider } from '@/entities/actorUser';
import { AuthProvider } from './AuthProvider';

// about .cursor/rules/doc.DataAccessLayer.mdc
// import { RepositoryProvider } from './repository';

export const Providers = (Component: ComponentType): FC => () => (
    <QueryProvider>
        <ThemeProvider>
            <EventBusProvider>
                <EventActivityProvider>
                    <EventNotificationProvider>
                        <InitializationProvider>
                            <ViewerProvider mode="sequential">
                                <DefaultWidgetsProvider value={{}}>
                                    <WireframeProvider value={{}}>
                                        <EntityContextConnectorProvider value={{}}>
                                            <EntityManagePanelProvider value={{}}>
                                                <UserProvider value={{}}>
                                                    <DocumentProvider value={{}}>
                                                        <TaskProvider value={{}}>
                                                            <ChatProvider value={{}}>
                                                                <ContextLinkProvider value={{}}>
                                                                    <AuthProvider>
                                                                        <Component />
                                                                    </AuthProvider>
                                                                </ContextLinkProvider>
                                                            </ChatProvider>
                                                        </TaskProvider>
                                                    </DocumentProvider>
                                                </UserProvider>
                                            </EntityManagePanelProvider>
                                        </EntityContextConnectorProvider>
                                    </WireframeProvider>
                                </DefaultWidgetsProvider>
                            </ViewerProvider>
                        </InitializationProvider>
                    </EventNotificationProvider>
                </EventActivityProvider>
            </EventBusProvider>
        </ThemeProvider>
    </QueryProvider>
);

export { ThemeProvider } from './ThemeProvider';
export { InitializationProvider } from './Initialization';
// export { useRepositories } from './repository';
