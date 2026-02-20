import { getDataImagesFood } from '../use-get';
import { useQuery } from '@tanstack/react-query';

export const useImages = (axiosPrivate, ID, isSaving) => {
    return useQuery({
        queryKey: ['imagefood', ID],
        enabled: !!ID && !isSaving,
        queryFn: (queryKey) =>
            getDataImagesFood(axiosPrivate, queryKey.queryKey),
        placeholderData: (previousData) => previousData,
    });
};
