import React from 'react';
import { useCommentPin } from '../hooks/useCommentPin';
import { usePinPlacement } from '../hooks/usePinPlacement';
import { Pin } from '@/shared/uiKit/Pin';

export const PinDemo = () => {
  const { totalPins, visiblePins, screenPins, elementPins } = useCommentPin();
  const {
    isPlacing,
    placementPosition,
    startPlacement,
    stopPlacement,
    handleScreenClick,
    handleElementClick,
  } = usePinPlacement();


  return (
    <div className="pin-demo" style={{ padding: '20px' }}>
      {/* Кнопки управления */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={startPlacement}
          disabled={isPlacing}
          style={{
            padding: '10px 20px',
            backgroundColor: isPlacing ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPlacing ? 'not-allowed' : 'pointer',
            marginRight: '10px',
          }}
        >
          {isPlacing ? 'Размещение...' : 'Начать размещение пина'}
        </button>

        {isPlacing && (
          <button
            onClick={stopPlacement}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
                        Отменить
          </button>
        )}
      </div>

      {/* Статистика */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <h3>Статистика пинов:</h3>
        <p>Всего пинов: <strong>{totalPins}</strong></p>
        <p>Видимых пинов: <strong>{visiblePins}</strong></p>
        <p>Пинов на экране: <strong>{screenPins}</strong></p>
        <p>Пинов на элементах: <strong>{elementPins}</strong></p>
      </div>

      {/* Область для размещения пинов */}
      <div
        className="screen-area"
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          border: '2px dashed #ccc',
          backgroundColor: '#f5f5f5',
          cursor: isPlacing ? 'crosshair' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleScreenClick}
      >
        {isPlacing ? (
          <p style={{ color: '#666', fontSize: '16px' }}>
                        Кликните для размещения пина
          </p>
        ) : (
          <p style={{ color: '#999', fontSize: '14px' }}>
                        Нажмите "Начать размещение пина" для активации
          </p>
        )}

        {/* Показываем пин в позиции размещения */}
        {placementPosition && (
          <Pin
            variant='new'
            x={placementPosition.x}
            y={placementPosition.y}
            absolute={false}
          />
        )}
      </div>

      {/* Тестовые элементы */}
      <div style={{ marginTop: '20px' }}>
        <h3>Тестовые элементы:</h3>
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
          <div
            id="test-element-1"
            style={{
              width: '200px',
              height: '100px',
              backgroundColor: '#e3f2fd',
              border: '2px solid #2196f3',
              borderRadius: '8px',
              padding: '15px',
              cursor: isPlacing ? 'crosshair' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            onClick={(e) => handleElementClick('test-element-1', e)}
          >
            <p style={{ margin: 0, color: '#1976d2' }}>
                            Элемент 1<br />
              <small>{isPlacing ? 'Кликните для пина' : 'Кликните для активации'}</small>
            </p>
          </div>

          <div
            id="test-element-2"
            style={{
              width: '200px',
              height: '100px',
              backgroundColor: '#f3e5f5',
              border: '2px solid #9c27b0',
              borderRadius: '8px',
              padding: '15px',
              cursor: isPlacing ? 'crosshair' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            onClick={(e) => handleElementClick('test-element-2', e)}
          >
            <p style={{ margin: 0, color: '#7b1fa2' }}>
                            Элемент 2<br />
              <small>{isPlacing ? 'Кликните для пина' : 'Кликните для активации'}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
