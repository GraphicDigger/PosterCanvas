// UI Component Entity Types
import { ENTITY_KINDS } from '../../shared/constants';

// Base Component interface
export interface Component {
  id: string;
  name: string;
  kind: string;
  artboard?: {
    width?: string;
    height?: string;
    display?: string;
    flexDirection?: string;
    backgroundColor?: string;
    alignItems?: string;
    justifyContent?: string;
    padding?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Redux State Types
export interface ComponentUIState {
  hoveredComponentId: string | null;
  focusedComponentId: string | null;
  selectedComponentId: string | null;
}

export interface ComponentState {
  ids: string[];
  entities: Record<string, Component>;
  ui: ComponentUIState;
}

// Action Payload Types
export interface SetComponentsPayload {
  components: Component[];
}

export interface AddComponentPayload {
  component: Component;
}

export interface UpdateComponentPayload {
  id: string;
  updates: Partial<Component>;
}

export interface RemoveComponentPayload {
  componentId: string;
}

// API Response Types
export interface ComponentApiResponse {
  components: Component[];
}

// Selector Types
export interface ComponentCheckStates {
  isSelected: boolean;
  isFocused: boolean;
  isHovered: boolean;
}
