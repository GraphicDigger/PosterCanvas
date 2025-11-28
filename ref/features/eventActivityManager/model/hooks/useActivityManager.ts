import { useMemo, useCallback, useEffect, useState, useRef } from 'react';
import { useActivityStates, useActivities } from '@/entities/eventActivity';

export const useActivityManager = () => {
  const { allCompositeActivities: activities } = useActivities();
  const { isSelected: activityIsSelected } = useActivityStates();

  const [newActivitiesCount, setNewActivitiesCount] = useState(0);
  const prevActivitiesLengthRef = useRef(0);
  const lastActivityIdRef = useRef<string | null>(null);

  // Initialize on mount / Инициализация при монтировании
  useEffect(() => {
    if (activities.length > 0 && !lastActivityIdRef.current) {
      lastActivityIdRef.current = activities[0]?.id || null;
      prevActivitiesLengthRef.current = activities.length;
    }
  }, []);

  useEffect(() => {
    // Check if new activities appeared / Проверяем, появились ли новые активности
    if (activities.length > prevActivitiesLengthRef.current) {
      const newActivity = activities[0]; // First = newest / Первая = самая новая

      if (newActivity?.id && newActivity.id !== lastActivityIdRef.current) {
        setNewActivitiesCount((prev) => prev + 1);

        if (process.env.NODE_ENV === 'development') {
          console.log('[ActivityLog] New activity detected:', newActivity);
        }
      }
    }

    // Update refs / Обновляем refs
    prevActivitiesLengthRef.current = activities.length;
  }, [activities]);

  // Memoized sorted activities (performance optimization) / Мемоизированные отсортированные активности (оптимизация производительности)
  const sortedActivities = useMemo(() => {
    return [...activities].reverse(); // Newest first / Сначала новые
  }, [activities]);

  // Reset new activities count when user views activities / Сбрасываем счетчик новых активностей когда пользователь просматривает активности
  const markAsViewed = useCallback(() => {
    setNewActivitiesCount(0);
    if (activities.length > 0) {
      lastActivityIdRef.current = activities[0]?.id || null;
    }
  }, [activities]);

  return {
    activityIsSelected,
    activities: sortedActivities,
    newActivitiesCount,
    markAsViewed,
    hasNewActivities: newActivitiesCount > 0,
  };
};

