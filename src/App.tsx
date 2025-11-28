import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { Canvas } from './features/canvas/Canvas';
import { addObject, type SceneObject } from './app/store/editorSlice';
import { type RootState } from './app/store';

function App() {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.editor.selectedId);

  const handleAddRect = () => {
    const newRect: SceneObject = {
      id: Date.now().toString(),
      type: 'rect',
      x: Math.random() * 400,
      y: Math.random() * 400,
      width: 100,
      height: 100,
      fill: '#' + Math.floor(Math.random()*16777215).toString(16),
      rotation: 0,
    };
    dispatch(addObject(newRect));
  };

    const handleAddCircle = () => {
    const newCircle: SceneObject = {
      id: Date.now().toString(),
      type: 'circle',
      x: Math.random() * 400,
      y: Math.random() * 400,
      width: 100,
      height: 100,
      fill: '#' + Math.floor(Math.random()*16777215).toString(16),
      rotation: 0,
    };
    dispatch(addObject(newCircle));
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', background: '#333', color: 'white', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={handleAddRect}>Add Rect</button>
        <button onClick={handleAddCircle}>Add Circle</button>
        <div>
            {selectedId ? `Selected: ${selectedId}` : 'No Selection'}
        </div>
      </header>
      <main style={{ flex: 1, overflow: 'hidden' }}>
        <Canvas />
      </main>
    </div>
  );
}

export default App
