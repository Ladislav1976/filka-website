import { getDataPrivate } from '../use-get';
import { useQuery } from '@tanstack/react-query';
export const useUnit = (axiosPrivate) => {
    return useQuery({
        queryKey: ['unit'],
        queryFn: (queryKey) => getDataPrivate(axiosPrivate, queryKey.queryKey),
        enabled: !!axiosPrivate,
        placeholderData: (previousData) => previousData,
    });
};
