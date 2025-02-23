import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Resource } from "../types/calendar";

interface UseResourcesOptions {
  endpoint: string;
  delay?: number;
  initialResources?: Resource[];
}

export const useResources = ({
  endpoint,
  delay = 0,
  initialResources = [],
}: UseResourcesOptions) => {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await axios.get(endpoint);

      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      setResources(data);
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
    fetchResources();
  }, [fetchResources]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return {
    resources,
    isLoading,
    error,
    refresh,
  };
};
