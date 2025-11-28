/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { IFrameBridgeService, IFrameInteractionService, FocusInteraction, IFrameSyncService } from '@/shared/services/iFrame';
import { setFocusedElementId, resetFocusedElementId, resetSelectedElementId, setSelectedElementId } from '@/entities/uiElement';
import { useIFrameContent, } from '../model';
import { FocusOverlay } from './components/FocusOverlay';
import { useFocusEntityBounds } from '@/entities/uiFocus';

export const IFrame = ({ uiTree }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const iframeRef = useRef(null);
    const bridgeRef = useRef(null);
    const interactionStrategyRef = useRef(null);
    const syncServiceRef = useRef(null);

    const [isReady, setIsReady] = useState(false);

    const { iframeContent } = useIFrameContent();

    const isDevMode = process.env.NODE_ENV === 'development';
    const LOG = {
        info: (...msg) => isDevMode && console.log('[✍️ UI-ED] I:', ...msg),
        warn: (...msg) => isDevMode && console.warn('[✍️ UI-ED] W:', ...msg),
        error: (...msg) => isDevMode && console.error('[✍️ UI-ED] E:', ...msg),
    };

    // Keep track of latest elements for callbacks / Отслеживание последних элементов для колбэков
    const empty = []
    const tree = useMemo(() => uiTree ?? empty, [uiTree]);
    const treeRef = useRef(tree);
    useEffect(() => {
        treeRef.current = tree
    }, [tree]);

    const {
        bounds: focusBounds,
        focusEntity
    } = useFocusEntityBounds({
        bridge: bridgeRef.current,
        iframeRef,
    });

    // хендлер обрабатывается в feature/eventMiddleware
    const handleElementFocusedRef = useRef((ids) => {
        const id = ids?.[0];
        if (!id) return;
        dispatch(setFocusedElementId(id));
        dispatch(setSelectedElementId(id));
    });

    const handleCanvasFocusedRef = useRef(() => {
        dispatch(resetFocusedElementId());
        dispatch(resetSelectedElementId());
    });


    // Initialize Bridge when IFrame loads / Инициализация Bridge при загрузке IFrame
    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleLoad = () => {
            const bridge = new IFrameBridgeService(iframe);
            bridgeRef.current = bridge;

            const interactionStrategy = new IFrameInteractionService(bridge);
            interactionStrategyRef.current = interactionStrategy;

            const focusStrategy = new FocusInteraction(
                handleElementFocusedRef.current,
                handleCanvasFocusedRef.current
            );
            interactionStrategy.setStrategy(focusStrategy);

            const syncService = new IFrameSyncService(bridge, () => {
                const treeElements = treeRef.current || [];
                // LOG.info('Getting elements from Redux (via Ref), count:', treeElements.length);
                return treeElements.map(element => {
                    // Get properties - they should already be in correct structure
                    const properties = element.properties || {};
                    const attributes = element.attributes || {};

                    const serialized = {
                        id: element.id,
                        tag: element.tag,
                        properties: {
                            style: properties.style || {},
                            content: properties.content || {},
                        },
                        attributes: {
                            id: attributes.id,
                            class: attributes.classes,
                        },
                        children: element.children || []
                    };

                    // LOG.info('Serialized element:', element.id, 'style keys:', Object.keys(serialized.properties.style), 'content:', serialized.properties.content);
                    return serialized;
                });
            });
            syncServiceRef.current = syncService;
            syncService.initialize();

            // Subscribe to SANDBOX_READY event / Подписка на событие SANDBOX_READY
            bridge.on('SANDBOX_READY', (payload) => {
                LOG.info('Sandbox is ready (via Bridge)', payload);
                setIsReady(true);
            });

            bridge.on('ERROR', (error) => {
                LOG.error('Error from sandbox', error);
            });
        };

        iframe.addEventListener('load', handleLoad);

        return () => {
            iframe.removeEventListener('load', handleLoad);

            if (syncServiceRef.current) {
                syncServiceRef.current.destroy();
                syncServiceRef.current = null;
            }

            if (interactionStrategyRef.current) {
                interactionStrategyRef.current.destroy();
                interactionStrategyRef.current = null;
            }

            if (bridgeRef.current) {
                bridgeRef.current.destroy();
                bridgeRef.current = null;
            }
        };
    }, [dispatch]);

    // Auto-sync elements when they change / Автоматическая синхронизация при изменении элементов
    useEffect(() => {
        if (syncServiceRef.current && isReady) {
            syncServiceRef.current.syncElements();
        }
    }, [tree, isReady]);

    return (
        <>
            <StyledContainer>
                <StyledIframe
                    ref={iframeRef}
                    title="UI Editor Sandbox"
                    srcDoc={iframeContent}
                    sandbox="allow-scripts allow-same-origin"
                />
                {!isReady && <LoadingOverlay>Loading Sandbox...</LoadingOverlay>}
            </StyledContainer>

            {bridgeRef.current && <FocusOverlay bounds={focusBounds} entityKind={focusEntity?.kind} />}
        </>
    );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme }) => theme.sys?.color?.surface || '#FFFFFF'};
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  font-family: system-ui;
  color: #666;
`;
