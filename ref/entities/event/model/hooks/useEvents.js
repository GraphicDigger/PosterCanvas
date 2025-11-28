import { useSelector } from 'react-redux';
import {
  selectAllEvents,
  selectSelectedEvent,
  selectEventsByIds,
} from '../store';


export const useEvents = () => {

  const allEvents = useSelector(selectAllEvents);
  const selectedEvent = useSelector(selectSelectedEvent);

  return {
    allEvents,
    selectedEvent,
  };
};

export const useEventsByIds = (ids) => {
  const Events = useSelector(state => selectEventsByIds(state, ids));

  return {
    Events,
  };
};

