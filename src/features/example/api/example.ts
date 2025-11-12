import { QueryConfig } from '@/config/query-config';
import { api } from '@/core/api/client';
// import { Example } from '@/shared/types/example';
import { useQuery, queryOptions } from '@tanstack/react-query';


interface Example {
  id: string;
  name: string;
  description: string;
}
/**
 * Fetch a single example by ID
 */
export const getExample = ({
  exampleId,
}: {
  exampleId: string;
}): Promise<{ data: Example }> => {
  return api.get(`/example/${exampleId}`);
};

/**
 * Query options for useQuery
 */
export const getExampleQueryOptions = (exampleId: string) => {
  return queryOptions({
    queryKey: ['example', exampleId],
    queryFn: () => getExample({ exampleId }),
  });
};

type UseExampleOptions = {
  exampleId: string;
  queryConfig?: QueryConfig<typeof getExampleQueryOptions>;
};

/**
 * Custom React Query hook for fetching a single Example
 */
export const useExample = ({
  exampleId,
  queryConfig,
}: UseExampleOptions) => {
  return useQuery({
    ...getExampleQueryOptions(exampleId),
    ...queryConfig,
  });
};
