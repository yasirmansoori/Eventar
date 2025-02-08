import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CalendarEvent } from "../types/calendar";

interface UseEventsOptions<T> {
  endpoint: string;
  delay?: number;
  initialEvents?: CalendarEvent[];
  refactorData?: (data: T[]) => CalendarEvent[];
}

export const useEvents = <T>({
  endpoint,
  delay = 0,
  initialEvents = [],
  refactorData,
}: UseEventsOptions<T>) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await axios.get(endpoint);

      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const transformedData = refactorData ? refactorData(data) : data;
      setEvents(transformedData);
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, delay]);

  const refresh = useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    isLoading,
    error,
    refresh,
    setEvents,
  };
};
