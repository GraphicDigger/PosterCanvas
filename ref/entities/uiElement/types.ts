
export interface ElementOwnership {
    type: string;
    id: string;
}

export interface Attributes {
    id?: string;
    classes?: string[];
    data?: Record<string, string>;
    aria?: Record<string, string>;
  }

export interface ElementStyle {
    [key: string]: string;
}

export interface ElementContent {
    [key: string]: string;
}

export interface ElementProperties {
    style?: ElementStyle;
    content?: ElementContent;
}

export interface ElementEvents {
    [key: string]: string;
}

export interface Element {
    id: string;
    name: string;
    kind: string;
    type?: string;
    ownership: ElementOwnership;
    tag: string;
    properties: ElementProperties;
    attributes?: Attributes;
    events?: ElementEvents;
}

