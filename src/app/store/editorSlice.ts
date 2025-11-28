import { createSlice } from '@reduxjs/toolkit';

export interface SceneObject {
  id: string;
  type: 'rect' | 'circle';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  rotation: number;
}

interface EditorState {
  canvasSize: { width: number; height: number };
  objects: SceneObject[];
  selectedId: string | null;
}

const initialState: EditorState = {
  canvasSize: { width: 800, height: 600 },
  objects: [
    { id: '1', type: 'rect', x: 100, y: 100, width: 200, height: 150, fill: '#ff0000', rotation: 0 },
    { id: '2', type: 'circle', x: 400, y: 300, width: 100, height: 100, fill: '#0000ff', rotation: 0 },
  ],
  selectedId: null,
};


export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addObject: (state, action) => {
      state.objects.push(action.payload);
    },
    updateObject: (state, action) => {
      const index = state.objects.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.objects[index] = { ...state.objects[index], ...action.payload.changes };
      }
    },
    selectObject: (state, action) => {
      state.selectedId = action.payload;
    },
    setCanvasSize: (state, action) => {
        state.canvasSize = action.payload;
    }
  },
});

export const { addObject, updateObject, selectObject, setCanvasSize } = editorSlice.actions;
export default editorSlice.reducer;

