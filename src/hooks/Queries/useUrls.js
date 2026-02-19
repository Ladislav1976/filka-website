import { getDataImagesFood } from '../use-get';
import { useQuery } from '@tanstack/react-query';

export function useUrls(axiosPrivate, ID) {
    return useQuery({
        queryKey: ['url', ID],
        enabled: !!ID,
        queryFn: (queryKey) =>
            getDataImagesFood(axiosPrivate, queryKey.queryKey),
        placeholderData: (previousData) => previousData,
    });
}
