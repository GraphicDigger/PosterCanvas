
export interface Screen {
    id: string;
    name: string;
    kind: string;
    preview?: string;
    doc?: string;
    componentIds?: string[];
    elementIds?: string[];
    codesIds?: string[];
    wireframeBlockIds?: string[];
}
