// Focus overlay component / Компонент наложения фокуса
import { FocusedElementBounds } from '../../../../shared/services/iFrame/EditorFocusService';
import styled from '@emotion/styled';
import { ENTITY_KINDS } from '../../../../shared/constants';

interface FocusOverlayProps {
    bounds: FocusedElementBounds | null;
    entityKind?: string;
}

export const FocusOverlay = ({ bounds, entityKind }: FocusOverlayProps) => {
    if (!bounds) return null;

    return (
        <StyledFocusOverlay
            style={{
                left: bounds.left - 2,
                top: bounds.top - 2,
                width: bounds.width + 4,
                height: bounds.height + 4,
            }}
        >
            <FocusFrameBorder entityKind={entityKind} />
        </StyledFocusOverlay>
    );
};

const StyledFocusOverlay = styled.div`
    position: fixed;
    pointer-events: none;
    z-index: 1000;
`;

const FocusFrameBorder = styled.div<{ entityKind?: string }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid ${({ entityKind }) => {
        switch (entityKind) {
            case ENTITY_KINDS.INSTANCE:
                return '#8B5CF6'; // Фиолетовый для инстансов
            case ENTITY_KINDS.COMPONENT:
                return '#10B981'; // Зеленый для компонентов
            case ENTITY_KINDS.ELEMENT:
            case ENTITY_KINDS.TEXT_ELEMENT:
                return '#007AFF'; // Синий для элементов
            default:
                return '#007AFF'; // Синий по умолчанию
        }
    }};
    border-radius: 2px;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
    background: transparent;
`;