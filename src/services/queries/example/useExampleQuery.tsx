/**
 * Example React Query hook - reference for how to use useQuery in this project.
 * Copy and adapt this pattern when adding new data-fetching queries.
 *
 * Usage:
 *   const { data, isLoading, error } = useExampleQuery({ page: 1 });
 */

import { keepPreviousData, useQuery } from "@tanstack/react-query";

// Example: replace with your API function
// import { getItems } from "services/api/yourApi";

const EXAMPLE_QUERY_KEY = ["example", "items"];

export const useExampleQuery = (params = {}) => {
  return useQuery({
    queryKey: [...EXAMPLE_QUERY_KEY, params],
    queryFn: async () => {
      // Replace with your API call, e.g.:
      // return getItems(params);
      return { data: [] };
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
};
