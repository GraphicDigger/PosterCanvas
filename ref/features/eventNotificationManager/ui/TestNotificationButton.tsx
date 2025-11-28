// shared/services/notification/ui/TestNotificationButton.tsx
// Test component to verify NotificationService is working / Тестовый компонент для проверки работы NotificationService

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNotificationServiceActions } from '@/shared/services/eventNotification';

/**
 * TestNotificationButton - кнопка для тестирования уведомлений
 *
 * Использование / Usage:
 *
 * import { TestNotificationButton } from '@/shared/services/notification/ui/TestNotificationButton';
 *
 * function YourComponent() {
 *   return <TestNotificationButton />;
 * }
 */
export const TestNotificationButton = () => {

  const { success, error, warning, info } = useNotificationServiceActions();

  const handleSuccess = () => {
    success('Успешно! Уведомление работает', {
      title: 'Success',
      duration: 3000,
    });
  };

  const handleError = () => {
    error('Ошибка! Что-то пошло не так', {
      title: 'Error',
      duration: 5000,
    });
  };

  const handleWarning = () => {
    warning('Внимание! Проверьте данные', {
      title: 'Warning',
      duration: 4000,
    });
  };

  const handleInfo = () => {
    info('Информация: NotificationService работает!', {
      title: 'Info',
      duration: 3000,
    });
  };

  return (
    <div css={containerStyles}>
      <h3 css={titleStyles}>🧪 Test Notifications</h3>
      <div css={buttonsStyles}>
        <button css={buttonStyles('#10b981')} onClick={handleSuccess}>
          ✓ Success
        </button>
        <button css={buttonStyles('#ef4444')} onClick={handleError}>
          ✗ Error
        </button>
        <button css={buttonStyles('#f59e0b')} onClick={handleWarning}>
          ⚠ Warning
        </button>
        <button css={buttonStyles('#3b82f6')} onClick={handleInfo}>
          ℹ Info
        </button>
      </div>
    </div>
  );
};

const containerStyles = css`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9998;
`;

const titleStyles = css`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
`;

const buttonsStyles = css`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const buttonStyles = (color: string) => css`
  padding: 8px 16px;
  background: ${color};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

