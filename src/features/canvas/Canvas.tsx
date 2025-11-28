import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CanvasService } from '../../shared/services/CanvasService';
import { selectObject } from '../../app/store/editorSlice';
import type { RootState } from '../../app/store';

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const serviceRef = useRef<CanvasService>(new CanvasService());

  const dispatch = useDispatch();

  const objects = useSelector((state: RootState) => state.editor.objects);
  const selectedId = useSelector((state: RootState) => state.editor.selectedId);
  const canvasSize = useSelector((state: RootState) => state.editor.canvasSize);

  useEffect(() => {
    const canvas = canvasRef.current;
    const service = serviceRef.current;
    if (!canvas) return;

    service.init(canvas, {
      objects,
      selectedId,
      ...canvasSize
    });

    return () => {
      service.destroy();
    };
  }, []);

  useEffect(() => {
    const service = serviceRef.current;

    service.updateState({
      objects,
      selectedId,
      ...canvasSize
    });
  }, [objects, selectedId, canvasSize]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    const service = serviceRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvasSize.width / rect.width;
    const scaleY = canvasSize.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const foundId = service.getObjectAt(x, y);

    dispatch(selectObject(foundId));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: '#e0e0e0', padding: '20px' }}>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
      />
    </div>
  );
};

