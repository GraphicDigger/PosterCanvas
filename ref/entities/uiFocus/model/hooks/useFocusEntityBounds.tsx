/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { IFrameBridgeService } from '@/shared/services/iFrame/IFrameBridgeService';
import { IFrameMessageType } from '@/shared/services/iFrame/constants';
import { useFocusEntity } from './useFocusEntity';

interface FocusedElementBounds {
    left: number;
    top: number;
    width: number;
    height: number;
}

interface UseFocusBoundsProps {
    bridge: IFrameBridgeService | null;
    iframeRef: React.RefObject<HTMLIFrameElement>;
}

export const useFocusEntityBounds = ({
    bridge,
    iframeRef
}: UseFocusBoundsProps) => {
    const { focusEntity } = useFocusEntity();
    const [bounds, setBounds] = useState<FocusedElementBounds | null>(null);

    // Manage visual focus tracking directly via Bridge / Управление визуальным отслеживанием фокуса напрямую через Bridge
    useEffect(() => {
        if (!bridge) return;

        // 1. Listen for bounds updates from Iframe / Слушаем обновление границ от Iframe
        const handleBoundsUpdate = (payload: { elementId: string; bounds: FocusedElementBounds }) => {
            setBounds(payload.bounds);
        };

        // 3. Listen for focus clear / Слушаем очистку фокуса
        const handleClearFocus = () => {
            bridge.send(IFrameMessageType.CLEAR_FOCUS, {});
            setBounds(null);
        }

        bridge.on(IFrameMessageType.ELEMENT_BOUNDS_UPDATE, handleBoundsUpdate);
        bridge.on(IFrameMessageType.CANVAS_CLICKED, handleClearFocus);
        bridge.on(IFrameMessageType.CLEAR_FOCUS, handleClearFocus);

        return () => {
            bridge.off(IFrameMessageType.ELEMENT_BOUNDS_UPDATE, handleBoundsUpdate);
            bridge.off(IFrameMessageType.CANVAS_CLICKED, handleClearFocus);
            bridge.off(IFrameMessageType.CLEAR_FOCUS, handleClearFocus);
        };
    }, [bridge]);

    // Calculate absolute bounds considering iframe position / Вычисление абсолютных границ с учетом позиции iframe
    const absoluteBounds = bounds && iframeRef.current ? (() => {
        const iframeRect = iframeRef.current.getBoundingClientRect();
        return {
            left: iframeRect.left + bounds.left,
            top: iframeRect.top + bounds.top,
            width: bounds.width,
            height: bounds.height,
        };
    })() : null;

    return {
        bounds: absoluteBounds,
        focusEntity,
    };
};
