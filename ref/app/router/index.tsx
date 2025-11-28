import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Editor } from '../../pages/editor/ui/Editor';
import { Dashboard } from '../../pages/dashboard';
import { NotificationContainer } from '@/features/eventNotificationManager';

export const AppRouter = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <NotificationContainer />
    </BrowserRouter>
  );
};
